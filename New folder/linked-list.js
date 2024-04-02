import assert from 'assert';

export function createList() {
  return { head: null };
}
/**
 * adds data to end of thr list
 */
export function addItemToList(listRef,data) {
    //assert(listRef !==undefined && listRef !==null);
    const newNode={data:data,next:null};
    if(listRef.head===null){
        listRef.head=newNode;
    }else{
        //traverse until last node  and link the new node it
        let lastNode=listRef.head;
        while(lastNode.next !==null){
            lastNode=lastNode.next;
        }
        lastNode.next=newNode;
    }
    return newNode;
}

export function arrayFromList(listRef){
    const array=[];
    let lastNode=listRef.head;
        while(lastNode.next !==null){
            array.push(lastNode.data);
            lastNode=lastNode.next;
            
        }
        array.push(lastNode.data);
        return array;
}
export function removeFromEnd(listRef){
    let lastNode=listRef.head;
    let prevNode=null;
        while(lastNode.next !==null){
            prevNode=lastNode;
            lastNode=lastNode.next;
        }
        prevNode.next=null;
        return lastNode.data;
}
export function insertAfter(listRef,listNode,data){
    let newNode={data:data,next:null}
    let currentNode=listRef.head;
    let nextNode=currentNode.next;
    while(currentNode.data !== listNode.data){
        currentNode=currentNode.next;
        nextNode=currentNode.next;
    }
    currentNode.next=newNode;
    newNode.next=nextNode;
    return newNode;
}
export function insertBefore(listRef,listNode,data){
    let newNode={data:data,next:null};
    let previousNode=null;
    let currentNode=listRef.head;
    while(currentNode.data !== listNode.data){
        previousNode=currentNode;
        currentNode=currentNode.next;
    }
    previousNode.next=newNode;
    newNode.next=currentNode;
    return newNode;
}