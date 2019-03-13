import { TestResult } from "./class.ts";

function header(r: TestResult): string[] {
  const out = [];
  out.push('---------------------------------------------------')
  out.push('File                     | Branch | Funcs | Lines |')
  out.push('-------------------------|--------|-------|-------|')
  return out;
}
function footer(r: TestResult): string[] {
  const out = [];
  out.push('-------------------------|--------|-------|-------|')
  out.push('                         |--------|-------|-------|')
  out.push('-------------------------|--------|-------|-------|')
  return out;
}

export function render(r: TestResult): void {
    let out = []
    out = out.concat(header(r))
    // TODO gen report
    out = out.concat(footer(r))
    console.log(out.join('\n'))
}
