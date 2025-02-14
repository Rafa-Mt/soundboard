const styles =  /* css */`
    .icon-button-container {
        width: 100%;
        height: 100%;
    }
    .custom-button {
        background: linear-gradient(145deg, #0f172a 0%, #141d30 100%);
        border-radius: clamp(0.5rem, 1.25vw, 1rem);
        border: 1px solid rgba(255, 255, 255, 0.1);
        display: flex;
        align-items: center;
        justify-content: center;
        width:100%;
        height: 100%;
        aspect-ratio: 1;
        margin: auto;
        padding: 0.5rem;
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        backdrop-filter: blur(8px);
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        position: relative;
        overflow: hidden;
        box-sizing: border-box;
    }

    .custom-button::before {
        content: '';
        position: absolute;
        inset: 0;
        background: rgba(255, 255, 255, 0.05);
        opacity: 0;
        transition: opacity 0.3s ease;
    }

    .custom-button:hover {
        transform: scale(1.08);
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2),
                    0 0 15px rgba(56, 189, 248, 0.2);
    }

    .custom-button:hover::before {
        opacity: 1;
    }

    .custom-button:active {
        transform: scale(0.96);
        filter: brightness(0.95);
    }

    .custom-button svg {
        width: 65%;
        height: 65%;
        stroke: #e2e8f0;
        stroke-width: clamp(1.8px, 0.15rem, 2.5px);
        transition: all 0.2s ease;
        margin: 0;
        display: block;
        max-width: 24px;
        max-height: 24px;
    }

    .custom-button:hover svg {
        stroke-width: clamp(2px, 0.17rem, 2.7px);
        filter: brightness(1.1);
    }

    .custom-button:focus-visible {
        outline: none;
        box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.3);
    }

    .custom-button::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 100%;
        height: 100%;
        background: radial-gradient(
            circle at center,
            rgba(56, 189, 248, 0.2) 0%,
            rgba(56, 189, 248, 0) 70%
        );
        transform: translate(-50%, -50%);
        opacity: 0;
        transition: opacity 0.3s ease;
        pointer-events: none;
    }

    .custom-button:hover::after {
        opacity: 0.6;
    }
`;

export default styles;