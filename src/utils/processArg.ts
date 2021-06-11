import process from "process";

export default function processArg (...flags: string[]): string {
  const existing = flags
    .map((flag) => {
      const string = process.argv.filter((arg) => arg.includes(`-${flag}`) || arg.includes(`--${flag}`))[0];
      return string ? string.substring(string.indexOf("=") + 1) : string;
    })
    .filter((el) => el != null);
  return existing[0];
}

export function verboseLog (...args: any[]): void {
  const verbose = processArg("verbose", "v");
  if (verbose) args.forEach((arg) => console.log(arg));
}
