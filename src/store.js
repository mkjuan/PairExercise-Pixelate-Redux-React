// We'll dive deeper into middleware later.
// For now, it's enough to know that this loggerMiddleware prints out useful
// information about everything that happens in your store.
// Much like requests in express pass from middleware to middleware, actions in redux
// pass from middleware to middleware. The loggerMiddleware gets a chance to see
// actions before they are processed. They get in the middle, hence, middleware.
import { createStore, applyMiddleware } from 'redux'
import loggerMiddleware from 'redux-logger'

// We'll soon revisit the initial state of this application.
const initialState = {
  grid: [
    Array(20).fill('')
  ],
  color: 'red'
}

// ACTION TYPES
/* we'll add some action types soon */
const ADD_ROW = 'ADD_ROW';
const CHANGE_COLOR = 'CHANGE_COLOR';
const DRAW = 'DRAW';

// ACTION CREATORS
/* we'll also add the corresponding action creators */
export const addRow = () => {
  return {
    type: ADD_ROW
  }
}

export const changeColor = (color) => {
  return {
    type: CHANGE_COLOR,
    color: color
  }
}

export const draw = (row,col) => {
  return {
    type: DRAW,
    row: row,
    col: col
  }
}

// And we'll revisit this reducer.
function reducer (state = initialState, action) {
  switch (action.type) {
    case ADD_ROW:
      const numCols = state.grid[0].length
      const newRow = Array(numCols).fill('')
      return {...state, grid: [...state.grid, newRow]}
    case CHANGE_COLOR:
      return {...state, color: action.color}
    case DRAW:
      const newGrid = [...state.grid]
      newGrid[action.row] = [...newGrid[action.row]]
      newGrid[action.row][action.col] = state.color
        return {...state, grid: newGrid}
    default:
      return state
  }
}

const store = createStore(
  reducer,
  applyMiddleware(loggerMiddleware)
)

export default store
