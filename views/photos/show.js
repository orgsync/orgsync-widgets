//= require ../view

(function () {
  'use strict';

  var app = window.OrgSyncWidgets;

  var View = app.View;
  var jst = window.jst;

  app.PhotosShowView = View.extend({
    className: 'js-osw-photos-show osw-photos-show',

    template: jst['photos/show'],

    events: {
      'click img': 'next',
    },

    options: ['action'],

    initialize: function () {
      View.prototype.initialize.apply(this, arguments);
      this.comments = this.model.get('comments');
      this.comments.url = this.model.get('comments_url');
      this.comments.fetch();
    },

    render: function () {
      View.prototype.render.apply(this, arguments);
      this.views.commentsList = new app.ListView({
        el: this.$('.js-comments'),
        collection: this.comments,
        modelView: app.CommentsShowView,
        modelViewOptions: {tagName: 'li'},
        infiniteScroll: true
      });
      return this;
    },

    next: function () {
      if (this.action === 'redirect') return;
      this.model.set('selected', false);
      var photos = this.model.collection;
      if (!photos) return;
      var i = (photos.indexOf(this.model) + 1) % photos.length;
      photos.at(i).set('selected', true);
    }
  });
})();