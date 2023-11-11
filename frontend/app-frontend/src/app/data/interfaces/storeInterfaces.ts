import { Store } from "../models/store";

export interface StoreList {
    stores?: Store[],
    error?: string
}