import {NetInfoType} from "../../types/net.types";
import {Net} from "../models/net";
import {RepositoryError} from "../../errors";

export class NetRepository {
    public static async createNetwork(net: NetInfoType) {
        try {
            const network = new Net(net);
            network.save();
        } catch (err) {
            throw new RepositoryError(err);
        }
    }
}