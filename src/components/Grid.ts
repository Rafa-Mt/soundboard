import BaseComponent from "./BaseComponent";
import styles from "../styles/Grid";

export default class Grid extends BaseComponent {
    protected name: string = 'custom-grid'
    protected styles: string = styles;
    private container?: Element;

    protected onMount(): void {
        this.container = [...this.getElementsByClassName('custom-grid-container')].pop()
    }

    public pushItem(child: HTMLElement) {
        this.container?.appendChild(child);
        return this;
    }
}

customElements.define('custom-grid', Grid)