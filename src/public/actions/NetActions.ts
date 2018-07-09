import NetConstants from '../constants/NetsConstants';
import { createAction } from 'redux-actions';
import Store from '../stores/Main';
import * as API from '../services/API';
import {LearnOptions} from "../../types/front.types";
import {Net} from "../../lib/network/net";

const getAllNets = createAction(NetConstants.GET_NETS);
const getSingleNet = createAction(NetConstants.GET_NET);
const startLearnCycle = createAction(NetConstants.START_LEARN_CYCLE);

export async function getAll() {
    try {
        const {data} = await API.getNets();

        Store.dispatch(getAllNets(data));
    } catch (err) {
        console.log(`Request failed with ${err}`);
    }
}

export async function getNet(id) {
    try {
        const {data} = await API.getNet(id);

        Store.dispatch(getSingleNet(data));
    } catch (err) {
        console.log(`Request failed with ${err}`);
    }
}

export async function startLearning(id, params:LearnOptions = {}) {
    try {
        const {data: style} = await API.startLearning(id, params);
        Store.dispatch(startLearnCycle(style));
    } catch (err) {
        console.log(`Request failed with ${err}`);
    }
}