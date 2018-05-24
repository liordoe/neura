import {DEBUG} from "../../config";
import {promisify} from "util";
import * as fs from "fs";

export function log(message?: any, ...args: any[]) {
    if (DEBUG) {
        console.log(message, args.length ? args : '');
    }
}

export const createEmptyArray = (n: number): Array<number> => Array.apply(null, Array(n)).map(() => null);

export async function inputsFromFile(filePath) {
    const content = await promisify(fs.readFile)(filePath, {encoding: 'utf8'});
    let array: Array<any> = content.split('\n');
    return array.map(str => {
        return str.split(',');
    }).slice(0, -1);
}
