import React from "react";

import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import events from "../calendar_behavior/events"
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const newCalendar = (props) => {
    return (
        <div>
            <Calendar
                localizer={localizer}
                defaultDate={new Date()}
                defaultView="month"
                events={events}
                style={{ height: "95vh" }}
                views={['month', 'week', 'agenda']}
                onSelectEvent={(event) => alert(event.title)}
                eventPropGetter={(event) => {
                    const backgroundColor = (event.id === 7 || event.id === 0 ? 'green' : 'blue');
                    return { style: { backgroundColor } }
                }}
            />
        </div>
    );
}

export default newCalendar