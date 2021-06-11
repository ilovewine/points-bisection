import * as math from "mathjs";
import Point from "../interface/Point";
import euclideanMetric from "../utils/euclideanMetric";
import { generateArray0th } from "../utils/generateArray";

export default class AdjacencyMatrix {
  matrix: math.Matrix | math.MathArray;
  degrees: number[];

  constructor (private points: Point[], private dist: number) {
    const adjacency: number[][] = generateArray0th(points.length).map(() =>
      generateArray0th(points.length).map(() => 0)
    );
    for (let i = 0; i < points.length; ++i) {
      for (let j = i + 1; j < points.length; ++j) {
        if (euclideanMetric(points[i], points[j]) <= dist) {
          adjacency[i][j] = adjacency[j][i] = 1;
        }
      }
    }
    if (adjacency.every((row) => !row.includes(1))) throw new Error("Impossible to bisect!");
    this.degrees = [];
    adjacency.forEach((row) => {
      const degree: number = row.reduce((acc, current) => acc + current);
      this.degrees.push(degree);
    });
    this.matrix = math.matrix(adjacency);
  }
}
