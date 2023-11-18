import { Good } from "../models/good";


export interface GoodList {
    goods?: Good[],
    error?: string
}

export interface GoodItem {
    good?: Good,
    error?: string
}

export interface GoodIds {
    ids?: string[]
}