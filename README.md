# Usage

````typescript
import { createStore, AnyAction } from 'redux'
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

const changeUsername = create<ChatState, SendMessage>('SEND_MESSAGE', (state, message) => {
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
  [changeUsername.type]: changeUsername.reducer
}

const rootReducer = (state: ChatState = initialState, action: AnyAction) => {
  if(reducersMap[action.type]){
    return reducersMap[action.type](state, action.payload || null)
  }
  return state
}

const store = createStore(rootReducer)
````
