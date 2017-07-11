import React from 'react';
import { Meteor } from 'meteor/meteor';
import expect from 'expect';
import { mount } from 'enzyme';
import { Login } from './Login';

if(Meteor.isClient) {
  describe('Login', () => {
    it('should show error messages', () => {
      const error = 'This is not working';
      const wrapper = mount( <Login loginWithPassword={() => {}}/>);
      wrapper.setState({ error });

      const pError = wrapper.find('p').text();
      expect(pError).toBe(error);

      wrapper.setState({ error: '' });
      expect(wrapper.find('p').length).toBe(0);
    });
  });
}
