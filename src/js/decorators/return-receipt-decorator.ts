import { Decorator } from "./decorator";

export class ReturnReceiptDecorator extends Decorator {
	public showMessage(): void {
		console.log("**MARK RETURN RECEIPT REQUESTED**");
	}
}