import PromptParams from "../models/PromptParams.ts";
import ConsoleHelper from "../utils/ConsoleHelper.ts";
import { Colors } from "../deps.ts";
import PromptError from "../errors/PromptError.ts";
import PromptRequiredError from "../errors/PromptRequiredError.ts";
import StringUtil from "../utils/StringUtil.ts";

export default class BasePromptComponent<P extends PromptParams> {

    protected name: string;
    protected message: string;
    protected defaultValue?: any;
    protected validate: (result: any) => void | Promise<void>; // throw new PromptError("error message");

    constructor(params: P) {
        this.name = params.name;
        this.message = params.message ?? StringUtil.firstUpper(this.name);
        this.defaultValue = params.defaultValue;
        this.validate = params.validate ?? ((result: any) => { });
    }

    protected get range() {
        return '';
    }

    protected get prefix() {
        const suffix = this.range ? ' ' + Colors.yellow(this.range) : '';
        return `${Colors.green("?")} ${this.message}${suffix}: `;
    }

    protected printPrefix() {
        ConsoleHelper.write(this.prefix);
    }

    protected whenCatchError(e: PromptError): any {
        ConsoleHelper.clearLine();
        this.printPrefix();
        ConsoleHelper.writeln(Colors.red(e.message));
        return this.action();
    }

    protected async readInput() {
        return await ConsoleHelper.readInput();
    }

    protected selfValidate(input: string) {

    }

    protected parseResult(input: any): any {
        return input;
    }

    protected async action() {
        try {
            this.printPrefix();
            const input = await this.readInput();
            if (!input) throw new PromptRequiredError();

            await this.validate(input);
            await this.selfValidate(input);

            ConsoleHelper.clearLine();
            this.printPrefix();
            const result = this.parseResult(input)
            ConsoleHelper.writeln(Colors.green("" + result));
            return result;
        } catch (e) {
            if (e instanceof PromptError) {
                return this.whenCatchError(e);
            }

            throw e;
        }
    }

    static async run<P extends PromptParams>(args: P) {
        const component: BasePromptComponent<P> = new this(args);
        return await component.action();
    }

}