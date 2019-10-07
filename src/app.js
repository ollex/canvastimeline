"use strict";
window.onload = function () {
  const f = new Canvastimeline(document.getElementById("timeline"));

  f.initCalendar({
	 // inFrame: true,
    start: new Date(2019, 9, 2),
    onEventFound: function(ev) {
      alert(JSON.stringify(ev, null, 4));
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
    start: "2019-10-05 15:00:00",
    end: "2019-10-12 11:00:00"
  }, {
    id: 2,
    name: "Olafxx",
    resource_id: 2,
    start: "2019-10-13 11:45:00",
    end: "2019-10-20 15:00:00"
  }, {
    id: 3,
    name: "Olaf1",
    resource_id: 2,
    start: "2019-10-01 06:45:00",
    end: "2019-10-03 10:00:00"
  },
    {
      id: 4,
      name: "Ingo",
      resource_id: 2,
      start: "2019-10-04 11:30:00",
      end: "2019-10-12 11:00:00"
    },
    {
      id: 5,
      name: "Ingo",
      resource_id: 2,
      start: "2019-10-04 10:30:00",
      end: "2019-10-05 11:00:00"
    },
    {
      id: 6,
      name: "Olaf",
      resource_id: 2,
      start: "2019-10-01 13:45:00",
      end: "2019-10-05 11:00:00"
    },
    {
      id: 7,
      name: "Olafx",
      resource_id: 2,
      start: "2019-10-02 15:45:00",
      end: "2019-10-07 11:00:00"
    },
    {
      id: 8,
      name: "Olaf",
      resource_id: 5,
      start: "2019-10-12 11:45:00",
      end: "2019-10-21 11:00:00"
    },
    {
      id: 9,
      name: "Olaf",
      resource_id: 19,
      start: "2019-10-12 11:45:00",
      end: "2019-10-21 11:00:00"
    },
    {
      id: 10,
      name: "Olaf",
      resource_id: 19,
      start: "2019-10-14 11:45:00",
      end: "2019-10-21 11:00:00"
    },
    {
      id: 11,
      name: "Olaf",
      resource_id: 19,
      start: "2019-10-14 11:45:00",
      end: "2019-10-21 11:00:00"
    },
    {
      id: 12,
      name: "Olaf",
      resource_id: 19,
      start: "2019-10-14 11:45:00",
      end: "2019-10-21 11:00:00"
    },
    {
      id: 13,
      name: "Olaf",
      resource_id: 19,
      start: "2019-10-14 11:45:00",
      end: "2019-10-21 11:00:00"
    },
    {
      id: 14,
      name: "Olaf",
      resource_id: 19,
      start: "2019-10-14 11:45:00",
      end: "2019-10-21 11:00:00"
    },
    {
      id: 15,
      name: "Olaf",
      resource_id: 19,
      start: "2019-10-14 11:45:00",
      end: "2019-10-21 11:00:00"
    },
    {
      id: 16,
      name: "Olaf",
      resource_id: 13,
      start: "2019-10-14 18:45:00",
      end: "2019-10-21 11:00:00"
    },
    {
      id: 17,
      name: "Olaf",
      resource_id: 17,
      start: "2019-10-14 18:45:00",
      end: "2019-10-21 11:00:00"
    },
    {
      id: 18,
      name: "Olaf",
      resource_id: 17,
      start: "2019-10-14 11:45:00",
      end: "2019-10-21 11:00:00"
    },
    {
      id: 19,
      name: "Olaf",
      resource_id: 20,
      start: "2019-10-14 11:45:00",
      end: "2019-10-21 11:00:00"
    },
    {
      id: 20,
      name: "Olaf",
      resource_id: 19,
      start: "2019-10-14 11:45:00",
      end: "2019-10-21 11:00:00"
    },
    {
      id: 21,
      name: "Olaf",
      resource_id: 3,
      start: "2019-10-14 11:45:00",
      end: "2019-10-21 11:00:00"
    },
    {
      id: 22,
      name: "Olaf",
      resource_id: 12,
      start: "2019-10-14 11:45:00",
      end: "2019-10-21 11:00:00"
    },
    {
      id: 23,
      name: "Olaf",
      resource_id: 15,
      start: "2019-10-14 11:45:00",
      end: "2019-10-21 11:00:00"
    },
    {
      id: 24,
      name: "Olaf",
      resource_id: 15,
      start: "2019-10-14 11:45:00",
      end: "2019-10-21 11:00:00"
    },
    {
      id: 25,
      name: "Olaf",
      resource_id: 14,
      start: "2019-10-14 11:45:00",
      end: "2019-10-21 11:00:00"
    },
    {
      id: 26,
      name: "Olaf",
      resource_id: 13,
      start: "2019-10-14 11:45:00",
      end: "2019-10-21 11:00:00"
    },
    {
      id: 27,
      name: "Olaf",
      resource_id: 11,
      start: "2019-10-14 11:45:00",
      end: "2019-10-21 11:00:00"
    },
    {
      id: 28,
      name: "Olaf",
      resource_id: 11,
      start: "2019-10-14 11:45:00",
      end: "2019-10-21 11:00:00"
    },
    {
      id: 29,
      name: "Olaf",
      resource_id: 9,
      start: "2019-10-14 11:45:00",
      end: "2019-10-21 11:00:00"
    },
    {
      id: 30,
      name: "Olaf",
      resource_id: 8,
      start: "2019-10-14 11:45:00",
      end: "2019-10-21 11:00:00"
    },
    {
      id: 31,
      name: "Olaf",
      resource_id: 4,
      start: "2019-10-14 11:45:00",
      end: "2019-10-21 11:00:00"
    },
    {
      id: 32,
      name: "Olaf",
      resource_id: 6,
      start: "2019-10-14 11:45:00",
      end: "2019-10-21 11:00:00"
    },
    {
      id: 33,
      name: "Olaf",
      resource_id: 18,
      start: "2019-10-14 11:45:00",
      end: "2019-10-21 11:00:00"
    },
    {
      id: 34,
      name: "Olaf",
      resource_id: 9,
      start: "2019-10-14 11:45:00",
      end: "2019-10-21 11:00:00"
    },
    {
      id: 35,
      name: "Olaf",
      resource_id: 7,
      start: "2019-10-14 11:45:00",
      end: "2019-10-21 11:00:00"
    },
    {
      id: 36,
      name: "Olaf",
      resource_id: 9,
      start: "2019-10-14 11:45:00",
      end: "2019-10-21 11:00:00"
    }
  ];

  f.loadEvents(events);
  f.setSizesAndPositionsBeforeRedraw();
  f.drawDayLines();
  f.drawResources();
  f.drawEvents();
 setTimeout(function(){
    f.showLoader();
    f.prevMonth();
    setTimeout(function(){
      f.loadAndDrawEvents([
        {
          id: 111,
          name: "Olaf",
          resource_id: 9,
          start: "2019-09-14 11:45:00",
          end: "2019-09-21 11:00:00"
        },
        {
          id: 112,
          name: "Olaf",
          resource_id: 9,
          start: "2019-09-11 11:45:00",
          end: "2019-09-21 11:00:00"
        }
      ]);
      f.addEvent({
        id: 113,
        name: "Olaf inserted",
        resource_id: 8,
        start: "2019-09-11 13:45:00",
        end: "2019-09-15 11:00:00"
      });
      setTimeout(function(){
        f.addEvent({
          id: 114,
          name: "Olaf inserted",
          resource_id: 8,
          start: "2019-09-11 13:45:00",
          end: "2019-09-15 11:00:00"
        });
        f.addEvent({
          id: 115,
          name: "Olaf inserted",
          resource_id: 8,
          start: "2019-09-05 13:45:00",
          end: "2019-09-07 11:00:00",
          color: "yellow",
          background: "black"
        });
        f.removeEvent({id: 111, resource_id: 9});
        f.destroy(true);
      }, 1000);
      f.hideLoader();
      }, 1200);
    }, 3000);

};

