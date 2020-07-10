import BasePromptComponent from "./BasePromptComponent.ts";
import PromptParams from "../models/PromptParams.ts";
import StringUtil from "../utils/StringUtil.ts";
import PromptError from "../errors/PromptError.ts";

export interface ConfirmParams extends PromptParams {
    yes?: string;
    no?: string;
}

export default class ConfirmComponent extends BasePromptComponent<ConfirmParams> {

    public yes: string;
    public no: string;
    public defaultValue: boolean;

    constructor(params: ConfirmParams) {
        super(params);

        this.yes = params.yes ?? 'y';
        this.no = params.no ?? 'n';
        this.defaultValue = Boolean(params.defaultValue) ?? true;
    }

    protected async readInput() {
        const input = await super.readInput();
        return input || (this.defaultValue ? this.yes : this.no);
    }

    protected get range() {
        if (this.defaultValue) {
            return `(${StringUtil.firstUpper(this.yes)}/${this.no})`;
        } else {
            return `(${this.yes}/${StringUtil.firstUpper(this.no)})`;
        }
    }

    protected selfValidate(input: string) {
        if (![this.yes, this.no].includes(input)) {
            throw new PromptError(`must be ${this.yes} or ${this.no}`);
        }
    }

    protected parseResult(input: string) {
        return input === this.yes;
    }
}