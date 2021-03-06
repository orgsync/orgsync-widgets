import _ from 'underscore';
import Cursors from 'cursors';
import React from 'react';
import TextButton from '../ui/text-button';

export default React.createClass({
  mixins: [Cursors],

  getIndex: function () {
    return _.indexOf(this.state.path, this.props.file.id);
  },

  splicePath: function () {
    this.update({path: {$splice: [[this.getIndex() + 1, Infinity]]}});
  },

  render: function () {
    return (
      <span>
        {this.getIndex() > 0 ? ' / ' : ''}
        <TextButton onClick={this.splicePath}>
          {this.props.file.name}
        </TextButton>
      </span>
    );
  }
});
