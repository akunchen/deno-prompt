import PromptAnswers from "./PromptAnswers.ts";

export default interface PromptParams {
    name: string;
    type: string;
    message?: string;
    defaultValue?: any;
    validate?: (result: string) => void | Promise<void>; // throw new PromptError("error message");
    /**
     * returns true or Promise<true> to show this prompt
     */
    when?: (answers: PromptAnswers) => boolean | Promise<boolean>;
}