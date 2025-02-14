import { Playlist, Song } from "./types";
const DB_NAME = 'MusicDatabase';
const DB_VERSION = 1;

const STORES = {
	SONGS: 'songs',
	PLAYLISTS: 'playlists'
};

const openDB = async (): Promise<IDBDatabase> => {
	return new Promise((resolve, reject) => {
		const request = indexedDB.open(DB_NAME, DB_VERSION);

		request.onupgradeneeded = (event) => {
			const db = (event.target as IDBOpenDBRequest).result;

			const songStore = db.createObjectStore(STORES.SONGS, {
				keyPath: 'id',
				autoIncrement: true
			});
			songStore.createIndex('title', 'title', { unique: false });

			const playlistStore = db.createObjectStore(STORES.PLAYLISTS, {
				keyPath: 'id',
				autoIncrement: true
			});
			playlistStore.createIndex('name', 'name', { unique: false });
		};

		request.onsuccess = (event) => {
			resolve((event.target as IDBOpenDBRequest).result);
		};

		request.onerror = (event) => {
			reject((event.target as IDBOpenDBRequest).error);
		};
	});
}

export const addSong = async (song: Omit<Song, 'id'>): Promise<number> => {
	const db = await openDB();
	return new Promise((resolve, reject) => {
		const transaction = db.transaction(STORES.SONGS, 'readwrite');
		const store = transaction.objectStore(STORES.SONGS);
		if (song.title.length > 20) {
			song.title = song.title.substring(0, 20) + '...';
		}
		const request = store.add(song);
		request.onsuccess = () => resolve(request.result as number);
		request.onerror = () => reject(request.error);
	});
};

export const getDefaultPlaylist = async (): Promise<Playlist | undefined> => {
	const db = await openDB();
	return new Promise((resolve, reject) => {
		const transaction = db.transaction(STORES.PLAYLISTS, 'readonly');
		const store = transaction.objectStore(STORES.PLAYLISTS);
		const index = store.index('name');
		const request = index.get('Default Playlist');

		request.onsuccess = () => {
			resolve(request.result as Playlist);
		};

		request.onerror = () => reject(request.error);
	});
};

export const ensureDefaultPlaylist = async (): Promise<number | void> => {
	const db = await openDB();
	return new Promise((resolve, reject) => {
		const transaction = db.transaction(STORES.PLAYLISTS, 'readwrite');
		const store = transaction.objectStore(STORES.PLAYLISTS);
		const request = store.count();

		request.onsuccess = async () => {
			if (request.result === 0) {
				const defaultPlaylist: Omit<Playlist, 'id'> = { name: 'Default Playlist', songIds: [] };
				try {
					const playlistId = await addPlaylist(defaultPlaylist);
					console.log("Added default playlist")
					resolve(playlistId);
				} catch (error) {
					reject(error);
				}
			} else {
				const getAllRequest = store.getAll();
				getAllRequest.onsuccess = () => {
					const playlists = getAllRequest.result as Playlist[];
					const defaultPlaylist = playlists.find(playlist => playlist.name === 'Default Playlist');
					if (defaultPlaylist) {
						resolve(defaultPlaylist.id);
					} else {
						resolve();
					}
				};
				getAllRequest.onerror = () => reject(getAllRequest.error);
			}
		};

		request.onerror = () => reject(request.error);
	});
};

export const addSongToPlaylist = async (songId: number, playlistId: number): Promise<void> => {
	const db = await openDB();
	return new Promise((resolve, reject) => {
		const transaction = db.transaction([STORES.PLAYLISTS, STORES.SONGS], 'readwrite');
		
		const playlistStore = transaction.objectStore(STORES.PLAYLISTS);
		const playlistRequest = playlistStore.get(playlistId);

		playlistRequest.onsuccess = () => {
			const playlist = playlistRequest.result as Playlist;
			if (!playlist) {
				reject(new Error('Playlist not found'));
				return;
			}

			if (!playlist.songIds) {
				playlist.songIds = [];
			}

			playlist.songIds.push(songId);

			const updateRequest = playlistStore.put(playlist);
			updateRequest.onsuccess = () => resolve();
			updateRequest.onerror = () => reject(updateRequest.error);
		};

		playlistRequest.onerror = () => reject(playlistRequest.error);
	});
}

export const addPlaylist = async (playlist: Omit<Playlist, 'id'>): Promise<number> => {
	const db = await openDB();
	return new Promise((resolve, reject) => {
		const transaction = db.transaction(STORES.PLAYLISTS, 'readwrite');
		const store = transaction.objectStore(STORES.PLAYLISTS);
		const request = store.add(playlist);

		request.onsuccess = () => resolve(request.result as number);
		request.onerror = () => reject(request.error);
	});
}

export const getAllPlaylists = async (): Promise<Playlist[]> => {
	const db = await openDB();
	return new Promise((resolve, reject) => {
		const transaction = db.transaction(STORES.PLAYLISTS, 'readonly');
		const store = transaction.objectStore(STORES.PLAYLISTS);
		const request = store.getAll();

		request.onsuccess = () => {
			resolve(request.result as Playlist[]);
		};

		request.onerror = () => reject(request.error);
	});
};

export const getPlaylistWithSongs = async (playlistId: number): Promise<Playlist & { songs: Song[] }> => {
	const db = await openDB();
	return new Promise((resolve, reject) => {
		const transaction = db.transaction([STORES.PLAYLISTS, STORES.SONGS]);
		
		const playlistStore = transaction.objectStore(STORES.PLAYLISTS);
		const playlistRequest = playlistStore.get(playlistId);

		playlistRequest.onsuccess = () => {
			const playlist = playlistRequest.result as Playlist;
			if (!playlist) {
				reject(new Error('Playlist not found'));
				return;
			}

			const songStore = transaction.objectStore(STORES.SONGS);
			const songs: Song[] = [];
			
			playlist.songIds?.forEach((songId) => {
				const songRequest = songStore.get(songId);
				songRequest.onsuccess = () => {
					const song = songRequest.result;
					if (song) songs.push(song);
				};
			});

			transaction.oncomplete = () => {
				resolve({ ...playlist, songs });
			};
		};

		playlistRequest.onerror = () => reject(playlistRequest.error);
	});
}

export const getAllDataAsJson = async (): Promise<{ [key: string]: Playlist & { songs: Song[] } }[]> => {
	const playlists = await getAllPlaylists()
	const playlistWSongs = await Promise.all(
		playlists.map(async (playlist) => {
			const playlistWithSongs = await getPlaylistWithSongs(playlist.id as number);
			return {[playlist.name]: playlistWithSongs};
		})
	);
	return playlistWSongs;
};