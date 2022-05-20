import {Component} from 'react'
import Board from './board'
import Move from './move'
import bg from './img/bg.jpg'

export default class Game extends Component {
  state = {
    gameOver: false,
    isNextX: true,
    currentStep: 0,
    lastStep: 0,
    winner: null,
    history: [
      {squares: Array(9).fill(null)}
    ]
  }

  lines = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ]

  calculateWinner = (squares) => {
    for (var i = 0; i < this.lines.length; i++) {
      const [a,b,c] = this.lines[i]
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
        return squares[a]
      }     
    }
    return null
  }

  createStatus = () => {
    const {isNextX,gameOver,lastStep,history,winner} = this.state
    const squares = history[lastStep].squares
    if (winner)
      return 'Winner: ' + winner
    else if (gameOver && squares.indexOf(null) === -1) 
      return 'Game over'
    else 
      return 'Next player: ' + (isNextX ? '✘' : '𝓞')
  }

  createNewHistory = (i) => {
    const {isNextX,lastStep,history} = this.state
    const result = Array.from(history)
    const newSquares = Array.from(result[lastStep].squares)
    newSquares[i] = isNextX ? '✘' : '𝓞'
    result.push({squares: newSquares})
    return result
  }

  squareIsLock = (squares, i) => {
    if(this.state.gameOver || this.state.winner || squares[i]) return true
    return false
  }

  gameIsOver = (squares) => {
    let winner
    if (winner = this.calculateWinner(squares)) 
      this.setState({gameOver: true, winner})
    if (squares.indexOf(null) === -1)
      this.setState({gameOver: true})
  }

  click = (i) => {
    const {isNextX,lastStep,history} = this.state
    this.setState({currentStep: lastStep})
    const squares = history[lastStep].squares
    if (this.squareIsLock(squares,i)) {
      return false  
    } else {
      const newHistory = this.createNewHistory(i)
      this.setState({
        isNextX: !isNextX,
        currentStep: lastStep + 1,
        lastStep: lastStep + 1,
        history: newHistory
      })
      const newSquares = newHistory[lastStep + 1].squares
      this.gameIsOver(newSquares, i)
    }     
  }  

  calculateIsNextX = (step) => (step % 2) ? false : true

  jumpTo = (i,e) => {
    e.preventDefault()
    this.setState({
      currentStep: i
    })
  }

  reset = () => this.setState({
    gameOver: false,
    isNextX: true,
    currentStep: 0,
    lastStep: 0,
    winner: null,
    history: [
      {squares: Array(9).fill(null)}
    ]
  })

  calculateLine = () => {
    const {history,lastStep} = this.state
    const squares = history[lastStep].squares
    for (var i = 0; i < this.lines.length; i++) {
      const [a,b,c] = this.lines[i]
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
        return i + 1
      }     
    }
    return null
  }

  renderMoves = (currentStep) => 
    this.state.history.map((item, i) => 
      <Move key={i} i={i} currentStep={currentStep} jumpTo={this.jumpTo}/>
    )

  render() {
    const {currentStep,lastStep,history,winner} = this.state
    const squares = history[currentStep].squares
    const status = this.createStatus()
    const line = this.calculateLine()
    
    return (
      <div className="game" style={{ backgroundImage:`url(${bg})`}}>
        <div className="game__content">
          <div className="game__status">{status}</div>            
          <div className="game__moves moves">
            <ul className="moves__list">{this.renderMoves(currentStep)}</ul>
          </div>            
          <Board squares={squares} winner={winner} currentStep={currentStep} lastStep={lastStep} line={line} click={(i) => this.click(i)}/>      
          <button className="game__reset" onClick={() => this.reset()}>↺</button>        
        </div>                 
      </div>
    )
  }
}