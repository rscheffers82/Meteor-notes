import React from 'react';
import { Meteor } from 'meteor/meteor';
import expect from 'expect';
import { mount } from 'enzyme';

import { Signup } from './Signup';

if(Meteor.isClient){

  describe('Signup', () => {
    it('should show error messages', () => {
      const error = 'This is not working';
      const wrapper = mount( <Signup createUser={() => {}}/>);
      wrapper.setState({ error });

      const pError = wrapper.find('p').text();
      expect(pError).toBe(error);

      wrapper.setState({ error: '' });
      expect(wrapper.find('p').length).toBe(0);
    });

    it('should call createUser with the form data', () => {
      const email = 'roy@gmail.com';
      const password = 'verySecure123!';
      const spy = expect.createSpy();
      const wrapper = mount( <Signup createUser={spy} /> );

      wrapper.ref('email').node.value = email;
      wrapper.ref('password').node.value = password;
      wrapper.find('form').simulate('submit');

      expect(spy.calls[0].arguments[0]).toEqual({ email, password });
    });

    it('should set error if short password', () => {
      const email = 'roy@gmail.com';
      const password = 'shrt';
      const spy = expect.createSpy();
      const wrapper = mount( <Signup createUser={spy} /> );

      wrapper.ref('email').node.value = email;
      wrapper.ref('password').node.value = password;
      wrapper.find('form').simulate('submit');

      expect(wrapper.state('error').length).toBeGreaterThan(0);
    });

    it('should set createUser callback errors', () => {
      const spy = expect.createSpy();
      const wrapper = mount( <Signup createUser={spy} /> );
      const password = '1234567890';
      const reason = 'Please check input';
      wrapper.ref('password').node.value = password;
      wrapper.find('form').simulate('submit');

      spy.calls[0].arguments[1]({ reason });
      expect(wrapper.state('error')).toBe(reason);

      spy.calls[0].arguments[1]();
      expect(wrapper.state('error')).toBe('');
    });
  });
}