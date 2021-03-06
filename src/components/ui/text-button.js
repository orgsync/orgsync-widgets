import Button from './button';
import Cursors from 'cursors';
import React from 'react';

export default React.createClass({
  mixins: [Cursors],

  render: function () {
    return <Button {...this.props} baseClassName='osw-text-button' />;
  }
});
