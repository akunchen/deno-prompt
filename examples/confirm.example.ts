#!/usr/bin/env deno run
import Prompt from "../mod.ts";

const answers = await Prompt.prompts([
    { type: "confirm", name: 'p1' },
    { type: "confirm", name: 'p2', defaultValue: true },
    { type: "confirm", name: 'p3', yes: '是', no: '否' },
]);

console.log(answers);