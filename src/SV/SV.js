import React from 'react';
import './SV.css'

export default class SV extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const array = [];
    for (let i = 0; i < 100; ++i) {
      array.push(random(5, 1000));
    }
    this.setState({array});
  }

  mergeSort() {

  }

  quickSort() {

  }

  heapSort() {

  }

  bubbleSort() {

    
  }
  render() {
    const {array} = this.state;
    return(
      <div className="array-container">
        {array.map((value, idx) => (
          <div className="array-bar"  style={{height: `${value}px`}}>
          </div>
        ))}
        <button onClick={()=>this.resetArray()}>Generate New Array</button>
        <button onClick={()=>this.mergeSort()}>Merge Sort</button>
        <button onClick={()=>this.quickSort()}>Quick Sort</button>
        <button onClick={()=>this.heapSort()}>Heap Sort</button>
        <button onClick={()=>this.bubbleSort()}>Bubble Sort</button>
      </div>
        
    );
  }

}

function random(min, max) {
  return Math.floor(Math.random()*(max-min+1) + min);
}