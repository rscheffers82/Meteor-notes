import React from 'react';
import { Meteor } from 'meteor/meteor';
import { mount } from 'enzyme';
import expect from 'expect';

import { NoteList } from './NoteList';
import NoteListItem from './NoteListItem';
import NoteListEmptyItem from './NoteListEmptyItem';

const notes = [
  {
    _id: 'noteId1',
    title: 'Test title',
    body: '',
    UpdatedAt: 0,
    userId: 'userId1',
  },{
    _id: 'noteId2',
    title: '',
    body: 'Body of the note',
    UpdatedAt: 0,
    userId: 'userId2',
  },
]

if (Meteor.isClient) {
  describe('NoteList', () => {
    it('should render NoteListItem for each note', () => {
      const wrapper = mount( <NoteList notes={notes}/> );

      expect(wrapper.find('NoteListItem').length).toBe(2);
      expect(wrapper.find('NoteListEmptyItem').length).toBe(0);

    });

    it('should render NoteListEmptyItem when zero notes', () => {
      const wrapper = mount( <NoteList notes={[]}/> );

      expect(wrapper.find('NoteListItem').length).toBe(0);
      expect(wrapper.find('NoteListEmptyItem').length).toBe(1);
    });
  });
}
