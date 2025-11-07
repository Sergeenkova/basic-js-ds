const { NotImplementedError } = require('../lib/errors');
const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor(){
    this.rootNode = null;
  }

  root() {
    return this.rootNode;
  }

  add(data) {
    this.rootNode = addWithin(this.rootNode, data);
    function addWithin (node, data) {
      if (!node) {
        return new Node(data);
      }
      if (node.data === data) {
        return node;
      }
      if (data < node.data) {
        node.left = addWithin(node.left, data);
      } else {
        node.right = addWithin(node.right, data);
      }
      return node;
    }
  };

  find(data) {
    let node = this.rootNode;
    while (node) {
      if (data === node.data) return node;
      node = data < node.data ? node.left : node.right;
    }
    return null;;
  }

  has(data) {
    return searchWithin(this.rootNode, data);
    function searchWithin (node, data) {
      if (!node) {
        return false;
      } 
      if (node.data === data) {
        return true;
      }
      return data < node.data ?
      searchWithin(node.left, data):
      searchWithin(node.right, data);
    }
  };

  remove(data) {
    this.rootNode = this.removeNode(this.rootNode, data);
  }
    removeNode(curNode, data) {
      if (!curNode) {
        return null;
      }
      if (data < curNode.data) {
        curNode.left = this.removeNode(curNode.left, data);
        return curNode;
      } else if (data > curNode.data) {
        curNode.right = this.removeNode(curNode.right, data); 
        return curNode;
      } else {
        if (!curNode.left && !curNode.right) {
          return null;
        }
        if (!curNode.left) {
          curNode = curNode.right;
          return curNode;
        }
        if (!curNode.right) {
          curNode = curNode.left;
          return curNode;
        }
        let minFromRight = curNode.right;
        while (minFromRight.left) {
          minFromRight = minFromRight.left;
        }
        curNode.data = minFromRight.data;
        curNode.right = this.removeNode(curNode.right, minFromRight.data);
        return curNode;
      }
    }
  
  min() {
    if (!this.rootNode) {
      return;
    }
    let minNode = this.rootNode;
    while(minNode.left) {
      minNode = minNode.left;
    }
    return minNode.data;
  }

  max() {
    if (!this.rootNode) {
      return;
    }
    let maxNode = this.rootNode;
    while (maxNode.right) {
      maxNode = maxNode.right;
    }
    return maxNode.data;
  }
}

module.exports = {
  BinarySearchTree
};