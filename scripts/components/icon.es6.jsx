/** @jsx React.DOM */

import React from 'react';

export default React.createClass({
  render: function () {
    return this.transferPropsTo(
      <i className={'icon icon-' + this.props.name}></i>
    );
  }
});
