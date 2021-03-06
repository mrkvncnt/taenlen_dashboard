import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchCells, stageCell } from '../../actions/cell_actions';
import StagedCell from './StagedCell';
import SavingsCell from './SavingsCell';
import Tickers from '../tickers/Tickers';
import Grid from './Grid';

const Cells = ({ staged, cells, fetchCells, stageCell, darkStyle }) => {

  const generateCell = label => {
    stageCell({
      label: label
    });
  };
  
  const displayStagedCell = () => {
    if (staged.label === 'cash' || staged.label === 'expenses') {
      return <StagedCell cell={staged} darkStyle={darkStyle} />;
    } else if (staged.label) {
      return <SavingsCell cell={staged} darkStyle={darkStyle} />;
    }
  };

  const displayGrid = () => {
    if (cells[0]) {
      return <Grid cells={cells} darkStyle={darkStyle}/>
    } else if (!staged.type) {
      return <h1 className="no-cells title">Your T&#230;nlen is Blank</h1>
    } 
  };

  useEffect(() => {
    fetchCells();
  }, [])

  return (
    <div id="cells" className="column">

      <Tickers generateCell={generateCell}/>

      <div id="staged" className="column">
        {displayStagedCell()}
      </div>
      

      <div id="grid" className="column">
        {displayGrid()}
      </div>

    </div>
  );
};

const msp = ({ cells }) => ({
  staged: cells.staged,
  cells: cells.all ? Object.values(cells.all) : [],
});

const mdp = dispatch => ({
  fetchCells: () => dispatch(fetchCells()),
  stageCell: cell => dispatch(stageCell(cell))
})

export default connect(msp, mdp)(Cells);

