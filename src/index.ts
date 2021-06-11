import getData from "./utils/getData";
import InputData from "./interface/InputData";
import AdjacencyMatrix from "./class/AdjacencyMatrix";
import Laplacian from "./class/Laplacian";
import GraphBisection from "./class/GraphBisection";
import PointBisection from "./interface/PointBisection";
import { verboseLog } from "./utils/processArg";
import saveData from "./utils/saveData";

(async () => {
  const { points, n, dist }: InputData = getData();
  const adjacencyMatrix = new AdjacencyMatrix(points, dist);
  verboseLog("Adjacency Matrix ready...");
  const laplacian = new Laplacian(n, adjacencyMatrix);
  verboseLog("Laplacian & Fiedler eigen system determined...");
  const graphBisection = new GraphBisection(n, laplacian, points);
  const { A, B }: PointBisection = graphBisection.pointBisection;
  const lowerBoundary = graphBisection.edgesLowerBoundary;
  if (lowerBoundary < 1)
    throw new Error(
      `Lower boundary for amount of edges between bisected graphs is ${lowerBoundary}, which is lower than 1! Aborting...`
    );
  console.log("Amount of edges between A and B: ", graphBisection.amountOfEdges(adjacencyMatrix));
  console.log("Theoretical lower boundary for the amount of edges between A and B: ", lowerBoundary);
  saveData(A, B);
})();
