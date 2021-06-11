import Point from "../interface/Point";
import processArg, { verboseLog } from "./processArg";
import os from "os";
import fs from "fs";

export default function saveData (A: Point[], B: Point[]): void {
  const outputFile = processArg("out");
  const ALength = A.length;
  const APrinted = printPoints(A);
  const BPrinted = printPoints(B);

  verboseLog("Size of A: " + ALength);
  fs.writeFileSync(outputFile, [ALength, APrinted, BPrinted].join(os.EOL));
}

function printPoints (points: Point[]): string {
  return points.map((point: Point) => `${point.x} ${point.y} ${point.z}`).join(os.EOL);
}
