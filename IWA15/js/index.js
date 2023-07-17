// scripts.js

const data = {
    lists: [
      ['first', [15, 11, 13, 7, 5]],
      ['second', [2, 6, 8, 4, 14, 12, 10]],
      ['third', [9, 3, 1]],
    ]
  };
  
  // Only edit below
  //locate the array in use
  const [first, second, third] = data.lists.map(([name, array]) => array);
  // Create an empty array to store the result  
  const result = [];
    // Compare the last elements of the indexs
  const extractBiggest = () => {
     // If the last element of the first array is bigger, remove and return it
    if (first[first.length - 1] > second[second.length - 1]) {
      return first.pop();
    }
  // If the last element of the second array is bigger (or equal), remove and return it
    return second.pop();
  };
  
  // Only edit above
  
  result.push(extractBiggest());
  result.push(extractBiggest());
  result.push(extractBiggest());
  result.push(extractBiggest());
  result.push(extractBiggest());
  
  result.push(extractBiggest());
  result.push(extractBiggest());
  result.push(extractBiggest());
  result.push(extractBiggest());
  result.push(extractBiggest());
  
  result.push(extractBiggest());
  result.push(extractBiggest());
  result.push(extractBiggest());
  result.push(extractBiggest());
  result.push(extractBiggest());
  
  console.log(result);
  