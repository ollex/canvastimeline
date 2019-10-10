"use strict";

class Canvastimeline {
  constructor(parentEl) {
    this._view = parentEl;
    if (!document.getElementById("canvastimeline-css-stylesheet")) {
      let sle = document.createElement("style");
      sle.id = "canvastimeline-css-stylesheet";
      sle.appendChild(document.createTextNode(""));
      document.head.appendChild(sle);
      const style = sle.sheet;
      style.insertRule(`.canvastl_scheduler_wrapper {
			position: relative;
			width: 100%;
			height: 100%;
			border: 1px solid #eee;
			box-sizing: border-box;
		}`);

      style.insertRule(`.canvastl_scheduler {
			max-width: 1890px;
			height: 600px;
			overflow: auto;
			position: relative;
		}`);

      style.insertRule(`.canvastl_level_0,
		.canvastl_level_1 {
			position: absolute;
			left: 30px;
			top: 30px;
		}`);

      style.insertRule(`.canvastl_side_canvas {
			position: sticky;
			left: 0;
			margin: 0;
			padding: 0;
			margin-top: -4px;
			background: #ffffff;
			opacity: 1;
			z-index: 4;
			border-right: 3px solid #eee;
		}`);

      style.insertRule(`.canvastl_top_canvas {
			position: sticky;
			top: 0;
			background: rgb(255, 255, 255);
			box-shadow: 0px 1px 0px #eee;
			border-bottom: none;
			opacity: 1;
			z-index: 5;
			margin: 0;
			padding: 0;
		}`);

      style.insertRule(`.canvastl_res_header {
			position: absolute;
			left: 0;
			top: 0;
			z-index: 6;
			background: #ffffff;
			border-bottom: 1px solid #eee;
			border-right: 3px solid #eee;
		}`);
      style.insertRule(`.canvastimeline-loader {
        position: absolute;
        display: none;
        left: 50%;
        top: 50%;
        z-index: 1;
        width: 120px;
        height: 120px;
        margin: -60px 0 0 -60px;
        border: 16px solid #f3f3f3;
        border-radius: 50%;
        border-top: 15px solid #1CA1C1;
        -webkit-animation: spin 1s linear infinite;
        animation: spin 1s linear infinite;
      }`);

      style.insertRule(`@-webkit-keyframes spin {
        0% { -webkit-transform: rotate(0deg); }
        100% { -webkit-transform: rotate(360deg); }
      }`);

      style.insertRule(`@keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }`);

    }

    this._viewType = "month";
    this._cellHeight = 30;
    this._cellWidth = 180;
    this._numResources = 1;
    this._daysInRange = 31;
    this._colsInTbl = this._daysInRange * this._cellWidth;
    this._rowsInTbl = this._numResources * this._cellHeight;
    this._days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    this._dayWidths = [];
    this._numWidths = [];
    this._curFirstOfRange = null;
    this._resColWidth = 0;
    this._bgHeight = 0;
    this._eventOverlap = true;
    this._schedulerWrapper = document.createElement("div");
    this._schedulerWrapper.height = this._view.height;
    this._schedulerWrapper.width = this._view.width;
    this._schedulerWrapper.className = "canvastl_scheduler_wrapper";
    this._loader = document.createElement("div");
    this._loader.className = "canvastimeline-loader";
    this._scheduler = document.createElement("div");
    this._scheduler.className = 'canvastl_scheduler';
    this._scheduler.height = this._view.height;
    this._scheduler.width = this._view.width;
    this._scheduler.style.height = this._view.style.height;
    this._background = document.createElement("canvas");
    this._background.className = "canvastl_level_0";
    this._background.width = 1860;
    this._background.height = 1500;
    this._eventLayer = document.createElement("canvas");
    this._eventLayer.className = "canvastl_level_1";
    this._eventLayer.width = 1860;
    this._eventLayer.height = 1500;
    this._resLayer = document.createElement("canvas");
    this._resLayer.className = "canvastl_side_canvas";
    this._resLayer.width = 30;
    this._resLayer.height = 1500;
    this._headerLayer = document.createElement("canvas");
    this._headerLayer.className = "canvastl_top_canvas";
    this._headerLayer.width = 1890;
    this._headerLayer.height = 30;
    this._resHeaderLayer = document.createElement("canvas");
    this._resHeaderLayer.className = "canvastl_res_header";
    this._resHeaderLayer.width = 30;
    this._resHeaderLayer.height = 30;
    this._backgroundCtx = this._background.getContext("2d");
    this._eventLayerCtx = this._eventLayer.getContext("2d");
    this._resLayerCtx = this._resLayer.getContext("2d");
    this._headerLayerCtx = this._headerLayer.getContext("2d");
    this._resHeaderLayerCtx = this._resHeaderLayer.getContext("2d");
    this._schedulerWrapper.appendChild(this._resHeaderLayer);
    this._schedulerWrapper.appendChild(this._loader);
    this._scheduler.appendChild(this._headerLayer);
    this._scheduler.appendChild(this._resLayer);
    this._scheduler.appendChild(this._background);
    this._scheduler.appendChild(this._eventLayer);
    this._schedulerWrapper.appendChild(this._scheduler);
    this._view.appendChild(this._schedulerWrapper);
    this._resources = [];
    this.sidecols = [];
    this._resources = new Map();
    this._resourcesIdx = new Map();
    this._sidecols = new Map();
    this._helpArray = [];
    this._maxCellHeight = this._cellHeight;
    this._onEventFound = null;

    this._backgroundCtx.font = "12px Arial";
    for (let i = 1; i < 32; i++) {
      this._numWidths[i - 1] = this._backgroundCtx.measureText('' + i).width;
    }
    this._days.forEach((d, idx) => {
      this._dayWidths[idx] = this._backgroundCtx.measureText(d).width;
    });

    this._eventLayer.onclick = this.findEventByXY.bind(this);
  }


  destroy(removeParent) {
    this._eventLayer.removeEventListener("click", this.findEventByXY);
    while (this._view.firstChild) {
      this._view.removeChild(this._view.firstChild);
    }
    let pV = this._view;
    console.log(pV);
    Object.keys(this).forEach((k) => {
      try {
        delete this[k];
      } catch(err) {
        console.log(k);
      }
    });
    if(removeParent) {
      pV.parentNode.removeChild(pV);
    }
    pV = null;
  }

  prepareResources(resources) {
    // the resoucres_idx is useful for indexing if we do not allow event overlap
    // if we do allow it we need to calculate min and max to save on cycles until we find rescource
    this._resourcesIdx.clear();
    this._resources.clear();
    this._sidecols.clear();
    this._resColWidth = 0;
    this._helpArray = [];
    let curPosX = 0;
    this.sidecols.forEach((s, idx) => {
      let newX = {};
      Object.keys(s).forEach((k) => {
        this._resColWidth += s[k];
        newX[s] = s[k];
        this._helpArray.push({
          name: k,
          posX: curPosX
        });
        curPosX += s[k];
      });
      this._sidecols.set(idx, newX);
    });
    resources.forEach((r, idx) => {
      r.events = [];
      r.idx = idx;
      // in case a resource is missing an attribute we add an empty string here
      this._helpArray.forEach(function (header) {
        if (!r.hasOwnProperty(header.name)) {
          r[header.name] = "";
        }
      });
      this._resources.set(r.id, r);
      this._resourcesIdx.set(idx, r.id);
    });
  }

  removeEventsAndResetResourceGeometry() {
    let curY = 0;
    this._maxCellHeight = this._cellHeight;
    this._resources.forEach((value, key, map) => {
      value.yPos = curY;
      value.height = this._cellHeight;
      curY += this._cellHeight;
      value.events = [];
    });
    this._bgHeight = this._resources.size * this._cellHeight;
  }

  showLoader() {
    this._loader.style.display = "block";
  }

  hideLoader() {
    this._loader.style.display = "none";
  }

  setCellWidth(val) {
    this._cellWidth = val;
  }

  calcTicksAndWidth() {
    switch (this._viewType) {
      case "year":
        const year = this._curFirstOfRange.getFullYear();
        if(year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) {
          this._daysInRange = 366;
        } else {
          this._daysInRange = 365;
        }
        break;
      case "month":
        this._daysInRange = new Date(this._curFirstOfRange.getFullYear(), this._curFirstOfRange.getMonth() + 1, 0).getDate();
        break;
      case "week":
        this._daysInRange = 7;
        break;
      default:
        throw new Error("View Type is not set correctly!");
    }

    this._numTicksInRange = 86400 * this._daysInRange * 1000;
    this._colsInTbl = this._daysInRange * this._cellWidth;
    this._scheduler.style.maxWidth = this._colsInTbl + 'px';
  }

  // for monday...
  calcMonday(d) {
    const currentWeekDay = d.getDay();
    let wkStart = new Date(new Date(d).setDate(d.getDate() - (currentWeekDay == 0 ? 6 : currentWeekDay -1)));
    wkStart.setHours(0);
    wkStart.setMinutes(0);
    wkStart.setSeconds(0);
    wkStart.setMilliseconds(0);
    return wkStart
  }

  prepareRange() {
    this.calcTicksAndWidth();
    this.removeEventsAndResetResourceGeometry();
    this.setSizesAndPositionsBeforeRedraw();
    this.drawDayLines();
    this.drawResources();
  }

  prevRange() {
    switch (this._viewType) {
      case "month":
        this._curFirstOfRange.setMonth(this._curFirstOfRange.getMonth() -1);
        break;
      case "year":
        this._curFirstOfRange.setFullYear(this._curFirstOfRange.getFullYear() - 1);
        break;
      case "week":
        this._curFirstOfRange.setDate(this._curFirstOfRange.getDate() - 7);
        break;
      default:

    }
    this.prepareRange()
  }

  nextRange() {
    switch (this._viewType) {
      case "year":
        this._curFirstOfRange.setYear(this._curFirstOfRange.getFullYear() + 1);
        break;
      case "month":
        this._curFirstOfRange.setMonth(this._curFirstOfRange.getMonth() + 1);
        break;
      case "week":
        this._curFirstOfRange.setDate(this._curFirstOfRange.getDate() + 7);
        break;
      default:
        throw new Error("View Type is not set correctly!");
    }
    this.prepareRange();
  }

  setViewType(typeStr) {
    if(typeStr === 'week') {
      this._viewType = 'week';
    } else if(typeStr === 'month') {
      this._viewType = 'month';
    } else if(typeStr === 'year') {
      this._viewType = 'year';
    } else {
      throw new Error("View Type must be either week or month!");
    }
  }

  // to do!!! refactor to have multiple firstOf variables to be _curFirstOfRange only always
  setRangeStartDate(d) {
    switch (this._viewType) {
      case "month":
        this._curFirstOfRange = new Date();
        this._curFirstOfRange.setFullYear(d.getFullYear());
        this._curFirstOfRange.setMonth(d.getMonth());
        this._curFirstOfRange.setDate(1);
        this._curFirstOfRange.setHours(0);
        this._curFirstOfRange.setMinutes(0);
        this._curFirstOfRange.setSeconds(0);
        this._curFirstOfRange.setMilliseconds(0);
        break;
      case 'year':
        this._curFirstOfRange = new Date(d.getFullYear(), 0, 1);
        break;
      case "week":
        this._curFirstOfRange = this.calcMonday(d);
    }
    this.prepareRange();
  }

  getXPos(St) {
    return this._colsInTbl * ((St - this._curFirstOfRange.getTime()) / this._numTicksInRange);
    /*switch(this._viewType) {
      case "month":
        return this._colsInTbl * ((St - this._curFirstOfMonth.getTime()) / this._numTicksInRange);
        break;
      case "week":
        return this._colsInTbl * ((St - this._curFirstOfWeek.getTime()) / this._numTicksInRange);
    }*/

  }

  getWidth(S, E) {
    return this._colsInTbl * ((E - S) / this._numTicksInRange);
  }
  // is useful without event overlap only, really
  getYPos(resource_id) {
    return (this._resources.get(resource_id).idx * this._cellHeight) + 1;
  }

  parseDate(str) {
    const twoParts = str.split(/[ T]/);
    const datePart = twoParts[0].split("-");
    const timePart = twoParts[1].split(":");
    return new Date(datePart[0], datePart[1] - 1, datePart[2], timePart[0], timePart[1], timePart[2]);
  }

  loadEvents(arrayOfEventObjects) {
    let failureArray = [], maximum_resource_height = this._cellHeight;
    try {
      for (let ev of arrayOfEventObjects) {
        // think about storing the Date on the event not only the initial strings
        // for performance reasons as comparing the Date (a number) with the visible range
        // could be faster like that?
        let startDate = this.parseDate(ev.start);
        let endDate = this.parseDate(ev.end);
        ev.minx = this.getXPos(startDate.getTime());
        ev.width = this.getWidth(startDate.getTime(), endDate.getTime());
        try {
          ev.miny = this.getYPos(ev.resource_id);
          this._resources.get(ev.resource_id).events.push(ev);
        } catch (err) {
          failureArray.push(ev);
        }
      }
    } catch (err) {
      console.log(err);
      throw new Error("Event Object Array does not match signature!");
    }
    // make the yPos values for each event match in case of overlaps
    let prevY = 0;
    this._resources.forEach((value, key, map) => {
      if (value.events.length) {
        value.yPos = prevY;
        let possibleMultiArray = this.separate(value.events);
        value.events = [];
        let maxHeightFactor = 0;
        let maxWidthOfEvent = 0;
        possibleMultiArray.forEach((ar) => {
          let helper = [];
          ar.sort(function (a, b) {
            if (a.start < b.start)
              return -1;
            if (a.start > b.start)
              return 1;
            return 0;
          });

          let cnt = ar.length;
          const isConflict = (x, w, lvl, id) => {
            const l = value.events.length;
            let e;
            for (let i = 0; i < l; i++) {
              e = value.events[i];
              //if(e.id != id) {
              if (e.miny == lvl && x <= e.minx + e.width && w >= e.minx) {
                return true;
              }
              //}
            }
            return false;
          };
          for (let e of ar) {
            let curLevel = 0;
            if (maxWidthOfEvent < e.width) {
              maxWidthOfEvent = e.width;
            }
            while (isConflict(e.minx, e.minx + e.width, value.yPos + curLevel * this._cellHeight + 1, e.id)) {
              curLevel++;
            }
            e.miny = value.yPos + curLevel * this._cellHeight + 1;
            value.events.push(e);
            if (curLevel > maxHeightFactor) {
              maxHeightFactor = curLevel;
            }
          }
        });
        maxHeightFactor += 1;
        value.max_event_width = maxWidthOfEvent;
        if (this._maxCellHeight < maxHeightFactor * this._cellHeight) {
          this._maxCellHeight = maxHeightFactor * this._cellHeight;
        }
        value.height = maxHeightFactor > 0 ? maxHeightFactor * this._cellHeight : this._cellHeight;
        prevY += value.height;
      } else {
        value.max_event_width = 0;
        value.height = this._cellHeight;
        value.yPos = prevY;
        prevY += this._cellHeight;
      }
    });
    this._bgHeight = prevY;
  }

  loadAndDrawEvents(events) {
    this.loadEvents(events);
    this.setSizesAndPositionsBeforeRedraw();
    this.drawDayLines();
    this.drawResources();
    this.drawEvents();
  }

  removeEvent(ev) {
     const { id, resource_id } = ev;
     if(id && resource_id) {
       const ref = this._resources.get(resource_id);
      if(!ref) {
        throw new Error("Resource not found");
      }
       let idx = ref.events.findIndex(function(item) {
         return item.id == id;
       });
       if(idx !== -1) {
         const removed = ref.events.splice(idx, 1)[0];
         this._adjustResourceRow(ref);
       } else {
         throw new Error("Event not found");
       }
     } else {
       throw new Error("Missing identifier id and/or resource_id");
     }
  }

  _adjustResourceRow(ref) {
    let prevHeight = ref.height;
    ref.events.forEach(function (ev) {
      ev.miny = ref.yPos + 1;
    });
    let possibleMultiArray = this.separate(ref.events);
    ref.events = [];
    let maxHeightF = 0;
    let maxWidthOfEvent = 0;
    possibleMultiArray.forEach((ar) => {
      ar.sort(function (a, b) {
        if (a.start < b.start)
          return -1;
        if (a.start > b.start)
          return 1;
        return 0;
      });

      const isConflict = (x, w, lvl, id) => {
        const l = ref.events.length;
        let e;
        for (let i = 0; i < l; i++) {
          e = ref.events[i];
          //if(e.id != id) {
          if (e.miny == lvl && (x <= e.minx + e.width && w >= e.minx)) {
            return true;
          }
          //}
        }
        return false;
      };

      for (let e of ar) {
        let curLevel = 0;
        if (maxWidthOfEvent < e.width) {
          maxWidthOfEvent = e.width;
        }
        while (isConflict(e.minx, e.minx + e.width, ref.yPos + curLevel * this._cellHeight + 1, e.id)) {
          curLevel++;
        }
        e.miny = ref.yPos + curLevel * this._cellHeight + 1;
        ref.events.push(e);
        if (curLevel > maxHeightF) {
          maxHeightF = curLevel;
        }
      }
    });
    maxHeightF += 1;
    ref.max_event_width = maxWidthOfEvent;
    if (this._maxCellHeight < maxHeightF * this._cellHeight) {
      this._maxCellHeight = maxHeightF * this._cellHeight;
    }
    ref.height = maxHeightF > 0 ? maxHeightF * this._cellHeight : this._cellHeight;
    const diff = ref.height - prevHeight;
    if (diff) {
      let ref2;
      this._bgHeight += diff;
      for (let i = ref.idx + 1; i < this._resources.size; i++) {
        ref2 = this._resources.get(this._resourcesIdx.get(i));
        ref2.yPos += diff;
        ref2.events.forEach(function (ev) {
          ev.miny += diff;
        });
      }
      this.setSizesAndPositionsBeforeRedraw();
      this.drawDayLines();
      this.drawResources();
      this.drawEvents();
    } else {
      this.drawEvents(ref);
    }
  }

  addEvent(ev) {
    const st = performance.now();
    const ref = this._resources.get(ev.resource_id);
    let prevHeight = ref.height;
    let startDate = this.parseDate(ev.start);
    let endDate = this.parseDate(ev.end);
    ev.minx = this.getXPos(startDate.getTime());
    ev.width = this.getWidth(startDate.getTime(), endDate.getTime());
    ev.miny = ref.yPos + 1;
    if (ref.events.length) {
      ref.events.push(ev);
     this._adjustResourceRow(ref);
    } else {
      ref.events.push(ev);
      ref.max_event_width = ev.width;
      ref.events.push(ev);
      this.drawEvents(ref);
    }
  }

  findEventByXY(ev) {
    const rect = ev.target.getBoundingClientRect();
    const x = ev.clientX - rect.left; //x position within the element.
    const y = ev.clientY - rect.top;
    let startIdx = y / this._maxCellHeight - 1;
    let endIdx = this._resources.size - 1;
    //this.findEventByXY(x, y, minIdx, this._resources.size - 1);
    // don't bother if no one is interested...
    if (!this._onEventFound) return;
    //startIdx = parseInt(startIdx) - 1;
    //endIdx = parseInt(endIdx);
    if (startIdx < 0) startIdx = 0;
    let ref;
    // binary search for events coming but it's more tricky as it's a range
    let start = startIdx, end = endIdx, id, mid;
    while (start <= end) {
      mid = Math.floor((start + end) / 2);
      id = this._resourcesIdx.get(mid);
      ref = this._resources.get(id);
      let l = ref.events.length, ev;
      if (ref.yPos <= y && ref.yPos + ref.height >= y) {
        for (let i = 0; i < l; i++) {
          ev = ref.events[i];
          if ((ev.minx <= x && ev.minx + ev.width >= x) && (ev.miny <= y && ev.miny + this._cellHeight - 1 >= y)) {
            return this._onEventFound(ev, ref.id);
          }
        }
        return;
      } else if (ref.yPos < y) {
        start = mid + 1;
      } else {
        end = mid - 1;
      }
    }
  }

  drawEvents(ref) {
    if(ref) {
      this._eventLayerCtx.clearRect(0, ref.yPos + 1, this._colsInTbl, ref.height);
      ref.events.forEach((ev) => {
        this._eventLayerCtx.fillStyle = ev.background || "#1CA1C1";
        this._eventLayerCtx.fillRect(ev.minx, ev.miny, ev.width, this._cellHeight - 1);
        this._eventLayerCtx.fillStyle = ev.color || "#ffffff";
        this._eventLayerCtx.fillText(ev.name, (ev.minx < 0 ? 4 : ev.minx + 4), ev.miny + 10);
      });
    } else {
      this._resources.forEach((r) => {
        r.events.forEach((ev) => {
          this._eventLayerCtx.fillStyle = ev.background || "#1CA1C1";
          this._eventLayerCtx.fillRect(ev.minx, ev.miny, ev.width, this._cellHeight - 1);
          this._eventLayerCtx.fillStyle = ev.color || "#ffffff";
          this._eventLayerCtx.fillText(ev.name, (ev.minx < 0 ? 4 : ev.minx + 4), ev.miny + 10);
        });
      });
    }
    this._eventLayerCtx.stroke();
  }

  separate(array) {
    array.sort((a, b) => {
      if (a.start < b.start)
        return -1;
      if (a.start > b.start)
        return 1;
      return 0;
    });
    const getMax = (array) => {
      if (array.length == 0) return false;
      array.sort(function (a, b) {
        if (a.end < b.end)
          return 1;
        if (a.end > b.end)
          return -1;
        return 0;
      });
      return array[0].end;
    };
    let retval = [];
    let z = 0;
    retval[z] = [array[0]];
    let l = array.length;
    for (let i = 1; i < l; i++) {
      if ((array[i].start >= array[i - 1].start)
        &&
        (array[i].start < getMax(retval[z]))
      ) {
        retval[z].push(array[i]);
      } else {
        z++;
        retval[z] = [array[i]];
      }
    }
    return retval;
  }

  setSizesAndPositionsBeforeRedraw() {
    this._resLayer.width = this._resHeaderLayer.width = this._resColWidth;
    this._resLayer.height = this._eventLayer.height = this._background.height = this._bgHeight; //cell_height * _resources.size;
    this._eventLayer.width = this._background.width = this._colsInTbl;
    this._headerLayer.width = this._colsInTbl + this._resColWidth;
    this._eventLayer.style.left = this._background.style.left = this._resColWidth + 'px';
    this._backgroundCtx.font = "12px Arial";
    this._eventLayerCtx.font = "12px Arial";
    this._resLayerCtx.font = "12px Arial";
    this._headerLayerCtx.font = "12px Arial";
    this._resHeaderLayerCtx.font = "12px Arial";
  }

  drawResources() {

    this._helpArray.forEach((obj) => {
      this._resHeaderLayerCtx.fillText(obj.name, obj.posX + 2, this._cellHeight / 2);
    });

    this._resHeaderLayerCtx.stroke();
    this._resLayerCtx.fillStyle = "#333";
    this._resLayerCtx.textBaseline = "top";
    this._resLayerCtx.lineWidth = 1;
    this._resLayerCtx.strokeStyle = '#eee';
    this._resLayerCtx.translate(0.5, 0.5);

    this._helpArray.forEach((obj, idx) => {
      if (idx) {
        this._resLayerCtx.moveTo(obj.posX, 0);
        this._resLayerCtx.lineTo(obj.posX, this._resLayer.height);
      }
    });
    this._resHeaderLayerCtx.translate(-0.5, -0.5);

    this._resources.forEach((value, key, map) => {
      this._helpArray.forEach((obj) => {
        this._resLayerCtx.fillText(value[obj.name], obj.posX, value.yPos)
      });
      this._resLayerCtx.moveTo(0, value.yPos);
      this._resLayerCtx.lineTo(this._resColWidth, value.yPos);
    });

    this._resLayerCtx.stroke();
  }

  drawDayLines() {
    let curDay = this._curFirstOfRange.getDay();
    let weekDate = new Date(this._curFirstOfRange);
    weekDate.setDate(weekDate.getDate() - 1);
    this._backgroundCtx.lineWidth = 1;
    this._backgroundCtx.translate(0.5, 0.5)
    this._backgroundCtx.strokeStyle = "#eee";
    this._headerLayerCtx.textBaseline = "top";
    this._headerLayerCtx.fillStyle = '#333';
    for (let i = 0; i < this._daysInRange; i++) {
      weekDate.setDate(weekDate.getDate() + 1);
      this._backgroundCtx.moveTo(i * this._cellWidth, 0);
      this._backgroundCtx.lineTo(i * this._cellWidth, this._bgHeight);
      this._headerLayerCtx.fillText(weekDate.getDate().toString(10), i * this._cellWidth + (this._cellWidth / 2) + this._resColWidth - this._numWidths[weekDate.getDate() - 1] / 2, 4);
      this._headerLayerCtx.fillText(this._days[weekDate.getDay()], i * this._cellWidth + (this._cellWidth / 2) + this._resColWidth - this._dayWidths[weekDate.getDay()] / 2, 16);

    }
    this._resources.forEach((value, key, map) => {
      this._backgroundCtx.moveTo(0, value.yPos);
      this._backgroundCtx.lineTo(this._colsInTbl, value.yPos);
    })
    this._backgroundCtx.translate(-0.5, -0.5);
    this._backgroundCtx.stroke();
    this._headerLayerCtx.stroke();
  }

  initCalendar(obj) {
    if (!obj.hasOwnProperty("resources")) {
      obj.resources = [];
    }
    if (obj.hasOwnProperty("sidecols")) {
      this.sidecols = obj.sidecols;
    }
    if (obj.hasOwnProperty("onEventFound")) {
      if (typeof obj.onEventFound === "function") {
        this._onEventFound = obj.onEventFound;
      }
    }
    if (obj.hasOwnProperty("inFrame")) {
      this._scheduler.style.height = "100vH";
      document.body.style.margin = "0";
    }
    if(obj.hasOwnProperty("viewType")) {
      if(obj.viewType === "month" || obj.viewType === "week") {
        this.setViewType(obj.viewType);
      } else {
        throw new Error("View Type must be month or week!");
      }
    }

    this.prepareResources(obj.resources);
    if (obj.hasOwnProperty("start")) {
      this.setRangeStartDate(obj.start);
    } else {
      this.setRangeStartDate(new Date());
    }
    this.setSizesAndPositionsBeforeRedraw();
    this.drawDayLines();
    this.drawResources();
  }

}

