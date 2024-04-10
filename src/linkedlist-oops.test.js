import { expect, test, describe, beforeEach, afterEach, vi } from "vitest";
import { LinkedList } from "./linkedlist-oops";
import isEqual from "lodash";
import { traverse } from "./linked-list";

describe("Linked List Tests(OOPS)", () => {
  let listRef = null;
  beforeEach(() => {
    listRef = new LinkedList();
    listRef.addItemToList(1);
    listRef.addItemToList("two");
    listRef.addItemToList([3]);
    listRef.addItemToList({ name: "shashank", age: 22 });
  });
  afterEach(() => {
    listRef = null;
  });
  test("Linked List creation tests", () => {
    let emptyList = new LinkedList();
    emptyList.createList();
    expect(emptyList.head).toBeNull();
    expect(emptyList.tail).toBeNull();

    const arrayWithData = [1, "two", { three: 3 }, 4.0];
    const listFromArray = new LinkedList();
    listFromArray.createList(arrayWithData);
    expect(listFromArray.head.data).toBe(1);
    expect(listFromArray.tail.data).toBe(4.0);

    const objectWithData = {
      head: {
        data: "one",
        next: {
          data: "two",
          next: { data: { three: 3 }, next: { data: 4.0, next: null } },
        },
      },
    };
    const listFromList = new LinkedList();
    listFromList.createList(objectWithData);
    expect(listFromList.head.data).toBe("one");
    expect(listFromArray.tail.data).toBe(4.0);
  });

  test("Adding item to list tests", () => {
    expect(listRef.head.data).toBe(1);
    expect(listRef.tail.data).toStrictEqual({ name: "shashank", age: 22 });
    listRef.createList();

    const listNode1 = listRef.addItemToList(1);
    expect(listRef.head).toBe(listNode1);
    expect(listRef.tail).toBe(listNode1);
    expect(listRef.head.data).toBe(1);
    expect(listRef.tail.data).toBe(1);
    expect(listRef).not.toBeNull();

    const listNode2 = listRef.addItemToList("two");
    expect(listNode2.data).toBe("two");
    expect(listNode2.next).toBeNull();
    expect(listRef.head.next).toBe(listNode2);
    expect(listRef.head).toBe(listNode1);
    expect(listRef.tail).toBe(listNode2);

    const listNode3 = listRef.addItemToList({ name: "shashank", age: 22 });
    expect(listNode3.data).toEqual({ name: "shashank", age: 22 });
    expect(listNode3.next).toBeNull();
    expect(listNode2.next).toBe(listNode3);
    expect(listRef.head).toBe(listNode1);
    expect(listRef.tail).toBe(listNode3);

    const listNode4 = listRef.addItemToList([0, 1]);
    expect(listNode4.data).toEqual([0, 1]);
    expect(listNode4.next).toBeNull();
    expect(listNode3.next).toBe(listNode4);
    expect(listRef.head).toBe(listNode1);
    expect(listRef.tail).toBe(listNode4);
  });
  test("Array from list tests", () => {
    const listAsArray = listRef.arrayFromList();
    expect(listAsArray).toEqual([1, "two", [3], { name: "shashank", age: 22 }]);
  });
  test("Remove from end tests", () => {
    const removedItem1 = listRef.removeFromEnd();
    isEqual(removedItem1, { name: "shashank", age: 22 });
    expect(listRef.tail.data).toEqual([3]);
    expect(listRef.tail.next).toBeNull();

    const removedItem2 = listRef.removeFromEnd();
    isEqual(removedItem2, [3]);
    expect(listRef.tail.data).toEqual("two");
    expect(listRef.tail.next).toBeNull();
  });
  test("Remove specific item", () => {
    const removedDataFirst = listRef.removeSpecificNode(listRef.head);

    expect(removedDataFirst).toEqual(1);
    expect(listRef.head.data).toEqual("two");
    expect(listRef.head.next.data).toEqual([3]);
    expect(listRef.tail.data).toEqual({ name: "shashank", age: 22 });
    expect(listRef.tail.next).toBe(null);

    const removedDataMiddle = listRef.removeSpecificNode(listRef.head.next);

    expect(removedDataMiddle).toEqual([3]);
    expect(listRef.head.data).toEqual("two");
    expect(listRef.head.next.data).toEqual({ name: "shashank", age: 22 });
    expect(listRef.tail.data).toEqual({ name: "shashank", age: 22 });
    expect(listRef.tail.next).toBe(null);
  });

  test("Insert After Node tests", () => {
    const firstNode = listRef.getNodeFromPosition(0);
    const nodeAfterFirst = listRef.insertAfter(firstNode, "One");
    expect(nodeAfterFirst.data).toEqual("One");
    expect(listRef.head.next).toBe(nodeAfterFirst);

    const middleNode = listRef.getNodeFromPosition(2);
    const nodeAfterTwo = listRef.insertAfter(middleNode, 2);
    expect(nodeAfterTwo.data).toEqual(2);
    expect(nodeAfterTwo.next.data).toEqual([3]);

    const lastNode = listRef.getNodeFromPosition(
      listRef.arrayFromList().length - 1
    );
    const nodeAfterLastNode = listRef.insertAfter(lastNode, "four");
    expect(nodeAfterLastNode.data).toEqual("four");
    expect(listRef.tail.next).toBe(null);
  });

  test("Insert Before Node Tests", () => {
    const firstNode = listRef.getNodeFromPosition(0);
    const nodeBeforeFirst = listRef.insertBefore(firstNode, "One");
    expect(nodeBeforeFirst.data).toEqual("One");
    expect(listRef.head).toBe(nodeBeforeFirst);

    const middleNode = listRef.getNodeFromPosition(2);
    const nodeBeforeTwo = listRef.insertBefore(middleNode, 2);
    expect(nodeBeforeTwo.data).toEqual(2);
    expect(nodeBeforeTwo.next.data).toEqual("two");

    const lastNode = listRef.getNodeFromPosition(
      listRef.arrayFromList().length - 1
    );
    const nodeBeforeLastNode = listRef.insertBefore(lastNode, "four");
    expect(nodeBeforeLastNode.data).toEqual("four");
    expect(listRef.tail.next).toBe(null);
  });
  test("Traverse tests", () => {
    const mockFn = vi.fn();
    traverse(listRef, mockFn);
    expect(mockFn.mock.calls.length).toBe(4);
  });
  test("Filter List tests", () => {
    const resultArr = listRef.filterList(listRef.isNumber);
    expect(resultArr).toEqual([1]);
    expect(resultArr).not.toBe(null);

    const resultStr = listRef.filterList(listRef.isString);
    expect(resultStr).toEqual(["two"]);
    expect(resultStr).not.toBe(null);
  });
});
