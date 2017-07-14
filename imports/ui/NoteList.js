import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Notes } from '../api/notes';
import NoteListHeader from './NoteListHeader';

export const NoteList = (props) => {
  return (
      <div>
        <NoteListHeader />
        NoteList count: { props.notes.length }
      </div>
  );
};

NoteList.propTypes = {
  notes: React.PropTypes.array.isRequired
};

export default createContainer(() => {
  Meteor.subscribe('notes');

  // anything returned from createContainer will become props on the component.
  // createContainer is like tracker.autorun, when anything changes the component is re-rendered
  return {
    notes: Notes.find({}).fetch()
  }
}, NoteList);
