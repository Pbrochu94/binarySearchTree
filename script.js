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
      this.compare(element, nodeArray[root]);
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
  }
  compare(node, comparison) {
    if (node.value < comparison.value) {
      if (comparison.leftChild) {
        return this.compare(node, comparison.leftChild);
      }
      comparison.leftChild = node;
    }
    if (node.value > comparison.value) {
      if (comparison.rightChild) {
        return this.compare(node, comparison.rightChild);
      }
      comparison.rightChild = node;
    } else {
      return;
    }
  }
  insert(value) {
    let newNode = new Node(value);
    this.compare(newNode, this.root);
  }
  delete(value, comparison = this.root, parentNode = null) {
    if (value != comparison.value) {
      //if not corresponding value
      if (value < comparison.value) {
        this.delete(value, comparison.leftChild, comparison);
      }
      if (value > comparison.value) {
        this.delete(value, comparison.rightChild, comparison);
      }
    } else {
      if (parentNode === null) {
        comparison.rightChild.leftChild = this.root.leftChild;
        this.root = comparison.rightChild;
        return;
      }
      if (!comparison.leftChild && !comparison.rightChild) {
        //if corresponding value
        if (comparison.value < parentNode.value) {
          parentNode.leftChild = null;
        }
        if (comparison.value > parentNode.value) {
          parentNode.rightChild = null;
        }
      }
      if (comparison.leftChild && comparison.rightChild) {
        //if has 2 childs
        if (comparison.value < parentNode.value) {
          parentNode.leftChild = comparison.rightChild;
        }
        if (comparison.value > parentNode.value) {
          parentNode.rightChild = comparison.rightChild;
        }
      }
      if (comparison.leftChild) {
        //if only a left child
        if (comparison.value < parentNode.value) {
          parentNode.leftChild = comparison.leftChild;
        }
        if (comparison.value > parentNode.value) {
          parentNode.rightChild = comparison.leftChild;
        }
      }
      if (comparison.rightChild) {
        //if only a right child
        if (comparison.value < parentNode.value) {
          parentNode.leftChild = comparison.rightChild;
        }
        if (comparison.value > parentNode.value) {
          parentNode.rightChild = comparison.rightChild;
        }
      }
    }
  }
}

//Test------------------

let tree = new Tree([1, 1, 1, 1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

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

tree.delete(23);
prettyPrint(tree.root);
console.log(tree);
