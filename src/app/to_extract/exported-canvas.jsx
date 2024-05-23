import React, { useState, useEffect, useRef } from 'react';
import * as fabric from "fabric";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import { useHotkeys } from 'react-hotkeys-hook'
import { Fullscreen } from 'lucide-react';
import { useFabricJSEditor } from 'fabricjs-react';



const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

const EditableCanvas = () => {

    const history = [];

    // const brown, dbrown, gold = '', '', ''

    const { editor, onReady } = useFabricJSEditor();

    const ref = useRef();

    const [canvasState, setCanvasState] = useState('');
    const [downloadLink, setDownloadLink] = useState('')
    const [downloadName, setDownloadName] = useState('')
    const [canvasColour, setCanvasColour] = useState('#E8C99C') // #292524 - как цвет фона
    const [fontstyle, setFontstyle] = useState('normal')

    const canvas = useRef(null);

    useEffect(() => {
        canvas.current = initCanvas();

        canvas.current.on("mouse:over", () => {
        }, []);

        return () => {
            canvas.current.dispose();
            canvas.current = null;
        };
    }, []);

    const initCanvas = () => (

        new fabric.Canvas('canvas', {
            height: 480,
            width: 640,
            backgroundColor: canvasColour,
            selection: false,
            renderOnAddRemove: true,
        })
    );

    function handleWheel(e) {
        e.preventDefault();
        const { deltaY } = e;
        if (!draggind) {
            setZoom((zoom) =>
                clamp(zoom + 1 * 1 * -1, 0.01, 20)
            );
        }
    };

    useEffect(() => {
        canvas.current.on('mouse:wheel', function (opt) {
            var delta = opt.e.deltaY;
            var zoom = canvas.current.getZoom();
            zoom *= 0.999 ** delta;
            if (zoom > 20) zoom = 20;
            if (zoom < 0.01) zoom = 0.01;
            canvas.current.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
            opt.e.preventDefault();
            opt.e.stopPropagation();
            var viewpoint = this.viewportTransform;
            if (zoom < 400 / 1000) {
                viewpoint[4] = 200 - 1000 * zoom / 2;
                viewpoint[5] = 200 - 1000 * zoom / 2;
            } else {
                if (viewpoint[4] >= 0) {
                    viewpoint[4] = 0;
                } else if (viewpoint[4] < canvas.current.getWidth() - 1000 * zoom) {
                    viewpoint[4] = canvas.current.getWidth() - 1000 * zoom;
                }
                if (viewpoint[5] >= 0) {
                    viewpoint[5] = 0;
                } else if (viewpoint[5] < canvas.current.getHeight() - 1000 * zoom) {
                    viewpoint[5] = canvas.current.getHeight() - 1000 * zoom;
                }
            }
        })
    }, []);

    function addTextToCanvas(e) {
        let textBox = new fabric.IText("Я текстовое поле!", {
            left: 100,
            top: 100,
            fontSize: 20,
            fontStyle: fontstyle,
            fontFamily: 'serif'
        });
        canvas.current.add(textBox);
    }



    function submitURL(e) {
        let url = document.getElementById("input").value;
        console.log(`adding image from source ${url}`)
        fabric.FabricImage.fromURL(url, function (img) {
            img.set({
                width: canvas.width / 2,
                height: canvas.height / 2
            });
            canvas.add(img).renderAll().setActiveObject(img);
        });
    }

    function convertToImg(e) {
        // перед загрузкой, надо его отзумить в полный размер
        //   const svg = canvas.current.toSVG();
        setDownloadLink(canvas.current.toDataURL({
            format: "png"
        }));

        setDownloadName("canvas.png");
    }


    function changeColour(e, colour) {
        canvas.current.set('backgroundColor', colour).renderAll()
    }

    function showActiveElement(e) {
        console.log(canvas.current.getActiveObject())
    }

    function deleteElement(e) {
        canvas.current.remove(canvas.current.getActiveObject());
    }

    function undo() {
        if (canvas.current._objects.length > 0) {
            history.push(canvas.current._objects.pop());
        }
        canvas.current.renderAll();
    };
    function hotKeyDownload() {
        const link = document.getElementById('downloadLink');
        link.click();
    }
    useHotkeys('t', addTextToCanvas)
    useHotkeys('delete', deleteElement)
    useHotkeys('ctrl + z', undo)
    useHotkeys('ctrl + e', hotKeyDownload)
    useHotkeys('s', hotKeyDownload)

    function addBrown() {
        fabric.FabricImage.fromURL('http://fabricjs.com/article_assets/9.png', function (oImg) {
            canvas.current.add(oImg);
        });

    }
    const onAddCircle = () => {
        editor.addCircle();
    };

    return (
        <>
            <div ref={ref} >
                <canvas id="canvas" ref={ref} onReady={onReady} />
                <button className='border-2' onClick={addTextToCanvas}>Add Text</button>
                <button className='border-2' onClick={addBrown}>Добавить бурого</button>
                <button className='border-2' onClick={showActiveElement}>Show active element</button>
                <button className='border-2' onClick={deleteElement}>Delete Element</button>
                <button className='border-2' onClick={onAddCircle}>Add Circle</button>
                <a id='downloadLink' href={downloadLink} download={downloadName} onClick={convertToImg}>Print As Image</a>
                <br />
                <form>
                    <label>Enter Image Url here : </label>
                    <input id="input"></input>
                    <button onClick={submitURL} type="button">Add Image With Url</button>
                </form>
            </div>


        </>
    );
}

export default EditableCanvas;

{/* <div onChange={handleDivChange}>
<input type="radio" id="normal" name="contact" value="normal" onchange={handleRadio} />
<label for="normal">Normal</label>

<input type="radio" id="italic" name="contact" value="italic" onchange={handleRadio} />
<label for="italic">Italic</label>
</div> */}