import BaseComponent, { BaseComponentArgs } from "./BaseComponent";
import styles from "../styles/IconButton";

interface IconButtonArgs extends BaseComponentArgs {
    iconName: string,
    onClick: (e: Event) => void;
}

export default class IconButton extends BaseComponent {
    protected name: string = "icon-button";
    protected template: string = /* html */`
        <button class="custom-button">
            <svg
                fill="none"
                stroke="white"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
            >
                <use href="" class="icon-src"/>
            </svg>
        </button>
    `;

    protected styles: string = styles

    private iconName: string;
    private svgPath = "/src/services/feather-icons.svg"

    constructor(args: IconButtonArgs) {
        const { className, id, children, iconName, onClick } = { ...args };
        super({className, id, children})

        this.iconName = iconName || this.getAttribute('icon') as string
        this.root.addEventListener('click', onClick)
    }

    protected onMount(): void {
        this.pushIcon(this.iconName)
    }

    private pushIcon(iconName: string) {
        const iconElement = [...this.getElementsByClassName("icon-src")].pop()
        iconElement?.setAttribute('href', `${this.svgPath}#${iconName}`)
    }

    public setText(text: string) {
        const span = [...this.getElementsByClassName('button-text')].pop();
        (span as HTMLSpanElement).innerHTML = text;
        this.text = text;
    }
}

customElements.define('icon-button', IconButton)