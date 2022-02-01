import {Component} from 'react'
import Board from './board'
import calculateWinner from './helpers/calculateWinner.js'

export default class Game extends Component {
  state = {
    isNextX: true,
    step: 0,
    history: [
      {squares: Array(9).fill(null)}
    ]
  }

  createNewHistory = (i) => {
    const {isNextX,step,history} = this.state
    const result = Array.from(history)
    const newSquares = Array.from(result[step].squares)
    newSquares[i] = isNextX ? 'X' : 'O'
    result.push({squares: newSquares})
    return result
  }

  stopClick = (squares, i) => calculateWinner(squares) || squares[i]

  createStatus = (winner, isNextX) => winner ? 'Winner: ' + winner : 'Next player: ' + (isNextX ? 'X' : 'O')

  createRecord = (i) => i ? 'Move #' + i : 'Game start'

  click = (i) => {
    const {isNextX,step,history} = this.state
    const squares = history[step].squares
    if(this.stopClick(squares, i)) return
    const newHistory = this.createNewHistory(i)
    this.setState({
      isNextX: !isNextX,
      step: step + 1,
      history: newHistory
    })
  }

  renderMoves = () => {
    const {history} = this.state
    return history.map((item, i) => {
      return (
        <li key={i}>
          <a href="#">{this.createRecord(i)}</a>
        </li>
      )
    })
  }

  render() {
    const {isNextX,step,history} = this.state
    const squares = history[step].squares
    const winner = calculateWinner(squares)
    let status = this.createStatus(winner,isNextX)
    
    return (
      <div className="game">
        <div className="game-board">
          <Board squares={squares} click={(i) => this.click(i)}/>
        </div>
        <div className="game-info">
          <div> {status} </div>
          <ul>{this.renderMoves()}</ul>
        </div>
      </div>
    )
  }
}