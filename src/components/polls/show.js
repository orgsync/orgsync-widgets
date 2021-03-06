import api from '../../utils/api';
import Button from '../ui/button';
import ButtonRow from '../ui/button-row';
import CreatedBy from '../shared/created-by';
import Cursors from 'cursors';
import moment from 'moment';
import React from 'react';
import Results from './results';

var FORMAT = 'MMM D, YYYY';

export default React.createClass({
  mixins: [Cursors],

  propTypes: {
    portalId: React.PropTypes.number
  },

  getInitialState: function () {
    return {
      isLoading: false,
      error: null
    };
  },

  componentWillMount: function () {
    var poll = this.state.poll;
    if (poll.description != null) return;
    this.update({isLoading: {$set: true}, error: {$set: null}});
    api.get(
      '/portals/:portal_id/polls/:id',
      {portal_id: this.props.portalId, id: poll.id},
      this.handleFetch
    );
  },

  handleFetch: function (er, res) {
    var deltas = {isLoading: {$set: false}};
    if (er) deltas.error = {$set: er};
    else deltas.poll = {$set: res.data};
    this.update(deltas);
  },

  formatDate: function (dateString) {
    return moment(dateString).format(FORMAT);
  },

  renderStatus: function (poll) {
    if (!poll.is_open) {
      return (
        <p>
          This poll was open from {this.formatDate(poll.begins_at)} to
          {this.formatDate(poll.ends_at)}
        </p>
      );
    }
  },

  renderVoted: function (poll) {
    if (poll.has_voted) return <p>You have voted on this poll.</p>;
  },

  render: function () {
    var poll = this.state.poll;
    return (
      <div className='osw-polls-show'>

        <h3>{poll.name}</h3>

        {this.renderStatus(poll)}

        <CreatedBy account={poll.creator} createdAt={poll.created_at} />

        {this.renderVoted(poll)}

        <Results responses={this.state.poll.poll_options} />

        <div className='osw-button-row'>
          <ButtonRow>
            <Button href={poll.links.web} target='_parent'>
              View on OrgSync.com
            </Button>
          </ButtonRow>
        </div>
      </div>
    );
  }
});
