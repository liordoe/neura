import {combineReducers} from 'redux';
import UIReducer from '../reducers/UIReducer';
import NetsReducer from './NetsReducer';

const MainReducer = combineReducers({
    UI: UIReducer,
    Nets: NetsReducer,
});
export default MainReducer;
