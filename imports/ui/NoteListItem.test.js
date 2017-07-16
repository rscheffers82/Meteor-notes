import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import moment from 'moment';
import { Meteor } from 'meteor/meteor';

import { notes } from '../fixtures/fixtures';
import { NoteListItem } from './NoteListItem';

if (Meteor.isClient){
  describe('NoteListItem', () => {
    let Session;

    beforeEach(() => {
      Session = {
        set: expect.createSpy()
      };
    });

    it('should render title and timestamp', () => {
      const wrapper = mount( <NoteListItem note={notes[0]} Session={Session}/>);

      expect(wrapper.find('h5').text()).toBe(notes[0].title);
      expect(wrapper.find('p').text()).toBe('6th Dec 1982'); // format => Do MMM YYYY

      // get a timestamp, two possible options \\
      // require('moment')().valueOf()
      // new Date().getTime();
    });

    it('should set default title if no title set', () => {
      const wrapper = mount( <NoteListItem note={notes[1]} Session={Session}/>);
      expect(wrapper.find('h5').text()).toBe('Untitled note');
    });

    it('should call set when a note is clicked', () => {
      const wrapper = mount( <NoteListItem note={notes[0]} Session={Session}/>);
      wrapper.find('div').simulate('click');

      expect(Session.set).toHaveBeenCalledWith('selectedNoteId', notes[0]._id);
    });
  });
}
