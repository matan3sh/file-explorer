import { useState } from "react";
import Folder from "./components/Folder";
import { Explorer } from "./types";
import explorer from "./data";

function App() {
  const [explorerData] = useState<Explorer>(explorer);

  return (
    <div>
      <Folder explorer={explorerData} />
    </div>
  );
}

export default App;
