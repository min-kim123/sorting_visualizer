import React from 'react';
import {getMergeSortAnimations} from '../SA/SA.js';
import {getQuickSortAnimations} from '../SA/SA.js';
import {getHeapSortAnimations} from '../SA/SA.js';
import './SV.css'

const SPEED = 15;

export default class SV extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
    };
  }

  componentDidMount() {
    this.resetArray();
    this.test();
  }

  resetArray() {
    const array = [];
    for (let i = 0; i < 70; ++i) {
      array.push(random(5, 700));
    }
    this.setState({array});
  }

  mergeSort() {
    const animations = getMergeSortAnimations(this.state.array);
    console.log(animations);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {//ones that are being compared
        const [barOneIdx, barTwoIdx] = animations[i];
        const color = i % 3 === 0 ? 'red' : 'cyan';
        //if it's 1, 3, 4, 6, 7, 9, 10 AND it's a multiple of 3
        //3, 6, 9- then it is RED
        //else CYAN
        //3: red 4: cyan, 6: red 7: cyan, 9:red 10:cyan
        setTimeout(() => {
          arrayBars[barOneIdx].style.backgroundColor = color;
          arrayBars[barTwoIdx].style.backgroundColor = color;
        }, i * SPEED);
      } 
      else {
        setTimeout(() => {//bar height change
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * SPEED);
      }
    }
  }

  quickSort() {
    const animations = getQuickSortAnimations(this.state.array);
    console.log(animations);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 2 !== 2;
      const [barOneIdx, barTwoIdx] = animations[i];
      let color = 'cyan';
      if (i%2 === 0) {
        color = 'red';
      }
      else {
        color = 'cyan';
        setTimeout(() => {//bar height change
          console.log(arrayBars[barTwoIdx].style.height);

          let newBarOneHeight = arrayBars[barTwoIdx].style.height
          let newBarTwoHeight =  arrayBars[barOneIdx].style.height
          arrayBars[barOneIdx].style.height = newBarOneHeight;
          arrayBars[barTwoIdx].style.height =newBarTwoHeight;
 
          //barOneStyle.height = `${newHeight}px`;
        }, i * SPEED);

      }
      setTimeout(() => {
        arrayBars[barOneIdx].style.backgroundColor = color;
        arrayBars[barTwoIdx].style.backgroundColor = color;
      }, i * SPEED);

    }
  }

  heapSort() {

  }

  bubbleSort() {


  }
  //selection sort, insertion sort, counting sort?

  test() {
    for (let i = 0; i < 10; ++i) {
      const array = [];
      for (let i = 0; i < 70; ++i) {
        array.push(random(5, 700));
      }
      const builtInSort = array.slice().sort((a, b) => a-b);
      const mySort = getHeapSortAnimations(array);
      console.log(checkIfEqual(builtInSort, mySort));
    }
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

function checkIfEqual(arrayOne, arrayTwo) {
  if (arrayOne.length !== arrayTwo.length) return false;
  for (let i = 0; i < arrayOne.length; i++) {
    if (arrayOne[i] !== arrayTwo[i]) {
      return false;
    }
  }
  return true;
}