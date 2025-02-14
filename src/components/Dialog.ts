import BaseComponent, { BaseComponentArgs } from "./BaseComponent";
import styles from "../styles/Dialog";

export interface DialogComponentArgs extends BaseComponentArgs {
    title?: string;
    closeOnBackdropClick?: boolean;
}

export class DialogComponent extends BaseComponent {
    protected name = `dialog`;
    protected styles = styles;
    protected template = /* html */`
        <div class="dialog-content">
            <div class="dialog-header">
                <slot name="header"></slot>
                <button class="dialog-close">&times;</button>
            </div>
            <slot name="content"></slot>
            <slot name="footer"></slot>
        </div>
    `;
    private isOpen = false;
    private closeOnBackdropClick: boolean;

    constructor(args?: DialogComponentArgs) {
        super(args);
        this.closeOnBackdropClick = args?.closeOnBackdropClick ?? true;
    }

    protected onMount() {
        this.root.querySelector('.dialog-close')?.addEventListener('click', () => this.close());
        
        if (this.closeOnBackdropClick) {
            this.root.addEventListener('click', (e) => {
                if (e.target === this.root) this.close();
            });
        }
    }

    public open() {
        this.isOpen = true;
        this.root.classList.add('visible');
        this.dispatchEvent(new CustomEvent('dialog-opened'));
    }

    public close() {
        this.isOpen = false;
        this.root.classList.remove('visible');
        this.dispatchEvent(new CustomEvent('dialog-closed'));
    }

    public toggle() {
        this.isOpen ? this.close() : this.open();
        console.log(this.slots)
    }

    public setHeader(content: string | HTMLElement) {
        const headerSlot = this.slots?.get('header');
        if (headerSlot) {
            headerSlot.innerHTML = '';
            if (typeof content === 'string') {
                headerSlot.textContent = content;
            } else {
                headerSlot.appendChild(content);
            }
        }
        return this;
    }

    public setContent(content: string | HTMLElement) {
        const contentSlot = this.slots?.get('content');
        if (contentSlot) {
            contentSlot.innerHTML = '';
            if (typeof content === 'string') {
                contentSlot.textContent = content;
            } else {
                contentSlot.appendChild(content);
            }
        }
        return this;
    }

    public setFooter(content: string | HTMLElement) {
        const footerSlot = this.slots?.get('footer');
        if (footerSlot) {
            footerSlot.innerHTML = '';
            if (typeof content === 'string') {
                footerSlot.textContent = content;
            } else {
                footerSlot.appendChild(content);
            }
        }
        return this;
    }
}

customElements.define('custom-dialog', DialogComponent);