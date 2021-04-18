export class Point {
    constructor(public x: number = 0, public y: number = 0) {}

    public toString(): string {
        return `(${this.x}, ${this.y})`
    }

    public distance(): number;
    public distance(xOrPoint: Point): number;
    public distance(xOrPoint: number, y: number): number;
    public distance(xOrPoint?: number | Point, y?: number): number {
        if (xOrPoint instanceof Point) {
            return xOrPoint.distance(this.x, this.y);
        }

        return  Math.round(Math.sqrt((this.y - y) ** 2 + (this.x -  xOrPoint) ** 2 ));
    }
}
