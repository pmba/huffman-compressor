import TreeNode from "../structures/node";
import { escapedChar } from "../utils/escaping";
import { MinHeap } from "./../structures/heap";

type HuffmanInfos = { traversal: string; table: Map<string, Uint8Array> };

export class HuffmanUtils {
  /**
   * Build a minimum heap given the file binary data
   *
   * @param {string} data - The file data
   * @returns {MinHeap} A minimum heap with all the huffman tree nodes
   */
  private getHeap(data: string): MinHeap {
    // Get frequencies from data
    const frequencies = new Map<string, number>();

    let currentFrequency = 0;
    let currentChar = "";

    for (let i = 0; i < data.length; ++i) {
      currentChar = escapedChar(data[i]);
      currentFrequency = frequencies.get(currentChar) ?? 0;
      frequencies.set(currentChar, ++currentFrequency);
    }

    // Build minimum heap from frequencies
    const minHeap = new MinHeap();

    frequencies.forEach((freq, char) => {
      minHeap.push(new TreeNode(char, freq));
    });

    return minHeap;
  }

  /**
   * Build the huffman tree given the file binary data
   *
   * @param {string} data - The file data
   * @returns {(TreeNode|undefined)} The huffman tree head if data is not empty, otherwise return undefined
   */
  private buildTree(data: string): TreeNode | undefined {
    const heap = this.getHeap(data);

    console.log(heap);

    // throw Error("");

    if (heap.empty()) return;

    while (heap.size() > 1) {
      let leftChild = heap.pop();
      let rightChild = heap.pop();

      const totalFrequency =
        (leftChild?.frequency ?? 0) + (rightChild?.frequency ?? 0);
      const parentNode = new TreeNode("*", totalFrequency);

      parentNode.left = leftChild;
      parentNode.right = rightChild;

      heap.push(parentNode);
    }

    return heap.pop();
  }

  /**
   * Build the tree traversal and lookup table given the huffman tree
   *
   * @param {TreeNode} head - The huffman tree head node
   * @returns {HuffmanInfos} The huffman tree traversal and the lookup table
   */
  private buildTableAndTraversal(head: TreeNode): HuffmanInfos {
    const table: HuffmanInfos["table"] = new Map<string, Uint8Array>();
    const traversal: string[] = [];

    const path: string[] = [];

    const dfs = (node: TreeNode) => {
      if (!node) {
        return;
      }

      traversal.push(node.value);

      if (!node.left && !node.right) {
        // It's a leaf node
        // table.set(node.value, path.join(""));
        table.set(node.value, new Uint8Array(path.map(Number)));
        return;
      }

      path.push("0");
      dfs(node.left!);
      path.pop();

      path.push("1");
      dfs(node.right!);
      path.pop();
    };

    dfs(head);

    return {
      traversal: traversal.join(""),
      table,
    };
  }

  /**
   * Build the tree traversal and lookup table given the file binary data
   *
   * @param {TreeNode} head - The huffman tree head node
   * @returns {HuffmanInfos} The huffman tree traversal and the lookup table
   */
  public getInfos(data: string): HuffmanInfos {
    const head = this.buildTree(data);
    const info = this.buildTableAndTraversal(head!);

    return info;
  }
}
