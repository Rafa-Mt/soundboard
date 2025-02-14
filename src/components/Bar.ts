import BaseComponent from "./BaseComponent";
import styles from "../styles/Bar";
type Column = "left" | "center" | "right"

export default class Bar extends BaseComponent {
    protected name = 'bar'
    protected styles = styles; 
    protected template = /*html*/`
        <div class="row row-left">
            <slot name="right-column"/>
        </div>
        <div class="row row-center">
            <slot name="center-column"/>
        </div>
        <div class="row row-right">
            <slot name="left-column"/>
        </div>
    `
    protected acceptChildren: boolean = false;
    protected rightColumn?: Element;
    protected centerColumn?: Element;
    protected leftColumn?: Element;

    protected onMount(): void {
        [this.rightColumn, this.centerColumn, this.leftColumn] = this.root.children; 
    }

    public appendChildToColumn(column: Column, ...children: HTMLElement[]) {
        let col;
        switch (column) {
            case 'left': col = this.leftColumn; break;
            case 'center': col = this.centerColumn; break;
            case 'right': col = this.rightColumn; break;
        }

        console.log("appending", children, "to", col)

        if ((col?.children.length as number) + children.length > 10) {
            console.warn("Row cannot have more than 10 items")
            return this;
        }
        col?.append(...children)
        return this;
    }

    public removeChildFromRow(column: Column, child: HTMLElement) {
        switch (column) {
            case 'left': this.leftColumn?.removeChild(child); break;
            case 'center': this.centerColumn?.removeChild(child); break;
            case 'right': this.rightColumn?.removeChild(child); break;
        }
        return this;
    }
}

customElements.define('layout-bar', Bar)