export type Graph = { [key: string]: any };

type Results = {
  distance: number;
  path: Array<string>;
};

export class ShortestPath {
  private readonly distances: Graph = {};
  private readonly graph: Graph;
  private readonly startNode: string;
  private readonly endNode: string;
  private node: string | null;
  private parents: Graph = { endNode: null };
  private visited: Array<string> = [];

  constructor(graph: Graph, startNode: string, endNode: string) {
    this.startNode = startNode;
    this.endNode = endNode;
    this.graph = graph;

    this.distances[endNode] = "Infinity";
    this.distances = Object.assign(this.distances, graph[startNode]);

    for (let child in graph[startNode]) {
      this.parents[child] = startNode;
    }

    this.node = this.shortestDistanceNode(this.distances, this.visited);
    this.findPath();
  }

  private shortestDistanceNode(distances: Graph, visited: Array<string>) {
    let shortest = null;

    for (let node in distances) {
      let currentIsShortest =
        shortest === null || distances[node] < distances[shortest];
      if (currentIsShortest && !visited.includes(node)) {
        shortest = node;
      }
    }
    return shortest;
  }

  private findPath() {
    while (this.node) {
      let distance = this.distances[this.node];
      let children = this.graph[this.node];

      for (let child in children) {
        if (String(child) === String(this.startNode)) {
          console.log("don't return to the start node!");
          continue;
        } else {
          console.log("startNode: " + this.startNode);
          console.log("distance from node " + this.parents[this.node] + " to node " + this.node + ")");
          console.log("previous distance: " + this.distances[this.node]);

          let newdistance = distance + children[child];

          if (!this.distances[child] || this.distances[child] > newdistance) {
            this.distances[child] = newdistance;
            this.parents[child] = this.node;
          }
        }
      }

      this.visited.push(this.node);
      this.node = this.shortestDistanceNode(this.distances, this.visited);
    }

    let shortestPath = [this.endNode];
    let parent = this.parents[this.endNode];

    while (parent) {
      shortestPath.push(parent);
      parent = this.parents[parent];
    }

    shortestPath.reverse();

    const results: Results = {
      distance: this.distances[this.endNode],
      path: shortestPath,
    };

    console.log(results);
  }
}