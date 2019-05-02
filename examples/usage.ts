import { createStore, AnyAction, Dispatch } from 'redux'
import { create } from './../src/index'

/**
 * Defining the state
 */

type Message = {
  username: string
  message: string
}

type ChatState = {
  messages: Message[]
}

const initialState: ChatState = {
  messages: []
}


/**
 * Creating the reducer
 */

type SendMessage = {
  username: string
  message: string
}

const sendMessage = create<ChatState, SendMessage>('SEND_MESSAGE', (state, message) => {
  return{
    ...state,
    messages:[
      ...state.messages,
      message
    ]
  }
})


/**
 * Using the reducer inside your rootReducer
 */

const reducersMap = {
  [sendMessage.type]: sendMessage.reducer
}

const rootReducer = (state: ChatState = initialState, action: AnyAction) => {
  if(reducersMap[action.type]){
    return reducersMap[action.type](state, action.payload || null)
  }
  return state
}

const store = createStore(rootReducer)


/**
 * How to dispatch actions
 */

// using store.dispatch directly
sendMessage.createDispatch(store.dispatch)({
  username: 'enqode',
  message: 'Hey there!',
})

// using react-redux's connect function
const mapDispatchToProps = (dispatch: Dispatch) => ({
  sendMessage: (message: string) => sendMessage.createDispatch(dispatch)({
    username: 'enqode',
    message
  })
})