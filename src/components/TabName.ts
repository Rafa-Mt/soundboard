import BaseComponent, { BaseComponentArgs } from "./BaseComponent";
import styles from "../styles/TabName";
interface TabNameArgs extends BaseComponentArgs {
    content: string
}

export default class TabName extends BaseComponent {
    protected name = 'tab-name'
    protected template = /* html */`
        <span class="tab-name"></span>
    `;
    protected styles = styles
    private content: string;

    constructor(args: TabNameArgs) {
        const { className, id, content } = { ...args }
        super({className, id })
        this.content = content;
    }

    protected onMount(): void {
        this.setContent(this.content)
    }

    public setContent(newContent: string) {
        const tag = [...this.getElementsByClassName('tab-name')].pop() as HTMLElement
        console.log(tag)
        tag.innerHTML = newContent;
    }

    public getContent() {
        return  this.content
    }
} 

customElements.define('tab-name', TabName)