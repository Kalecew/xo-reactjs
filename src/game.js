import {Component} from 'react'
import Board from './board'

export default class Game extends Component {
  state = {
    isNextX: true,
    step: 0,
    history: [
      {squares: Array(9).fill(null)}
    ]
  }
  click = (i) => {
    const {isNextX,step,history} = this.state
    const currentHistory = Array.from(history)
    const currentSquares = Array.from(currentHistory[step].squares)
    currentSquares[i] = isNextX ? 'X' : 'O'
    currentHistory.push({squares: currentSquares})
    this.setState({
      isNextX: !isNextX,
      step: step + 1,
      history: currentHistory
    })
  }
  render() {
    console.log(this.state)
    const {isNextX,step,history} = this.state
    const currentState = history[step]
    const status = 'Next player: ' + (isNextX ? 'X' : 'O')
    return (
      <div className="game">
        <div className="game-board">
          <Board squares={currentState.squares} click={(i) => this.click(i)}/>
        </div>
        <div className="game-info">
          <div> {status} </div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    )
  }
}