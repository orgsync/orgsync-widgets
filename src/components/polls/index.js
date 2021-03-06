import _ from 'underscore';
import _str from 'underscore.string';
import api from '../../utils/api';
import Cursors from 'cursors';
import Empty from '../shared/empty';
import ErrorBlock from '../ui/error-block';
import Filters from './filters';
import FetchList from '../ui/fetch-list';
import LoadingBlock from '../ui/loading-block';
import PollsListItem from './list-item';
import React from 'react';

var PER_PAGE = 10;

export default React.createClass({
  mixins: [Cursors],

  propTypes: {
    /* Specify which portal's polls to retrieve */
    portalId: React.PropTypes.number,

    /* If you'd like to limit the number of polls to show, specify a number */
    limit: React.PropTypes.number
  },

  getDefaultProps: function () {
    return {
      category: '',
      polls: [],
      filtersAreShowing: true,
      query: '',
      searchableAttributes: ['name'],
      limit: null
    };
  },

  getInitialState: function () {
    return {
      category: this.props.category,
      polls: this.props.polls,
      query: this.props.query
    };
  },

  fetch: function (cb) {
    api.get('/portals/:portal_id/polls', {
      portal_id: this.props.portalId,
      limit: this.props.limit,
      page: Math.floor(this.state.polls.length / PER_PAGE) + 1,
      per_page: PER_PAGE
    }, _.partial(this.handleFetch, cb));
  },

  handleFetch: function (cb, er, res) {
    if (er) return cb(er);
    this.update({
      polls: {$set: _.unique(this.state.polls.concat(res.data), 'id')}
    });
    cb(null, res.data.length < PER_PAGE);
  },

  getFacet: function(poll) {
    if (poll.is_open) return 'Open';
    return 'Closed';
  },

  matchesCategory: function(poll) {
    var a = this.state.category;
    var b = this.getFacet(poll);
    return !a || a === b;
  },

  matchesQuery: function(poll) {
    var query = this.state.query;
    if (!query) return true;
    var words = _str.words(query.toLowerCase());
    var searchableWords = this.searchableWordsFor(poll);
    return _.every(words, function (wordA) {
      return _.any(searchableWords, function (wordB) {
        return _str.startsWith(wordB, wordA);
      });
    });
  },

  searchableWordsFor: function (poll) {
    return _str.words(
      _.values(_.pick(poll, this.props.searchableAttributes))
      .join(' ')
      .toLowerCase()
    );
  },

  pollMatchesFilters: function(poll) {
    return (
      this.matchesQuery(poll) &&
      this.matchesCategory(poll)
    );
  },

  getFilteredPolls: function() {
    return this.state.polls.filter(this.pollMatchesFilters);
  },

  renderFilters: function (polls) {
    if (!this.state.polls.length || !this.props.filtersAreShowing ||
      this.props.limit) return;
    return (
      <Filters
        polls={polls}
        getFacet={this.getFacet}
        cursors={{
          category: this.getCursor('category'),
          query: this.getCursor('query')
        }}
      />
    );
  },

  renderListItem: function (poll) {
    var i = this.state.polls.indexOf(poll);
    return (
      <PollsListItem
        {...this.props}
        key={poll.id}
        cursors={{poll: this.getCursor('polls', i)}}
      />
    );
  },

  renderLoading: function () {
    return <LoadingBlock />;
  },

  renderError: function (er) {
    return <ErrorBlock message={er.toString()} />;
  },

  renderEmpty: function () {
    return (
      <Empty
        objectName='polls'
        cursors={{
          query: this.getCursor('query'),
          category: this.getCursor('category')
        }}
      />
    );
  },

  render: function () {
    var polls = this.getFilteredPolls();
    return (
      <div className='osw-polls-index'>
        {this.renderFilters(polls)}
        <FetchList
          {...this.props}
          emptyRenderer={this.renderEmpty}
          errorRenderer={this.renderError}
          fetch={this.fetch}
          itemRenderer={this.renderListItem}
          items={polls}
          loadingRenderer={this.renderLoading}
          type='uniform'
        />
      </div>
    );
  }
});
