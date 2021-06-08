import getData from "./utils/getData";
import InputData from "./interface/InputData";
import process from "process";
import AdjacencyMatrix from "./class/AdjacencyMatrix";
import Laplacian from "./class/Laplacian";

(async () => {
  const fileArg = process.argv.filter((arg) => arg.includes("--file="))[0];
  if (!fileArg) throw new Error("No file given, please try `npm start -- --file=\"{filename}\"`");
  const filename = fileArg.replace("--file=", "");
  const { points, n, dist }: InputData = getData(filename);
  const adjacencyMatrix = new AdjacencyMatrix(points, dist);
  const laplacian = new Laplacian(adjacencyMatrix);
  console.log(laplacian.FiedlerVector);
})();
