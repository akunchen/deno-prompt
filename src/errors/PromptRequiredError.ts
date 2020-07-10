import PromptError from "./PromptError.ts";

export default class PromptRequiredError extends PromptError {

    constructor() {
        super("required");
    }
}