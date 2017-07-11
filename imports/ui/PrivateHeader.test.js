import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

import PrivateHeader from './PrivateHeader';

if (Meteor.isClient) {
  describe('PrivateHeader', () => {
    it('should set button text to logout', () => {
      const wrapper = mount( <PrivateHeader title="Test title" handleLogout={() =>{}} /> )
      const buttonText = wrapper.find('.button').text();

      expect(buttonText).toBe('Logout');
    });

    it('should use title prop as h1 text', () => {
      const title = 'Private header title';
      const wrapper = mount( <PrivateHeader title={title} handleLogout={() =>{}} />);
      const headerTitle = wrapper.find('h1').text();

      expect(headerTitle).toBe(title);
    });

    // it('should call the function (to test spies)', () => {
    //   const spy = expect.createSpy();
    //   spy(3,11);
    //   // expect(spy).toHaveBeenCalled();
    //   // expect(spy).toNotHaveBeenCalled();
    //   expect(spy).toHaveBeenCalledWith(3, 11);
    // });

    it('should call handleLogout on click', () => {
      const spy = expect.createSpy();
      const wrapper = mount( <PrivateHeader title="Test title" handleLogout={spy} /> );

      wrapper.find('.button').simulate('click');

      expect(spy).toHaveBeenCalled();
    });
  });
}

git commit -am 'add client test case of PrivateHeader logout functionality'
