/* eslint-disable no-param-reassign */
/*
 * Reducers with redux-starter-kit use immer to allow us to describe in an imperative
 * way state changes, which is way faster and easier to write, read and understand than
 * writing usual reducers.
 *
 * Nothing is mutated here, refer to immer library to know how it works
 * (note: this description of immer here is useful because it is not an explicit
 * dependency of this project, as it is bundled in redux-starter-kit)
 */
import { createReducer } from 'redux-starter-kit'

import {
  USER_LOADING,
  USER_SUCCESS,
  USER_FAILURE,
} from '../actions/actionNames'

export default createReducer(
  {
    isLoading: false,
    user: null,
    err: null,
  },
  {
    [USER_LOADING]: (state) => {
      state.isLoading = true
      state.user = null
    },
    [USER_SUCCESS]: (state, { payload }) => {
      state.isLoading = false
      state.user = payload
    },
    [USER_FAILURE]: (state, { payload }) => {
      state.isLoading = false
      state.err = payload
    },
  },
)
