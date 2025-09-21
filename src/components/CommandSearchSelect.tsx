import { useRef, useState, useEffect, useCallback } from "react";
import { Command } from "../types";
import clsx from "clsx";

interface CommandSearchSelectProps {
  onSelect: (command: Command) => void;
  commands: Command[];
}

const transformSearchTags = ["Transform", "Convert"];
const outputSearchTags = ["Get", "Output"];

function CommandSearchSelect({ commands, onSelect }: CommandSearchSelectProps) {
  const ref = useRef<HTMLInputElement>(null);

  const [controlKeyDown, setControlKeyDown] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const [filteredCommands, setFilteredCommands] = useState<Command[]>(commands);
  const [currentFilter, setCurrentFilter] = useState<string>();

  const onKeyUp = useCallback((event: KeyboardEvent) => {
    if (event.key === "Control") {
      setControlKeyDown(false);
    }
  }, []);

  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const pressedKey = event.key;

      // If whenever
      switch (pressedKey) {
        case "Control":
          setControlKeyDown(true);
          break;
        case "b":
          if (controlKeyDown) setOpen(!open);
          break;
      }

      if (!open) return;

      // If command menu is open
      switch (pressedKey) {
        case "Escape":
          setOpen(false);
          break;
        case "ArrowUp":
        case "ArrowDown":
          setSelectedIndex((currentState) => {
            const indexDirection = pressedKey === "ArrowDown" ? 1 : -1;
            let newIndex = currentState + indexDirection;

            if (newIndex < 0) newIndex = filteredCommands.length - 1;
            else newIndex %= filteredCommands.length;

            return newIndex;
          });
          break;
        case "Enter":
          setOpen(false);
          onSelect(filteredCommands[selectedIndex]);
          break;
      }
    },
    [filteredCommands, controlKeyDown, selectedIndex, open]
  );

  useEffect(() => {
    if (open) {
      setSelectedIndex(0);
      ref.current?.focus();
    }
  }, [open]);

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("keyup", onKeyUp);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("keyup", onKeyUp);
    };
  }, [onKeyDown, onKeyUp]);

  useEffect(() => {
    const value = currentFilter;

    setFilteredCommands(() => {
      const lowerCaseValue = value?.toLocaleLowerCase() ?? "";
      return value
        ? commands.filter(
            ({ type, label, searchTags }) =>
              [
                ...(type === "transform_input"
                  ? transformSearchTags
                  : outputSearchTags),
                ...searchTags,
              ].some((tag) =>
                tag.toLocaleLowerCase().includes(lowerCaseValue)
              ) || label.toLocaleLowerCase().includes(lowerCaseValue)
          )
        : commands;
    });
  }, [currentFilter]);

  return (
    <>
      <select>
        <option>Select command</option>
      </select>
      {open && (
        <div
          className="fixed top-0 bottom-0 left-0 right-0 bg-black/80 flex flex-col justify-start px-10 text-3xl z-0"
          onClick={() => setOpen(false)}
        >
          <div className="z-50">
            <div className="bg-amber-50 p-3">
              <input
                className="w-full"
                type="text"
                ref={ref}
                onChange={(event) => setCurrentFilter(event.target.value)}
              />
            </div>
            <ol className="bg-amber-100">
              {filteredCommands.length > 0 ? (
                filteredCommands.map(
                  ({ label, value, icon, ...rest }, index) => (
                    <li
                      className={clsx(
                        {
                          ["bg-amber-300"]: index === selectedIndex,
                        },
                        "flex p-3 gap-3 cursor-pointer hover:bg-amber-300"
                      )}
                      key={`${index}-${value}`}
                      onClick={() => onSelect({ label, value, icon, ...rest })}
                    >
                      {icon}
                      <span>{label}</span>
                    </li>
                  )
                )
              ) : (
                <li className="italic p-3">Nothing found</li>
              )}
            </ol>
          </div>
        </div>
      )}
    </>
  );
}

export default CommandSearchSelect;
