import React from 'react';
import moment from 'moment';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

const NoteListItem = (props) => {
  return (
    <div>
      <h5>{ props.note.title || 'Untitled note' }</h5>
      <p>{ moment(props.note.updatedAt).format('Do MMM YYYY') }</p>
    </div>
  );
};

NoteListItem.propTypes = {
  note: React.PropTypes.object.isRequired
};

export default NoteListItem;
