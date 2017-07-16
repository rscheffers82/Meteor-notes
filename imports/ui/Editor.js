import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';
import React, { Component } from 'react';

import { Notes } from '../api/notes';

export class Editor extends Component {
  render() {
    const { selectedNoteId, note } = this.props;
    if (note) {
      return (
        <p>We got the note! ID: {selectedNoteId}</p>
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
};

export default createContainer(() => {
  const selectedNoteId = Session.get('selectedNoteId');
  return {
    selectedNoteId,
    note: Notes.findOne(selectedNoteId)
  }
}, Editor);
