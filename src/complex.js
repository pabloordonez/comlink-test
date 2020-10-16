export class Complex
{
    constructor(real = 0, imaginary = 0)
    {
        this.real = real;
        this.imaginary = imaginary;;
    }

    getMagnitude()
    {
        return Math.sqrt(this.real * this.real + this.imaginary * this.imaginary);
    }

    getAngle()
    {
        return Math.atan2(this.imaginary, this.real);
    }

    add(another)
    {
        return new Complex(this.real + another.real, this.imaginary + another.imaginary);
    }

    sub(another)
    {
        return new Complex(this.real - another.real, this.imaginary - another.imaginary);
    }

    mult(another)
    {
        return new Complex(
            this.real * another.real - this.imaginary * another.imaginary,
            this.real * another.imaginary + this.imaginary * another.real
            );
    }

    copy() {
        return new Complex(this.real, this.imaginary);
    }
}