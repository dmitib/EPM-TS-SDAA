import { Point } from "./Point";

export abstract class Shape {
    abstract getType(): string;

    constructor(points: Point[]);
    constructor(points: Point[], color: string, filled: boolean);
    constructor(
        protected points: Point[],
        protected color: string = "green",
        protected filled: boolean = true
    ) {
        if (points.length < 3) {
            throw new Error("points array less than 3");
        }

        this.color = color
        this.filled = filled
        this.points = points;
    };

    public toString(): string {
        let processedPoints = this.addSpace(this.points);

        return `A Shape with color of ${this.color} and ${!this.filled ? "not " : ""}filled. Points:${processedPoints}.`
    }

    public getPerimeter(): number {
        let lastPoint: Point = this.points[this.points.length - 1];

        return lastPoint.x * lastPoint.y;
    }

    public addSpace(points: Point[]): string[] {
        return points.map(point => ` (${point.x}, ${point.y})`);
    }
}
