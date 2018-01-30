
const defaultState = {
  redux: 100
}

const reducer = (state=defaultState, action) => {
  let _state = Object.assign({}, state)
  switch(action.type) {
    case 'ADD': 
      _state.redux++
  }
  return _state
}

export default reducer
