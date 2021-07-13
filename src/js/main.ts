import {ShortestPath, Graph} from './ShortestPath';

let graph: Graph = {
  start: { A: 5, B: 2 },
  A: { start: 1, C: 4, D: 2 },
  B: { A: 8, D: 7 },
  C: { D: 6, end: 3 },
  D: { end: 1 },
  end: {},
};

new ShortestPath(graph, "start", "end");
new ShortestPath(graph, "A", "B");
new ShortestPath(graph, "A", "start");