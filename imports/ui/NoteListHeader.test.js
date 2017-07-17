import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

import { NoteListHeader } from './NoteListHeader';
import { notes } from '../fixtures/fixtures';

if (Meteor.isClient) {
  describe('NoteListHeader' , () => {
    let meteorCall;
    let browserHistory;

    beforeEach(() => {
      meteorCall = expect.createSpy();
      Session = {
        set: expect.createSpy()
      };
    });

    it('it should call meteorCall on click', () => {
      const wrapper = mount(<NoteListHeader meteorCall={meteorCall} Session={Session}/>);

      wrapper.find('button').simulate('click');
      meteorCall.calls[0].arguments[1](undefined, notes[0]._id);

      expect(meteorCall.calls[0].arguments[0]).toBe('notes.insert');
      expect(Session.set).toHaveBeenCalledWith('selectedNoteId', notes[0]._id);
    });

    it('should not set session for failed insert', () => {
      const wrapper = mount(<NoteListHeader meteorCall={meteorCall} Session={Session}/>);

      wrapper.find('button').simulate('click');
      meteorCall.calls[0].arguments[1]({});

      expect(meteorCall.calls[0].arguments[0]).toBe('notes.insert');
      expect(Session.set).toNotHaveBeenCalled();      
    });
  });
}
