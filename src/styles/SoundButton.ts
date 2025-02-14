const styles = /* css */`
.sound-button {
    color: white;
    font-weight: bold;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.05);
    border-radius: clamp(0.75rem, 2vw, 1.25rem);
    border: 1px solid rgba(255, 255, 255, 0.1);
    padding: clamp(0.75rem, 1.5vw, 1.25rem);
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    backdrop-filter: blur(12px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .sound-button::before {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(255, 255, 255, 0.05);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .sound-button:hover {
    transform: scale(1.02);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2),
                0 0 15px rgba(56, 189, 248, 0.2);
  }

  .sound-button:hover::before {
    opacity: 1;
  }

  .sound-button:active {
    transform: scale(0.98);
  }

  .sound-button:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.3);
  }

  /* If you're including icons inside the button */
  .sound-button > svg {
    width: 65%;
    height: 65%;
    stroke: #e2e8f0;
    stroke-width: 2;
    transition: transform 0.2s ease;
  }

  .sound-button:hover > svg {
    transform: scale(1.1);
  }
`;

export default styles;