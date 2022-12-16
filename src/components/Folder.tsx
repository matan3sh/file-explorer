import { MouseEvent, FC, useState, KeyboardEvent } from "react";
import useTraverseTree from "../hooks/useTraverseTree";
import { Explorer, ShowInput } from "../types";

interface Props {
  explorer: Explorer;
}

const Folder: FC<Props> = ({ explorer }) => {
  const [expand, setExpand] = useState<boolean>(false);
  const [showInput, setShowInput] = useState<ShowInput>({
    visible: false,
    isFolder: null,
  });
  const { insertNode } = useTraverseTree();

  const handleNewFolder = (
    e: MouseEvent<HTMLButtonElement>,
    isFolder: boolean
  ) => {
    e.stopPropagation();
    setShowInput({
      visible: true,
      isFolder,
    });
  };

  const handleAddFolder = (e: KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter" && (e.target as HTMLInputElement).value) {
      insertNode(
        explorer,
        explorer.id,
        (e.target as HTMLInputElement).value,
        showInput.isFolder!
      );
      setShowInput({ ...showInput, visible: false });
    }
  };

  if (explorer.isFolder) {
    return (
      <div>
        <div className="folder" onClick={() => setExpand((prev) => !prev)}>
          <span>🗂️ {explorer.name}</span>

          {expand && (
            <div>
              <button onClick={(e) => handleNewFolder(e, true)}>
                Folder +
              </button>
              <button onClick={(e) => handleNewFolder(e, false)}>File +</button>
            </div>
          )}
        </div>

        <div style={{ display: expand ? "block" : "none", paddingLeft: 25 }}>
          {showInput.visible && (
            <div className="inputContainer">
              <span>{showInput.isFolder ? "🗂️" : "📄"}</span>
              <input
                type="text"
                className="inputContainer__input"
                autoFocus
                onKeyDown={handleAddFolder}
                onBlur={() => setShowInput({ ...showInput, visible: false })}
              />
            </div>
          )}

          {explorer.items.map((item) => {
            return <Folder key={item.id} explorer={item} />;
          })}
        </div>
      </div>
    );
  } else {
    return <span className="file">📄 {explorer.name}</span>;
  }
};

export default Folder;
