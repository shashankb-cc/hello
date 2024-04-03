import assert from "assert";
import { isEqual } from "lodash";

export function createList(arg) {
  assert(
    arg === undefined || Array.isArray(arg) || arg instanceof Object,
    "The argument must be undefined or array or list "
  );
  if (arg === undefined) {
    //if we call without any arguments
    return { head: null, tail: null };
  } else if (Array.isArray(arg)) {
    //if we call this with array as an argument
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
  } else {
    //if we call this with list as an argument
    let newList = { head: null, tail: null };
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
}
/**
 * adds data to end of the list
 */
export function addItemToList(listRef, data) {
  assert(
    listRef !== undefined && listRef !== null,
    "You must have atleast one node to add item to list"
  );
  assert(data !== null, "Data should not be empty");
  const newNode = { data: data, next: null };
  if (listRef.head === null) {
    listRef.head = newNode;
    listRef.tail = newNode;
  } else {
    listRef.tail.next = newNode;
    listRef.tail = newNode;
  }
  return newNode;
}

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
export function removeFromEnd(listRef) {
  assert(
    listRef !== undefined && listRef !== null && listRef.head !== null,
    "There are no elements in the list to remove"
  );
  let currentNode = listRef.head;
  let previousNode = null;
  while (currentNode.next !== null) {
    previousNode = currentNode;
    currentNode = currentNode.next;
  }
  if (previousNode === null) {
    // if prevNode is null means it has only one node because it does not enter the loop
    listRef.head = null;
    listRef.tail = null;
  } else {
    previousNode.next = null;
    listRef.tail = previousNode;
  }
  return currentNode.data;
}

export function removeSpecificItem(listRef, nodeToRemove) {
  assert(
    listRef !== undefined && listRef !== null,
    "There are no elements in the list to remove"
  );
  let previousNode = null;
  let currentNode = listRef.head;
  if (currentNode.next === null) {
    listRef.head = null;
    listRef.tail = null;
    return currentNode.data;
  } else {
    while (currentNode !== null) {
      if (currentNode === nodeToRemove) {
        previousNode.next = currentNode.next;
        if (currentNode.next === null) {
          // we have reached last node
          listRef.tail = previousNode;
        }
        return currentNode.data;
      }
      previousNode = currentNode;
      currentNode = currentNode.next;
    }
  }
}

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

  let currentNode = listRef.head;

  while (currentNode !== null) {
    if (currentNode === listNode) {
      let newNode = { data: data, next: null };
      newNode.next = currentNode.next;
      currentNode.next = newNode;
      return newNode;
    }
    currentNode = currentNode.next;
  }
}

// export function insertBefore(listRef, listNode, data) {
//   assert(
//     listRef !== undefined && listRef !== null,
//     "You must have atleast one node to add item to list"
//   );
//   assert(
//     listNode !== undefined || listNode !== null,
//     "You must define the position of node correctly"
//   );
//   assert(data !== null, "You must define what data must be added");

//   let previousNode = null;
//   let currentNode = listRef.head;

//   // If single node
//   if (currentNode === listNode) {
//     let newNode = { data: data, next: currentNode };
//     listRef.head = newNode;
//     return newNode;
//   }

//   while (currentNode) {
//     if (currentNode === listNode) {
//       let newNode = { data: data, next: currentNode };
//       previousNode.next = newNode;
//       return newNode;
//     }
//     previousNode = currentNode;
//     currentNode = currentNode.next;
//   }
// }

// export function filterList(listRef, isNumber) {
//   assert(
//     listRef !== undefined && listRef !== null,
//     "You must have atleast one node to add item to list"
//   );
//   const resultArr = arrayFromList(listRef);
//   return resultArr.filter((nodedata) => isNumber(nodedata));
// }
// export function isNumber(data) {
//   return typeof data === "number";
// }
