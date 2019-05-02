import { create } from './index'

test('test create() function', () => {
  type MessagesState = { messages: string[]; }
  type AddMessagePayload = { message: string; }

  const actionType = 'ADD_MESSAGE'
  const addMessage = create<MessagesState, AddMessagePayload>(actionType, (state, { message }) => ({
    ...state,
    messages: [ ...state.messages, message ],
  }))

  expect(addMessage.type).toBe(actionType)

  // test .createAction()
  const message = 'I love types :-)'
  expect(addMessage.createAction({ message })).toEqual({
    type: 'ADD_MESSAGE',
    payload:{
      message
    }
  })

  // test .createDispatch()
  const reduxDispatchMock = jest.fn((action) => {
    console.log(action)
    expect(action).toEqual({
      type: 'ADD_MESSAGE',
      payload:{
        message: 'Hello fake dispatch'
      }
    })
  })
  const dispatch = addMessage.createDispatch(<any>reduxDispatchMock)
  dispatch({ message: 'Hello fake dispatch' })
  expect(reduxDispatchMock).toBeCalled()

  // test .reducer()
  const state0: MessagesState = {
    messages: []
  }
  const state1 = addMessage.reducer(state0, { message: 'Hey there!' })
  const state2 = addMessage.reducer(state1, { message: 'Hey back!' })
  expect(state2).toEqual({
    messages:[
      'Hey there!',
      'Hey back!'
    ]
  })
})