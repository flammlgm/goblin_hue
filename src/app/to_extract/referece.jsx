import React, { useState, useEffect, useRef } from 'react';
import { fabric } from "fabric";
import axios from "axios";
import ColourButton from '../ColourButton/ColourButton';


function EditableCanvas() {
    const ref = useRef();

    const [canvasState, setCanvasState] = useState('');
    const [downloadLink, setDownloadLink] = useState('')
    const [downloadName, setDownloadName] = useState('')
    const [canvasColour, setCanvasColour] = useState('pink')
    const [fontstyle, setFontstyle] = useState('normal')

    const canvas = useRef(null);

    useEffect(() => {
        canvas.current = initCanvas();

        canvas.current.on("mouse:over", () => {
            console.log('hello')
        }, []);

        return () => {
            canvas.current.dispose();
            canvas.current = null;
        };
    }, []);

    const initCanvas = () => (
        new fabric.Canvas('canvas', {
            height: 800,
            width: 800,
            backgroundColor: canvasColour,
            selection: false,
            renderOnAddRemove: true,
        })
    );

    function addTextToCanvas(e) {
        let textBox = new fabric.IText("I'm a text piece", {
            left: 100,
            top: 100,
            fontSize: 20,
            fontStyle: fontstyle,
            fontFamily: 'sans-serif'
        });
        canvas.current.add(textBox);
    }

    function addHorizontalLine(e) {
        canvas.current.add(new fabric.Line([300, 250, 100, 250], {
            left: 170,
            top: 150,
            stroke: 'black'
        }));
    }

    function addVerticalLine(e) {
        canvas.current.add(new fabric.Line([250, 100, 250, 300], {
            left: 170,
            top: 150,
            stroke: 'black'
        }));
    }


    function importFromJson(e) {
        axios.get('http://localhost:8080/v1/events/json/')
            .then(response => {
                canvas.current.loadFromJSON(response.data);
                setCanvasState(response.data);
            });
    }

    function exportToJson(e) {
        console.log(JSON.stringify(canvas.current))
    }

    function submitURL(e) {
        let url = document.getElementById("input").value;
        fabric.Image.fromURL(
            url,
            function (img) {
                var oImg = img.set({ left: 50, top: 100 }).scale(0.9);
                canvas.current.add(oImg).renderAll();
            },
            { crossOrigin: "anonymous" }
        );
    }

    function convertToImg(e) {
        //   const svg = canvas.current.toSVG();
        setDownloadLink(canvas.current.toDataURL({
            format: "png"
        }));

        setDownloadName("canvas.png");
    }

    function showAsHTML(e) {
        const svg = canvas.current.toSVG();
        console.log(svg);
    }

    function changeColour(e, colour) {
        canvas.current.set('backgroundColor', colour).renderAll()
    }

    function makeItalic(e) {
        setFontstyle('italic')
    }

    function makeOblique(e) {
        setFontstyle('oblique')
    }

    function showActiveElement(e) {
        console.log(canvas.current.getActiveObject())
    }

    function deleteElement(e) {
        canvas.current.remove(canvas.current.getActiveObject());
    }

    function handleRadio(e) {
        console.log(e)
    }

    function handleDivChange(e) {
        if (e.target.id == "normal") {
            setFontstyle('normal')
        } else {
            setFontstyle('italic')
        }
    }

    return (
        <>
            <div ref={ref}>
                <canvas id="canvas" />
                <button onClick={addTextToCanvas}>Add Text</button>
                <button onClick={importFromJson}>Import</button>
                <button onClick={exportToJson}>Export</button>
            </div>
            <form>
                <label>Enter Image Url here : </label>
                <input id="input"></input>
                <button onClick={submitURL} type="button">Add Image With Url</button>
            </form>
            <a href={downloadLink} download={downloadName} onClick={convertToImg}>Print As Image</a>
            <button onClick={showAsHTML}>Show as HTML</button>
            <br />

            <ColourButton onClick={(e) => changeColour(e, '#f55')} />
            <button onClick={addHorizontalLine}>Add Horizontal Line</button>
            <button onClick={addVerticalLine}>Add Vertical Line</button>

            <button onClick={makeItalic}>Italic</button>
            <button onClick={makeOblique}>Oblique</button>
            <button onClick={showActiveElement}>Show active element</button>
            <button onClick={deleteElement}>Delete Element</button>

            <div onChange={handleDivChange}>
                <input type="radio" id="normal" name="contact" value="normal" onchange={handleRadio} />
                <label for="normal">Normal</label>

                <input type="radio" id="italic" name="contact" value="italic" onchange={handleRadio} />
                <label for="italic">Italic</label>
            </div>
        </>
    );
}

export default EditableCanvas;
