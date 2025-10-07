import { ReactNode } from "react";

export type CommandType = 'get_output' | 'transform_input'
export type Command = { label: string; icon?: ReactNode; type: CommandType; value: string; searchTags: string[] };
export type CommandSelection = Pick<Command, "type" | "value">