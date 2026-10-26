class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

export class BinaryTree {
  constructor(array) {
    this.root = this.buildTree(array);
  }

  buildTree(array) {
    if (!array || array.length === 0) {
      return null;
    }
    const uniqueArray = [...new Set(array)].sort((a, b) => a - b);

    return this.buildFromSortedArray(uniqueArray);

    }

  buildFromSortedArray(arr, left = 0, right = arr.length - 1) {
    if (left > right) {
      return null;
    }

    let mid = Math.floor((left + right) / 2);
    const node = new Node(arr[mid]);

    node.left = this.buildFromSortedArray(arr, left, mid - 1);
    node.right = this.buildFromSortedArray(arr, mid + 1, right);

    return node;
  }

  includes(value) { 
    return this.findNode(value) !== null;
  }
  
  insert(value) {
    let current = this.root;
    let parent = null;

    while(current) {
      parent = current;

      if (value < current.data) {
        current = current.left
      } else if (value > current.data) {
        current = current.right
      } else if (value === current.data){
        return;
      }
    }

    if (!parent) {
      this.root = new Node(value);
    } else if (value < parent.data) {
      parent.left = new Node(value);
    } else {
      parent.right = new Node(value);
    }
  }

  insertR(value) {
    this.root = this.insertRecursive(this.root, value)
  }

  insertRecursive(node, value) {
    if (node === null) return new Node(value);

    if (value < node.data) {
      node.left = this.insertRecursive(node.left, value)
    } else if (value > node.data) {
      node.right = this.insertRecursive(node.right, value);
    }

    return node;
  }

  inOrderForEach(callback) {
    if (typeof callback !== "function") throw new Error("A callback function is required");
    this.inOrderHelper(this.root, callback);
  }

  inOrderHelper(node, callback) {
    if(!node) return;
    this.inOrderHelper(node.left, callback);
    callback(node.data);
    this.inOrderHelper(node.right, callback);
  }

  preOrderForEach(callback) {
    if (typeof callback !== "function") throw new Error("A callback function is required");
    this.preOrderHelper(this.root, callback);
  }

  preOrderHelper(node, callback) {
    if(!node) return;
    callback(node.data);
    this.preOrderHelper(node.left, callback);
    this.preOrderHelper(node.right, callback);
  }

  postOrderForEach(callback) {
    if (typeof callback !== "function") throw new Error("A callback function is required");
    this.postOrderHelper(this.root, callback);
  }

  postOrderHelper(node, callback) {
    if(!node) return;
    this.postOrderHelper(node.left, callback);
    this.postOrderHelper(node.right, callback);
    callback(node.data);
  }

  levelOrderForEach(callback) {
    if (typeof callback !== "function") throw new Error("A callback function is required");
    if (!this.root) return;

    const queue = [this.root];

    while (queue.length > 0) {
      const node = queue.shift();
      callback(node.data);

      if (node.left) { queue.push(node.left);}
      if (node.right) { queue.push(node.right);}
    }
  }

  depth(value) {
    let count = 0;
    let cur = this.root;

    while(cur) {
      if(cur.data === value) {
        return count;
      }
      if(value < cur.data) {
        cur = cur.left;
      } else {
        cur = cur.right;
      }
      count++;
    }

    return undefined;
  }

  findNode(value) {
    let cur = this.root;
    while(cur) {
      if(value === cur.data) {
        break;
      } else if (value < cur.data) {
        cur = cur.left;
      } else {
        cur = cur.right;
      }
    }
    return cur;
  }

  height(value) {
    let cur = this.findNode(value);

    if(!cur) return undefined;
    return this.heightHelper(cur);
  }

  heightHelper(node) {
    if (!node) return -1;
    const leftHeight = this.heightHelper(node.left);
    const rightHeight = this.heightHelper(node.right);
    return Math.max(leftHeight, rightHeight) + 1;
  }

  findMinNode(node) {
    if (!node) return null;

    while (node.left) {
      node = node.left;
    }
    return node;
  }

  deleteHelper(node, value) {
    if (!node) return null;

    if (value < node.data) {
      node.left = this.deleteHelper(node.left, value);
    } else if (value > node.data) {
      node.right = this.deleteHelper(node.right, value);
    } else {
      if (!node.left) return node.right;
      if (!node.right) return node.left;

      const successor = this.findMinNode(node.right);
      node.data = successor.data;
      node.right = this.deleteHelper(node.right, successor.data);
    }
    return node;
  }

  deleteItem(value) {
    this.root = this.deleteHelper(this.root, value);
  }
  
  rebalance() {
    const arr = [];
    this.inOrderForEach(v => arr.push(v));
    this.root = this.buildTree(arr);
  }

  isBalanced() {
    return this.checkBalance(this.root) !== -2;
  }

  checkBalance(node) {
    if (!node) return -1;

    const leftHeight = this.checkBalance(node.left);
    if (leftHeight === -2) return -2;
    const rightHeight = this.checkBalance(node.right);
    if (rightHeight === -2) return -2;

    if (Math.abs(leftHeight - rightHeight) > 1) {
      return -2;
    }

    return Math.max(leftHeight, rightHeight) + 1;
  }
}