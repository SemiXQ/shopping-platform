export class TimeSlot {
    open!: string;
    close!: string;
    day!: WeekDay;
}

export enum WeekDay {
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday
}