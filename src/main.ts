import Row from "./components/Row";
import "./style.css"

const toggleDialog = () => {
	const dialog = document.getElementById('dialog')
	dialog?.toggleAttribute("open")
}

const button = document.getElementById("toggle-dialog")
	?.addEventListener("click", toggleDialog);

const row = new Row()
	.apppendTo(document.body)
	.appendTo('left', document.createElement('button'))
	.appendTo('right', document.createElement('button'))
