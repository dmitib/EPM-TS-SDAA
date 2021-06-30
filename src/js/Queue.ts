type Task = { [key: string]: number };

type ItemQueue = {
	data: Task;
	priority: number;
	callback: Function;
};

export class Queue {
	public drain: Function = null;
	private readonly worker: Function;
	private workers: number = 0;
	private tasks: Array<ItemQueue> = [];
	private started: boolean = false;

	constructor(worker: (data: Task, callback: Function) => void) {
		this.worker = worker;
	}

	public push(data: Array<Task>, priority: number, callback: Function) {
		if (!this.started) {
			this.started = true;
		}

		if (data.length === 0) {
			return setTimeout(() => {
				if (this.drain) this.drain();
			});
		}

		data.forEach((task) => {
			let item: ItemQueue = {
				data: task,
				priority: priority,
				callback: callback,
			};
			this.tasks.splice(this.binarySearch(this.tasks, item) + 1, 0, item);

			setTimeout(() => {
				this.process();
			});
		});
	}

	private compareTasks(a: ItemQueue, b: ItemQueue) {
		return a.priority - b.priority;
	}

	private binarySearch(sequence: Array<ItemQueue>, item: ItemQueue) {
		let beg = -1;
		let end = sequence.length - 1;

		while (beg < end) {
			let mid = beg + ((end - beg + 1) >>> 1);

			if (this.compareTasks(item, sequence[mid]) >= 0) {
				beg = mid;
			} else {
				end = mid - 1;
			}
		}

		return beg;
	}

	private only_once = (task: { callback: { apply: (arg0: any, arg1: any) => void; }; }) => {
		let called = false;
		return (...arg: any) => {
			if (called) throw new Error("Callback was already called.");
			called = true;
			this.workers -= 1;

			if (task.callback) {
				task.callback.apply(task, arg);
			}

			if (this.drain && this.tasks.length + this.workers === 0) {
				this.drain();
			}

			this.process();
		};
	};

	private process() {
		if (this.workers < this.tasks.length) {
			const task = this.tasks.shift();
			this.workers++;
			const cb = this.only_once(task);

			this.worker(task.data, cb);
		}
	}
}