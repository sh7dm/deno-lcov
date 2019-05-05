import { pad } from "https://deno.land/std/strings/pad.ts";
import { TestResult, ResultContent } from "./class.ts";

function getPercent(rc: ResultContent): number {
  let l = 0;
  if (rc.found !== 0) {
    l = (rc.hit / rc.found) * 100;
  }
  return l;
}

function getGlobalPercent(r: TestResult[], type: string): number {
  return Math.trunc(
    (r
      .map((b): number => getPercent(b[type]))
      .reduce((acc, cv): number => acc + cv, 0) /
      (r.length * 100)) *
      100
  );
}

function header(): string[] {
  const out = [];
  out.push("---------------------------------------------------");
  out.push("File                     | Branch | Funcs | Lines |");
  out.push("-------------------------|--------|-------|-------|");
  return out;
}

function line(r: TestResult): string[] {
  const out = [];
  const file = pad(r.src, 25, {
    strictChar: "...",
    strictSide: "left",
    strict: true
  });
  const branch = pad(`${getPercent(r.branches)}%`, 7, {});
  const funcs = pad(`${getPercent(r.functions)}%`, 6, {});
  const lines = pad(`${getPercent(r.lines)}%`, 6, {});
  out.push(`${file}|${branch} |${funcs} |${lines} |`);
  return out;
}

function footer(r: TestResult[]): string[] {
  const out = [];
  const branches = pad(`${getGlobalPercent(r, "branches")}%`, 6, {});
  const functions = pad(`${getGlobalPercent(r, "functions")}%`, 5, {});
  const lines = pad(`${getGlobalPercent(r, "lines")}%`, 5, {});
  out.push("-------------------------|--------|-------|-------|");
  out.push(
    `Total                    | ${branches}% | ${functions}% | ${lines}% |`
  );
  out.push("-------------------------|--------|-------|-------|");
  return out;
}

export function render(r: TestResult[]): string {
  let out = [];
  out = out.concat(header());
  for (const result of r) {
    out.push(line(result));
  }
  out = out.concat(footer(r));
  return out.join("\n");
}
