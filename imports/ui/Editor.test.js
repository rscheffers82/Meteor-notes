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

    it('should update the note body on textarea change', () => {
      const wrapper = mount(<Editor note={notes[0]} selectedNoteId={notes[0]._id} call={call} browserHistory={browserHistory}/>);
      const newBody = 'This will be the text for the body';

      // simulate can take an object which will be passed into the function. In this case we need to recreate the event / e object that's passed into handleBodyChange
      wrapper.find('textarea').simulate('change', {
        target: {
          value: newBody
        }
      });

      expect(wrapper.state('body')).toBe(newBody);
      expect(call).toHaveBeenCalledWith('notes.update', notes[0]._id, {body: newBody });
      expect(wrapper.find('textarea').text()).toBe(newBody);
    });

    it('should update the note title on input change', () => {
      const wrapper = mount(<Editor note={notes[0]} selectedNoteId={notes[0]._id} call={call} browserHistory={browserHistory}/>);
      const newTitle = 'This will be the new title';

      wrapper.find('input').simulate('change', {
        target: {
          value: newTitle
        }
      });

      expect(wrapper.state('title')).toBe(newTitle);
      expect(call).toHaveBeenCalledWith('notes.update', notes[0]._id, { title: newTitle });
      expect(wrapper.find('input').props().value).toBe(newTitle);
    });

    it('should set state for new note', () => {
      const wrapper = mount(<Editor call={call} browserHistory={browserHistory}/>);

      wrapper.setProps({
        selectedNoteId: notes[0]._id,
        note: notes[0]
      });

      expect(wrapper.state('title')).toBe(notes[0].title);
      expect(wrapper.state('body')).toBe(notes[0].body);
    });

    it('should not set state if note prop not provided', () => {
      const wrapper = mount(<Editor call={call} browserHistory={browserHistory}/>);

      wrapper.setProps({
        selectedNoteId: notes[0]._id,
      });

      expect(wrapper.state('title')).toBe('');
      expect(wrapper.state('body')).toBe('');
    });
  });
}
