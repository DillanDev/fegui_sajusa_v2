"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tree = void 0;
const node_1 = require("./node");
// Binary Search tree class
class Tree {
    constructor() {
        this.cont = 0;
        // root of a binary search tree
        this.root = null;
    }
    // function to be implemented
    // insert(data)
    // remove(data)
    // Helper function
    // findMinNode()
    // getRootNode()
    // inorder(node)
    // preorder(node)               
    // postorder(node)
    // search(node, data)
    // helper method which creates a new node to
    // be inserted and calls insertNode
    insert(data) {
        // Creating a node and initailising
        // with data
        var newNode = new node_1.Node(data);
        // root is null then node will
        // be added to the tree and made root.
        if (this.root === null)
            this.root = newNode;
        else
            // find the correct position in the
            // tree and add the node
            this.insertNode(this.root, newNode);
    }
    // Method to insert a node in a tree
    // it moves over the tree to find the location
    // to insert a node with a given data
    insertNode(node, newNode) {
        // if the data is less than the node
        // data move left of the tree
        if (newNode.data < node.data) {
            // if left is null insert node here
            if (node.left === null)
                node.left = newNode;
            else
                // if left is not null recur until
                // null is found
                this.insertNode(node.left, newNode);
        }
        // if the data is more than the node
        // data move right of the tree
        else {
            // if right is null insert node here
            if (node.right === null)
                node.right = newNode;
            else
                // if right is not null recur until
                // null is found
                this.insertNode(node.right, newNode);
        }
    }
    // helper method that calls the 
    // removeNode with a given data
    remove(data) {
        // root is re-initialized with
        // root of a modified tree.
        this.root = this.removeNode(this.root, data);
    }
    // Method to remove node with a 
    // given data
    // it recur over the tree to find the
    // data and removes it
    removeNode(node, key) {
        // if the root is null then tree is 
        // empty
        if (node === null)
            return null;
        // if data to be delete is less than 
        // roots data then move to left subtree
        else if (key < node.data) {
            node.left = this.removeNode(node.left, key);
            return node;
        }
        // if data to be delete is greater than 
        // roots data then move to right subtree
        else if (key > node.data) {
            node.right = this.removeNode(node.right, key);
            return node;
        }
        // if data is similar to the root's data 
        // then delete this node
        else {
            // deleting node with no children
            if (node.left === null && node.right === null) {
                node = null;
                return node;
            }
            // deleting node with one children
            if (node.left === null) {
                node = node.right;
                return node;
            }
            else if (node.right === null) {
                node = node.left;
                return node;
            }
            // Deleting node with two children
            // minumum node of the rigt subtree
            // is stored in aux
            var aux = this.findMinNode(node.right);
            node.data = aux.data;
            node.right = this.removeNode(node.right, aux.data);
            return node;
        }
    }
    //  finds the minimum node in tree
    // searching starts from given node
    findMinNode(node) {
        // if left of a node is null
        // then it must be minimum node
        if (node.left === null)
            return node;
        else
            return this.findMinNode(node.left);
    }
    // Performs inorder traversal of a tree
    inorder(node) {
        if (node !== null) {
            this.inorder(node.left);
            node.data;
            this.inorder(node.right);
            this.cont = this.cont + 1;
            // return this._node;
        }
    }
}
exports.Tree = Tree;
