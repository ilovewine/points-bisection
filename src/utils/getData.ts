import InputData from "../interface/InputData";
import fs from "fs";
import os from "os";
import Point from "../interface/Point";

export default function getData (filename: string): InputData {
  const data = fs.readFileSync(filename).toString().split(os.EOL);
  const n: number = parseInt(data[0]);
  const dist: number = parseFloat(data[1]);
  const points: Point[] = data
    .slice(2)
    .map((pointString: string) => pointString.split(" ").map((el: string) => parseFloat(el)))
    .map((point) => ({ x: point[0], y: point[1], z: point[2] }));
  return {
    n,
    dist,
    points
  };
}
