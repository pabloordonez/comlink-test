import { drawMandelbrot } from "./mandelbrot.js";

export function render()
{
    const canvases = document.querySelectorAll("canvas");
    canvases.forEach(x => document.body.removeChild(x));

    console.time('mandelbrot without web worker');
    const width = 1200;
    const height = 1200;

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    document.body.appendChild(canvas);
    const context = canvas.getContext('2d');
    const imageData = context.createImageData(width, height);
    const color = drawMandelbrot(-2, -2, 2, 2, width, height);
    let pixelCoords = 0;

    for (let i = 0; i < color.length; i += 3)
    {
        imageData.data[pixelCoords++] = color[i];
        imageData.data[pixelCoords++] = color[i + 1];
        imageData.data[pixelCoords++] = color[i + 2];
        imageData.data[pixelCoords++] = 255;
    }

    context.putImageData(imageData, 0, 0);
    console.timeEnd('mandelbrot without web worker');
}