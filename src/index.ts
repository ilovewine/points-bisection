import getData from "./utils/getData";
import InputData from "./interface/InputData";
import process from "process";

(async () => {
  const filename = process.argv.filter((arg) => arg.includes("--file="))[0].replace("--file=", "");
  const inputData: InputData = getData(filename);
  console.log(inputData);
})();
