import React from 'react';
import { Meteor } from 'meteor/meteor';
import { mount } from 'enzyme';
import expect from 'expect';

import { notes } from '../fixtures/fixtures';
import { NoteList } from './NoteList';

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
