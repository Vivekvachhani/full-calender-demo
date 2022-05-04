import { createEventId } from "./event-utils";

let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today
let nextDay = new Date(new Date());
nextDay.setDate(new Date().getDate() + 1);
nextDay = nextDay.toISOString().replace(/T.*$/, '')
const initialState = {
    events: [
        {
            id: createEventId(),
            title: 'All-day event',
            start: todayStr,
            end: nextDay
        },
        {
            id: createEventId(),
            title: 'Timed event',
            start: todayStr + 'T12:00:00',
            end: todayStr + 'T13:00:00'
        }
    ]
}

export default function Reducers(state = initialState, action) {
    switch (action.type) {
        case 'ADD_EVENT':
            return {
                ...state,
                events: [
                    ...state.events,
                    {
                        id: action.id,
                        title: action.title,
                        start: action.start,
                        end: action.end
                    }
                ]
            }

        case 'REMOVE_EVENT':
            return {
                events: [
                    ...state.events.filter(item => item.id !== action.id)
                ]
            }

        case 'CHANGE_EVENT':
            return {
                events: [
                    ...state.events.map((item) =>
                        item.id === action.id
                            ? {
                                ...item,
                                id: action.id,
                                title: action.title,
                                start: action.start,
                                end: action.end
                            }
                            : item
                    )
                ]
            }

        default:
            return state;
    }
}

