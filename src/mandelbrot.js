import { Complex } from "./complex.js";
import { hslToRgb } from "./color.js";

export function drawMandelbrot(xFrom, yFrom, xTo, yTo, width, height)
{
    let pixelCoords = 0;
    const xi = (xTo - xFrom) / width;
    const yi = (yTo - yFrom) / height;
    const colors = new Uint8Array(width * height * 3);

    for (let y = yFrom; y <= yTo; y += yi)
    {
        for (let x = xFrom; x <= xTo; x += xi)
        {
            let magnitude = 0;
            let c = new Complex(x, y);
            let z = new Complex(x, y);
            let i = 0;

            while (i < 100)
            {
                z = z.mult(z).add(c);
                magnitude = z.getMagnitude();

                if (magnitude > 2)
                    break;

                i++;
            }

            const color = hslToRgb(z.getAngle() / (Math.PI * 2), .4, .5);
            magnitude = magnitude % 255;

            colors[pixelCoords++] = color[0] * magnitude * 60;
            colors[pixelCoords++] = color[1] * magnitude * 60;
            colors[pixelCoords++] = color[2] * magnitude * 60;
        }
    }

    return colors;
}