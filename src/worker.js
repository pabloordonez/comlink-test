import * as Comlink from "./comlink.esm.js";
import { drawMandelbrot } from "./mandelbrot.js";

function render(xFrom, yFrom, xTo, yTo, width, height, onComplete)
{
    onComplete(drawMandelbrot(xFrom, yFrom, xTo, yTo, width, height));
}

Comlink.expose(render);