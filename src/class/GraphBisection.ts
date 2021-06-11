import Point from "../interface/Point";
import PointBisection from "../interface/PointBisection";
import * as math from "mathjs";
import { verboseLog } from "../utils/processArg";
import AdjacencyMatrix from "./AdjacencyMatrix";
import Laplacian from "./Laplacian";

export default class GraphBisection {
  median: number;
  remainingPoints: Point[] = [];
  ALength: number = 0;
  BLength: number = 0;

  constructor (private n: number, private laplacian: Laplacian, private points: Point[]) {
    this.median = math.median(laplacian.FiedlerVector);
    verboseLog("Median: " + this.median);
  }

  get pointBisection (): PointBisection {
    let A: Point[] = [];
    let B: Point[] = [];
    for (let i = 0; i < this.laplacian.FiedlerVector.length; ++i) {
      if (this.laplacian.FiedlerVector[i] < this.median) A.push(this.points[i]);
      else if (this.laplacian.FiedlerVector[i] > this.median) B.push(this.points[i]);
      else this.remainingPoints.push(this.points[i]);
    }
    if (this.remainingPoints.length) {
      const pivot = math.floor(this.remainingPoints.length / 2);
      A = A.concat(this.remainingPoints.slice(0, pivot));
      B = B.concat(this.remainingPoints.slice(pivot, this.remainingPoints.length));
    }
    this.ALength = A.length;
    this.BLength = B.length;
    return { A, B };
  }

  get edgesLowerBoundary (): number {
    return (this.laplacian.FiedlerValue * this.ALength * this.BLength) / this.n;
  }

  amountOfEdges (adjacency: AdjacencyMatrix): number {
    const remainingPointsIndexes = [];
    const min = this.laplacian.FiedlerVector.map((el, index) => {
      if (el < this.median) return 1;
      if (el > this.median) return -1;
      remainingPointsIndexes.push(index);
    });
    if (remainingPointsIndexes.length) {
      const pivot = math.floor(this.remainingPoints.length / 2);
      remainingPointsIndexes.map((el, index) => (el[index] = index <= pivot ? 1 : -1));
    }
    let sum = 0;
    for (let i = 0; i < this.n; ++i) {
      for (let j = i + 1; j < this.n; ++j) {
        if (math.subset(adjacency.matrix, math.index(i, j))) {
          sum += (min[i] - min[j]) ** 2;
        }
      }
    }
    return sum / 4;
  }
}
