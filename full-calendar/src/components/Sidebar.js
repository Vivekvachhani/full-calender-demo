import React from 'react'
import SidebarEvent from './SidebarEvent'

const Sidebar = (props) => {
    return (
        <div className='demo-app-sidebar'>
            <div className='demo-app-sidebar-section'>
            </div>
            <div className='demo-app-sidebar-section'>
            </div>
            <div className='demo-app-sidebar-section'>
                <h2>All Events ({props.currentEvents.length})</h2>
                <ul>
                    {props.currentEvents.length
                        ? props.currentEvents.map((item) =>
                            <SidebarEvent event={item} />
                        )
                        : <h4>You have no evenets</h4>}
                </ul>
            </div>
        </div>
    )
}

export default Sidebar
