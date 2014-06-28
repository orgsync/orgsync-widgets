/** @jsx React.DOM */

import _ from 'underscore';
import Cursors from 'cursors';
import ListItem from 'components/events/list-item';
import React from 'react';

import {getMoment} from 'entities/event';

var PREFIX_RE = /^(Yesterday|Today|Tomorrow)/;

export default React.createClass({
  mixins: [Cursors],

  renderEvent: function (event) {
    return (
      <ListItem
        key={event.id}
        date={this.props.date}
        event={event}
        tz={this.props.tz}
      />
    );
  },

  render: function () {
    var date = this.props.date;
    var dateMom = getMoment(date, this.props.tz);
    var prefix = PREFIX_RE.exec(dateMom.calendar()) || '';
    if (prefix) prefix = prefix[0] + ', ';
    return (
      <div key={date}>
        <div className='osw-events-list-date'>
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
