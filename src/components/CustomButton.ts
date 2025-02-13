import BaseComponent from "./BaseComponent";

export default class CustomButton extends BaseComponent {
    protected template: string = /*html*/`
        <button className="custom-button">
            <slot name="content">
        </button>
    `;
}

customElements.define('custom-buton', CustomButton)