import PromptError from "./PromptError.ts";

export default class NoSuchPromptComponentError extends PromptError {

    constructor(type: string) {
        super(`No such component: ${type}, please use builtin types.`);
    }
}