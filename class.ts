class Detail {
  line: number;
  hit: number;
}
class FnDetail extends Detail {
  name: string;
}
export class ResultContent {
  hit: number;
  found: number;
}
class StdResultContent extends ResultContent {
  details: Detail[];
}
class FnResultContent extends ResultContent {
  details: FnDetail[];
}
class Coverage {
  branches: number;
  lines: number;
  functions: number;
}
export class TestResult {
  testName: string;
  src: string;
  functions: FnResultContent = new FnResultContent();
  // eslint-disable-next-line @typescript-eslint/ban-types
  fnDetail: Object = {};
  // eslint-disable-next-line @typescript-eslint/ban-types
  lnDetail: Object = {};
  lines: StdResultContent = new StdResultContent();
  branches: StdResultContent = new StdResultContent();
  coverage: Coverage = new Coverage();
  genCoverage(): void {
    if (this.branches.found !== 0) {
      this.coverage.branches = (this.branches.hit * 100) / this.branches.found;
    }
    if (this.functions.found !== 0) {
      this.coverage.functions =
        (this.functions.hit * 100) / this.functions.found;
    }
    if (this.lines.found !== 0) {
      this.coverage.lines = (this.lines.hit * 100) / this.lines.found;
    }
    delete this.fnDetail;
    delete this.lnDetail;
  }
}
