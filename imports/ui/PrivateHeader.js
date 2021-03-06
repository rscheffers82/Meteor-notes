import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Accounts  } from 'meteor/accounts-base';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';

export const PrivateHeader = (props) => {
  const navImageSrc = props.isNavOpen ? '/images/x.svg' : '/images/bars.svg';

  return (
    <div className="header">
      <div className="header__content">
        <img className="header__nav-toggle" src={navImageSrc} onClick={props.toggleNav}/>
        <h1 className="header__title">{props.title}</h1>
        <a className="button button--link-text" onClick={() => props.handleLogout()}>Logout</a>
        {/* Accounts.logout() */}
      </div>
    </div>
  );
};

PrivateHeader.propTypes = {
  title: PropTypes.string.isRequired,
  handleLogout: PropTypes.func.isRequired,
  toggleNav: PropTypes.func.isRequired,
  isNavOpen: PropTypes.bool.isRequired,
};

export default createContainer(() => {
  return {
    handleLogout: () => Accounts.logout(),
    toggleNav: () => Session.set('isNavOpen', !Session.get('isNavOpen')),
    isNavOpen: Session.get('isNavOpen'),
  }
}, PrivateHeader);
