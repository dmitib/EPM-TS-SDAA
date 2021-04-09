export class Point {
    public x: number;
    public y: number;

    constructor(x: number, y: number) {
        this.x = x || 0;
        this.y = y || 0;
    }

    public toString(): string {
        return `(${this.x}, ${this.y})`
    }

    public distance(xOrPoint?: number | Point): number;
    public distance(xOrPoint?: number | Point, y?: number): number;
    public distance(xOrPoint?: number | Point, y?: number): number {
        if (xOrPoint instanceof Point) {
            return xOrPoint.distance(this.x, this.y);
        }

        return  Math.round(Math.sqrt((this.y ** 2) + (this.x ** 2)));
    }
}
