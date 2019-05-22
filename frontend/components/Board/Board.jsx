import React from 'react';
import Row from '../Row/Row';

class Board extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rows: this.createBoard(props),
    };

    this.openOrFlag = this.openOrFlag.bind(this);
    this.findMines = this.findMines.bind(this);
    this.findAroundCells = this.findAroundCells.bind(this);
  }

  createBoard (props) {
    let board = [];

    for (let i = 0; i < props.rows; i++) {
      board.push([]);

      for(let j = 0; j < props.columns; j++) {
        board[i].push({
          x: j,
          y: i,
          count: 0,
          isOpen: false,
          hasMine: false,
          hasFlag: false
        });
      }
    }

    // after we create the board, we add our mines

    for (let i = 0; i < props.mines; i++) {
      let randomRow = Math.floor(Math.random() * props.rows);
      let randomCol = Math.floor(Math.random() * props.columns);

      let cell = board[randomRow][randomCol];

      // to make sure there are no duplicate mines
      if (cell.hasMine) {
        i--;
      } else {
        cell.hasMine = true;
      }
    }
    return board;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.status === 'reset') {
      this.setState({ rows: this.createBoard(nextProps)})
    }
  }

  //A click on the cell with a mine loses the game. If not, it opens. Squares next to the opened tile
  //shows total number of mines. If adjacent cells have no mines, open it and check for info.
  openOrFlag(cell) {
    let rows = this.state.rows;
    let current = rows[cell.y][cell.x];

    if (this.props.status === 'lost' || this.props.status === 'won') {
      alert('Play again? Click Restart!')
    } else {
      if (event.button === 0) {
        //the promise of findMines that are then invoked to find the tiles
        // eslint-disable-next-line no-undef
        let asyncCountMines = new Promise(resolve => {
          resolve(this.findMines(cell)); //promise will resolve the mines and return integer
        });

        asyncCountMines.then(numberOfMines => {

          //Reset board if first cell opened is a mine, then open the new board.
          if (current.hasMine && this.props.openCells === 0) {
            console.log('cell already has mine. Restart!');
            this.setState({
              rows: this.createBoard(this.props)
            }, () => {
              this.openOrFlag(cell);
            });

          } else if (current.hasMine) {

            current.isOpen = true;
            this.props.loseGame();
          
          } else {
            if (!cell.hasFlag && !cell.isOpen) {
              this.props.openCellClick();

              current.isOpen = true;
              current.count = numberOfMines;

              this.setState({ rows });

              if (!current.hasMine && numberOfMines === 0) {
                this.findAroundCells(cell);
              }
            }
          }
          this.props.winGame();
        });
      //if right mouse click, plants flags
      } else if (event.button === 2) {
        let flagNumbers = this.state.usedFlags;
        
        if (!current.hasFlag) {
          current.hasFlag = true;
          this.props.updateStateCount("flags", "-");
          if (current.hasMine) {
              this.props.updateStateCount("mines", "-");
          }
        } else {
          current.hasFlag = false;
          this.props.updateStateCount("flags", "+");
          if (current.hasMine) {
            this.props.updateStateCount("mines", "+");
          }
        }
        
        this.setState({ rows }, () => this.props.winGame())
      } 
    }
  } 

  //open cells around the initial tile until a mine is reached.
  findAroundCells(cell) {
    let rows = this.state.rows;

    for (let row = -1; row <= 1; row++) {
      for (let col = -1; col <= 1; col++) {
        //check edge case, actual edge cases
        if (cell.y + row >= 0 && cell.x + col >= 0) {
          if (
            cell.y + row < rows.length &&
            cell.x + col < rows[0].length
          ) {
            //open the tiles continuously
            if (
              !(rows[cell.y + row][cell.x + col].hasMine) &&
              !(rows[cell.y + row][cell.x + col].isOpen)
            ) {
              this.openOrFlag(rows[cell.y + row][cell.x + col]);
            }
          }
        }
      }
    }
  }

  findMines(cell) {
    let minesInProximity = 0;

    //start the check at the tile in the row above the current tile and to the left.
    for (let row = -1; row <= 1; row++) {
      for (let col = -1; col <= 1; col++) {
        // check edge case, actual edge cases
        if (cell.y + row >= 0 && cell.x + col >= 0) {
          if (
            cell.y + row < this.state.rows.length &&
            cell.x + col < this.state.rows[0].length
          ) {
            // start adding the mines up
            if (
              this.state.rows[cell.y + row][cell.x + col].hasMine &&
              !(row === 0 && col === 0)
            ) {
              minesInProximity++;
            }
          }
        }
      }
    }

    return minesInProximity;
  }

  render() {
    let rows = this.state.rows.map((row, index) => {
      return (
        <Row
          key={index}
          cells={row}
          openOrFlag={this.openOrFlag}
          mouseClick={this.props.mouseClick}
          />
      );
    });

    return (
      <div className='board'>
        {rows}
      </div>
    );
  }
}

export default Board;