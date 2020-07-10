import BasePromptComponent from "./BasePromptComponent.ts";
import PromptParams from "../models/PromptParams.ts";
import PromptError from "../errors/PromptError.ts";

export interface NumberParams extends PromptParams {
    max?: number;
    min?: number;
}

export default class NumberComponent extends BasePromptComponent<NumberParams>{

    protected max: number;
    protected min: number;

    constructor(params: NumberParams) {
        super(params);

        this.max = params.max ?? Number.MAX_SAFE_INTEGER;
        this.min = params.min ?? Number.MIN_SAFE_INTEGER;
    }

    protected get range() {
        if (this.max === Number.MAX_SAFE_INTEGER) {
            return this.min === Number.MIN_SAFE_INTEGER ? '' : `(>=${this.min})`;
        } else {
            return this.min === Number.MIN_SAFE_INTEGER ? `(<=${this.max})` : `(${this.min}-${this.max})`;
        }
    }

    protected selfValidate(input: string) {
        if (!/^\s*(-)?\d+\s*$/.test(input)) {
            throw new PromptError('not a number');
        }

        const result = this.parseResult(input);
        if (result > this.max || result < this.min) {
            throw new PromptError("not int range: " + this.range);
        }
    }

    protected parseResult(input: string) {
        return Number(input.replace(/\s+/g, ''));
    }

}