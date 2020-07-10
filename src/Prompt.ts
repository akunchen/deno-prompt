import PromptParams from "./models/PromptParams.ts";
import TextComponent from "./components/TextComponent.ts";
import NoSuchPromptComponentError from "./errors/NoSuchPromptComponentError.ts";
import PromptAnswers from "./models/PromptAnswers.ts";
import NumberComponent, { NumberParams } from "./components/NumberComponent.ts";
import ConfirmComponent, { ConfirmParams } from "./components/ConfirmComponent.ts";

export interface PromptComponent<P extends PromptParams = PromptParams, R = any> {
    run(args: P): R;
}

export default class Prompt {
    /**
     * Components builtin.
     */
    private static readonly components: Map<string, PromptComponent> = new Map([
        ['text', TextComponent],
        ['number', NumberComponent],
        ['confirm', ConfirmComponent],
    ]);

    /**
     * Use this method to define custom prompt.
     * 
     * @param type Custom type. 
     * @param component Custom component.
     */
    public static registerComponent(type: string, component: PromptComponent) {
        this.components.set(type, component);
    }

    /**
     * run
     * 
     * @param configs configs
     */
    public static async prompts<T extends PromptAnswers = PromptAnswers>(configs: Array<NumberParams | ConfirmParams | PromptParams>): Promise<T> {
        const answers: PromptAnswers = {} as PromptAnswers;
        for (const config of configs) {
            if (config.when && !await config.when(answers)) continue;

            const component = this.components.get(config.type);
            if (!component) throw new NoSuchPromptComponentError(config.type);

            answers[config.name] = await component.run(config);
        }
        return answers as T;
    }
}
