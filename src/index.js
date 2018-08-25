import React from 'react';
import ReactDom from 'react-dom';
import './index.css';
import Board from './board'

class Game extends React.Component {
  handleResetClick() {
    this.board.reset()
  }
  
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board provideRef={board => (this.board = board)}/>
        </div>

        <br />
        <div className="game-board">
          <button onClick={() => this.handleResetClick()}> RESET </button>
        </div>

        <div className="game-info">
          <div> {/* Status */}</div>
          <ol> {/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

ReactDom.render(
  <Game />,
  document.getElementById('root')
)
