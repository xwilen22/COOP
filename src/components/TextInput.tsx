import { useRef, useState } from "react";

interface TextInputProps {
  onChange: (value: string) => void;
  value?: string;
}

type KeyCode = "Shift" | "Tab";

const keyCodes: KeyCode[] = ["Shift", "Tab"];
const comboKeyCodes: KeyCode[] = ["Shift", "Tab"];

function TextInput({ value, onChange }: TextInputProps) {
  const [comboKeyDown, setComboKeyDown] = useState<KeyCode | null>(null);

  const ref = useRef<HTMLTextAreaElement>(null);

  const rows = value?.split("\n").length ?? 1;

  function onKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (ref.current === null) return;

    const keyDown = event.key;

    if (!stringIsKeyCode(keyDown)) return;

    console.log("Key", keyDown, " + Combo ", comboKeyDown);

    switch (keyDown) {
      case "Tab":
        event.preventDefault();

        const start = ref.current.selectionStart;
        const end = ref.current.selectionEnd;

        const currentValue = ref.current.value;

        // if (comboKeyDown === "Shift") {
        //   console.log("Backwardsss");
        //   ref.current.value = `${ref.current.value.substring(
        //     0,
        //     start - "\t".length
        //   )}`;

        //   ref.current.selectionEnd = end - "\t".length;
        //   break;
        // }

        // Set textarea value to: text before caret + tab + text after caret
        ref.current.value = `${currentValue.substring(
          0,
          start
        )}\t${currentValue.substring(end)}`;

        // Put caret at right position again
        ref.current.selectionStart = ref.current.selectionEnd = start + 1;
        break;
      default:
        setComboKeyDown(keyDown);
    }
  }

  function onKeyUp(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    const keyUp = event.key;

    if (keyUp === comboKeyDown) {
      setComboKeyDown(null);
    }
  }

  return (
    <section className="w-full py-2 relative">
      <ol className="absolute left-0 top-0 bottom-0 py-2 w-12 border-r-2 border-gray-300 flex flex-col items-center bg-gray-50">
        {new Array(rows).fill(1).map((_, index) => (
          <li key={`list-item-${index}`}>{index + 1}</li>
        ))}
      </ol>
      <textarea
        ref={ref}
        className="resize-none focus:outline-0 w-full pl-16 overflow-y-hidden"
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        value={value}
        rows={rows}
      />
    </section>
  );
}

function stringIsKeyCode(keyCode: string): keyCode is KeyCode {
  return keyCodes.includes(keyCode as KeyCode);
}

export default TextInput;
