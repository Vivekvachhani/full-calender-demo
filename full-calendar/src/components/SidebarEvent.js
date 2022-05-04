import React from 'react'
import { formatDate } from '@fullcalendar/react'

const SidebarEvent = ({ event }) => {
    return (
        <li key={event.id}>
            <b>{formatDate(event.start, { year: 'numeric', month: 'short', day: 'numeric' })}</b>
            <i>{event.title}</i>
        </li>
    )
}

export default SidebarEvent
