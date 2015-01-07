import CommentsIndex from 'components/comments/index';
import Cursors from 'cursors';
import moment from 'moment';
import React from 'react';

export default React.createClass({
  mixins: [Cursors],

  render: function () {
    var newsPost = this.state.newsPost;
    return (
      <div className='osw-news-posts-show'>
        <div className='osw-news-posts-show-content'>
          <div className='osw-news-posts-show-title'>{newsPost.title}</div>
          <div className='osw-news-posts-show-creator'>
            {newsPost.creator.display_name}
          </div>
          <div className='osw-news-posts-show-time'>
            {moment(newsPost.created_at).fromNow()}
          </div>
          <div
            className='osw-news-posts-show-body'
            dangerouslySetInnerHTML={{__html: newsPost.body}}
          />
        </div>
        <CommentsIndex
          url={newsPost.links.comments}
          newUrl={newsPost.links.web}
          cursors={{comments: this.getCursor('newsPost', 'comments')}}
        />
      </div>
    );
  }
});