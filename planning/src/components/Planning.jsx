import React from "react";
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from '@fullcalendar/interaction';
import * as bootstrap from "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function Planning(){
    const events = [
        {title: "Assembleur pinux",
        start: "2024-04-22T09:00:00",
        end: "2024-04-22T11:00:00"
    },
    ]
    return (
        <div>
            
            <Fullcalendar 
                plugins={[ dayGridPlugin,timeGridPlugin,interactionPlugin ]}
                initialView={"timeGridWeek"}
                headerToolbar={{
                        start: 'today prev,next', // will normally be on the left. if RTL, will be on the right
                        center: 'title',
                        end: 'dayGridDay,dayGridWeek,dayGridMonth' // will normally be on the right. if RTL, will be on the left
                      }}
                      height={'90vh'}
                      events={events}
                      eventDidMount={(info) => {
                        return new bootstrap.Popover(info.el, {
                            title: info.event.title,
                            placement: "auto",
                            trigger: "hover",
                            customClass: "popoverStyle",
                            content:
                              "<p>weeee<strong>faut les choquer mgl</strong>.</p>",
                            html: true,
                        });
                      }} 
                />
        </div>
    )
}
export default Planning;