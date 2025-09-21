import { Command, CommandSelection } from "../types";
import CommandSearchSelect from "./CommandSearchSelect";

interface CommandHeaderProps {
  onChange: (command: CommandSelection) => void;
  output?: string;
  error?: string;
}

export function CommandHeader({ onChange, output, error }: CommandHeaderProps) {
  const commands: Command[] = [
    {
      label: "JSON format",
      type: "transform_input",
      value: "json",
      searchTags: ["JSON"],
      icon: <>🫠️</>,
    },
    {
      label: "Base64 encode",
      type: "transform_input",
      value: "base64Encode",
      searchTags: ["Base64"],
      icon: <>🙂️</>,
    },
    {
      label: "Base64 decode",
      type: "transform_input",
      value: "base64Decode",
      searchTags: ["Base64"],
      icon: <>🙃️</>,
    },
    {
      label: "Get length",
      type: "get_output",
      value: "getStringLength",
      searchTags: ["Count", "Length"],
      icon: <>🔢️</>,
    },
  ];

  return (
    <header className="bg-purple-700 flex flex-row p-2 h-11 sticky top-0 z-50 justify-between items-center">
      <div className="flex flex-row gap-2 grow w-1/3">
        <p className="text-white">{output}</p>
      </div>
      <div className="flex justify-items-center w-1/3">
        <div className="flex">
          <CommandSearchSelect commands={commands} onSelect={onChange} />
        </div>
      </div>
      <div className="w-1/3">
        <p className="text-red-300">{error}</p>
      </div>
    </header>
  );
}
