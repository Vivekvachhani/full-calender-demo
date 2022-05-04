import React, { useState } from 'react'
import Sidebar from './components/Sidebar'
import FullCalendar, { CalendarApi } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { createEventId } from './event-utils'
import { useDispatch, useSelector } from 'react-redux'
import { addEvent, removeEvent, changeEvent } from "./Actions";
import { Button, Modal } from 'react-bootstrap';

function App() {
  const [currentEvents, setcurrentEvents] = useState([])
  const [modal, setmodal] = useState({
    show: false,
    text: '',
    title: '',
    start: '',
    end: '',
    para: '',
    action: ''
  });
  console.log(modal.action,"end")
  const [displays, setdisplay] = useState('None');
  const initialEvents = useSelector((state) => state.events)
  const dispatch = useDispatch();

  const inputHandler = (event) => {
    if (event.target.id == 'start') {
      setmodal((old) => {
        return {
          ...old,
          start: event.target.value
        }
      })
    }
    else if (event.target.id == 'end') {
      setmodal((old) => {
        return {
          ...old,
          end: event.target.value
        }
      })
    }
    else if (event.target.id == 'title') {
      setmodal((old) => {
        return {
          ...old,
          title: event.target.value
        }
      })
    }
  }
  function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        show={modal.show}
        // onHide={props.onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        animation={false}
      >
        <Modal.Body>
          <h4>{modal.text}</h4>
          <input id='title' className='form-control mb-3' onChange={inputHandler} type='text' value={modal.title} placeholder='Eneter Title...' />
          <div className='d-flex align-items-center'>
           
           
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className='btn btn-danger' style={{ display: displays }} onClick={() => { props.onHide(); eventDelete(modal.para) }} >Delete</Button>
          <Button className='btn btn-success' onClick={() => { props.onHide(); modal.action == 'add' ? eventAdd(modal.para) : eventEdit(modal.para) }}>{modal.text}</Button>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  const handleDateSelect = (selectInfo) => {
    // console.log(selectInfo);
    setdisplay('None')
    setmodal((old) => {
      return {
        ...old,
        show: true,
        text: 'Add Event',
        title: '',
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        para: selectInfo,
        action: 'add'
      }
    })
  }
  const eventAdd = (selectInfo) => {
    if (selectInfo != '') {
      let calendarApi = selectInfo.view.calendar
      calendarApi.unselect()
      calendarApi.addEvent({
        id: createEventId(),
        title: modal.title,
        start: modal.start,
        end: modal.end,
        allDay: selectInfo.allDay
      })
      setmodal((old) => {
        return {
          ...old,
          title: '',
          para: '',
          action: ''
        }
      })
    }
  }
  const eventEdit = (selectInfo) => {
    if (selectInfo != '') {
      selectInfo.event.setStart(modal.start)
      selectInfo.event.setEnd(modal.end)
      selectInfo.event.setProp('title', modal.title)
      setmodal((old) => {
        return {
          ...old,
          title: '',
          para: '',
          action: ''
        }
      })
    }
  }
  const eventDelete = (selectInfo) => {
    selectInfo.event.remove()
  }
  const handleEventClick = (clickInfo) => {
    setdisplay('block')
    setmodal((old) => {
      return {
        ...old,
        show: true,
        text: 'Edit Event',
        title: clickInfo.event.title,
        start: clickInfo.event.startStr,
        end: clickInfo.event.endStr,
        para: clickInfo,
        action: 'edit'
      }
    })
  }
  const handleEvents = (events) => {
    setcurrentEvents(events)
  }
  const eventContent = (eventInfo) => {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    )
  }
  // const newEvent = (event) => {
  //   dispatch(addEvent(event.event.id, event.event.title, event.event.startStr, event.event.endStr))
  // }
  // const deleteEvent = (event) => {
  //   dispatch(removeEvent(event.event.id))
  // }
  // const editEvent = (event) => {
  //   dispatch(changeEvent(event.event.id, event.event.title, event.event.startStr, event.event.endStr))
  // }
  return (
    <div className="App">
      <Sidebar
        currentEvents={currentEvents} />
      <div className='demo-app-main'>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          initialView='dayGridMonth'
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          initialEvents={initialEvents}
          select={handleDateSelect}
          eventContent={eventContent}
          eventClick={handleEventClick}
          eventsSet={handleEvents}
          // eventAdd={newEvent}
          // eventChange={editEvent}
          // eventRemove={deleteEvent}
        />
        <MyVerticallyCenteredModal
          header={modal.text}
          show={modal.show}
          start={modal.start}
          end={modal.end}
          onHide={() => setmodal((old) => {
            return {
              ...old,
              show: false
            }
          })}
     
        />
      </div>
    </div>
  );
}

export default App;

