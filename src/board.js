import React from 'react'
import Cell from './cell'

const GameStatus = { 
    ONGOING: 0,
    STUCK: 1,
    WINNER_X: 2,
    WINNER_O: 3
}

const Player = {
    X: 'X',
    O: 'O'
}

class Board extends React.Component {
    constructor(props) {
        super(props)
        this.state = this.getInitialState()
    }
  
    getInitialState = () => ({
        cells: Array(9).fill(null),
        playerTurn: Player.X,
        status: GameStatus.ONGOING
    })
  
    reset() {
        this.setState(this.getInitialState())
    }

    componentDidMount() {
        this.props.provideRef(this)
    }

    componentWillUnmount() {
        this.props.provideRef(undefined)
    }
  
    handleCellClick(i) {
        let cells = this.state.cells.slice()
        let curStatus = this.state.status
        
        if (cells[i] || curStatus != GameStatus.ONGOING)
            return
        
        const nextTurn = this.state.playerTurn == Player.X? Player.O : Player.X
        cells[i] = nextTurn

        const status = this.calculateGameStatus(cells)

        this.setState({
            cells: cells,
            playerTurn: nextTurn,
            status: status
        })
    }
  
    renderSquare(i) {
        return <Cell value={this.state.cells[i]} onClick={() => this.handleCellClick(i) }/>
    }
  
    render() {
        const status = this.state.status
        let message
        switch(status) {
            case GameStatus.WINNER_X:
                message = 'Winner: X'
                break
            case GameStatus.WINNER_O:
                message = 'Winner: O'
                break
            case GameStatus.STUCK:
                message = 'STUCK!'
                break
            default:
                message = 'Next Player: ' + (this.state.playerTurn)
        }

        return (
            <div>
                <div className="status">{message}</div>

                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
        
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
        
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        )
    }

    calculateGameStatus(cells) {
        let winner = this.calculateWinner(cells)
        let boardFilled = cells.every(square => square)

        if (winner == Player.X)
            return GameStatus.WINNER_X
        else if (winner == Player.O)
            return GameStatus.WINNER_O
        else if (boardFilled)
            return GameStatus.STUCK

        return GameStatus.ONGOING
    }

    calculateWinner(cells) {
        const lines = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6],
        ]
        for (let i = 0; i < lines.length; i++) {
          const [a, b, c] = lines[i]
          if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
            return cells[a]
          }
        }
        return null
    }
  }

  export default Board