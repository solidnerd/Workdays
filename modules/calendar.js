var dav = require('dav');
var ical = require('ical.js');
var _ = require('lodash');

var calendar = {
  calendarName: '',
  server_adress: ''
  username: '',
  password: '',
  xhr: function(){
    return new dav.transport.Basic(
      new dav.Credentials({
        username: this.username,
        password: this.password
      })
    )
  },
  getEvents: function(){
    var xhr = this.xhr();
    return this.getCalendar().then(function(calendar){
      var events = [];

      for (var i = 0; i < calendar.objects.length; i++) {
        var jcal = ical.parse(calendar.objects[i].calendarData);
        var vcal = new ical.Component(jcal);
        var vevents = vcal.getAllSubcomponents("vevent");
        events.push(_.map(vevents, function(vevent){
           return {
             name: vevent.getFirstPropertyValue("summary"),
             starttime: ical.Time.fromData(vevent.getFirstPropertyValue("dtstart")).toUnixTime(),
             endtime: ical.Time.fromData(vevent.getFirstPropertyValue("dtend")).toUnixTime(),
             description: vevent.getFirstPropertyValue("description")
           }
         }));

      }
      return _.reduce(events, function(flattened, other){
        return flattened.concat(other);
      });
     })
      .catch(function(errorMessage){
        console.log('Sync Calendar Error: '+ errorMessage);
      });
  },
  getCalendar: function() {
    console.log('Server Adress: ' + this.server_adress);
    console.log('XHR: ' + this.xhr);
    var calendarName = this.calendarName;
    return dav.createAccount({ server: this.server_adress, xhr: this.xhr(), loadObjects: true})
    .then(function(account) {
        var matched = account.calendars.find(function(ele, i, array){
        return ele.displayName === calendarName;
      });
      console.log("Matched: " + matched.displayName);
      return matched;
    }).catch(function(error){
      console.log('Account Error: ' + error)
    });
  },

};
module.exports = calendar;
