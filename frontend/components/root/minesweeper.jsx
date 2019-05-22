import React from 'react';
import Board from '../Board/Board';
import BoardHead from '../BoardHead/BoardHead';

class Minesweeper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'reset', //waiting, running, lost, won, reset
      rows: 10,
      columns: 10,
      flags: 10,
      mines: 10,
      time: 0,
      openCells: 0,
    };
    
    
    this.timerTick = this.timerTick.bind(this);
    this.setInterval = this.setInterval.bind(this);
    this.handleCellClick = this.handleCellClick.bind(this);
    this.loseGame = this.loseGame.bind(this);
    this.winGame = this.winGame.bind(this);
    this.resetGame = this.resetGame.bind(this);
    this.updateStateCount = this.updateStateCount.bind(this);
  }

  componentDidMount() {
    this.intervalName;
  }

  timerTick() {
    if (this.state.openCells > 0 && this.state.status === 'running') {
      let time = this.state.time + 1;
      this.setState({ time });
    }
  }

  setInterval(fn, time) {
    this.intervalName = setInterval(fn, time);
  }

  handleCellClick() {
    if (this.state.openCells === 0 && this.state.status !== 'running') {      
      this.setState({
        status: 'running',
      }, () => {
        this.setInterval(this.timerTick, 1000);
      });
    }

    //starts the timer by increasing openCells
    this.setState(previousState => {
      return { openCells: previousState.openCells + 1 };
    });
    
  }

  updateStateCount(whichState, updateValue) {
    if (whichState === 'flags') {
      let currentFlags = this.state.flags;
      
      if (updateValue === "+") {
        currentFlags++;
      } else if (updateValue === "-") {
        currentFlags--;
      }
      
      this.setState({ flags: currentFlags });
    } else if (whichState === 'mines') {
      let currentMines = this.state.mines;

      if (updateValue === "+") {
        currentMines++;
      } else if (updateValue === "-") {
        currentMines--;
      }

      this.setState({ mines: currentMines })
    }
  }

  loseGame() {
    this.setState({ status: 'lost' }, () => {
      alert('You lose!')
    });
  }

  winGame() {
    if (this.state.flags === 0 && this.state.mines === 0 && this.state.openCells === 90) {
      this.setState({ status: 'won' }, () => {
        alert('Congratulations! You\'ve won!');
      });
    }
  }

  resetGame() {
    this.intervals = [];
    clearInterval(this.intervalName);

    this.setState({
      status: 'reset',
      rows: 10,
      columns: 10,
      flags: 10,
      mines: 10,
      time: 0,
      openCells: 0,
    }, () => this.setState({ status: 'waiting'}));
  }

  render() {
    //this prevents the right click toolbar from showing up
    document.addEventListener('contextmenu', event => event.preventDefault());

    return (
      <div className='game-background'>
        <div className='game-browser'>
          <h1 className='game-title'>Minesweeper</h1>
          <BoardHead time={this.state.time} 
            flagCount={this.state.flags}
            resetGame={this.resetGame}
            status={this.state.status}
            />
          <Board rows={this.state.rows}
            columns={this.state.columns}
            mines={this.state.mines}
            flags={this.state.flags}
            openCells={this.state.openCells}
            status={this.state.status}
            openCellClick={this.handleCellClick}
            loseGame={this.loseGame}
            winGame={this.winGame}
            updateStateCount={this.updateStateCount}
            />
        </div>
      </div>
    );
  }
}

export default Minesweeper;