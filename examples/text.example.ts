#!/usr/bin/env deno run
import Prompt from "../mod.ts";
import PromptError from "../src/errors/PromptError.ts";

const answers = await Prompt.prompts([
    { type: "text", name: 'text1' },
    { type: "text", name: 'name', message: 'Please input your name: ' },
    {
        type: "text",
        name: 'sex',
        message: 'Please input your sex(male or female): ',
        validate(result: string) {
            if (!['male', 'female'].includes(result)) {
                throw new PromptError("input must be [male] or [female]");
            }
        }
    },
]);

console.log(answers);