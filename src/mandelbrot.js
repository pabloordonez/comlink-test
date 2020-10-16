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

            const r = 1 - c.getMagnitude() / 3;
            const color1 = hslToRgb(x * magnitude * 0.015, .4, .5);
            const color2 = magnitude > 1.999 && magnitude <= 2.05 ? [1.1, 1.1, 1.1] : [0.9, 0.9, 0.9];
            const color3 = magnitude > 2 ? [1.1, 1.1, 1.1] : [0.9, 0.9, 0.9];

            colors[pixelCoords++] = color1[0] * color2[0] * color3[0] * r * 1.3 * 255;
            colors[pixelCoords++] = color1[1] * color2[1] * color3[1] * r * 1.3 * 255;
            colors[pixelCoords++] = color1[2] * color2[2] * color3[2] * r * 1.3 * 255;
        }
    }

    return colors;
}