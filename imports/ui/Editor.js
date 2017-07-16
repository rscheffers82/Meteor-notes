import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';
import React, { Component } from 'react';

import { Notes } from '../api/notes';

export class Editor extends Component {
  handleTitleChange(e) {
    const { selectedNoteId, note, call } = this.props;
    call('notes.update', selectedNoteId, { title: e.target.value });
  }
  handleBodyChange(e) {
    const { selectedNoteId, note } = this.props;
    call('notes.update', selectedNoteId, {
      body: e.target.value
    });
  }
  render() {
    const { selectedNoteId, note } = this.props;
    if (note) {
      return (
        <div>
          <input type="text" value={note.title} onChange={this.handleTitleChange.bind(this)}/>
          <textarea value={note.body} placeholder="Your note here" onChange={this.handleBodyChange.bind(this)}></textarea>
          <button>Delete Note</button>
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
  call: React.PropTypes.function.isRequired,
};

export default createContainer(() => {
  const selectedNoteId = Session.get('selectedNoteId');
  return {
    selectedNoteId,
    note: Notes.findOne(selectedNoteId),
    call: Meteor.call
  }
}, Editor);
