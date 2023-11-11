import { TimeSlot } from "./time";

export class Store {
    id!: string;
    name!: string;
    lonLatLoc!: Array<number>;
    address!: string;
    postalCode?: string;
    phone?: string;
    openTime!: TimeSlot[];
}