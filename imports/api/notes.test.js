import { Meteor } from 'meteor/meteor';
import expect from 'expect';

import { Notes } from './notes';
if(Meteor.isServer) {
  describe('Notes', () => {
    it('should insert new note', () => {
      const userId = 12345;
      // use apply to call the function with this being {} object
      // Meteor.server.method_handlers[name of the method]() call any method
      const _id = Meteor.server.method_handlers['notes.insert'].apply({ userId });

      expect(Notes.findOne({ _id, userId })).toExist();
    });

    it('should not insert note if not authenticated', () => {
      expect( () => {
        Meteor.server.method_handles['notes.insert']();
      }).toThrow();
    });
  });
}
