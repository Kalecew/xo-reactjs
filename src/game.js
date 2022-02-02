import {Component} from 'react'
import Board from './board'
import Move from './move'

export default class Game extends Component {
  state = {
    gameOver: false,
    isNextX: true,
    step: 0,
    history: [
      {squares: Array(9).fill(null)}
    ]
  }

  calculateWinner = (squares) => {
    const lines = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,5,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
    ]
    for (var i = 0; i < lines.length; i++) {
      const [a,b,c] = lines[i]
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
        return squares[a]
      }     
    }
    return null
  }

  createStatus = (winner, isNextX) => winner ? 'Winner: ' + winner : 'Next player: ' + (isNextX ? 'X' : 'O')

  createNewHistory = (i) => {
    const {isNextX,step,history} = this.state
    const result = Array.from(history)
    const newSquares = Array.from(result[step].squares)
    newSquares[i] = isNextX ? 'X' : 'O'
    result.push({squares: newSquares})
    return result
  }

  gameIsOver = (squares, i) => {
    if(this.calculateWinner(squares)) this.setState({gameOver: true})
    if(this.state.gameOver || this.calculateWinner(squares) || squares[i]) return true
    return false
  }

  click = (i) => {
    const {isNextX,step,history,gameOver} = this.state
    const squares = history[step].squares
    if(this.gameIsOver(squares, i)) return false   
    const newHistory = this.createNewHistory(i)
    this.setState({
      isNextX: !isNextX,
      step: step + 1,
      history: newHistory
    })
  }

  renderMoves = () => 
    this.state.history.map((item, i) => 
      <Move key={i} i={i} jumpTo={() => this.jumpTo(i)}/>
    )

  calculateIsNextX = (step) => (step % 2) ? false : true

  jumpTo = (i) => {
    this.setState({
      isNextX: this.calculateIsNextX(i),
      step: i
    })
  }

  render() {
    const {isNextX,step,history} = this.state
    const squares = history[step].squares
    const winner = this.calculateWinner(squares)
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