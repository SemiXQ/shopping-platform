import { Store } from "src/app/data/models/store";
import { WeekDay } from "src/app/data/models/time";


export const stores: Store[] = [
    {
        id: '1',
        name: 'Store A',
        lonLatLoc: [-122.89453, 49.25305],
        address: "9888 Cameron Street, Burnaby, BC",
        postalCode: "V3J 0A4",
        phone: "+1 (123) 123-1234",
        openTime: [
            {
                open: '9 AM',
                close: '5 PM',
                day: WeekDay.Monday
            },
            {
                open: '10 AM',
                close: '6 PM',
                day: WeekDay.Thursday
            },
        ]
    },
    {
        id: '2',
        name: 'Store B',
        lonLatLoc: [-122.92770, 49.28002],
        address: "Hamilton, 8888 University Drive, Burnaby, BC",
        postalCode: "V5A 1S6",
        phone: "+1 (123) 123-1234",
        openTime: [
            {
                open: '9 AM',
                close: '5 PM',
                day: WeekDay.Tuesday
            },
            {
                open: '10 AM',
                close: '6 PM',
                day: WeekDay.Friday
            },
        ]
    }
];