This is my repo for Advent of Code 2021. I'm doing it in TypeScript this year.

https://adventofcode.com/2021

### How to use this

This repo provides a handful of scripts that can set up (and run) your AOC problems.

#### Setting up a problem

To set up a problem for a given day, you can use `yarn run setup $dayNum`.

This will create `data/day<num>/input.txt` and `data/day<num>/test.txt`, the real and example data files, respectively. To populate these, you can just copy + paste the data directly from AOC (the example data is in the problem itself, the real data is linked from the main file).

This will also create `problems/day<num>/part1.ts` and `problems/day<num>/part2.ts`, the files for parts 1 and 2, respectively. These are scaffolded with `findSolution` and `solvePart` methods, which are required by this framework. `findSolution` is where your solution should go. It will be given the input file as an array of strings, delimited by line. The file it gets the data from depends on whether the `test` flag that is passed into `runTest` is `true` or `false`; `true` will load the example data, `false` will load the real data.

#### Testing your solution

Once implemented, you can test your solution by running `yarn run day <num>`. This will build and run both parts of the solution for each day and will print the results. By default (e.g. if you didn't try to solve this part of the problem yet), this will return `-1`.
