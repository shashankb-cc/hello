import assert from "assert";
import { isEqual } from "lodash";

/**
 * Creates a linked list.
 * @param {Array|Object|undefined} arg - The argument to create the list.
 * @returns {Object} An object representing the linked list with head and tail references.
 */
export function createList(arg) {
  assert(
    arg === undefined || Array.isArray(arg) || arg instanceof Object,
    "The argument must be undefined or array or list "
  );
  if (arg === undefined) {
    // if we call without any arguments
    return { head: null, tail: null };
  }
  if (Array.isArray(arg)) {
    // if we call this with array as an argument
    let head = null;
    let tail = null;
    for (let i = arg.length - 1; i >= 0; i--) {
      const newNode = { data: arg[i], next: head };
      head = newNode;
      if (tail === null) {
        tail = newNode;
      }
    }
    return { head, tail };
  }
  // if we call this with list as an argument
  assert(
    arg instanceof Object,
    "The item must be list to create a another list"
  );
  const newList = { head: null, tail: null };
  let head = null;
  let tail = null;
  let currentNode = arg.head;

  while (currentNode !== null) {
    const newNode = { data: currentNode.data, next: null };
    if (head === null) {
      head = newNode;
      newList.head = head;
      tail = newNode;
      newList.tail = tail;
    } else {
      tail.next = newNode;
      tail = newNode;
      newList.tail = tail;
    }
    currentNode = currentNode.next;
  }

  return newList;
}
/**
 * Adds data to the end of the list.
 * @param {Object} listRef - Reference to the linked list.
 * @param {*} data - The data to add to the list.
 * @returns {Object} The newly added node.
 */
export function addItemToList(listRef, data) {
  assert(
    listRef !== undefined && listRef !== null,
    "You must have atleast one node to add item to list"
  );
  assert(data !== null, "Data should not be empty");
  const newNode = { data, next: null };
  const listReference = listRef;
  if (listRef.head === null) {
    listReference.head = newNode;
    listReference.tail = newNode;
  } else {
    listReference.tail.next = newNode;
    listReference.tail = newNode;
  }
  return newNode;
}
/**
 * Converts a linked list to an array.
 * @param {Object} listRef - Reference to the linked list.
 * @returns {Array} An array containing the data from the linked list.
 */
export function arrayFromList(listRef) {
  assert(
    listRef !== undefined && listRef !== null,
    "You must have items in list to convert it into array"
  );
  const array = [];
  let lastNode = listRef.head;
  while (lastNode.next !== null) {
    array.push(lastNode.data);
    lastNode = lastNode.next;
  }
  array.push(lastNode.data);
  return array;
}
/**
 * Removes the last item from the list.
 * @param {Object} listRef - Reference to the linked list.
 * @returns {*} The data of the removed node.
 */
export function removeFromEnd(listRef) {
  assert(
    listRef !== undefined && listRef !== null && listRef.head !== null,
    "There are no elements in the list to remove"
  );
  let currentNode = listRef.head;
  let previousNode = null;
  const listReference = listRef;
  while (currentNode.next !== null) {
    previousNode = currentNode;
    currentNode = currentNode.next;
  }
  if (previousNode === null) {
    // if prevNode is null means it has only one node because it does not enter the loop
    listReference.head = null;
    listReference.tail = null;
  } else {
    previousNode.next = null;
    listReference.tail = previousNode;
  }
  return currentNode.data;
}
/**
 * Removes a specific item from the list.
 * if multiple dataitems are present it removes first instance
 * @param {Object} listRef - Reference to the linked list.
 * @param {*} itemToRemove - The item to remove from the list.
 * @returns {*} The data of the removed node.
 */
export function removeSpecificItem(listRef, itemToRemove) {
  assert(
    listRef !== undefined && listRef !== null,
    "There are no elements in the list to remove"
  );
  assert(
    itemToRemove !== undefined,
    "Item should be defined in order to remove that item"
  );
  let previousNode = null;
  let currentNode = listRef.head;
  const listReference = listRef;
  if (currentNode.next === null) {
    listReference.head = null;
    listReference.tail = null;
    return currentNode.data;
  }
  while (currentNode !== null) {
    if (isEqual(currentNode.data, itemToRemove)) {
      previousNode.next = currentNode.next;
      if (currentNode.next === null) {
        // we have reached last node
        listReference.tail = previousNode;
      }
      return currentNode.data;
    }
    previousNode = currentNode;
    currentNode = currentNode.next;
  }

  return null;
}
/**
 * Inserts a new node after a specified node.
 * @param {Object} listRef - Reference to the linked list.
 * @param {Object} listNode - The node after which the new node should be inserted.
 * @param {*} data - The data to add to the new node.
 * @returns {Object} The newly inserted node.
 */
export function insertAfter(listRef, listNode, data) {
  assert(
    listRef !== undefined && listRef !== null,
    "You must have atleast one node to add item to list"
  );
  assert(
    listNode !== undefined || listNode !== null,
    "You must define the position of node correctly"
  );
  assert(data !== null, "You must define what data must be added");

  const newNode = { data, next: null };

  let currentNode = listRef.head;
  let previousNode = null;
  const listReference = listRef;
  while (currentNode !== null) {
    if (currentNode === listNode) {
      if (previousNode === null) {
        // Inserting after head
        newNode.next = currentNode.next;
        currentNode.next = newNode;
        listReference.head = newNode;
      } else {
        newNode.next = currentNode.next;
        currentNode.next = newNode;
        if (currentNode === listRef.tail) {
          listReference.tail = newNode;
        }
      }

      return newNode;
    }
    previousNode = currentNode;
    currentNode = currentNode.next;
  }
  return null;
}
/**
 * Inserts a new node before a specified node.
 * @param {Object} listRef - Reference to the linked list.
 * @param {Object} listNode - The node before which the new node should be inserted.
 * @param {*} data - The data to add to the new node.
 * @returns {Object} The newly inserted node.
 */
export function insertBefore(listRef, listNode, data) {
  assert(
    listRef !== undefined && listRef !== null,
    "You must have atleast one node to add item to list"
  );
  assert(
    listNode !== undefined || listNode !== null,
    "You must define the position of node correctly"
  );
  assert(data !== null, "You must define what data must be added");

  const newNode = { data, next: null };
  let previousNode = null;
  let currentNode = listRef.head;
  const listReference = listRef;
  while (currentNode !== null) {
    if (currentNode === listNode) {
      if (previousNode === null) {
        listReference.head = newNode;
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
/**
 * Filters the list based on a predicate function.
 * @param {Object} listRef - Reference to the linked list.
 * @param {Function} predicate - The predicate function used for filtering.
 * @returns {Array} An array containing the filtered data.
 */
export function filterList(listRef, predicate) {
  assert(
    listRef !== undefined && listRef !== null,
    "You must have atleast one node to add item to list"
  );
  const resultArr = arrayFromList(listRef);
  return resultArr.filter((nodedata) => predicate(nodedata));
}
/**
 * Checks if the provided data is a number.
 * @param {*} data - The data to check.
 * @returns {boolean} true if the data is a number, otherwise false.
 */
export function isNumber(data) {
  return typeof data === "number";
}
/**
 * Checks if the provided data is a string.
 * @param {*} data - The data to check.
 * @returns {boolean} true if the data is a string, otherwise false.
 */
export function isString(data) {
  return typeof data === "string";
}
export function mockFunction() {
  function fn() {
    fn.mock = { count: fn.mock.count + 1 };
  }
  fn.mock = { count: 0 };
}
const mockFunctionCreator = mockFunction();

export function traverse(listRef, visit) {
  let currentNode = listRef.head;
  while (currentNode !== null) {
    visit(currentNode);
    currentNode = currentNode.next;
  }
}
