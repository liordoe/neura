import { handleActions, Action } from 'redux-actions';
import * as Immutable from 'seamless-immutable'	;
import NetsConstants from '../constants/NetsConstants';

export type NetsType = {
    all: Array<any>,
    currentLearnVectors: Array<any>,
    current: any,
};

export const InitialState = Immutable.from<NetsType>({
    all: [],
    currentLearnVectors: [],
    current: {},
});

const NetsReducer = handleActions<any, any>({
    [NetsConstants.GET_NETS]: (state: typeof InitialState, action: Action<void>) =>
        state.set(['all'], action.payload ),
    [NetsConstants.GET_NET]: (state: typeof InitialState, action: Action<void>) =>
        state.merge({ current: action.payload }, {deep: true}),
    [NetsConstants.START_LEARN_CYCLE]: (state: typeof InitialState, action: Action<void>) =>
        state.merge({ currentLearnVectors: action.payload }, {deep: true}),
}, InitialState);

export default NetsReducer;