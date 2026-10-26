import { BinaryTree } from "./binaryTree.js";

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null || node === undefined) {
    return;
  }

  prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
}

const randomArray = Array.from({ length: 20 }, () => Math.floor(Math.random() * 100));
const tree = new BinaryTree(randomArray);
prettyPrint(tree.root);
console.log(tree.isBalanced());
const arr1 = [];
const arr2 = [];
const arr3 = [];
const arr4 = [];
tree.inOrderForEach((value) => arr1.push(value));
tree.preOrderForEach((value) => arr2.push(value));
tree.postOrderForEach((value) => arr3.push(value));
tree.levelOrderForEach((value) => arr4.push(value));
console.log("In-order traversal:", arr1);
console.log("Pre-order traversal:", arr2);
console.log("Post-order traversal:", arr3);
console.log("Level-order traversal:", arr4);
tree.insert(101);
tree.insert(102);
tree.insert(103);
tree.insert(104);
prettyPrint(tree.root);
console.log(tree.isBalanced());
tree.rebalance();
console.log(tree.isBalanced());