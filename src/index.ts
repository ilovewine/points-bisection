import getData from "./utils/getData";
import InputData from "./interface/InputData";
import process from "process";
import AdjacencyMatrix from "./class/AdjacencyMatrix";

(async () => {
  const filename = process.argv.filter((arg) => arg.includes("--file="))[0].replace("--file=", "");
  const { points, n, dist }: InputData = getData(filename);
  const adjacencyMatrix = new AdjacencyMatrix(points, dist);
  console.log(adjacencyMatrix);
})();
