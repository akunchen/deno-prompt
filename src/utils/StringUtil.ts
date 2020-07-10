export default class StringUtil {

    public static firstUpper(str: string) {
        return str.substr(0, 1).toUpperCase() + str.substr(1);
    }
}