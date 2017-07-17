import React from 'react';
import { Meteor } from 'meteor/meteor';
import { mount } from 'enzyme';
import expect from 'expect';

import { notes } from '../fixtures/fixtures';
import { Editor } from './Editor';

if (Meteor.isClient) {
  describe('Editor', () => {
    let browserHistory;
    let call;

    beforeEach(() => {
      call = expect.createSpy();
      browserHistory = {
        push: expect.createSpy()
      };
    });

    it('should render pick note message', () => {
      const wrapper = mount(<Editor call={call} browserHistory={browserHistory}/>);

      expect(wrapper.find('p').text()).toBe('Pick or create a note to get started.');
    });

    it('should render note not found message', () => {
      const wrapper = mount(<Editor selectedNoteId="NoteIdThatDoesNotExists" call={call} browserHistory={browserHistory}/>);

      expect(wrapper.find('p').text()).toBe('Note not found.');
    });

    it('should remove note', () => {
      const wrapper = mount(<Editor note={notes[0]} selectedNoteId={notes[0]._id} call={call} browserHistory={browserHistory}/>);

      wrapper.find('button').simulate('click');
      expect(call).toHaveBeenCalledWith('notes.remove', notes[0]._id);
      expect(browserHistory.push).toHaveBeenCalledWith('/dashboard');
    });

    it('four', () => {

    });
  });
}
