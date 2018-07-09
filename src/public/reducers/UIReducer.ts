import { handleActions, Action } from 'redux-actions';
import * as Immutable from 'seamless-immutable'	;
import UIConstants from '../constants/UIConstants';

export type UIType = {
    ContainerTitle: string;
    ContainerDescription: string;
    FooterDescription: string;
};

export const InitialState = Immutable.from<UIType>({
    ContainerTitle: '',
    ContainerDescription: '',
    FooterDescription: '',
});

const UIReducer = handleActions<any, any>({
    [UIConstants.CONTAINER_TITLE_CHANGED]: (state: typeof InitialState, action: Action<void>) =>
        state.merge({
            ContainerTitle: action.payload.title,
            ContainerDescription: action.payload.description
        }, {deep: true}),
    [UIConstants.FOOTER_DESCRIPTION_CHANGED]: (state: typeof InitialState, action: Action<void>) =>
        state.merge({ FooterDescription: action.payload }, {deep: true})
}, InitialState);

export default UIReducer;