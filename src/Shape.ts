import { Point } from "./Point";

export abstract class Shape {
    protected color: string; 
    protected filled: boolean;
    protected points: Point[];

    abstract getType(): string;

    constructor();
    constructor(points: Point[], color: string, filled: boolean);
    constructor(points?: Point[], color?: string, filled?: boolean) {
        if (points.length < 3) {
            throw new Error("points array less than 3");
        }

        this.color = color || "green";
        this.filled = filled ?? true;
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
        let result: string;
        let acc: string[] = [];

        points.forEach(point => {
            result = ` (${point.x}, ${point.y})`;
            acc.push(result);
        });

        return acc;
    }
}
