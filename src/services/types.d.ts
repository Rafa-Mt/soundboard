export interface Song {
	id?: number;          
	title: string;
	duration: number;  
	releaseDate?: Date;
	base64: string;       
    fileType: string;    
    fileSize: number;
}

export interface Playlist {
	id?: number;         
	name: string;
	songIds?: number[];   
}
