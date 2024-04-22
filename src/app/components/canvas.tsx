import React, { useEffect, useRef } from 'react'
import * as fabric from 'fabric'
import { FabricJSCanvas, useFabricJSEditor } from 'fabricjs-react'


const MyFabricJSCanvas = () => {

    const { editor, onReady } = useFabricJSEditor()
    const onAddCircle = () => {
        editor?.addCircle()
    }
    const onAddRectangle = () => {
        editor?.addRectangle()
    }

    return (
        <div className='w-[100%]' >
            <button onClick={onAddCircle}>Add circle</button>
            <button onClick={onAddRectangle}>Add Rectangle</button>
            <FabricJSCanvas className="h-full w-[100%]" onReady={onReady} />
        </div>)
}

export default MyFabricJSCanvas;