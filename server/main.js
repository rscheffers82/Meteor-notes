import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';

import '../imports/api/users';
import '../imports/startup/simple-schema-config';

Meteor.startup(() => {
});




// test code in startup function, but not applicable anymore for the running of the app.
  // code to run on server at startup

  // -- SimpleSchema example
  // const employeeSchema = new SimpleSchema({
  //   name: {
  //     type: String,
  //     min: 1,
  //     max: 200,
  //   },
  //   hourlyWage: {
  //     type: Number,
  //     min: 0,
  //   },
  //   email: {
  //     type: String,
  //     regEx: SimpleSchema.RegEx.Email
  //   }
  // });
  //
  // employeeSchema.validate({
  //   name: 'stuff',
  //   hourlyWage: 1,
  //   email: 'roy@gmail.com'
  // });
