import React from 'react';
import Cell from '../Cell/Cell';

const Row = (props) => {
  let cells = props.cells.map((data, index) => { 
    return (
      <Cell key={index} data={data} openOrFlag={props.openOrFlag} mouseClick={props.mouseClick}/>
    );
  });

  return (
    <div className='row'>
      {cells}
    </div>
  );
};

export default Row;