import { BaseEditor, Descendant, Element as SlateElement } from "slate";
import { ReactEditor } from "slate-react";
import { HistoryEditor } from "slate-history";

// Custom text
export type CustomText = { text: string };

// Custom element
export interface CustomElement extends SlateElement {
  type: "paragraph" | "heading";
  children: CustomText[];
}

// Editor type
export type CustomEditor = BaseEditor & ReactEditor & HistoryEditor;
