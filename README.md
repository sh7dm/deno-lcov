# Deno LCOV

A LCOV parser module for deno. usage:

```ts
import { parse, render } from "./mod.ts";
const { readFileSync } = Deno;
const strLCOV = readFileSync("./test/lcov.info");
const dec = new TextDecoder("utf-8");
const lcovData = parse(dec.decode(strLCOV)); // output the lcov object
const returnString = render(lcovData); // output the render string
```

Example of report:

```
---------------------------------------------------
File                     | Branch | Funcs | Lines |
-------------------------|--------|-------|-------|
   FOOPATH\src\app\app.js|   100% |  100% |  100% |
...pp\achievements\buy.js|   100% |  100% |  100% |
...\achievements\index.js|     0% |  100% |  100% |
...src\app\const\index.js|     0% |    0% |  100% |
...app\const\stageType.js|     0% |    0% |  100% |
...rc\app\models\event.js|     0% |  100% |  100% |
...p\models\eventStack.js|   100% |  100% |  100% |
...ls\stages\autoStage.js|   100% |  100% |  100% |
...s\stages\clickStage.js|     0% |  100% |  100% |
...rc\app\stages\click.js|     0% |    0% |  100% |
...\src\app\stages\cpp.js|     0% |    0% |  100% |
...\app\stages\fortran.js|     0% |    0% |  100% |
...\app\stages\haskell.js|     0% |    0% |  100% |
...src\app\stages\html.js|     0% |    0% |  100% |
...rc\app\stages\index.js|     0% |    0% |  100% |
...src\app\stages\java.js|     0% |    0% |  100% |
...H\src\app\stages\js.js|     0% |    0% |  100% |
...\src\app\stages\net.js|     0% |    0% |  100% |
...c\app\stages\python.js|     0% |    0% |  100% |
...src\app\stages\ruby.js|     0% |    0% |  100% |
...rc\app\utils\logger.js|   100% |  100% |  100% |
-------------------------|--------|-------|-------|
Total                    |    23% |   38% |  100% |
-------------------------|--------|-------|-------|
```
