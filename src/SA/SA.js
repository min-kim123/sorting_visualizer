export function getMergeSortAnimations(array) {
  const animations=[];
  const auxiliaryArray = array.slice();//copy of array
  mergeSortHelper(array, 0, array.length-1, auxiliaryArray, animations);
  
  return animations;
}

export function getQuickSortAnimations(array) {
  const animations=[];
  quickSortHelper(array, 0, array.length-1, animations);
  console.log(array);
  return animations;
}

export function getHeapSortAnimations(array) {
  const animations=[];
  let n = array.length;
  heapSortHelper(array, n, animations);
  console.log(array);
  return array;
}

//HEAPSORT
function heapify(arr, n, i, animations) {
  let largest = i;
  let left = 2*i+1;
  let right = 2*i+2;
  if (left < n && arr[left] > arr[largest]) largest = left;
  if (right < n && arr[right] > arr[largest]) largest = right;
  if (largest != i) {
    swap(arr, i, largest);
    heapify(arr, n, largest);//heapify
  }
}

function heapSortHelper(arr, n, animations) {
  for (let i = n/2-1; i >= 0; --i) {
    heapify(arr, n, i, animations);
  }
  for (let i = n-1; i >= 0; --i) {
    swap(arr, 0, i);
    heapify(arr, i, 0, animations);
  }
}
//END HEAP SORT


//QUICKSORT
function partition(arr, start, end, animations) {
  let pivot = arr[end];
  let i = start-1;
  for (let j = start; j <= end-1; ++j) {
    if (arr[j] < pivot) {
      ++i;
      animations.push([i, j]);//change color
      animations.push([i, j]);//revert color
      swap(arr, i, j);
    }
  }
  swap(arr, i+1, end);
  animations.push([i+1, end]);//change color
  animations.push([i+1, end]);//revert color
  
  return (i+1);
}

function quickSortHelper(arr, start, end, animations) {
  if (start < end) {
    let j = partition(arr, start, end, animations);
    quickSortHelper(arr, start, j-1, animations);
    quickSortHelper(arr, j+1, end, animations);
  }
}
//END QUICKSORT

//START MERGESORT
function mergeSortHelper(mainArray, startIdx, endIdx, auxiliaryArray, animations) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx)/2);
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(auxiliaryArray, middleIdx +1, endIdx, mainArray, animations);
  merge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function merge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  while(i <= middleIdx && j <= endIdx) {
    animations.push([i, j]);//change color
    animations.push([i, j]);//revert color
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIdx) {//leftovers
    animations.push([i, i]);//change
    animations.push([i,i]);//revert
    animations.push([k, auxiliaryArray[i]]);
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIdx) {//leftovers
    animations.push([j, j]);//change
    animations.push([j,j]);//revert
    animations.push([k, auxiliaryArray[j]]);
    mainArray[k++] = auxiliaryArray[j++];
  }
}
//END MERGESORT

function swap(arr, i, j) {   //used by quicksort, heapsort
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}