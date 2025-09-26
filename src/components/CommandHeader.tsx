import clsx from "clsx";
import { Command, CommandSelection } from "../types";
import CommandSearchSelect from "./CommandSearchSelect";

interface CommandHeaderProps {
  onChange: (command: CommandSelection) => void;
  output?: string;
  outputIsError?: boolean;
}

export function CommandHeader({
  onChange,
  output,
  outputIsError = false,
}: CommandHeaderProps) {
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
      <div className="flex flex-row gap-4 grow basis-1/3">
        {output && (
          <p
            className={clsx({
              ["text-white"]: outputIsError === false,
              ["text-red-300"]: outputIsError === true,
            })}
          >
            {output}
          </p>
        )}
      </div>
      <div className="flex justify-center basis-1/3">
        <CommandSearchSelect commands={commands} onSelect={onChange} />
      </div>
      <div className="basis-1/3" />
    </header>
  );
}
