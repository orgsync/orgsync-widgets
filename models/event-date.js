//= require model

(function () {
  'use strict';

  var app = window.OrgSyncWidgets;

  var Model = app.Model;
  var moment = window.moment;

  var EventDate = app.EventDate = Model.extend({
    relations: {
      event: {hasOne: 'Event', fk: 'event_id'}
    },

    defaults: {
      tz: app.tz
    },

    initialize: function () {

      // When the timezone changes, we need to destroy the cached starts and
      // ends moment instances so they can be regenerated with their new time.
      this.on('change:tz', function () {
        delete this._starts_at;
        delete this._ends_at;
      });
    },

    start: function () { return this.normalize('starts_at'); },

    end: function () { return this.normalize('ends_at'); },

    normalize: function (which) {
      var key = '_' + which;
      if (this[key]) return this[key];
      var date = moment(this.get(which));
      var tz = this.get('tz');
      if (!this.get('event').get('is_all_day')) return date.tz(tz);

      // HACK: Until event occurrences is out, this is necessary for any
      // duration calculation to work as all day events return the same
      // starts_at and ends_at. This can be removed in the future (hopefully).
      if (which === 'ends_at') date.add('days', 1);

      // All day events should always be midnight to midnight in the timezone
      // they are being viewed in, regardless of the time zone they were created
      // in.
      return this[key] = moment.tz(app.Day.id(date), tz);
    },

    isMultiDay: function () {
      var startDay = this.start().clone().startOf('day');
      return startDay.add('days', 1).isBefore(this.end());
    },

    shortTime: function () {
      if (this.get('event').get('is_all_day')) return 'all day';
      if (!this.continued) return this.shortTimeFormat(this.start());
      if (this.continues) return 'all day';
      return 'ends ' + this.shortTimeFormat(this.end());
    },

    shortTimeFormat: function (date) {
      return date.format('h:mma').replace(':00', '').replace('m', '');
    },

    longTime: function () {
      var start = this.start();
      var end = this.end();
      var allDay = this.get('event').get('is_all_day');
      var multiDay = this.isMultiDay();
      if (!multiDay && allDay) return 'All Day';
      var format = allDay ? '[All Day]' : 'LT';
      if (multiDay) format += ', MMM D';
      return start.format(format) + ' to ' + end.format(format);
    }
  });

  EventDate.Collection = Model.Collection.extend({
    model: EventDate,

    comparator: function (eventDate) { return eventDate.start(); }
  });
})();
