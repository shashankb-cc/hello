import { expect, test, vi } from "vitest";
import {
  createList,
  addItemToList,
  arrayFromList,
  removeFromEnd,
  removeSpecificItem,
  insertAfter,
  insertBefore,
  filterList,
  isNumber,
  isString,
  traverse,
} from "./linked-list";

/**
 *Tests for List creation using createList() with arguments
 * no argument
 *array as argument
 *list as an argument
 */

test("Linked list createList tests", () => {
  // Test creation of a linked list without an argument
  const emptyList = createList();
  expect(emptyList).toBeDefined();
  expect(emptyList.head).toBeNull();
  expect(emptyList.tail).toBeNull();

  // Test creation of a linked list with an array as an argument
  const arrayWithData = [1, "two", { three: 3 }, 4.0];
  const listFromArray = createList(arrayWithData);
  expect(listFromArray).toBeDefined();
  expect(listFromArray.head.data).toBe(1);
  expect(listFromArray.tail.data).toBe(4.0);

  // Test creation of a linked list with another list as an argument
  const listRefList = createList({
    head: {
      data: "one",
      next: {
        data: "two",
        next: { data: { three: 3 }, next: { data: 4.0, next: null } },
      },
    },
  });
  expect(listRefList).toBeDefined();
  expect(listRefList.head.data).toBe("one");
  expect(listRefList.tail.data).toBe(4.0);

  // Test creation of a linked list with empty array
  const emptyArray = [];
  const emptyListFromArray = createList(emptyArray);
  expect(emptyListFromArray).toBeDefined();
  expect(emptyListFromArray.head).toBeNull();
  expect(emptyListFromArray.tail).toBeNull();

  // Test creation of a linked list with an array of one element
  const arrayWithOneElement = [5];
  const listFromArrayWithOneElement = createList(arrayWithOneElement);
  expect(listFromArrayWithOneElement).toBeDefined();
  expect(listFromArrayWithOneElement.head.data).toBe(5);
  expect(listFromArrayWithOneElement.tail.data).toBe(5);

  // Test creation of a linked list with a single-node linked list object
  const singleNodeList = createList({ head: { data: "one", next: null } });
  expect(singleNodeList).toBeDefined();
  expect(singleNodeList.head.data).toBe("one");
  expect(singleNodeList.tail.data).toBe("one");
});

/**
 * Tests for adding a item into list
 */

test("addItemToList tests", () => {
  // Test adding an item to a list with existing nodes
  const listRef = createList();
  // Add first item
  const listNode1 = addItemToList(listRef, 1);
  expect(listNode1).toBeDefined();
  expect(listRef.head).toBe(listNode1);
  expect(listRef.tail).toBe(listNode1);
  expect(listNode1.data).toBe(1);
  expect(listNode1.next).toBeNull();

  // some more items

  const listNode2 = addItemToList(listRef, "two");
  expect(listNode2.data).toBe("two");
  expect(listNode2.next).toBeNull();
  expect(listNode1.next).toBe(listNode2);
  expect(listRef.head).toBe(listNode1);
  expect(listRef.tail).toBe(listNode2);

  const listNode3 = addItemToList(listRef, { name: "shashank", age: 22 });
  expect(listNode3.data).toEqual({ name: "shashank", age: 22 });
  expect(listNode3.next).toBeNull();
  expect(listNode2.next).toBe(listNode3);
  expect(listRef.head).toBe(listNode1);
  expect(listRef.tail).toBe(listNode3);

  const listNode4 = addItemToList(listRef, [0, 1]);
  expect(listNode4.data).toEqual([0, 1]);
  expect(listNode4.next).toBeNull();
  expect(listNode3.next).toBe(listNode4);
  expect(listRef.head).toBe(listNode1);
  expect(listRef.tail).toBe(listNode4);

  const mockFn = vi.fn();
  traverse(listRef, mockFn);
  expect(mockFn.mock.calls.length).toBe(4);

  // lets test list can give as array representation
  // This converts list to array format and returns it
  const listAsArray = arrayFromList(listRef);
  expect(listAsArray).toEqual([
    1,
    "two",
    { name: "shashank", age: 22 },
    [0, 1],
  ]);

  /**
   *Removing an element from end of the list
   */
  const removedItem = removeFromEnd(listRef);
  expect(removedItem).toEqual([0, 1]);
  expect(listRef.tail.data).toEqual({ name: "shashank", age: 22 });
  expect(listRef.tail.next).toBeNull();

  /**
   * Removing a element from thats passed as an argument
   */
  const removeSpecificNode = removeSpecificItem(listRef, {
    name: "shashank",
    age: 22,
  });
  expect(removeSpecificNode).toEqual({ name: "shashank", age: 22 });
  expect(listNode2.next).toBe(null);

  /**
   * Inserting a node after a specific node passed as an argument
   */
  const listNodeAfter = insertAfter(listRef, listNode2, "three");
  expect(listNodeAfter.data).toEqual("three");
  expect(listAsArray.next).not.toBe(null);
  expect(listNode2.next).toBe(listNodeAfter);

  const listNodeAfter3 = insertAfter(listRef, listRef.tail, "five");
  expect(listNodeAfter3.data).toEqual("five");
  expect(listRef.tail.data).toBe("five");

  /**
   * Inserting a node before a specific node passes as an argument
   */

  const listNodeBefore = insertBefore(listRef, listNode2, 2);
  expect(listNodeBefore.data).toEqual(2);
  expect(listNodeBefore.next).not.toBe(null);
  expect(listNode1.next).toBe(listNodeBefore);

  const listNodeBefore3 = insertBefore(listRef, listRef.tail, 3);
  expect(listNodeBefore3.data).toEqual(3);
  expect(listNodeBefore3.next).toBe(listRef.tail);

  /**
   * Checking whether the data of listNode pass the predicate function logic
   */
  const resultArr = filterList(listRef, isNumber);
  expect(resultArr).toEqual([1, 2, 3]);
  expect(resultArr).not.toBe(null);

  const resultArrStr = filterList(listRef, isString);
  expect(resultArrStr).toEqual(["two", "three", "five"]);
  expect(resultArrStr).not.toBe(null);
});
