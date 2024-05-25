import React, { useState, useEffect, useRef } from 'react';
import { fabric } from "fabric";
import { useHotkeys } from 'react-hotkeys-hook'

import { ArrowDownToLine } from 'lucide-react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';


const EditableCanvas = ({ selectedSpriteSrc }) => {


    const buttonStyle = 'bg-buttonBrown mx-1  px-4 py-2 rounded-lg hover:bg-hoveredButtonBrown'


    const [downloadLink, setDownloadLink] = useState('')
    const [downloadName, setDownloadName] = useState('')

    const ref = useRef();
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
            backgroundColor: '#E8C99C',
            selection: false,
            renderOnAddRemove: true,
        })
    );

    function addTextToCanvas(e) {
        let textBox = new fabric.IText("Я текстовое поле!", {
            left: 100,
            top: 100,
            fontSize: 20,
            fontStyle: 'normal',
            fontFamily: 'serif'
        });
        canvas.current.add(textBox);

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

    function hotKeyDownload() {
        const link = document.getElementById('downloadLink');
        link.click();
    }

    useHotkeys('t', addTextToCanvas)
    useHotkeys('delete', deleteElement)
    useHotkeys('ctrl + e', hotKeyDownload)
    useHotkeys('s', hotKeyDownload)

    return (
        <ScrollArea>
            <div ref={ref} className='mt-2 rounded-lg'>
                <canvas id="canvas" className='rounded-lg' />
                <div className='mt-2 mb-6 flex-auto flex'>
                    <button className={buttonStyle} onClick={addTextToCanvas}>Добавить текст</button>
                    <button className={buttonStyle} onClick={addSprite}>Добавить спрайт</button>
                    <button className='bg-buttonRed flex items-flex  mx-1 px-4 py-2 rounded-lg hover:bg-hoveredButtonRed' onClick={deleteElement}>Удалить</button>
                    <div className='bg-buttonGreen flex items-flex  mx-1 pr-4 py-2 rounded-lg hover:bg-hoveredButtonGreen'>
                        <ArrowDownToLine className='flex' width={40} />
                        <a id='downloadLink' href={downloadLink} download={downloadName} onClick={convertToImg}>
                            Скачать изображение
                        </a>
                    </div>
                </div>
            </div>
            <ScrollBar orientation="horizontal" />
        </ScrollArea>
    );
}

export default EditableCanvas;
