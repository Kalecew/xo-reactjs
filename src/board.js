import {Component} from 'react'
import Square from './square'

export default class Board extends Component {
  
  renderSquare = (i) => {
    const {squares, click} = this.props 
    return <Square value={squares[i]} click={() => click(i)}/>
  }

  render() {
    const {winner,currentStep,lastStep,line} = this.props
    return (
      <div className={
          winner && currentStep === lastStep ? 
          "game__board board board--win board--win-"+line :
          "game__board board"
        }
      >
        {this.renderSquare(0)}
        {this.renderSquare(1)}
        {this.renderSquare(2)}
        {this.renderSquare(3)}
        {this.renderSquare(4)}
        {this.renderSquare(5)}
        {this.renderSquare(6)}
        {this.renderSquare(7)}
        {this.renderSquare(8)}
      </div>
    );
  }
}