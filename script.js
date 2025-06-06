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
  buildTree(array) {
    removeDupe(array);
    //sort array in order
    array.sort((a, b) => {
      return a - b;
    });
    let root = Math.ceil(array.length / 2); //find root
    let nodeArray = changeToNode(array);
    nodeArray.forEach((element) => {
      compare(element, nodeArray[root]);
    });
    return nodeArray[root];
    //remove dupes in array
    function removeDupe(array) {
      for (let i = 0; i < array.length - 1; i++) {
        for (let x = array.length - 1; x > i; x--) {
          if (array[i] === array[x]) {
            array.splice(array[x], 1);
          }
        }
      }
    }
    function changeToNode(array) {
      let nodeArr = [];
      //change every value into a node
      array.forEach((element) => {
        let valueTurnedNode = new Node(element);
        nodeArr.push(valueTurnedNode);
      });
      array = [];
      return nodeArr;
    }
    function compare(node, comparison) {
      if (node.value < comparison.value) {
        if (comparison.leftChild) {
          return compare(node, comparison.leftChild);
        }
        comparison.leftChild = node;
      }
      if (node.value > comparison.value) {
        if (comparison.rightChild) {
          return compare(node, comparison.rightChild);
        }
        comparison.rightChild = node;
      } else {
        return;
      }
    }
  }
}

//Test------------------

let tree = new Tree([1, 1, 1, 1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

console.log(tree);

//To visualize tree-----------------
const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.rightChild !== null) {
    prettyPrint(node.rightChild, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
  if (node.leftChild !== null) {
    prettyPrint(node.leftChild, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

prettyPrint(tree.root);
