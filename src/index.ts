import { Dispatch as ReduxDispatch } from 'redux'

type Reducer<S, P> = (state: S, payload: P) => S

type Action<P> = {
  type: string
  payload: P
}

type Dispatch<P> = (payload: P) => void

type ActionDispatchReducer<S, P> = {
  type: string
  createAction(payload: P): Action<P>
  createDispatch(dispatch: ReduxDispatch): Dispatch<P>
  reducer: Reducer<S, P>
}

const create = <S, P>(type: string, reducer: Reducer<S, P>): ActionDispatchReducer<S, P> => {
  return{
    type,
    reducer,
    createAction: payload => ({ type, payload }),
    createDispatch: dispatch => payload => dispatch({ type, payload }),
  }
}

export{
  create
}