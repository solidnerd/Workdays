var calendarTransform = {
  transform: function(events){
    var results = []
    var counter = 0
    for (var i = 0; i < events.length; i++) {
      counter++;
      results.push({
       "id": counter,
       "title": events[i].name,
       "url": "http://example.com",
       "class": "event-important",
       "start": events[i].starttime*1000,// Milliseconds * 1000 is needed for Seconds in the Unix TimeStamp
       "end": events[i].endtime*1000 // Milliseconds
      });
    }
    return results;
  }
}
module.exports = calendarTransform;
