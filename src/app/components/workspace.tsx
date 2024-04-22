
"use client"
import EditableCanvas from '../to_extract/exported-canvas'

const Workspace = () => {

    return (
        <div id="workspace" className="w-[60%] h-full flex pl-8
        border-2
        border-gold
        ">
            <EditableCanvas />
        </div>);
}

export default Workspace;