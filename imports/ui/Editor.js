import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';
import React, { Component } from 'react';
import { browserHistory } from 'react-router';

import { Notes } from '../api/notes';

export class Editor extends Component {
  constructor(props){
    super(props);
    this.state= {
      title: '',
      body: ''
    };
  }
  handleTitleChange(e) {
    const { selectedNoteId, note } = this.props;
    const title = e.target.value;
    this.setState({ title });
    this.props.call('notes.update', selectedNoteId, { title });
  }
  handleBodyChange(e) {
    const { selectedNoteId, note } = this.props;
    const body = e.target.value;
    this.setState({ body });
    this.props.call('notes.update', selectedNoteId, { body });
  }
  handleRemoval() {
    const { selectedNoteId } = this.props;
    this.props.call('notes.remove', selectedNoteId);
    this.props.browserHistory.push('/dashboard');
  }
  componentDidUpdate(prevProps, prevState) {
    const currentNoteId = this.props.note ? this.props.note._id : undefined;
    const prevNoteId = prevProps.note ? prevProps.note._id : undefined;

    if (currentNoteId && currentNoteId !== prevNoteId) {
      this.setState({
        title: this.props.note.title,
        body: this.props.note.body
      });
    }
  }
  render() {
    const { selectedNoteId, note } = this.props;
    const { title, body } = this.state;
    if (note) {
      return (
        <div>
          <input type="text" value={title} onChange={this.handleTitleChange.bind(this)}/>
          <textarea value={body} placeholder="Your note here" onChange={this.handleBodyChange.bind(this)}></textarea>
          <button onClick={this.handleRemoval.bind(this)}>Delete Note</button>
        </div>
      );
    } else {
      return (
        <p>
          { selectedNoteId ? 'Note not found.' : 'Pick or create a note to get started.' }
        </p>
      );
    }
  }
};

Editor.propTypes = {
  note: React.PropTypes.object,
  selectedNoteId: React.PropTypes.string,
  call: React.PropTypes.func.isRequired,
  browserHistory: React.PropTypes.object.isRequired,
};

export default createContainer(() => {
  const selectedNoteId = Session.get('selectedNoteId');
  return {
    selectedNoteId,
    note: Notes.findOne(selectedNoteId),
    call: Meteor.call,
    browserHistory
  }
}, Editor);
