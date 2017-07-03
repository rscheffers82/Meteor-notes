import { Meteor } from 'meteor/meteor';
import expect from 'expect';

import { validateNewUser } from './users';

if (Meteor.isServer) {
  describe('Users', () => {

    it('should allow valid email address', () => {
      const testUser = {
        emails: [
          { address: 'test@gmail.com' }
        ]
      }
      const res = validateNewUser(testUser);
      expect(res).toBe(true);
    });

    it('should reject invalid email', () => {
      const testUser = {
        emails: [
          { address: '413fda756jgh' }
        ]
      }
      expect(() => {
        validateNewUser(testUser);
      }).toThrow();
    });
  });
};


// const square = (a) => a * a;
//
// describe('Square', ()=> {
//   it('should square a number', function() {
//     const res = square(5);
//
//     expect(res).toBe(25);
//     }
//   });
// });
