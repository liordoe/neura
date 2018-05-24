import * as stdio from 'stdio';
import * as path from 'path';

export const OPTS = stdio.getopt({
    'debug': {
        key: 'd',
        args: 1,
        description: 'Debug mode level'
    }
});

export const DEBUG: boolean = +OPTS.debug === 1;
export const TEST_DATA_PATH = path.join(process.cwd(), 'data/NSL-KDD/KDDTest+.txt');
export const TRAIN_DATA_PATH = path.join(process.cwd(), 'data/NSL-KDD/KDDTrain+.txt');