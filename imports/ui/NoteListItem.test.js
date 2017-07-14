import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import moment from 'moment';
import { Meteor } from 'meteor/meteor';

import NoteListItem from './NoteListItem';

if (Meteor.isClient){
  describe('NoteListItem', () => {
    it('should render title and timestamp', () => {
      const title = 'my test title';
      const updatedAt = 1500044422654; //
      const wrapper = mount( <NoteListItem note={{title, updatedAt }}/>);

      expect(wrapper.find('h5').text()).toBe(title);
      expect(wrapper.find('p').text()).toBe('14th Jul 2017'); // format => Do MMM YYYY

      // get a timestamp, two possible options \\
      // require('moment')().valueOf()
      // new Date().getTime();
    });

    it('should set default title if no title set', () => {
      const wrapper = mount( <NoteListItem note={ {title: ''} } />);
      expect(wrapper.find('h5').text()).toBe('Untitled note');
    });
  });
}
