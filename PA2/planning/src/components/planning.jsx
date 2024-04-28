import React, { useEffect, useState } from "react";
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import * as bootstrap from "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { getAllActivityForPlanning } from "./function.js";


function Planning() {

    const [activities, setActivities] = useState([]);

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const { participationsE, participationsF, participationsA } = await getAllActivityForPlanning();
                const combinedActivities = [...participationsE, ...participationsF, ...participationsA];

                const fetchedActivities = combinedActivities;

                setActivities(fetchedActivities);
            } catch (error) {
                console.error("Erreur lors de la récupération des activités :", error);
            }
        };

        fetchActivities();
    }, []);


    const events = activities.map(activity => ({
        title: activity.nom,
        start: activity.date_debut,
        end: activity.date_fin,
        descrip: activity.descrip
    }));


    const headerStyle = {
        background: "linear-gradient(90deg, #38A7A6, #59CD97)",
        height: "20%",
        width: "100%",
        paddingTop: 0,
        marginTop: 0,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    };

    return (
        <div>
            {/* FullCalendar */}
            <Fullcalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView={"timeGridWeek"}
                headerToolbar={{
                    start: "today prev,next",
                    center: "title",
                    end: "dayGridDay,dayGridWeek,dayGridMonth",
                }}
                height={"90vh"}
                events={events}
                eventDidMount={(info) => {
                    return new bootstrap.Popover(info.el, {
                        title: info.event.title,
                        placement: "auto",
                        trigger: "hover",
                        customClass: "popoverStyle",
                        content: `<p>${info.event.descrip}</p>`,
                        html: true,
                    });
                }}
            />
        </div>
    );
}

export default Planning;