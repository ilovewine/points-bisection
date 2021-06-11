import AdjacencyMatrix from "./AdjacencyMatrix";
import * as math from "mathjs";
import { verboseLog } from "../utils/processArg";

export default class Laplacian {
  matrix: math.Matrix;
  FiedlerVector: number[];
  FiedlerValue: number;

  constructor (private n: number, private adjacency: AdjacencyMatrix) {
    const D = math.diag(adjacency.degrees);
    this.matrix = math.matrix(math.add(D, math.multiply(-1, adjacency.matrix))["_data"]);
    const { vector, value } = this.determineFiedlerEigenSystem();
    this.FiedlerVector = vector.map((el) => el * math.sqrt(n));
    this.FiedlerValue = value;
  }

  determineFiedlerEigenSystem (): { vector: number[]; value: number } {
    console.log("Calculating eigensystem, this might take a while!");
    console.time("Eigensystem calculated in");
    const eigenSystem = math.eigs(this.matrix, 1);
    console.timeEnd("Eigensystem calculated in");
    verboseLog(eigenSystem);
    const eigenValues = eigenSystem.values["_data"];
    const spectrum = new Map(
      eigenValues.map((eigenvalue) => [eigenvalue, eigenValues.filter((x) => x === eigenvalue).length])
    );
    const FiedlerValueIndex = +[...spectrum.values()].slice(0, 1)[0];
    return {
      vector: math.column(eigenSystem.vectors, FiedlerValueIndex)["_data"].flat(),
      value: eigenValues[FiedlerValueIndex]
    };
  }
}