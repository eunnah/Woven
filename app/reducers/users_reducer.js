import merge from 'lodash/merge';


const defaultState = {
  currentUser: undefined,
  partner: undefined
}

const userReducer = (state=defaultState, action) => {
  Object.freeze(state);
  switch(action.type) {
    case 'RECEIVE_PAIR':
      return action.users;
    case 'RECEIVE_USER':
      return merge({}, state, {currentUser: action.user});
    case 'RESET_PAIR':
      return defaultState;
    default:
      return state;
  }
}

export default userReducer;
