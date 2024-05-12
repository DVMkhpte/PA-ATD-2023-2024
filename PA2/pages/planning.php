<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Planning</title>
</head>
<body>
    <div id="planningContainer"></div>
    <script src="../javaScript/planningo.js" type="module"></script>
    <script>
        window.onload = function() {
            const { FullCalendar, dayGridPlugin, timeGridPlugin, interactionPlugin, bootstrap, events } = planning();
            const calendarEl = document.getElementById('planningContainer');
            new FullCalendar(calendarEl, {
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
            });
        };
    </script>
</body>
</html>
