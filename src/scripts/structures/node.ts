export default class TreeNode {
  public value: string;
  public frequency: number;

  public left?: TreeNode;
  public right?: TreeNode;

  public constructor(
    value: string = "",
    frequency: number = 0,
    left?: TreeNode,
    right?: TreeNode
  ) {
    this.value = value;
    this.frequency = frequency;

    this.left = left;
    this.right = right;
  }

  valueOf() {
    return this.frequency;
  }
}
