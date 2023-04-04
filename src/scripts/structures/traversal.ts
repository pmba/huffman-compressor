import TreeNode from "./node";

export default class PreorderTraversal {
  private _traversal: string;
  private _tree?: TreeNode;

  // Index to construct the tree
  private index = 0;

  constructor(traversal: string) {
    this._traversal = traversal;
    this.build();
  }

  get traversal() {
    return this._traversal;
  }

  get tree() {
    return this._tree!;
  }

  private build() {
    if (
      !this._traversal ||
      this._traversal.length === 0 ||
      this._traversal[0] !== "*"
    ) {
      throw new Error("Invalid Tree Traversal");
    }

    this._tree = this.buildTree();
  }

  private buildTree(): TreeNode | undefined {
    if (this.index >= this._traversal.length) {
      return;
    }

    const node = new TreeNode();
    const value = this._traversal[this.index];

    if (value !== "*") {
      node.value = value;
      return node;
    }

    // If is a parent add the children
    ++this.index;
    node.left = this.buildTree();

    ++this.index;
    node.right = this.buildTree();

    return node;
  }
}
