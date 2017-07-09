import { Meteor } from 'meteor/meteor';
import expect from 'expect';

import { Notes } from './notes';

if(Meteor.isServer) {
  describe('Notes', () => {

    const noteOne = {
      _id: 'testNoteId1',
      title: 'First set Title',
      body: 'This is the initial body of the note',
      updatedAt: 123,
      userId: 'roy123'
    };

    beforeEach(function () {
      Notes.remove({});
      Notes.insert(noteOne);
    });

    // insert test cases
    // ----------------------------------------------
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

    // remove test cases
    // ----------------------------------------------
    it('should remove note', () => {
      // apply (first argument sets the context, the this)
      // 2nd argument is an array with each value being the argument passed into the function that is called.
      Meteor.server.method_handlers['notes.remove'].apply({ userId: noteOne.userId }, [noteOne._id]);
      expect(Notes.findOne({ _id: noteOne._id })).toNotExist();
    });

    it('should not remove note if not authenticated', () => {
      expect(() => {
        Meteor.server.method_handlers['notes.remove'].apply({}, [noteOne._id]);
      }).toThrow();
    });

    it('should not remove note if invalid note _id', () => {
      expect(() => {
        Meteor.server.method_handlers['notes.remove'].apply({ userId: noteOne.userId });
      }).toThrow();
    });

    // update test cases
    // ----------------------------------------------
    it('it should update note', () => {
      const title = 'My Title';

      Meteor.server.method_handlers['notes.update'].apply({ userId: noteOne.userId }, [noteOne._id, { title }]);

      const res = Notes.findOne({ _id: noteOne._id });

      expect(res.updatedAt).toBeGreaterThan(noteOne.updatedAt);
      expect(res).toInclude({
        title,
        body: noteOne.body
      });
    });

    it('it should throw and error if extra properties are added to updates', () => {
      const updates = {
        name: 'Roy Scheffers'
      };
      expect(() => {
        Meteor.server.method_handlers['notes.update'].apply({ userId: noteOne.userId }, [noteOne._id, updates]);
      }).toThrow();
    });

    it('should not update note if user was not the creator', () => {
      const userId = 12345;
      const title = 'My new title';

      Meteor.server.method_handlers['notes.update'].apply({ userId }, [noteOne._id, { title }]);

      const res = Notes.findOne({ _id: noteOne._id });
      // assert that the note remains the same
      expect(res).toInclude(noteOne);
    });

    it('should not update note if unauthenticated', () => {
      expect(() => {
        Meteor.server.method_handlers['notes.update'].apply({}, [noteOne._id]);
      }).toThrow();
    });

    it('should not update note if invalid note _id', () => {
      expect(() => {
        Meteor.server.method_handlers['notes.update'].apply({ userId: noteOne.userId });
      }).toThrow();
    });
  });
}
