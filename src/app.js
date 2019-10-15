"use strict";
window.onload = function () {
  const f = new Canvastimeline(document.getElementById("timeline"));

  f.initCalendar({
    viewType: "week-hours",
    getEventText: function (ev) {
      return ev.name + '\n' + ev.start.substr(11);
    },
    monthNames: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
    dayNames: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
    start: new Date(2019, 9, 9),
    onEventLayerClick: function (ev, resource_id) {
      alert(JSON.stringify(ev, null, 4));
    },
    onContextMenu: function (ev, resource_id) {
      console.log("context menu clicked." + ev ? ev : " no event at mouse position.");
    },
    resources: [{
      id: 1,
      name: "c22a",
      beds: 4
    },
      {
        id: 2,
        name: "c22b",
        beds: 4
      },
      {
        id: 3,
        name: "c23a",
        beds: 4
      },
      {
        id: 4,
        name: "c23b",
        beds: 4
      },
      {
        id: 5,
        name: "c24a",
        beds: 3
      },
      {
        id: 6,
        name: "c24b",
        beds: 3
      },
      {
        id: 7,
        name: "c25a",
        beds: 4
      },
      {
        id: 8,
        name: "c25b",
        beds: 4
      },
      {
        id: 9,
        name: "c26a",
        beds: 4
      },
      {
        id: 10,
        name: "c26b",
        beds: 4
      },
      {
        id: 11,
        name: "c27a",
        beds: 4
      },
      {
        id: 12,
        name: "c27b",
        beds: 2
      },
      {
        id: 13,
        name: "c28a",
        beds: 2
      },
      {
        id: 14,
        name: "c28b",
        beds: 4
      },
      {
        id: 15,
        name: "c29a",
        beds: 2
      },
      {
        id: 16,
        name: "c29b",
        beds: 2
      },
      {
        id: 17,
        name: "c30a",
        beds: 2
      },
      {
        id: 18,
        name: "c31b",
        beds: 2
      },
      {
        id: 19,
        name: "c32a",
        beds: 3
      },
      {
        id: 20,
        name: "c33b",
        beds: 3
      }
    ],
    sidecols: [{
      "name": 40
    },
      {
        "beds": 30
      },
      {
        "status": 40
      }
    ]
  });
  let events = [{
    id: 1,
    name: "Olaf",
    resource_id: 2,
    start: "2019-10-08 15:00:00",
    end: "2019-10-12 11:00:00"
  }, {
    id: 2,
    name: "Olafxx",
    resource_id: 2,
    start: "2019-10-13 11:45:00",
    end: "2019-10-20 15:00:00"
  }, {
    id: 4,
    name: "Ingo",
    resource_id: 2,
    start: "2019-10-08 11:30:00",
    end: "2019-10-12 11:00:00"
  },
    {
      id: 5,
      name: "Ingo",
      resource_id: 2,
      start: "2019-10-04 10:30:00",
      end: "2019-10-08 11:00:00"
    }, {
      id: 12,
      name: "Olaf",
      resource_id: 19,
      start: "2019-10-10 11:45:00",
      end: "2019-10-21 11:00:00"
    },
    {
      id: 28,
      name: "Olaf",
      resource_id: 11,
      start: "2019-10-09 11:45:00",
      end: "2019-10-11 11:00:00"
    },
    {
      id: 29,
      name: "Olaf",
      resource_id: 9,
      start: "2019-10-07 11:45:00",
      end: "2019-10-18 11:00:00"
    }
  ];
  f.loadAndDrawEvents(events);

  setTimeout(function () {
    f.showLoader();
    f.prevRange();
    setTimeout(function () {
      f.loadAndDrawEvents([
        {
          id: 111,
          name: "Olaf",
          resource_id: 9,
          start: "2019-09-24 11:45:00",
          end: "2019-10-02 11:00:00"
        },
        {
          id: 112,
          name: "Olaf",
          resource_id: 9,
          start: "2019-09-30 11:45:00",
          end: "2019-10-04 11:00:00"
        }
      ]);
      f.addEvent({
        id: 113,
        name: "Olaf inserted",
        resource_id: 8,
        start: "2019-09-31 13:45:00",
        end: "2019-10-05 11:00:00"
      });
      setTimeout(function () {
        f.setViewType("month");
        f.setRangeStartDate(new Date(2020, 9, 5));
        f.addEvent({
          id: 114,
          name: "Olaf inserted",
          resource_id: 8,
          start: "2020-10-01 13:45:00",
          end: "2020-10-10 11:00:00"
        });
        f.addEvent({
          id: 115,
          name: "Olaf inserted",
          resource_id: 8,
          start: "2020-10-05 13:45:00",
          end: "2020-10-07 11:00:00",
          color: "yellow",
          background: "black"
        });
        setTimeout(function () {
          f.setViewType("year");
          f.setCellWidth(30);
          f.setRangeStartDate(new Date(2020, 0, 2));
          let evts = [], x, y;
          for (let i = 0; i < 700; i++) {
            x = Math.ceil(Math.random() * 7);
            y = x + 1;
            evts.push({
              id: i + 115,
              name: i + '_event',
              resource_id: Math.ceil(Math.random() * 19),
              start: "2020-0" + x + "-0" + x + " 15:00:00",
              end: "2020-0" + y + "-0" + x + " 11:00:00"
            });
          }
          f.loadAndDrawEvents(evts);
          f.showMarkerAtDate(new Date(2020, 0, 12, 0, 0, 0), new Date(2020, 0, 13, 12));
          setTimeout(function() {
            f.setViewType("day-2hours");
            f.hideMarker();
            f.setRangeStartDate(new Date(2020, 0, 1));
            f.loadAndDrawEvents([
              {
                id: 2010,
                name: '2010_event',
                resource_id: 3,
                start: "2020-01-01 03:00:00",
                end: "2020-01-01 16:00:00"
              },
              {
                id: 2011,
                name: '2011_event',
                resource_id: 3,
                start: "2020-01-01 16:01:00",
                end: "2020-01-01 18:00:00"
              }
            ]);
          },2000);
        }, 2000)
      }, 2000);
      f.hideLoader();
    }, 2000);
  }, 3000);

};

