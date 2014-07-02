/** @jsx React.DOM */

import _ from 'underscore';
import Cursors from 'cursors';
import List from 'react-list';
import ListItem from 'components/events/list-item';
import React from 'react';

import {getMoment} from 'entities/event';

var PREFIX_RE = /^(Yesterday|Today|Tomorrow)/;

export default React.createClass({
  mixins: [Cursors],

  renderEvent: function (event) {
    var i = this.state.allEvents.indexOf(event);
    return (
      <ListItem
        key={event.id}
        date={this.props.date}
        eventFilters={this.props.eventFilters}
        tz={this.props.tz}
        cursors={{event: this.getCursor('allEvents', i)}}
      />
    );
  },

  render: function () {
    var date = this.props.date;
    var dateMom = getMoment(date, this.props.tz);
    var prefix = PREFIX_RE.exec(dateMom.calendar()) || '';
    if (prefix) prefix = prefix[0] + ', ';
    return (
      <div className='osw-events-list-date'>
        <div className='osw-events-list-date-header'>
          {prefix + dateMom.format('dddd, MMMM D, YYYY')}
        </div>
        <List
          items={this.props.events}
          renderItem={this.renderEvent}
          uniform={true}
        />
      </div>
    );
  }
});