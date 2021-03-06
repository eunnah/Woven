import axios from 'axios';
import * as Keychain from 'react-native-keychain';
//
import {SIGNIN_URL, SIGNUP_URL} from '../api';
import {addAlert} from './alert_actions';
import {requestPair} from './user_actions';

exports.loginUser = (email, password) => {
  return function(dispatch) {
    return axios.post(SIGNIN_URL, {email, password}).then((response) => {
      var {user_id, token, connectionId} = response.data;
      Keychain.setGenericPassword(user_id, token)
        .then(function() {
          dispatch(authUser(user_id, connectionId));
          dispatch(requestPair(user_id));
        }).catch((error) => {
          dispatch(addAlert("Could not log in."));
        });
    }).catch((error) => {
      dispatch(addAlert("Could not log in. Invalid username / password, or your partner has not connected yet."));
    });
  };
};

exports.signupUser = (email, password, firstName, lastName, partnerEmail) => {
  return function(dispatch) {
    return axios.post(SIGNUP_URL, {email, password, firstName, lastName, partnerEmail}).then((response) => {
      var {user_id, token} = response.data;
      Keychain.setGenericPassword(user_id, token)
        .then(function() {
          dispatch(addAlert("Thanks for signing up! You may login once both partners have connected."));
        });
    }).catch((error) => {
      dispatch(addAlert("Could not sign up: E-mail already taken."));
    });
  };
};

var authUser = (user_id, connectionId) => {
  return {
    type: 'AUTH_USER',
    user_id,
    connectionId
  }
}

exports.unauthUser = {
  type: 'UNAUTH_USER'
}
