import InputData from "../interface/InputData";
import fs from "fs";
import os from "os";

export default function getData (filename: string): InputData {
  const data = fs.readFileSync(filename).toString().split(os.EOL);
  const n = parseInt(data[0]);
  const dist = parseFloat(data[1]);
  const points = data
    .slice(2)
    .map((pointString: string) => pointString.split(" ").map((el: string) => parseFloat(el)));
  return {
    n,
    dist,
    points
  };
}
