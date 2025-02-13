interface BaseComponentArgs {
    className?: string,
    id?: string,
    children?: HTMLElement[] 
}

export default class BaseComponent extends HTMLElement {
    protected name = ``
    protected styles = ``
    protected template = ``
    protected root: HTMLElement = document.createElement('div');
    protected acceptChildren: boolean = true;
    protected slots?: Map<string, HTMLElement>;
    private argsChildren?: HTMLElement[]

    constructor(args?: BaseComponentArgs) {
        super();
        if (!args) return;

        const {className, id, children} = args;

        if (className) this.className = className;

        if (id) this.id = id;

        if (children && this.acceptChildren) 
            this.argsChildren = children
    }

    connectedCallback() {
        this.checkStyles()
        this.root.className = `${this.name}-container`
        this.root.innerHTML = this.template;
        this.appendChild(this.root)
        this.saveSlots()
        if (this.argsChildren)
            this.root.append(...this.argsChildren)
        this.moveChildrenToRoot()
        this.onMount()
    }

    public apppendTo(target: HTMLElement) {
        target.appendChild(this)
        return this
    }

    protected onMount() {}

    private checkStyles() {
        const exist = Boolean(document.getElementById(`${this.name}-styles`))
        if (exist) return

        const newTag = document.createElement('style')
        newTag.innerHTML = this.styles
        document.head.appendChild(newTag)
    }

    private saveSlots() {
        const slots = this.querySelectorAll("slot")
        if (!slots) return

        const newSlots = new Map<string, HTMLElement>()
        const entries = [...slots].forEach((slot) => newSlots.set(slot.name, slot))
        this.slots = newSlots;   
    }

    private moveChildrenToRoot() {
        if (!this.slots) return;

        const children = [...this.children]
        children.forEach((child) => {
            if (child === this.root) return;

            this.removeChild(child)
            const foundSlot = (this.slots as Map<string, HTMLElement>).get(child.slot)
            if (foundSlot)
                foundSlot.appendChild(child)
        })
    }
}