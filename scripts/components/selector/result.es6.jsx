/** @jsx React.DOM */

import React from 'react';

export default React.createClass({
  onClick: function () {
    this.props.onClick(this.props.selectorItem);
  },

  className: function () {
    var classes = ['osw-selector-result'];
    if (this.props.selected) classes.push('osw-selected');
    if (this.props.active) classes.push('osw-active');
    return classes.join(' ');
  },

  name: function () {
    var selectorItem = this.props.selectorItem;
    var name = selectorItem.get('name');
    var verb = this.props.selected ? 'Remove' : 'Add';
    return selectorItem.isArbitrary() ? verb + ' "' + name + '"...' : name;
  },

  render: function () {
    return (
      <div className={this.className()} onClick={this.onClick}>
        <div className='osw-name'>{this.name()}</div>
      </div>
    );
  }
});
