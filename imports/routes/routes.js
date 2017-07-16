import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

import Login from './../ui/Login';
import Signup from './../ui/Signup';
import Dashboard from './../ui/Dashboard';
import NotFound from './../ui/NotFound';

const unauthenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/dashboard'];

const onEnterPublicPage = () => {
  if (Meteor.userId()) {
    browserHistory.replace('/dashboard');
  }
}

const onEnterPrivatePage = () => {
  if (!Meteor.userId()) {
    browserHistory.replace('/');
  }
}

const onEnterNotePage = (nextState) => {
  if (!Meteor.userId()) {
    browserHistory.replace('/');
  } else {
    Session.set('selectedNoteId', nextState.params.id);
  }
}

export const onAuthChange = (isAuthenticated) => {
  const { pathname } = browserHistory.getCurrentLocation();
  const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
  const isAuthenticatedPage = authenticatedPages.includes(pathname);

  if(isUnauthenticatedPage && isAuthenticated) browserHistory.replace('/dashboard')
  else if(isAuthenticatedPage && !isAuthenticated) browserHistory.replace('/');

  console.log('pathname: ', pathname);
  console.log('isAuthenticated: ', isAuthenticated);
};

export const globalOnChange = (prevState, nextState) => {
  globalOnEnter(nextState);
};

export const globalOnEnter = (nextState) => {
  const lastRoute = nextState.routes[nextState.routes.length - 1];
  Session.set('currentPagePrivacy', lastRoute.privacy);
};

// privacy on below routes is a prop that isn't in the docs and self defined for own purposes
export const routes = (
  <Router history={browserHistory}>
    <Route onEnter={globalOnEnter} onChange={globalOnChange}>
      <Route path="/" component={Login} privacy="unauth" onEnter={onEnterPublicPage}/>
      <Route path="/signup" component={Signup} privacy="unauth" onEnter={onEnterPublicPage}/>
      <Route path="/dashboard" component={Dashboard} privacy="auth" onEnter={onEnterPrivatePage}/>
      <Route path="/dashboard/:id" component={Dashboard} privacy="auth" onEnter={onEnterNotePage}/>
      <Route path="*" component={NotFound} />
    </Route>
  </Router>
);
