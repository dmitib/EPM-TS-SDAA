import { Point } from './Point';
import { Shape } from './Shape';

export class Triangle extends Shape {
    constructor();
    constructor(...args: Point[]) {
        let points = [...args];
        super(points, undefined, undefined);
    }

    toString(): string {
        return `Triangle[v1=${this.points[0]},v2=${this.points[1]},v3=${this.points[2]}]`;
    }

    getType(): string {
        let f1 = this.calcTriangleFacesLength([this.points[0].x, this.points[0].y], [this.points[1].x, this.points[1].y]);
        let f2 = this.calcTriangleFacesLength([this.points[1].x, this.points[1].y], [this.points[2].x, this.points[2].y]);
        let f3 = this.calcTriangleFacesLength([this.points[2].x, this.points[2].y], [this.points[0].x, this.points[0].y]);

        switch (true) {
            case f1 === f2 && f2 === f3:
                return "equilateral triangle";
                break;
            case f1 === f2 || f1 === f3 || f2 === f3:
                return "isosceles triangle";
                break;
            default:
                return "scalene triangle";
                break;
        }
    }

    private calcTriangleFacesLength(point1: number[], point2: number[]): number {
        return ~~Math.sqrt((point1[0] - point2[0])**2 + (point1[1] - point2[1])**2);
    }
}
