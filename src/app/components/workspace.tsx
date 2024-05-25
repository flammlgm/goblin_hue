
"use client"
import EditableCanvas from './canvas'
interface WorkspaceProps {
    selectedSpriteSrc: string;

}

const Workspace: React.FC<WorkspaceProps> = ({ selectedSpriteSrc }) => {

    return (
        <div id="workspace" className="w-[60%] h-full flex pl-8
        border-2
        border-gold
        ">
            <EditableCanvas
                selectedSpriteSrc={selectedSpriteSrc}
            />
        </div>);
}

export default Workspace;