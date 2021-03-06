import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
        <div className="editor">
          <input className="editor__title" type="text" value={title} placeholder="Untitled note" onChange={this.handleTitleChange.bind(this)}/>
          <textarea className="editor__body" value={body} placeholder="Your note here" onChange={this.handleBodyChange.bind(this)}></textarea>
          <div>
            <button className="button button--secondary" onClick={this.handleRemoval.bind(this)}>Delete Note</button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="editor">
          <p className="editor__message">
            { selectedNoteId ? 'Note not found.' : 'Pick or create a note to get started.' }
          </p>
        </div>
      );
    }
  }
};

Editor.propTypes = {
  note: PropTypes.object,
  selectedNoteId: PropTypes.string,
  call: PropTypes.func.isRequired,
  browserHistory: PropTypes.object.isRequired,
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
