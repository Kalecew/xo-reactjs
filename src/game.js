import {Component} from 'react'
import Board from './board'
import Move from './move'
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

  renderMoves = () => this.state.history.map((item, i) => <Move i={i} jumpTo={() => this.jumpTo(i)}/>)

  jumpTo = (i) => {
    const {step, history} = this.state
    this.setState({
      isNextX: (step % 2) ? false : true,
      step: i,
      history: history
    })
  }

  render() {
    const {isNextX,step,history} = this.state
    const squares = history[step].squares
    const winner = calculateWinner(squares)
    const status = this.createStatus(winner,isNextX)
    
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