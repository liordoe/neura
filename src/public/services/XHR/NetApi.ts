import axios from 'axios';

export function getNets() {
    return axios.get(`/api/net`);
}

export function getNet(id) {
    return axios.get(`/api/net/${id}`);
}

export function singleLearn(id, vector) {
    return axios.get(`/api/learn/once/${id}?vector=${vector}`);
}

export function startLearning(id, params) {
    const search = new URLSearchParams(params).toString();
    return axios.get(`/api/learn/${id}?${search}`);
}