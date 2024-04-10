import assert from "assert";
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

export class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  createList(arg) {
    assert(
      arg === undefined || Array.isArray(arg) || arg instanceof Object,
      "The argument must be undefined or array or list"
    );
    if (arg === undefined) {
      this.head = null;
      this.tail = null;
      return;
    }
    if (Array.isArray(arg)) {
      this.head = null;
      this.tail = null;
      for (let i = arg.length - 1; i >= 0; i--) {
        const newNode = new Node(arg[i]);
        newNode.next = this.head;
        this.head = newNode;
        if (this.tail === null) {
          this.tail = newNode;
        }
      }
      return;
    }
    assert(
      arg instanceof Object,
      "The item must be list to create a another list"
    );
    let currentNode = arg.head;
    while (currentNode !== null) {
      const newNode = new Node(currentNode.data);
      if (this.head === null) {
        this.head = newNode;
        this.tail = newNode;
      } else {
        this.tail.next = newNode;
        this.tail = newNode;
      }
      currentNode = currentNode.next;
    }
  }

  addItemToList(data) {
    assert(data !== null, "Data should not be empty");
    const newNode = new Node(data);
    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    return newNode;
  }

  arrayFromList() {
    assert(
      this.head !== null,
      "You must have items in list to convert it into array"
    );
    const array = [];
    let currentNode = this.head;
    while (currentNode !== null) {
      array.push(currentNode.data);
      currentNode = currentNode.next;
    }
    return array;
  }

  removeFromEnd() {
    assert(this.head !== null, "There are no elements in the list to remove");
    let currentNode = this.head;
    let previousNode = null;
    while (currentNode.next !== null) {
      previousNode = currentNode;
      currentNode = currentNode.next;
    }
    if (previousNode === null) {
      this.head = null;
      this.tail = null;
    } else {
      previousNode.next = null;
      this.tail = previousNode;
    }
    return currentNode.data;
  }

  removeSpecificNode(nodeToRemove) {
    assert(this.head !== null, "There are no elements in the list to remove");
    assert(
      nodeToRemove !== undefined,
      "Node should be defined in order to remove it"
    );

    let previousNode = null;
    let currentNode = this.head;

    // If the node to remove is the head
    if (currentNode === nodeToRemove) {
      this.head = currentNode.next;
      if (currentNode.next === null) {
        this.tail = null;
      }
      return currentNode.data;
    }

    // Traverse the list to find it
    while (currentNode !== null) {
      if (currentNode === nodeToRemove) {
        previousNode.next = currentNode.next;
        if (currentNode.next === null) {
          this.tail = previousNode;
        }
        return currentNode.data;
      }
      previousNode = currentNode;
      currentNode = currentNode.next;
    }
    return null;
  }
  getNodeFromPosition(position) {
    let pos = position;
    let currentNode = this.head;
    if (pos === 0) {
      return currentNode;
    }
    while (pos > 0 && currentNode) {
      currentNode = currentNode.next;
      pos--;
    }
    assert.notEqual(currentNode, null, "Enter valid position");
    return currentNode;
  }
  insertAfter(listNode, data) {
    assert(
      listNode !== undefined && listNode !== null,
      "You must define the position of node correctly"
    );
    assert(data !== null, "You must define what data must be added");

    const newNode = new Node(data);

    let currentNode = this.head;
    let previousNode = null;
    while (currentNode !== null) {
      if (currentNode === listNode) {
        newNode.next = currentNode.next;
        currentNode.next = newNode;
        if (currentNode === this.tail) {
          this.tail = newNode;
        }
        return newNode;
      }
      previousNode = currentNode;
      currentNode = currentNode.next;
    }

    return null;
  }

  insertBefore(listNode, data) {
    assert(
      listNode !== undefined || listNode !== null,
      "You must define the position of node correctly"
    );
    assert(data !== null, "You must define what data must be added");

    const newNode = new Node(data);
    let previousNode = null;
    let currentNode = this.head;
    while (currentNode !== null) {
      if (currentNode === listNode) {
        if (previousNode === null) {
          this.head = newNode;
        } else {
          previousNode.next = newNode;
        }
        newNode.next = currentNode;
        return newNode;
      }
      previousNode = currentNode;
      currentNode = currentNode.next;
    }
    return null;
  }

  static traverse(listRef, visit) {
    let currentNode = listRef.head;
    while (currentNode !== null) {
      visit(currentNode);
      currentNode = currentNode.next;
    }
  }
  filterList(predicate) {
    assert(
      this.head !== null,
      "You must have at least one node to filter the list"
    );
    const resultArr = this.arrayFromList();
    return resultArr.filter((nodeData) => predicate(nodeData));
  }
  isNumber(data) {
    return typeof data === "number";
  }
  isString(data) {
    return typeof data === "string";
  }
}
