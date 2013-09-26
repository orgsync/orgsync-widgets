//= require ../../view

(function () {
  'use strict';

  var app = window.OrgSyncWidgets;

  var $ = window.jQuery;
  var _ = window._;
  var jst = window.jst;
  var View = app.View;

  var dirMap = {'37': -1, '39': 1};

  app.selectorViewMap['.js-osw-albums-index'] =
  app.AlbumsIndexView = View.extend({
    template: jst['albums/index/index'],

    options: ['portalId', 'action'],

    initialize: function () {
      View.prototype.initialize.apply(this, arguments);
      this.$el.addClass('orgsync-widget osw-albums-index');
      this.portal = new app.Portal({id: this.portalId});
      this.albums = this.portal.get('albums');
      this.$el.append($('<div>').addClass('js-loading'));
      this.albums.fetch({
        data: {per_page: 100},
        success: _.bind(this.render, this),
        error: _.bind(this.$el.text, this.$el, 'Load failed...')
      });
      _.bindAll(this, 'onKeyDown');
      $(document).on('keydown', this.onKeyDown);
    },

    render: function () {
      View.prototype.render.apply(this, arguments);
      this.renderAlbumList();
      return this;
    },

    renderAlbumList: function () {
      this.views.albumsList = new app.ListView({
        el: this.$('.js-list'),
        modelView: app.AlbumsIndexListItemView,
        modelViewOptions: {action: this.action},
        collection: this.albums,
        infiniteScroll: true
      });
    },

    onKeyDown: function (ev) { this.dir(dirMap[ev.which]); },

    dir: function (dir) {
      var selected = this.albums.findWhere({selected: true});
      if (!dir || !selected) return;
      if (selected.get('photos').findWhere({selected: true})) return;
      selected.set('selected', false);
      var l = this.albums.length;
      var i = (l + this.albums.indexOf(selected) + dir) % l;
      var albumsList = this.views.albumsList;
      while (i >= albumsList.collection.length) albumsList.nextPage(true);
      this.albums.at(i).set('selected', true);
    },

    remove: function () {
      $(document).off('keydown', this.onKeyDown);
      return View.prototype.remove.apply(this, arguments);
    }
  });
})();
