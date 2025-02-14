import Bar from "./components/Bar";
import IconButton from "./components/IconButton";
import TabName from "./components/TabName";
import VolumeBar from "./components/VolumeBar";
import "./style.css"

const upperRow = new Bar()
	.apppendTo(document.body)
	.appendChildToColumn('left', new IconButton(
		{iconName: 'upload', onClick: (e) => console.log((((e.currentTarget as HTMLElement).parentElement) as Bar))}
	))
	.appendChildToColumn('left', new IconButton(
		{iconName: 'download', onClick: (e) => console.log(e)}
	))
	.appendChildToColumn('right', new TabName({ content: "Base" }))


const div = document.createElement('div')
// div.style.height = '530px'
document.body.appendChild(div)

const lowerRow = new Bar()
	.apppendTo(document.body)
	.appendChildToColumn('left', new VolumeBar(
		{ onVolumeChange: (e) => console.log(e) }
	))

const addButton = new IconButton(
	{"iconName": "number-1", onClick: () => { 
		lowerRow.appendChildToColumn('right', new IconButton(
			{ iconName: "", onClick: (e) => console.log(e.target) }
		)) 
	}}
)

lowerRow.appendChildToColumn('right', addButton)

