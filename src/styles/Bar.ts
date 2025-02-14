const styles = /*inline-css*/`
    .bar-container {
        display: flex;
        min-height: clamp(3rem, 4.75vh, 5rem);
        margin: clamp(0.5rem, 1vw, 1rem) auto;
        border-radius: clamp(0.5rem, 10px, 1rem);
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        padding: clamp(0.25rem, 0.5vw, 0.75rem);
        transition: all 0.2s ease-in-out;
        width: 96%;
    }

    .bar-container:hover {
        background: rgba(255, 255, 255, 0.15);
        border-color: rgba(255, 255, 255, 0.2);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    .row {
        display: flex;
        align-items: center;
        gap: clamp(0.25rem, 0.5vw, 1rem);
        padding: clamp(0.25rem, 0.5vw, 0.75rem);
        transition: all 0.2s ease-in-out;
        width: 100%;
    }

    .row-right {
      justify-content: flex-start;
    }

    .row-center {
       justify-content: center;
    }

    .row-left {
        justify-content: flex-end;
    }

    /* Ensure content inside slots is properly aligned */
    ::slotted(*) {
        display: flex;
        align-items: center;
        gap: clamp(0.25rem, 0.5vw, 0.75rem);
    }
`

export default styles;