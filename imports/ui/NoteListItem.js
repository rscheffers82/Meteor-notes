import React from 'react';
import moment from 'moment';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';

export const NoteListItem = (props) => {
  return (
    <div className={`item ${props.note.selected ? `item--selected` : ``}`} onClick={() => {
      props.Session.set('selectedNoteId', props.note._id);
    }}>
      <h5 className="item__title">{ props.note.title || 'Untitled note' }</h5>
      <p  className="item__subtitle">{ moment(props.note.updatedAt).format('Do MMM YYYY') }</p>
    </div>
  );
};

NoteListItem.propTypes = {
  note: React.PropTypes.object.isRequired,
  Session: React.PropTypes.object.isRequired
};

export default createContainer(() => {
  return { Session }
}, NoteListItem);
