import { Decorator } from "./decorator";

export class DoNotLeaveDecorator extends Decorator {
	public showMessage(): void {
		console.log("**MARK DO NOT LEAVE IF ADDRESS NOT AT HOME**");
	}
}