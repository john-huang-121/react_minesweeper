import React from 'react';

const Cell = (props) => {
  // console.log(props.mouseClick)
  let renderCell = () => {
    if (props.data.isOpen) {
      if (props.data.count === 0 && props.data.hasMine !== true) {
        return (
          <div className="cell open" onMouseDown={(e) => props.openOrFlag(props.data)}>

          </div>
        );
      } else if (props.data.hasMine) {
        return (
          <div className="cell" onMouseDown={(e) => props.openOrFlag(props.data)}>
            <div className='mine-pic' />
          </div>
        );
      } else {
        return (
          <div className="cell open count" onMouseDown={(e) => props.openOrFlag(props.data)}>
            {props.data.count}
          </div>
        );
      }
    } else {
      if (props.data.hasFlag) {
        return (
          <div className="cell flag" onMouseDown={(e) => props.openOrFlag(props.data)}>
            <div className='flag-pic' />
          </div>
        );
      } else {
        return (
          // <div className='cell' onMouseDown={(event) => props.mouseClick(event)}>
          <div className='cell' onMouseDown={(e) => props.openOrFlag(props.data)}>
          </div>
        );
      }
    }
  };

  return renderCell();
};

export default Cell;