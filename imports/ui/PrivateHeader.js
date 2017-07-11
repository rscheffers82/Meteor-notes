import React, { Component } from 'react';
import { Accounts  } from 'meteor/accounts-base';
import { createContainer } from 'meteor/react-meteor-data';

export const PrivateHeader = (props) => {
  return (
    <div className="header">
      <div className="header__content">
        <h1 className="header__title">{props.title}</h1>
        <a className="button button--link-text" onClick={() => props.handleLogout()}>Logout</a>
        {/* Accounts.logout() */}
      </div>
    </div>
  );
};

PrivateHeader.propTypes = {
  title: React.PropTypes.string.isRequired,
  handleLogout: React.PropTypes.func.isRequired,
};

export default createContainer(() => {
  return {
    handleLogout: () => Accounts.logout()
  }
}, PrivateHeader);
