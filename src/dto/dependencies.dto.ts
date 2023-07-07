export class DependenciesDto {
  filters: Array<NodeFilterGraph> = [];
  graph: Graph = new Graph();
  elements: Elements = new Elements();
  tasks = [];
}
export class NodeFilterGraph {
  name: string = "";
  color: string = "";
  background: string = "";
}

class Elements {
  nodes: Array<NodeDto> = [];
  edges: Array<EdgeDto> = [];
}
export class NodeDto {
  data: NodeData = new NodeData();
}

class NodeData {
  name: string;
  id: number;
  folder: string=" ";
}

export class EdgeDto {
  data: EdgeData = new EdgeData();
}

class EdgeData {
  source: number;
  target: number;
}

class Graph {
  name: string = "";
}
