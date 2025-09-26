import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";

import TextInput from "./TextInput";
import { CommandSelection } from "../types";
import { CommandHeader } from "./CommandHeader";

function App() {
  const [input, setInput] = useState<string>();
  const [output, setOutput] = useState<string>();
  const [outputIsError, setOutputIsError] = useState<boolean>(false);

  async function onCommandSelected({ type, value }: CommandSelection) {
    setOutputIsError(false);
    setOutput("");

    console.log("Command selected", type, value);

    if (typeof input !== "string" || input.length <= 0) {
      setOutput("No valid input");
      setOutputIsError(true);
      return;
    }
    if (type === "transform_input") {
      setInput(
        await invoke("transform_input", { input, transformType: value })
      );
    } else if (type === "get_output") {
      setOutput(await invoke("get_output", { input, outputType: value }));
    }
  }

  return (
    <main className="w-full h-full">
      <CommandHeader
        onChange={onCommandSelected}
        output={output}
        outputIsError={outputIsError}
      />
      <TextInput value={input} onChange={setInput} />
    </main>
  );
}

export default App;
