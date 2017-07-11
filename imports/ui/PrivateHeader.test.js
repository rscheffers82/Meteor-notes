import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

import PrivateHeader from './PrivateHeader';

if (Meteor.isClient) {
  describe('PrivateHeader', () => {
    it('should set button text to logout', () => {
      const wrapper = mount( <PrivateHeader title="Test title"/> )
      const buttonText = wrapper.find('.button').text();

      expect(buttonText).toBe('Logout');
    });

    it('should use title prop as h1 text', () => {
      const title = 'Private header title';
      const wrapper = mount( <PrivateHeader title={title} />);
      const headerTitle = wrapper.find('h1').text();

      expect(headerTitle).toBe(title);
    });

    // it('', () => {
    //
    // });
  });
}
