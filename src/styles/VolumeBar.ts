const styles = /* css */`
    .volume-bar-container {
        background: linear-gradient(145deg, #0f172a 0%, #141d30 100%);
        display: flex;
        align-items: center;
        gap: clamp(0.5rem, 1vw, 1rem);
        padding: clamp(0.75rem, 1.5vw, 1.25rem);
        backdrop-filter: blur(12px);
        border-radius: clamp(0.75rem, 2vw, 1.25rem);
        width: fit-content;
        max-width: 90vw;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        border: 1px solid rgba(255, 255, 255, 0.1);
        position: relative;
        overflow: hidden;
        margin: 0 auto;
    }

    .volume-slider {
        flex: 1;
        height: clamp(4px, 0.75vh, 8px);
        background: rgba(255, 255, 255, 0.15);
        border-radius: 999px;
        -webkit-appearance: none;
        appearance: none;
        cursor: pointer;
        transition: background 0.3s ease;
        margin: 0;
        min-width: 150px;
    }

    .volume-slider::-webkit-slider-thumb {
        -webkit-appearance: none;
        width: clamp(14px, 2.25vh, 22px);
        height: clamp(14px, 2.25vh, 22px);
        background: #ffffff;
        border-radius: 50%;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        position: relative;
        z-index: 2;
    }

    .volume-slider::-moz-range-thumb {
        width: clamp(14px, 2.25vh, 22px);
        height: clamp(14px, 2.25vh, 22px);
        background: #ffffff;
        border: none;
        border-radius: 50%;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .volume-slider:hover::-webkit-slider-thumb {
        transform: scale(1.15);
        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.3);
    }

    .volume-slider:hover::-moz-range-thumb {
        transform: scale(1.15);
        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.3);
    }

    .volume-slider:focus {
        outline: none;
    }

    .volume-value {
        color: white;
        font-weight: 500;
        min-width: 4ch;
        text-align: center;
        font-size: clamp(0.9rem, 1.6vw, 1.1rem);
        padding: 0 0.5rem;
        position: relative;
        z-index: 1;
    }

    /* Glow effect overlay */
    .volume-bar-container::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: inherit;
        box-shadow: 0 0 15px rgba(56, 189, 248, 0.1);
        opacity: 0;
        transition: opacity 0.3s ease;
        pointer-events: none;
    }

    .volume-bar-container:hover::after {
        opacity: 1;
    }
`;

export default styles