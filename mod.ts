const { readFileSync } = Deno;
// http://ltp.sourceforge.net/coverage/lcov/geninfo.1.php
const END = "end_of_record";
const regFN = /([a-zA-Z_0-9]*)/g;
enum start {
  // Test Name
  TN = "TN",
  // <line number of function start>,<function name>
  FN = "FN",
  // Absolute path to source file
  SF = "SF",
  // <number of functions found>
  FNF = "FNF",
  // <number of functions hit>
  FNH = "FNH",
  // <number of instrumented lines>
  LF = "LF",
  // <number of lines with a non-zero execution count>
  LH = "LH",
  // <line number>,<execution count>[,<checksum>]
  DA = "DA",
  // <execution count>,<function name>
  FNDA = "FNDA",
  // <line number>,<block number>,<branch number>,<taken>
  BRDA = "BRDA",
  // <number of branches found>
  BRF = "BRF",
  // <number of branches hit>
  BRH = "BRH"
}
class Detail {
  line: number;
  hit: number;
}
class FnDetail extends Detail {
  name: string;
}
class ResultContent {
  hit: number;
  found: number;
}
class StdResultContent extends ResultContent {
  details: Detail[];
}
class FnResultContent extends ResultContent {
  details: FnDetail[];
}
class Coverage {}
export class TestResult {
  testName: string;
  src: string;
  functions: FnResultContent = new FnResultContent();
  fnDetail: Object = {};
  lnDetail: Object = {};
  lines: StdResultContent = new StdResultContent();
  branches: StdResultContent = new StdResultContent();
  coverage: Coverage;
  genCoverage() {
    delete this.fnDetail;
    delete this.lnDetail;
  }
}

function getLcovData(path: string): string[] {
  const lcovData = readFileSync("./test/lcov.info");
  const dec = new TextDecoder("utf-8");
  return dec.decode(lcovData).split("\n");
}

export function parse(path: string): TestResult[] {
  const arrLcovData = getLcovData(path);
  const result: TestResult[] = [];
  const l = arrLcovData.length;
  let cT = new TestResult();
  for (let i = 0; i < l; i++) {
    const line = arrLcovData[i];
    if (line === END) {
      cT.genCoverage();
      result.push(cT);
      cT = new TestResult();
    }
    const header = line.split(":")[0];
    const value = line.substring(header.length + 1);
    switch (header) {
      case start.TN:
        cT.testName = value;
        break;
      case start.FN:
        let match = value.match(regFN);
        cT.fnDetail[match[3]] = { line: match[0], name: match[3] };
        break;
      case start.SF:
        cT.src = value;
        break;
      case start.FNF:
        cT.functions.found = Number(value);
        break;
      case start.FNH:
        cT.functions.hit = Number(value);
        break;
      case start.LH:
        cT.lines.hit = Number(value);
        break;
      case start.LF:
        cT.lines.found = Number(value);
        break;
      case start.DA:
        let d = value.split(",");
        cT.lnDetail[d[0]] = { line: d[0], count: d[1] };
        break;
      case start.FNDA:
        let m = value.match(regFN);
        cT.fnDetail[m[3]].execution = m[0];
        break;
      case start.BRDA:
        // TODO
        break;
      case start.BRF:
        cT.branches.found = Number(value);
        break;
      case start.BRH:
        cT.branches.hit = Number(value);
        break;
    }
  }
  console.log(JSON.stringify(result));
  return result;
}
