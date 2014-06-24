import _ from 'underscore';
import moment from 'moment-timezone';

module Account from 'entities/account';
module Base from 'entities/base';
module Comment from 'entities/comment';
module EventFilter from 'entities/event-filter';
module EventOccurrence from 'entities/event-occurrence';
module Portal from 'entities/portal';

var cache = _.memoize(function (date, tz) {
  return date && date.length === 10 ?
    moment.tz(date, tz) :
    moment.utc(date).tz(tz);
}, function (date, tz) { return date + '/' + tz; });

export var mom = function (date, tz) { return cache(date, tz).clone(); };

export var getDaySpan = function (start, end, tz) {
  return Math.ceil(
    mom(end, tz).diff(mom(start, tz).startOf('day'), 'days', true)
  );
};

var Model = Base.Model.extend({
  relations: {
    portal: {hasOne: Portal, fk: 'portal_id'},
    creator: {hasOne: Account, fk: 'creator_id'},
    dates: {hasMany: EventOccurrence, fk: 'event_id'},
    comments: {hasMany: Comment}
  },

  parse: function (data) {
    data = _.clone(data);
    data.dates = this.get('dates').models.concat(data.dates);
    return data;
  },

  searchableWords: function () {
    if (this._searchableWords) return this._searchableWords;
    return this._searchableWords = _.str.words(_.values(
      this.pick('title', 'description', 'location')
    ).join(' ').toLowerCase());
  },

  matchesQuery: function (query) {
    if (!query) return true;
    var words = _.str.words(query.toLowerCase());
    var searchableWords = this.searchableWords();
    return _.every(words, function (wordA) {
      return _.any(searchableWords, function (wordB) {
        return _.str.startsWith(wordB, wordA);
      });
    });
  }
});

var Collection = Base.Collection.extend({
  model: Model,

  comparator: 'name',

  eventFilters: function () {
    if (this._eventFilters) return this._eventFilters;
    var eventFilters = this._eventFilters = new EventFilter.Collection();
    eventFilters.url = _.result(this, 'url') + '/filters';
    return eventFilters;
  },

  getEventOccurrences: function () {
    return new EventOccurrence.Collection(_.flatten(
      _.pluck(this.pluck('dates'), 'models')
    ));
  }
});

export {getDaySpan, Model, Collection};
