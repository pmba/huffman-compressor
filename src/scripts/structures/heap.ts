import TreeNode from "./node";

export class MinHeap {
  private heap: TreeNode[] = [];

  // Helpers
  private getParentIndex = (index: number) => Math.floor((index - 1) / 2);
  private getLeftChildIndex = (index: number) => 2 * index + 1;
  private getRightChildIndex = (index: number) => 2 * index + 2;

  private swap = (indexOne: number, indexTwo: number) => {
    [this.heap[indexOne], this.heap[indexTwo]] = [
      this.heap[indexTwo],
      this.heap[indexOne],
    ];
  };

  public size = () => this.heap.length;
  public empty = () => this.heap.length === 0;

  // Heapify Functions
  private heapifyUp = (index: number) => {
    const parentIndex = this.getParentIndex(index);

    if (index > 0 && this.heap[parentIndex] >= this.heap[index]) {
      this.swap(parentIndex, index);
      this.heapifyUp(parentIndex);
    }
  };

  private heapifyDown = (index: number) => {
    const leftChildIndex = this.getLeftChildIndex(index);
    const rightChildIndex = this.getRightChildIndex(index);

    let minChildIndex = index;

    if (
      leftChildIndex < this.heap.length &&
      this.heap[leftChildIndex] < this.heap[minChildIndex]
    ) {
      minChildIndex = leftChildIndex;
    }

    if (
      rightChildIndex < this.heap.length &&
      this.heap[rightChildIndex] < this.heap[minChildIndex]
    ) {
      minChildIndex = rightChildIndex;
    }

    if (index !== minChildIndex) {
      this.swap(index, minChildIndex);
      this.heapifyDown(minChildIndex);
    }
  };

  // Methods
  public peek = () => {
    return this.heap.length > 0 ? this.heap[0] : undefined;
  };

  public push = (item: TreeNode) => {
    this.heap.push(item);
    this.heapifyUp(this.heap.length - 1);
  };

  public pop = () => {
    if (this.empty()) {
      return;
    }

    if (this.heap.length === 1) {
      return this.heap.pop()!;
    }

    const root = this.heap[0];
    this.heap[0] = this.heap.pop()!;
    this.heapifyDown(0);
    return root;
  };
}
