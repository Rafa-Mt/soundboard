import { addSong } from "../services/DB";
import { isValidMP3File, processMP3File } from "../services/SongProcessing";
import { Song } from "../services/types";
import BaseComponent, { BaseComponentArgs } from "./BaseComponent";

interface DropzoneArgs extends BaseComponentArgs {
    onSongAdded: (song: Song) => void
}

export default class Dropzone extends BaseComponent {
    protected template: string = /* html */`
        <input type="file" accept=".mp3,audio/mpeg" class="dropzone hidden" style="display: none"/>
    `

    private input?: Element
    private onSongAdded: (song: Song) => void

    constructor(args: DropzoneArgs) {
        super(args)
        this.onSongAdded = args.onSongAdded;
    }
    
    protected onMount(): void {
        const input = [...this.getElementsByClassName("dropzone")].pop() as Element
        this.input = input;
        input.addEventListener('change', async (e: Event) => {
            const files = (e.target as HTMLInputElement).files;
            if (!files || files.length === 0) return;
                    
            for (const file of Array.from(files)) {
                if (isValidMP3File(file)) {
                    try {
                        const song = await processMP3File(file);
                        await addSong(song);
                        this.onSongAdded(song);
                    } catch (error) {
                        console.error(`Error loading ${file.name}: ${error}`, 'error');
                    }
                } else {
                    console.warn(`Skipped non-MP3 file: ${file.name}`, 'error');
                }
            }
        })
        
    }

    public open = () => (this.input as HTMLElement).click() 
}

customElements.define('custom-dropzone', Dropzone)