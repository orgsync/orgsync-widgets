import _ from 'underscore';
import _str from 'underscore.string';
import * as app from '../../orgsync-widgets';
import {getTerm, getName} from './item';
import io from '../../utils/io';
import update from 'react-addons-update';

var FETCH_SIZE = 100;

var done = {};

export var parse = function (q) {
  return ((q || '') + '').replace(/\s+/g, ' ').trim().toLowerCase();
};

var filterValue = function (item, field) {
  if (item._type === 'portal') {
    if (field === 'portal_name') field = 'name';
    if (field === 'portal_short_name') field = 'short_name';
  }

  // HACK: This is necessary because of an ES bug, see
  // https://github.com/elasticsearch/elasticsearch/issues/8030
  if (field === 'portal_name') field = 'portal.name';
  if (field === 'portal_short_name') field = 'portal.short_name';

  if (field === 'name') return getName(item);

  var path = field.split('.');
  var value = item;
  while (value && path.length) value = value[path.shift()];
  return value;
};

var filter = function (item, q, options) {
  q = parse(q);
  if (!q) return true;
  var values = _.map(options.fields || ['name'], _.partial(filterValue, item));
  var searchableWords = _.unique(_str.words(values.join(' ').toLowerCase()));
  return _.every(_str.words(q), function (wordA) {
    return _.any(searchableWords, _.partial(_str.startsWith, _, wordA, 0));
  });
};

export var getQueryKey = function (options) {
  return _.compact([
    (options.scopes || []).map(getTerm).sort().join(
      options.union_scopes ? '+' : '-'
    ) || '_all',
    (options.types || []).slice().sort().join() || '_all',
    (options.boost_types || []).slice().sort().join() || 'none',
    (options.fields || []).slice().sort().join() || 'name',
    (JSON.stringify(options.where)),
    parse(options.q)
  ]).join(':');
};

var cacheItems = function (items, options) {
  var key = getQueryKey(options);
  var cached = (app.cache.get(key) || []).slice();
  if (options.overwrite) cached = [];
  _.each(items, function (item) { app.cache.set(getTerm(item), item); });
  app.cache.set(key, _.unique(cached.concat(_.map(items, getTerm))));
};

var getItemFromId = function (id) {
  return app.cache.get(id);
};

export var search = function (options) {

  // Store the original query, it will be used for filtering previous results.
  var q = options.q;
  var results = [];
  while (true) {
    var cached = app.cache.get(getQueryKey(options));
    if (cached) {
      cached = cached.map(getItemFromId);

      // If the current query matches the original query, there is an exact
      // match and there is no need to predict results.
      if (options.q === q) return cached;
      results = results.concat(cached.filter(_.partial(filter, _, q, options)));
    }
    if (!options.q) break;
    options = update(options, {q: {$set: parse(options.q.slice(0, -1))}});
  }
  return _.unique(results).slice(0, options.limit);
};

export var fetch = function (options, cb) {
  if (options.dataset) options = _.omit(options, 'q');
  var key = getQueryKey(options);
  var cached = app.cache.get(key) || [];
  var limit = options.limit || Infinity;
  options = _.clone(options);
  options.from = cached.length;
  options.size = Math.max(0, Math.min(limit - options.from, FETCH_SIZE));
  options.sort = 'name';
  if (options.dataset && !done[key]) {
    cacheItems(options.dataset, _.extend({overwrite: true}, options));
    done[key] = true;
  }
  if (done[key] || !options.size) return cb(null, true, options);
  io.emit('search', options, function (er, res) {
    if (er) return cb(er);
    var items = _.map(res.hits.hits, function (hit) {
      return _.extend({_type: hit._type}, hit._source);
    });
    cacheItems(items, options);
    cb(null, done[key] = items.length < options.size, options);
  });
};
