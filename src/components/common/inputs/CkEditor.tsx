/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import React, { useEffect, useRef, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import "./styles.scss";
import { formatStringToList } from "@/lib/formatters";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

interface EditorData {
  editorData: string;
}

interface TextEditorProps {
  value?: string;
  name: string;
  ai?: boolean;
  context: string;
  section: string;
  toolbarCtrl?: string[];
  onChange?: (name: string, value: string) => void;
}

function TextEditor({
  name,
  value,
  toolbarCtrl,
  onChange,
}: TextEditorProps): JSX.Element {
  const [editorData, setEditorData] = useState<EditorData>({
    editorData: value || "",
  });
  const [range, setRange] = useState({
    range: "",
    highlight: "",
  });
  const editorRef = useRef<ClassicEditor>();

  const handleEditorChange = (_event: unknown, editor: ClassicEditor) => {
    const data = editor.getData();
    setEditorData({ editorData: data });
    onChange?.(name, data);
  };

  //   edit this
  const noList = ["professional_summary", "skill", "cover-letter"].includes(
    name
  );

  // get highlighted text
  const getHighlightedText = (editor: ClassicEditor) => {
    editor.model.change(() => {
      const range = editor.model.document.selection.getFirstRange();

      const sentences = [];
      for (const value of range?.getWalker() as any) {
        sentences.push(value.item.data);
      }

      setRange({
        range: range as unknown as string,
        highlight: sentences.join(", "),
      });
    });
  };

  // console.log(editorData)
  // console.log(value)
  useEffect(() => {
    if (value) {
      const newValue =
        noList || toolbarCtrl ? value : formatStringToList(value);
      onChange?.(name, value);

      setEditorData({ editorData: newValue });
    }
  }, []);

  const toolbar = (): string[] => {
    if (toolbarCtrl) {
      return toolbarCtrl;
    }
    return ["bold", "bulletedList"];
  };

  return (
    <div className="w-full relative flex flex-col items-end justify-end gap-[15px]">
      <CKEditor
        editor={ClassicEditor as any}
        data={
          (value && value !== " ") || noList
            ? editorData.editorData
            : toolbarCtrl
            ? editorData.editorData
            : "<ul><li> </li></ul>"
        }
        onChange={handleEditorChange as any}
        config={{
          toolbar: toolbar(),
        }}
        onReady={(editor: any) => {
          editorRef.current = editor;

          // Define the callback function
          const handleSelectionChange = () => {
            getHighlightedText(editor);
          };

          // Attach the event listener
          editor.editing.view.document.on(
            "selectionChangeDone",
            handleSelectionChange
          );

          // Clean up the event listener when component unmounts
          editor.editing.view.document.on("destroy", () => {
            editor.editing.view.document.off(
              "selectionChangeDone",
              handleSelectionChange
            );

            console.log(range);
            setRange({ range: "", highlight: "" });
          });
        }}
      />
    </div>
  );
}

export default TextEditor;
