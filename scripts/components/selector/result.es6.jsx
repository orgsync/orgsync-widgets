/** @jsx React.DOM */

import _str from 'underscore.string';
import Icon from 'components/icon';
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

  imageStyle: function () {
    var src = this.props.selectorItem.get('image_url');
    if (!src) return {};
    if (src[0] === '/') src = 'https://orgsync.com' + src;
    return {backgroundImage: "url('" + src + "')"};
  },

  icon: function () {
    var selectorItem = this.props.selectorItem;
    var name =
      this.props.selected ?
      'delete' :
        selectorItem.isArbitrary() ?
        'add' :
        _str.dasherize(selectorItem.get('type')).slice(1);
    return <Icon name={name} />;
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
        <div className='osw-image' style={this.imageStyle()} />
        <div className='osw-name'>{this.icon()}{this.name()}</div>
      </div>
    );
  }
});
