import { Song } from "./types";

export const processMP3File =  async (file: File): Promise<Song> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        
        reader.onload = () => {
            const base64 = reader.result as string;
            resolve({
                title: file.name.replace(/\.mp3$/i, ''),
                duration: 0, // You would typically extract this from metadata
                base64,
                fileType: file.type,
                fileSize: file.size
            });
        };

        reader.onerror = () => {
            reject(new Error('Error reading file'));
        };

        reader.readAsDataURL(file);
    });
}

export const isValidMP3File = (file: File) => 
    file.type === 'audio/mpeg' 
 || file.name.toLowerCase().endsWith('.mp3');

