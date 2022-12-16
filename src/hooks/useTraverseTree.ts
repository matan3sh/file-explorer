import { Explorer } from "../types";

const useTraverseTree = () => {
  function insertNode(
    tree: Explorer,
    folderId: string,
    item: string,
    isFolder: boolean
  ): Explorer {
    if (tree.id === folderId && tree.isFolder) {
      tree.items.unshift({
        id: new Date().getTime().toString(),
        name: item,
        isFolder: isFolder,
        items: [],
      });
      return tree;
    }

    let latestNode = [];
    latestNode = tree.items.map((ob: Explorer) => {
      return insertNode(ob, folderId, item, isFolder);
    });

    return { ...tree, items: latestNode };
  }

  return { insertNode };
};

export default useTraverseTree;
