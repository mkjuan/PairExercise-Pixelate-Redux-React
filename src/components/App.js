import React, { Component } from 'react'
import store, { addRow, changeColor, draw } from '../store'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = store.getState()
    this.handleAddRow = this.handleAddRow.bind(this)
    this.handleColor = this.handleColor.bind(this)
    this.changeCellColor = this.changeCellColor.bind(this)
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState());
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  handleAddRow(){
    store.dispatch(addRow())
  }

  handleColor(event){
    store.dispatch(changeColor(event.target.value))
  }

  changeCellColor(row, col) {
    event.preventDefault();
    store.dispatch(draw(row,col));
  }

  render() {
    return (
      <div id='pixelate'>
        <h1>Pixelate</h1>
        <div>
          <button id='add-row' onClick={this.handleAddRow}>Add a row</button>
          <select onChange={this.handleColor}>
            <option value="red">Red</option>
            <option value="orange">Orange</option>
            <option value="yellow">Yellow</option>
            <option value="green">Green</option>
            <option value="blue">Blue</option>
            <option value="indigo">Indigo</option>
            <option value="violet">Violet</option>
            <option value="black">Black</option>
            <option value="white">White</option>
            <option value="brown">Brown</option>
          </select>
        </div>
        <table>
          <tbody>
          {this.state.grid.map((row,rowIndex) => {
              return (
                <tr key={rowIndex}>
                  {row.map((color, cellIndex) => <td key={cellIndex} className={color} onClick={()=>this.changeCellColor(rowIndex,cellIndex)}></td>)}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }
}
