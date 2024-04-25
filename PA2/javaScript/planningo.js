import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from '@fullcalendar/interaction';
import * as bootstrap from "bootstrap";



import "bootstrap/dist/css/bootstrap.min.css";
export default function planning() {
  const activities = [{
    "id": 2,
    "nom": "Activitée DE MES MORT",
    "description": "Ceci est l'activitée 100000",
    "date_debut": "2024-04-21 06:18:01",
    "date_fin": "2024-04-21 07:29:01",
    "adresse": "ff",
    "nb_place": 8,
    "superviser_par": 4,
    "created_at": "2024-04-21T00:18:01.000000Z",
    "updated_at": "2024-04-22T09:46:42.000000Z",
    "supervisor": {
      "id": 4,
      "nom": "EnzO",
      "prenom": "",
      "code_postal": 0,
      "ville": "Yerres",
      "adresse": "",
      "num_telephone": 0,
      "email": "cocodoudo1@gmail.com",
      "role": "benevole",
      "email_verified_at": null,
      "created_at": "2024-02-12T21:35:57.000000Z",
      "updated_at": "2024-04-18T09:42:07.000000Z"
    }
  }, {
    "id": 3,
    "nom": "Activitée DE MA VIE",
    "description": "Ceci est l'activitée numéro 1",
    "date_debut": "2024-04-21 20:18:07",
    "date_fin": "2024-04-21 21:18:07",
    "adresse": "fff",
    "nb_place": 10,
    "superviser_par": 4,
    "created_at": "2024-04-21T00:18:07.000000Z",
    "updated_at": "2024-04-22T10:45:22.000000Z",
    "supervisor": {
      "id": 4,
      "nom": "EnzO",
      "prenom": "",
      "code_postal": 0,
      "ville": "Yerres",
      "adresse": "",
      "num_telephone": 0,
      "email": "cocodoudo1@gmail.com",
      "role": "benevole",
      "email_verified_at": null,
      "created_at": "2024-02-12T21:35:57.000000Z",
      "updated_at": "2024-04-18T09:42:07.000000Z"
    }
  }];
  const events = activities.map(activity => ({
    title: activity.nom,
    start: activity.date_debut,
    end: activity.date_fin
  }));
  const headerStyle = {
    background: "linear-gradient(90deg, #38A7A6, #59CD97)",
    height: "20%",
    width: "100%",
    paddingTop: 0,
    marginTop: 0,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  };
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(FullCalendar, {
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    initialView: "timeGridWeek",
    headerToolbar: {
      start: 'today prev,next',
      center: 'title',
      end: 'dayGridDay,dayGridWeek,dayGridMonth'
    },
    height: '90vh',
    events: events,
    eventDidMount: function (eventInfo) {
      return new bootstrap.Popover(eventInfo.el, {
        title: eventInfo.event.title,
        placement: "auto",
        trigger: "hover",
        customClass: "popoverStyle",
        content: "<p>enzo<strong> palpermi</strong>.</p>",
        html: true
      });
    }
  }));

  return {
    FullCalendar,
    dayGridPlugin,
    timeGridPlugin,
    interactionPlugin,
    bootstrap,
    events
  };
}
