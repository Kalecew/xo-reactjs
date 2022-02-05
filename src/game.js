import {Component} from 'react'
import Board from './board'
import Move from './move'
import bg from './img/bg.jpg'

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

  createStatus = (winner) => {
    const {isNextX,gameOver} = this.state
    if (winner)
      return 'Winner: ' + winner
    else if (gameOver) 
      return 'Game over'
    else 
      return 'Next player: ' + (isNextX ? '✘' : '𝓞')
  }

  createNewHistory = (i) => {
    const {isNextX,step,history} = this.state
    const result = Array.from(history)
    const newSquares = Array.from(result[step].squares)
    newSquares[i] = isNextX ? '✘' : '𝓞'
    result.push({squares: newSquares})
    return result
  }

  squareIsLock = (squares, i) => {
    if(this.state.gameOver || this.calculateWinner(squares) || squares[i]) return true
    return false
  }

  gameIsOver = (squares) => {
    if(this.calculateWinner(squares) || squares.indexOf(null) === -1) 
      this.setState({gameOver: true})
  }

  click = (i) => {
    const {isNextX,step,history} = this.state
    const squares = history[step].squares
    if (this.squareIsLock(squares,i)) {
      return false  
    } else {
      const newHistory = this.createNewHistory(i)
      this.setState({
        isNextX: !isNextX,
        step: step + 1,
        history: newHistory
      })
      const newSquares = newHistory[step+1].squares
      this.gameIsOver(newSquares, i)
    }     
  }  

  calculateIsNextX = (step) => (step % 2) ? false : true

  jumpTo = (i) => {
    this.setState({
      isNextX: this.calculateIsNextX(i),
      step: i
    })
  }

  renderMoves = () => 
    this.state.history.map((item, i) => 
      <Move key={i} i={i} jumpTo={() => this.jumpTo(i)}/>
    )


  reset = () => this.setState({
    gameOver: false,
    isNextX: true,
    step: 0,
    history: [
      {squares: Array(9).fill(null)}
    ]
  })


  render() {
    const {step,history} = this.state
    const squares = history[step].squares
    const winner = this.calculateWinner(squares)
    const status = this.createStatus(winner)
    
    return (
      <div className="game" style={{ backgroundImage:`url(${bg})`}}>
        <div className="game__content">
          <div className="game__status">{status}</div>            
          <div className="game__moves moves">
            <ul className="moves__list">{this.renderMoves()}</ul>
          </div>            
          <Board squares={squares} click={(i) => this.click(i)}/>      
          <button className="game__reset" onClick={() => this.reset()}>⭯</button>        
        </div>                 
      </div>
    )
  }
}