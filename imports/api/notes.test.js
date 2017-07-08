import { Meteor } from 'meteor/meteor';
import expect from 'expect';

import { Notes } from './notes';
if(Meteor.isServer) {
  describe('Notes', () => {

    beforeEach(function () {
      Notes.remove({});
      Notes.insert({
        _id: 'testNoteId1',
        title: 'My Title',
        body: 'This is the body of the note',
        updatedAt: 123,
        userId: 'roy123'
      });
    });

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

    it('should remove note', () => {
      // apply (first argument sets the context, the this)
      // 2nd argument is an array with each value being the argument passed into the function that is called.
      Meteor.server.method_handlers['notes.remove'].apply({ userId: 'roy123' }, ['testNoteId1']);
      expect(Notes.findOne({ _id: 'testNoteId1' })).toNotExist();
    });

    it('should not remove note if not authenticated', () => {
      expect(() => {
        Meteor.server.method_handlers['notes.remove'].apply({}, ['testNoteId1']);
      }).toThrow();
    });
    
    it('should not remove note if invalid note _id', () => {
      expect(() => {
        Meteor.server.method_handlers['notes.remove'].apply({ userId: 'roy123' }, ['']);
      }).toThrow();
    });
  });
}
