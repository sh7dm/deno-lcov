import { test, runIfMain } from "https://deno.land/std/testing/mod.ts";
import { parse, render } from "./mod.ts";
import { TestResult } from "./class.ts";
import { assert, assertEquals } from "https://deno.land/std/testing/asserts.ts";
const { readFileSync } = Deno;

function GetLcov(): TestResult[] {
  const strLCOV = readFileSync("./test/lcov.info");
  const dec = new TextDecoder("utf-8");
  const lcovData = parse(dec.decode(strLCOV));
  return lcovData;
}

test({
  name: "[lcov] Parse",
  fn(): void {
    const lcovData = GetLcov();
    assertEquals(lcovData.length, 21);
    assert(lcovData[0].functions.found === 30);
    assert(lcovData[0].functions.hit === 30);
    assert(lcovData[0].lines.found === 124);
    assert(lcovData[0].lines.hit === 124);
    assert(lcovData[0].branches.found === 25);
    assert(lcovData[0].branches.hit === 25);
    assert(lcovData[0].coverage.branches === 100);
    assert(lcovData[0].coverage.functions === 100);
    assert(lcovData[0].coverage.lines === 100);
    assert(lcovData[0].testName === "FOOTEST");
    assert(lcovData[0].src === "FOOPATH\\src\\app\\app.js");
  }
});

test({
  name: "[lcov] Report",
  fn(): void {
    const lcovData = GetLcov();
    const returnString = render(lcovData);
    assert(returnString.length > 0);
  }
});
runIfMain(import.meta);
