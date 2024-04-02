import { expect, test } from "vitest";
import {
  createList,
  addItemToList,
  arrayFromList,
  removeFromEnd,
  insertAfter,
  insertBefore,
} from "./linked-list";

test("Linked list tests", () => {
  //Test creation of a linked list
  const listRef = createList();
  expect(listRef).toBeDefined();
  expect(listRef.head).toBeNull();

  //Test addition of items into the list
  const listNode1 = addItemToList(listRef, 1);
  expect(listNode1).toBeDefined();

  //since this was first node,we expect listRef.head must be
  //equal to listNode we just added
  expect(listRef.head).toBe(listNode1);

  expect(listNode1.data).toBe(1);
  expect(listNode1.next).toBe(null);

  //Add another item
  const listNode2 = addItemToList(listRef, "two");
  expect(listNode2.data).toBe("two");
  expect(listNode2.next).toBe(null);
  expect(listNode1.next).toBe(listNode2);

  const listNode3 = addItemToList(listRef, { name: "shashank", age: 22 });
  expect(listNode3.data).toEqual({ name: "shashank", age: 22 });
  expect(listNode3.next).toBe(null);
  expect(listNode2.next).toBe(listNode3);

  const listNode4 = addItemToList(listRef, [0, 1]);
  expect(listNode4.data).toEqual([0, 1]);
  expect(listNode4.next).toBe(null);
  expect(listNode3.next).toBe(listNode4);

  //lets test list can give as array representation

  let listAsArray = arrayFromList(listRef);
  expect(listAsArray).toEqual([
    1,
    "two",
    { name: "shashank", age: 22 },
    [0, 1],
  ]);

  //Removing elements from end
  const removedItem = removeFromEnd(listRef);
  expect(removedItem).toEqual([0, 1]);

  //Removing specific element thats is passed as argument

  //Inserting a node after a specific node

  const listNodeAfter = insertAfter(listRef, listNode2, "three");
  expect(listNodeAfter.data).toEqual("three");
  expect(listNodeAfter.next).not.toBe(null);
  expect(listNode2.next).toBe(listNodeAfter);

  //Inserting a node before a specific node

  const listNodeBefore = insertBefore(listRef, listNode2, "two-2");
  expect(listNodeBefore.data).toEqual("two-2");
  expect(listNodeBefore.next).not.toBe(null);
  expect(listNode1.next).toBe(listNodeBefore);
});
