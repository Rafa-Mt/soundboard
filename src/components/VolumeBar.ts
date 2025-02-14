import BaseComponent, { BaseComponentArgs } from "./BaseComponent";
import styles from "../styles/VolumeBar";

interface VolumeBarArgs extends BaseComponentArgs {
    onVolumeChange: (e: Event) => void
}

export default class VolumeBar extends BaseComponent {
    protected name = 'volume-bar'
    protected template = /* html */`
        <input type="range" class="volume-slider" min="0" max="100" value="50">
        <span class="volume-value">50%</span>
    `

    protected styles = styles
    private onVolumeChange: (e: Event) => void
    private volumeValue: number = 50;

    constructor(args: VolumeBarArgs) {
        const { className, id, onVolumeChange } = { ...args }
        super({ className, id })
        this.onVolumeChange = onVolumeChange
    }

    protected onMount(): void {
        const volumeSlider = [...this.getElementsByClassName("volume-slider")].pop()
        const volumeValue = [...this.getElementsByClassName("volume-value")].pop()
    
        volumeSlider?.addEventListener('input', (event) => {
            const value = (event.target as HTMLInputElement).value;
            if (volumeValue) {
                volumeValue.textContent = `${value}%`;
            }

            this.onVolumeChange(event)
        })        
    }

    get value() {
        return this.volumeValue
    }
}

customElements.define('volume-bar', VolumeBar)