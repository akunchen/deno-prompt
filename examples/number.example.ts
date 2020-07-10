#!/usr/bin/env deno run
import Prompt from "../mod.ts";

const answers = await Prompt.prompts([
    { type: "number", name: 'num1' },
    { type: "number", name: 'num2', min: 1 },
    { type: "number", name: 'num3', min: 1, max: 10 },
]);

console.log(answers);