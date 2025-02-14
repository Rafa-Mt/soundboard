import Bar from "./components/Bar";
import { DialogComponent as Dialog } from "./components/Dialog";
import Dropzone from "./components/Dropzone";
import Grid from "./components/Grid";
import IconButton from "./components/IconButton";
import SoundButton from "./components/SoundButton";
import TabName from "./components/TabName";
import VolumeBar from "./components/VolumeBar";
import { addPlaylist, addSong, addSongToPlaylist, ensureDefaultPlaylist, getAllDataAsJson, getAllPlaylists, getDefaultPlaylist, getPlaylistWithSongs } from "./services/DB";
import { defaultSong } from "./services/defaultSong";
import { Playlist } from "./services/types";
import "./style.css"


const upperRow = new Bar()
	.apppendTo(document.body)


const tabName = new TabName({ content: "Default Playlist" })
upperRow.appendChildToColumn('right', tabName)

const grid = new Grid()
	.apppendTo(document.body)

const lowerRow = new Bar()
	.apppendTo(document.body)
	.appendChildToColumn('left', new VolumeBar(
		{ onVolumeChange: (e) => console.log(e) }
	))
console.log(lowerRow)

const list  = document.createElement('div')
list.innerHTML = /* html */`
	<div>1</div>
	<div>2</div>
	<div>3</div>
	<div>4</div>
	<div>5</div>
`

const dialog = new Dialog()
	.apppendTo(document.body)
	.setHeader("Select playlist")
	.setContent(list)

const playlistButton = new IconButton(
	{ iconName: "file-text", onClick: () => {
		dialog.toggle()
	}}
)

let currentPlaylist = 0;

const dropzone = new Dropzone({
	onSongAdded: async (song) => {
		const songid = await addSong(song);
		await addSongToPlaylist(songid, currentPlaylist)
		grid.pushItem(
			new SoundButton({text: song.title, base64: song.base64})
		)
	}
});

const addButton = new IconButton(
	{"iconName": "plus", onClick: () => { 
		dropzone.open()
	}}
)

const saveButton = new IconButton(
	{"iconName": "download", onClick: async () => {
		const json = await getAllDataAsJson()
		const blob = new Blob([JSON.stringify(json)], { type: "application/json" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = "saved_soundboard.json";
		a.click();
		URL.revokeObjectURL(url);
		console.log(json)
	}}
)

lowerRow.appendChildToColumn('right', dropzone)
lowerRow.appendChildToColumn('right', playlistButton)
lowerRow.appendChildToColumn('right', addButton)

upperRow.appendChildToColumn('left', saveButton)

const state = getAllPlaylists()
	.then(async (playlists) => {
		if (playlists.length === 0) {
			const defaultId = await ensureDefaultPlaylist() as number
			await defaultSong(defaultId)
			currentPlaylist = defaultId
		}
		currentPlaylist = playlists[0].id as number;
		playlists.forEach(async (playlist) => {
			const plt = await getPlaylistWithSongs(playlist.id as number) 
			plt.songs.forEach((song) => {
				grid.pushItem(
					new SoundButton({text: song.title, base64: song.base64})
				)
			})
		})
		console.log(currentPlaylist)
	})
