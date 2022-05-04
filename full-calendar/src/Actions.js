export const addEvent = (key, tit, startStr, endStr) => {
    return {
        type: 'ADD_EVENT',
        id: key,
        title: tit,
        start: startStr,
        end: endStr
    }
}

export const removeEvent = (key) => {
    return {
        type: 'REMOVE_EVENT',
        id: key
    }
}

export const changeEvent = (key, tit, startStr, endStr) => {
    return {
        type: 'CHANGE_EVENT',
        id: key,
        title: tit,
        start: startStr,
        end: endStr
    }
}