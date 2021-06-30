import { Queue } from './Queue';

const count = 1000;
let time = performance.now();
const q = new Queue((task, callback) => {
	console.log('Run ' + task.priority);
	callback();
});

for (let i = 0; i <= count; i++) { 
	const priority = Math.round(Math.random() * count);
	q.push([{ priority }], priority, () => {
		console.log(`Finished processing task ${i} with priority ${priority}`);
	});
}

q.drain = () => {
	console.log('All items have been processed');
	time = performance.now() - time;
	console.log('Spent time =', Math.floor(time), 'ms');
};