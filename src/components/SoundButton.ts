import BaseComponent, { BaseComponentArgs } from "./BaseComponent";
import styles from "../styles/SoundButton";

interface SoundButtonArgs extends BaseComponentArgs {
    text: string;
    base64: string
}

export default class SoundButton extends BaseComponent {
    protected styles: string = styles;
    protected name: string = "sound-button"
    protected template: string = /* html */`
        <button class="sound-button"></button>
        <audio display="none" class="audio-player">
    `

    private text: string;
    private base64: string;
    private audio?: HTMLAudioElement

    constructor(args: SoundButtonArgs) {
        super(args)
        this.text = args.text;
        this.base64 = args.base64
    }

    protected onMount(): void {
        this.setText(this.text);
        this.setSrc(this.base64)
    }

    private setSrc(base64: string) {
        const audio = [...this.getElementsByClassName("audio-player")].pop() as HTMLAudioElement
        audio.src = base64
        this.audio = audio;
        this.base64 = base64
    }

    public play() {
        (this.audio as HTMLAudioElement).play()
    }; 

    public setText(text: string) {
        const button = [...this.getElementsByClassName("sound-button")].pop();
        if (button) {
            button.innerHTML = text;
            button.addEventListener('click', this.play.bind(this))
        }
        this.text = text;
    }
}

customElements.define("sound-button", SoundButton)