import { Decorator } from "./decorator";

export class FragileDecorator extends Decorator {
	public showMessage(): void {
		console.log("**MARK FRAGILE**");
	}
}