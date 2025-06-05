class Node {
  constructor(value) {
    this.value = value;
    this.leftChild = null;
    this.rightChild = null;
  }
}

class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
  }
  buildTree() {
    for (let i = 0; i < array.length - 1; i++) {
      //remove dupes in array
      for (let x = array.length - 1; x > i; x--) {
        if (array[i] === array[x]) {
          array.splice(array[x], 1);
        }
      }
    }
    array.sort((a, b) => {
      //sort array in order
      return a - b;
    });
    let root = Math.ceil(array.length / 2);
    console.log(array[root]);
    //create a new Tree var(root)
    //loop through the array and turn value into nodes

    return array;
  }
}

//Test------------------

console.log(
  buildTree([1, 1, 1, 1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]),
);
