const styles = /* css */`
    .dialog-container {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        justify-content: center;
        align-items: center;
        z-index: 1000;
    }

    .dialog-container.visible {
        display: flex;
    }

    .dialog-content {
        background: white;
        padding: 20px;
        border-radius: 8px;
        min-width: 300px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }

    .dialog-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 15px;
    }

    .dialog-close {
        cursor: pointer;
        padding: 5px;
        border: none;
        background: none;
        font-size: 1.2em;
    }
`
export default styles