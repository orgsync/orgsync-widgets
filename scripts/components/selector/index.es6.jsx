/** @jsx React.DOM */

import _ from 'underscore';
module Base from 'entities/base';
import CoercedPropsMixin from 'mixins/coerced-props';
import List from 'components/list';
import ListenersMixin from 'mixins/listeners';
import React from 'react';
module SelectorItem from 'entities/selector-item';
import SelectorResult from 'components/selector/result';
import SelectorScope from 'components/selector/scope';
import SelectorToken from 'components/selector/token';

export default React.createClass({
  mixins: [CoercedPropsMixin, ListenersMixin],

  getCoercedProps: function () {
    return {
      initialValue: {type: SelectorItem.Collection},
      scopes: {type: Base.Collection}
    };
  },

  getListeners: function () {
    return [{
      model: this.state.value,
      events: {
        'add remove': function () {
          this.forceUpdate();
          this.refs.results.forceUpdate();
        }
      }
    }];
  },

  getDefaultProps: function () {
    return {
      initialValue: [],
      scopes: [],
      hiddenInputName: 'selection',
      allowArbitrary: false,
      full: false,
      placeholder: 'Search...',
      renderPageSize: 20
    };
  },

  getInitialState: function () {
    return {
      value: this.props.initialValue.clone(),
      scope: this.props.scopes.first(),
      query: '',
      results: null,
      hasMouse: false,
      hasFocus: false,
      isActive: false,
      activeResultId: null
    };
  },

  componentWillMount: function () {
    this.cache = {};
    this.updateResults(this.state.scope, this.state.query);
  },

  onScopeClick: function (scope) {
    if (scope === this.state.scope) return;
    this.updateResults(scope, this.state.query);
    this.setState({scope: scope});
  },

  onQueryChange: function (ev) {
    this.setQuery(ev.target.value);
  },

  onKeyDown: function (ev) {
    var query = this.state.query;
    var key = ev.key;
    if (ev.ctrlKey) {
      if (ev.which === 80) key = 'ArrowUp';
      if (ev.which === 78) key = 'ArrowDown';
    }
    switch (key) {
    case 'Backspace':
      if (!query) return this.removeValue(this.state.value.last());
      break;
    case 'Enter':
      var selectorItem = this.state.results.get(this.state.activeResultId);
      if (this.state.value.get(selectorItem)) this.removeValue(selectorItem);
      else this.addValue(selectorItem);
      this.setQuery('');
      break;
    case 'Escape':
      if (query) {
        this.setQuery('');
      } else {
        this.refs.query.getDOMNode().blur();
        this.setState({isActive: false});
      }
      return false;
    case 'ArrowUp':
      this.incrActiveResult(-1);
      return false;
    case 'ArrowDown':
      this.incrActiveResult(1);
      return false;
    }
  },

  onClick: function () {
    this.refs.query.getDOMNode().focus();
  },

  onFocus: function () {
    this.setState({hasFocus: true, isActive: true});
  },

  onBlur: function () {
    this.setState({hasFocus: false, isActive: this.state.hasMouse});
  },

  onMouseEnter: function () {
    this.setState({hasMouse: true});
  },

  onMouseLeave: function () {
    this.setState({hasMouse: false, isActive: this.state.hasFocus});
  },

  addValue: function (selectorItem) {
    this.state.value.add(selectorItem);
  },

  removeValue: function (selectorItem) {
    this.state.value.remove(selectorItem);
  },

  setQuery: function (query) {
    if (query === this.state.query) return;
    this.updateResults(this.state.scope, query);
    this.setState({query: query});
  },

  updateResults: function (scope, query) {

    // Store current results in cache.
    var cache = this.cache[this.state.scope.id];
    if (!cache) cache = this.cache[this.state.scope.id] = {};
    this.previousResults = cache[this.state.query] = this.state.results;

    // Retrieve new results from cache.
    cache = this.cache[scope.id];
    if (!cache) cache = this.cache[scope.id] = {};
    var results = cache[query];
    if (!results) {
      results = cache[query] = new SelectorItem.Collection();
      if (this.props.allowArbitrary && query.trim()) results.add({name: query});
      results.on('add', function (selectorItem) {
        if (selectorItem !== this.firstActiveResult(results)) return;
        this.setActiveResult(selectorItem);
      }, this);
    }
    this.setState({results: results});
    this.setActiveResult(this.firstActiveResult(results));
  },

  incrActiveResult: function (dir) {
    var results = this.state.results;
    var current = results.get(this.state.activeResultId);
    var next;
    if (dir) next = results.at(results.indexOf(current) + dir);
    if (!next) next = current;
    this.setActiveResult(next);
    this.refs.results.scrollTo(next);
  },

  firstActiveResult: function (results) {
    var i = results.length > 1 && results.first().isArbitrary() ? 1 : 0;
    return results.at(i);
  },

  setActiveResult: function (selectorItem) {
    this.setState({activeResultId: (selectorItem || {}).id});
    if (this.isMounted()) this.refs.results.forceUpdate();
  },

  fetchOptions: function () {
    var options = {
      selected: _.pluck(this.state.value.models, 'id'),
      indicies: this.props.indicies,
      scopes:
        this.state.scope.id === '_all' ?
        this.props.scopes.without(this.props.scopes.get('_all')) :
        [this.state.scope]
    };
    if (this.state.query) options.q = this.state.query;
    return options;
  },

  asHiddenInputValue: function (selectorItem) {
    var fields = selectorItem.isArbitrary() ? ['name'] : ['type', 'id'];
    return selectorItem.pick.apply(selectorItem, fields);
  },

  className: function () {
    var classes = ['selector-index'];
    classes.push(this.props.full ? 'full' : 'mini');
    if (this.state.isActive) classes.push('active');
    return classes.join(' ');
  },

  onResultClick: function (selectorItem) {
    if (this.state.value.get(selectorItem)) this.removeValue(selectorItem);
    else this.addValue(selectorItem);
    this.setState({activeResultId: selectorItem.id});
    this.refs.results.forceUpdate();
  },

  renderHiddenInput: function () {
    return (
      <input
        name={this.props.hiddenInputName}
        type='hidden'
        value={JSON.stringify(this.state.value.map(this.asHiddenInputValue))}
      />
    );
  },

  renderToken: function (selectorItem, i) {
    return (
      <SelectorToken
        key={i}
        selectorItem={selectorItem}
        onRemoveClick={this.removeValue}
      />
    );
  },

  renderTokens: function () {
    return (
      <div className='tokens'>
        {this.state.value.map(this.renderToken)}
        {this.renderQuery()}
      </div>
    );
  },

  renderQuery: function () {
    return (
      <input
        ref='query'
        className='query'
        value={this.state.query}
        onChange={this.onQueryChange}
        placeholder={this.props.placeholder}
      />
    );
  },

  renderScope: function (scope, i) {
    return (
      <SelectorScope
        key={i}
        scope={scope}
        onClick={this.onScopeClick}
        selected={scope === this.state.scope}
      />
    );
  },

  renderScopes: function () {
    if (!this.props.full) return;
    return (
      <List
        className='scopes'
        key={this.state.scope.id}
        collection={this.props.scopes}
        renderListItem={this.renderScope}
        shouldFetch={false}
        uniform={true}
      />
    );
  },

  renderResult: function (selectorItem, i) {
    return (
      <SelectorResult
        key={i}
        selectorItem={selectorItem}
        onClick={this.onResultClick}
        selected={!!this.state.value.get(selectorItem)}
        active={selectorItem.id === this.state.activeResultId}
      />
    );
  },

  renderResults: function () {
    if (!this.props.full && !this.state.isActive) return;
    return (
      <List
        className='results'
        ref='results'
        key={JSON.stringify(_.pick(this.state, 'scope', 'query'))}
        collection={this.state.results}
        renderListItem={this.renderResult}
        fetchOptions={this.fetchOptions}
        uniform={true}
        renderPageSize={this.props.renderPageSize}
      />
    );
  },

  render: function () {
    return (
      <div
        className={this.className()}
        onClick={this.onClick}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        onKeyDown={this.onKeyDown}
      >
        {this.renderHiddenInput()}
        {this.renderTokens()}
        {this.renderScopes()}
        {this.renderResults()}
      </div>
    );
  }
});