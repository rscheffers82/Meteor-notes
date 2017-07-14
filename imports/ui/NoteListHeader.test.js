import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

import { NoteListHeader } from './NoteListHeader';

if (Meteor.isClient) {
  describe('NoteListHeader' , () => {
    it('it should call meteorCall on click', () => {
      const spy = expect.createSpy();
      const wrapper = mount( <NoteListHeader meteorCall={spy} />);

      wrapper.find('button').simulate('click');
      // expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith('notes.insert');
    });
  });
}
