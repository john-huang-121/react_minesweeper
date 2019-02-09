import React from 'react';
import Board from '../Board/Board';
import BoardHead from '../BoardHead/BoardHead';

class Minesweeper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'waiting', //waiting, running, lost, won
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
  }

  componentDidMount() {
    this.intervals = [];
  }

  timerTick() {
    if (this.state.openCells > 0 && this.state.status === 'running') {
      let time = this.state.time + 1;
      this.setState({ time });
    }
  }

  setInterval(fn, time) {
    this.intervals.push(setInterval(fn, time));
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

  loseGame() {
    this.setState({ status: 'lost' }, () => {

    });
  }

  render() {
    return (
      <div className='game-browser'>
        <h1 className='game-title'>Minesweeper</h1>
        <BoardHead time={this.state.time} flagCount={this.state.flags} />
        <Board rows={this.state.rows}
          columns={this.state.columns}
          mines={this.state.mines}
          openCells={this.state.openCells}
          status={this.state.status}
          openCellClick={this.handleCellClick}
          loseGame={this.loseGame}
        />
      </div>
    );
  }
}

export default Minesweeper;