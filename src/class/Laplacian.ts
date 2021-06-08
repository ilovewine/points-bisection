import AdjacencyMatrix from "./AdjacencyMatrix";
import * as math from "mathjs";

export default class Laplacian {
  matrix: math.Matrix;

  constructor (adjacency: AdjacencyMatrix) {
    const D = math.diag(adjacency.degrees);
    this.matrix = math.matrix(math.add(D, math.multiply(-1, adjacency.matrix))["_data"]);
  }

  get FiedlerVector () {
    const eigenSystem = math.eigs(this.matrix);
    const eigenValues = eigenSystem.values["_data"];
    const spectrum = new Map(
      eigenValues.map((eigenvalue) => [eigenvalue, eigenValues.filter((x) => x === eigenvalue).length])
    );
    const FiedlerValuesIndex = +[...spectrum.values()].slice(0, 1)[0];
    return eigenSystem.vectors["_data"][FiedlerValuesIndex];
  }
}
