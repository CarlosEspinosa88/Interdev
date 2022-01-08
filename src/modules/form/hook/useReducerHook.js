import { useReducer } from 'react'

function useReducerHook () {
  const [state, dispatch] = useReducer(reducerStates, initialState)

  return {
   state,
   dispatch
  }
}
 
const initialState = {
  loading: false,
  disabled: true,
  sendData: false
}

function reducerStates(state, action) {
  switch (action.type) {
    case 'setDisabledButton': {
      return {
        ...state,
        disabled: action.payload.disabled
      }
    }
    case 'setLoadingButton': {
      return {
        ...state,
        loading: action.payload.loading,
        sendData: action.payload.sendData
      }
    }
  }
}

export default useReducerHook