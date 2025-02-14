const styles = /* css */`
    tab-name {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        padding: 0.5rem;
    }

    .tab-name {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: calc(10px + 0.7vw);
        border-radius: clamp(0.75rem, 2vw, 1.25rem);
        background: #141d30;
        cursor: pointer;
        transition: all 0.3s ease;
        position: relative;
        box-shadow: 0 0 10px rgba(255, 235, 255, 0);
        color: rgba(255, 235, 255, 1);
        padding: 0.5vw 0;
    }

    .tab-name:hover {
        box-shadow: 0 0 20px rgba(255, 235, 255, 0.7),
                    0 0 30px rgba(255, 235, 255, 0.4);
        transform: scale(1.02);
    }

    .tab-name::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: 5px;
        pointer-events: none;
        transition: opacity 0.3s ease;
        opacity: 0;
    }

    .tab-name:hover::before {
        opacity: 1;
    }
`

export default styles;