import React from 'react';
import {getMergeSortAnimations} from '../SA/SA.js';
import './SV.css'

const SPEED = 1;

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
      array.push(random(5, 700));
    }
    this.setState({array});
  }

  mergeSort() {
    const animations = getMergeSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        console.log("iscolorchange");
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? 'red' : 'cyan';
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * SPEED);
      } else {
        setTimeout(() => {
          console.log("isnotcolorhange");
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * SPEED);
      }
    }
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