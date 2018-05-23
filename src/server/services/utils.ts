import {DEBUG} from "../../config";

export function log(message?: any, ...args: any[]) {
    if (DEBUG) {
        console.log(message, args.length ? args : '');
    }
}

export function inputsFromFile(filePath) {

}

export const createEmptyArray = (n: number): Array<number> => Array.apply(null, Array(n)).map(() => null);
