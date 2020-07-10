import { BufReader } from "../deps.ts";
import CursorActionWords from "../models/CursorActionWords.ts";

export default class ConsoleHelper {
    private static readonly reader: BufReader = new BufReader(Deno.stdin);
    private static readonly stdout: Deno.WriterSync = Deno.stdout;
    private static readonly encoder: TextEncoder = new TextEncoder();
    private static readonly decoder: TextDecoder = new TextDecoder();

    /**
     * Read user input.
     */
    public static async readInput(): Promise<string> {
        const input = await this.reader.readLine();
        return input?.line ? this.decoder.decode(input.line) : '';
    }

    /**
     * Print msg given.
     * 
     * @param msg msg
     */
    public static write(msg: string) {
        Deno.writeAllSync(this.stdout, this.encoder.encode(msg));
    }

    /**
     * Print msg given and move cursor to the next line.
     * 
     * @param msg msg
     */
    public static writeln(msg?: string) {
        this.write(msg ?? '');
        this.write("\n")
    }

    /**
     * Clear current line and move cursor to the prev line.
     * Move cursor down on the end.
     * 
     * @param lines clear line counts
     */
    public static clearLine(lines: number = 1) {
        for (let index = 0; index <= lines; index++) {
            this.write(CursorActionWords.CLEAR_LINE_ALL);
            this.cursorUp();
        }
        this.cursorDown();
    }

    /**
     * move cursor to the prev line.
     */
    public static cursorUp() {
        this.write(CursorActionWords.MOVE_UP);
    }

    /**
     * move cursor to the next line.
     */
    public static cursorDown() {
        this.write(CursorActionWords.MOVE_DOWN);
    }

}