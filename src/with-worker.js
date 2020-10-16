import * as Comlink from "./comlink.esm.js";

const drawMandelbrot = Comlink.wrap(new Worker("./src/worker.js", { type: 'module' }));

async function renderPart(xFrom, yFrom, xTo, yTo, width, height, cFrom, imageData)
{
    return new Promise((resolve) => drawMandelbrot(xFrom, yFrom, xTo, yTo, width, height, Comlink.proxy((colors) =>
    {
        for (let i = 0; i < colors.length; i += 3)
        {
            imageData.data[cFrom + i] = colors[i];
            imageData.data[cFrom + i + 1] = colors[i + 1];
            imageData.data[cFrom + i + 2] = colors[i + 2];
            imageData.data[cFrom + i + 3] = 255;
            cFrom++;
        }

        resolve();
    })));
}

export async function render()
{
    const canvases = document.querySelectorAll("canvas");
    canvases.forEach(x => document.body.removeChild(x));

    console.time('mandelbrot with web worker');
    const width = 2000;
    const height = 2000;
    const threads = 4;
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    document.body.appendChild(canvas);
    const context = canvas.getContext('2d');
    const imageData = context.createImageData(width, height);
    const promises = [];

    const xFrom = -2;
    const xTo = 2;
    let yFrom = -2;
    let yTo = 2;
    let yInc = (yTo - yFrom) / threads;
    let ht = height / threads;
    let cFrom = 0;
    let cInc = width * ht * 4;

    for (let i = 0; i < threads; i++)
    {
        promises.push(renderPart(xFrom, yFrom, xTo, yFrom + yInc, width, ht, cFrom, imageData));
        yFrom += yInc;
        cFrom += cInc;
    }

    await Promise.all(promises);
    context.putImageData(imageData, 0, 0);
    console.timeEnd('mandelbrot with web worker');
}