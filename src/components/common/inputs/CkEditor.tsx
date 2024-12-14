"use client";
import React, { useEffect, useRef, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "./styles.scss";
import {
  //   faCircleDot,
  // faLightbulb,
  faMultiply,
} from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  arrayToUlString,
  convertListToText,
  formatStringToList,
  modifyText,
} from "@/lib/formatters";

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
  ai,
  context,
  section,
  toolbarCtrl,
  onChange,
}: TextEditorProps): JSX.Element {
  const [suggestion, setSuggestion] = useState({
    data: [],
    loading: false,
  });

  const [editorData, setEditorData] = useState<EditorData>({
    editorData: value || "",
  });
  const [range, setRange] = useState({
    range: "",
    highlight: "",
  });
  const editorRef = useRef<ClassicEditor>();
  const editor = editorRef.current;

  const handleEditorChange = (event: unknown, editor: ClassicEditor) => {
    const data = editor.getData();
    setEditorData({ editorData: data });
    onChange?.(name, data);
  };

  //   edit this
  let noList = ["professional_summary", "skill", "cover-letter"].includes(name);

  let aiAssist = () => {
    const url = "/";

    // make api call for ai assist & add to suggestions
    setSuggestion({
      data: [],
      loading: false,
    });
  };

  // suggest adds response to the last line
  const addToLast = (data: string) => {
    var val = editor?.getData();
    var dataArr = modifyText(val || "");
    var formatted = noList ? value + data : arrayToUlString([...dataArr, data]);

    onChange?.(name, formatted);
    setEditorData({ editorData: formatted });
  };

  // replace the highlighted text
  const replaceText = (data: string) => {
    editor?.model.change((writer) => {
      editor?.model.insertContent(writer.createText(data), range?.range as any);
    });

    onChange?.(name, editor?.getData() ?? "");
  };

  // adds or replace text
  let applySuggestion = (item: string) => {
    range.highlight ? replaceText(item) : addToLast(item);
    clearAll();
  };

  let clearAll = () => {
    setSuggestion({ ...suggestion, data: [] });
    setRange({ highlight: "", range: "" });
  };

  // get highlighted text
  const getHighlightedText = (editor: ClassicEditor) => {
    editor.model.change((writer) => {
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

  useEffect(() => {
    if (value) {
      var newValue = noList || toolbarCtrl ? value : formatStringToList(value);
      onChange?.(name, newValue);

      setEditorData({ editorData: newValue });
    }
  }, [value]);

  const toolbar = (): string[] => {
    if (toolbarCtrl) {
      return toolbarCtrl;
    }
    return ["bold", "bulletedList"];
  };

  return (
    <div className="w-full relative flex flex-col items-end justify-end gap-[15px]">
      {ai && (
        <div className="w-full flex flexcol items-end justify-between gap-[8px]">
          <p className="text-[.75em] text-main-900 font-[400]">
            Highlight a text section to use AI rephase.
          </p>
          <button name="" onClick={() => alert("assist")} />
        </div>
      )}

      <CKEditor
        editor={ClassicEditor}
        data={
          (value && value !== " ") || noList
            ? editorData.editorData
            : toolbarCtrl
            ? editorData.editorData
            : "<ul><li> </li></ul>"
        }
        onChange={handleEditorChange}
        config={{
          toolbar: toolbar(),
        }}
        onReady={(editor: ClassicEditor) => {
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
            setRange({ range: "", highlight: "" });
          });
        }}
      />

      {suggestion.data.length > 0 && (
        <div className="z-50 md:w-[300px] max-h-[12em] overflow-y-scroll scrolling absolute top-[30%] md:top-[1.5em] right-0 flex flex-col gap-[15px] bg-main-100 border-[.8px] px-[15px] py-[10px] border-main-300 rounded-[10px] cursor-pointer">
          <div className="flex flex-col gap-[15px]">
            <p className="my-0 text-[.6em] font-rubik font-[500] uppercase text-main-500">
              Click to apply AI suggestion
            </p>

            {Array.isArray(suggestion.data) ? (
              suggestion.data.map((item: string, id: number) => (
                <p
                  key={id.toString()}
                  onClick={() => applySuggestion(item)}
                  className="w-full px-[.75em] py-[.5em] bg-sec-100 rounded-[.25em] hover:text-white hover:bg-main-600  my-0 text-[.9em] font-jakarta font-[300] cursor-pointer"
                >
                  {convertListToText(item)}
                </p>
              ))
            ) : (
              <p
                onClick={() => applySuggestion(suggestion.data?.toString())}
                className="w-full px-[.75em] py-[.5em] bg-sec-100 rounded-[.25em] hover:text-white hover:bg-main-600  my-0 text-[.9em] font-jakarta font-[300] cursor-pointer"
              >
                {convertListToText(suggestion.data)}
              </p>
            )}
          </div>

          <FontAwesomeIcon
            icon={faMultiply}
            className="my-0 absolute top-[-35px] left-0 bg-red-500 rounded-full px-[10px] py-[8px] text-red-100  text-[.8em]"
            onClick={clearAll}
          />
        </div>
      )}
    </div>
  );
}

const mapDispatchToProps = {};

export default connect(null, mapDispatchToProps)(TextEditor);
// export default TextEditor;
