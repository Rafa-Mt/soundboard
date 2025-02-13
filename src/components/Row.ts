import BaseComponent from "./BaseComponent";

type Column = "left" | "center" | "right"

export default class Row extends BaseComponent {
    protected name = 'row'
    protected styles = /*inline-css*/`
        .row-container {
            display: flex;
            height: 6vh;
            background-color: red;
            justify-content: space-between;
            margin: 1vw 0;
        }

        .row-right {
            justify-content: flex-end;
        }

        .row-center {
            justify-content: center;
        }

        .row-left {
            justify-content: flex-start;
        }

        .row {
            margin: 0.5vw;

            display: flex;
            width: fill
        }
    `
    protected template = /*html*/`
        <div class="row row-right">
            <slot name="right-column"/>
        </div>
        <div class="row row-center">
            <slot name="center-column"/>
        </div>
        <div class="row row-left">
            <slot name="left-column"/>
        </div>
    `
    protected acceptChildren: boolean = false;
    rightColumn?: Element;
    centerColumn?: Element;
    leftColumn?: Element;

    protected onMount(): void {
        [this.rightColumn, this.centerColumn, this.leftColumn] = this.root.children; 
    }

    public appendTo(column: Column, ...children: HTMLElement[]) {
        switch (column) {
            case 'left': this.leftColumn?.append(...children); break;
            case 'center': this.centerColumn?.append(...children); break;
            case 'right': this.rightColumn?.append(...children); break;
        }
        return this;
    }
}

customElements.define('custom-row', Row)