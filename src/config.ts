import * as stdio from 'stdio';

export const OPTS = stdio.getopt({
    'debug': {
        key: 'd',
        args: 1,
        description: 'Debug mode level'
    }
});

export const DEBUG: boolean = +OPTS.debug === 1;
export const TEST_DATA_PATH = 'data/NSL-KDD/KDDTest+.txt';