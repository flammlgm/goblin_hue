import React, { useState, useEffect, useRef } from 'react';
import { fabric } from "fabric";
import { useHotkeys } from 'react-hotkeys-hook'

import { ArrowDownToLine } from 'lucide-react';


const EditableCanvas = ({ selectedSpriteSrc }) => {

    const history = [];

    const buttonStyle = 'bg-[#5D5344] mx-1  px-4 py-2 rounded-lg hover:bg-[#7B6A4F]'

    const ref = useRef();

    const [downloadLink, setDownloadLink] = useState('')
    const [downloadName, setDownloadName] = useState('')
    const [canvasColour, setCanvasColour] = useState('#E8C99C') // #292524 - как цвет фона
    const [fontstyle, setFontstyle] = useState('normal')

    const canvas = useRef(null);
    var grid = 64;
    var unitScale = 8;
    var canvasHeight = 72 * unitScale;
    var canvasWidth = 104 * unitScale;

    useEffect(() => {
        canvas.current = initCanvas();

        // оставлено для дальнейшей отладки - выводит в консоли инф. оо объекта холста
        function showActiveElement(e) {
            console.log(canvas.current.getActiveObject())
        }

        // рисуем сетку
        for (var i = 0; i < (canvasWidth / grid) + 1; i++) {
            canvas.current.add(new fabric.Line(
                [i * grid, 0, i * grid, canvasHeight],
                { type: 'line', stroke: '#292524', selectable: false }
            ));
        }
        for (var i = 0; i < (canvasHeight / grid) + 1; i++) {
            canvas.current.add(new fabric.Line(
                [0, i * grid, canvasWidth, i * grid],
                { type: 'line', stroke: '#292524', selectable: false }
            ))
        }

        // привязывание к сетке

        canvas.current.on('object:moving', function (options) {
            // условие - привязываем к сетке только спрайты. Не текст!
            if (options.target._element) {
                options.target.set({
                    left: Math.round(options.target.left / grid) * grid,
                    top: Math.round(options.target.top / grid) * grid
                });
            }

        });
        // и при масштабировании
        canvas.current.on('object:modified', function (options) {
            // условие - привязываем к сетке только спрайты. Не текст!
            if (options.target._element) {
                var newWidth = (Math.round(options.target.getScaledHeight() / grid)) * grid;
                options.target.scaleToWidth(newWidth)
            }


        })

        return () => {
            canvas.current.dispose();
            canvas.current = null;
        };
    }, []);

    const initCanvas = () => (
        new fabric.Canvas('canvas', {
            height: canvasHeight,
            width: canvasWidth,
            backgroundColor: canvasColour,
            selection: false,
            renderOnAddRemove: true,
        })
    );


    useEffect(() => {
        canvas.current?.on('mouse:wheel', function (opt) {
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

    function resetZoom() {
        const zoom = canvas.current.getZoom();
        const zoomPoint = new fabric.Point(
            canvasWidth / 2,
            canvasHeight / 2); // центр холста
        canvas.current.zoomToPoint(zoomPoint, 1);
    }

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
        fabric.Image.fromURL(
            url,
            function (img) {
                var oImg = img.set({
                    left: 50,
                    top: 100,
                    lockRotation: true
                });
                oImg.setControlsVisibility({ mtr: false })
                canvas.current
                    .add(oImg)
                    .renderAll();
            },
            { crossOrigin: "anonymous" });
    }

    function addSprite(e) {
        // если у нас не выбрано никакого изображения
        if (selectedSpriteSrc === '') {
            return
        }

        console.log(selectedSpriteSrc)
        fabric.Image.fromURL(
            selectedSpriteSrc,
            function (img) {
                var oImg = img.set({
                    left: 64,
                    top: 64,
                    lockRotation: true
                });
                oImg.setControlsVisibility({ mtr: false })
                canvas.current
                    .add(oImg)
                    .renderAll();
            },
            { crossOrigin: "anonymous" });
    }
    function convertToImg(e) {
        // перед загрузкой, надо его отзумить в полный размер
        setDownloadLink(canvas.current.toDataURL({
            format: "png"
        }));

        setDownloadName("canvas.png");
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

    return (
        <>
            <div ref={ref} className='mt-2 rounded-lg'>
                <canvas id="canvas" className='rounded-lg' />
                <div className='mt-2 flex-auto flex'>
                    <button className={buttonStyle} onClick={addTextToCanvas}>Добавить текст</button>
                    <button className={buttonStyle} onClick={addSprite}>Добавить спрайт</button>
                    <button className='bg-[rgb(116,69,69)] flex items-flex  mx-1 px-4 py-2 rounded-lg hover:bg-[rgb(128,76,76)]' onClick={deleteElement}>Удалить</button>
                    <div className='bg-[rgb(88,120,72)] flex items-flex  mx-1 pr-4 py-2 rounded-lg hover:bg-[rgb(93,128,76)]'>
                        <ArrowDownToLine className='flex' width={40} />
                        <a id='downloadLink' href={downloadLink} download={downloadName} onClick={convertToImg}>
                            Скачать изображение
                        </a>
                    </div>

                </div>


                {/* <br />
                <form>
                    <label>Enter Image Url here : </label>
                    <input id="input"></input>
                    <button onClick={submitURL} type="button">Add Image With Url</button>
                </form> */}
            </div>


        </>
    );
}

export default EditableCanvas;
