"use client";
import React, { useEffect, useRef, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import { Editor } from "@ckeditor/ckeditor5-core";
import "../styles.scss";
import { Platformbtn } from "../../buttons";
import {
  faCircleDot,
  // faLightbulb,
  faMultiply,
} from "@fortawesome/free-solid-svg-icons";
import { apiCompModel } from "@/utils/models/models";
import { connect, useSelector } from "react-redux";
import {
  aiAssistAction,
  makePatchAction,
} from "@/appredux/actions/dashboard/dashactions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  arrayToUlString,
  convertListToText,
  formatStringToList,
  modifyText,
} from "@/utils/helper";
import { cb, RootState } from "@/appredux/store/storemodel";
import { editorAiURL, editorReqData } from "./editor-utils";

interface EditorData {
  editorData: string;
}

interface TextEditorProps extends apiCompModel {
  value?: string;
  name: string;
  ai?: boolean;
  context: string;
  job_title: string;
  section: string;
  toolbarCtrl?: string[];
  onChange?: (name: string, value: string) => void;
  aiAssistAction: <T>(url: string, payload: T, cb: cb) => void;
}

function TextEditor({
  name,
  value,
  ai,
  context,
  job_title,
  section,
  toolbarCtrl,
  onChange,
  aiAssistAction = () => ({}),
}: TextEditorProps): JSX.Element {
  const [suggestion, setSuggestion] = useState({
    data: [],
    loading: false,
  });
  const { aiLoad } = useSelector((store: RootState) => store.dash);
  const { job_description } = useSelector((store: RootState) => store.resume);
  const [editorData, setEditorData] = useState<EditorData | any>({
    editorData: value || "",
  });
  const [range, setRange] = useState({
    range: "",
    highlight: "",
  });
  const editorRef = useRef<any>();
  const editor = editorRef.current;

  const handleEditorChange = (event: any, editor: any) => {
    const data = editor.getData();
    setEditorData({ editorData: data });
    onChange?.(name, data);
  };

  let noList = ["professional_summary", "skill", "cover-letter"].includes(name);

  let aiAssist = () => {
    const url = editorAiURL(name);

    const data = editorReqData({
      name: name,
      job_title: job_title,
      range: range,
      value: value,

      section: section,
    });

    aiAssistAction<{
      prompt?: string;
      job_title?: string;
      session?: string;
      role?: string;
      skill?: string;
      job_description?: string;
    }>(
      url,
      {
        ...data,
        job_description: job_description,
      },
      (data) => {
        // var newData = Array.isArray(data) ? data.map : data.toString();
        // var formattedData = noList ? data : convertListToText(data);
        // setSuggestion({
        //   data: formattedData.replace("-", "")?.replace(/['"]/g, ""),
        //   loading: false,
        // });

        let formattedData;

        if (Array.isArray(data)) {
          formattedData = noList
            ? data.map((item) =>
                item?.toString()?.replace("-", "").replace(/['"]/g, "")
              )
            : data.map((item) =>
                convertListToText(
                  item?.toString()?.replace("-", "").replace(/['"]/g, "")
                )
              );
        } else {
          formattedData = data.toString();
        }

        // console.log(formattedData);

        setSuggestion({
          data: formattedData,
          loading: false,
        });
      }
    );
  };

  // suggest adds response to the last line
  const addToLast = (data: string) => {
    var val = editor.getData();
    var dataArr = modifyText(val || "");
    // console.log(arrayToUlString([...dataArr, suggestion.data]))
    var formatted = noList ? value + data : arrayToUlString([...dataArr, data]);
    onChange?.(name, formatted);
    setEditorData({ editorData: formatted });
  };

  // replace the highlighted text
  const replaceText = (data: string) => {
    editor.model.change((writer: any) => {
      editor.model.insertContent(writer.createText(data), range.range);
    });

    onChange?.(name, editor.getData());
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
  const getHighlightedText = (editor: any) => {
    editor.model.change((writer: any) => {
      const range = editor.model.document.selection.getFirstRange();

      const sentences = [];
      for (const value of range.getWalker()) {
        sentences.push(value.item.data);
      }

      setRange({ range: range, highlight: sentences.join(", ") });
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
    if (noList) {
      return ["bold"];
    }
    return ["bulletedList"];
  };

  return (
    <div className="w-full relative flex flex-col items-end justify-end gap-[15px]">
      {ai && (
        <div className="w-full flex flexcol items-end justify-end justify-between gap-[8px]">
          <p className="text-[.75em] text-main-900 font-[400]">
            Highlight text to use AI rephrase.
          </p>
          {((name === "cover-lette" && range.highlight) ||
            name !== "cover-lette") && (
            <Platformbtn
              type="withicon"
              name={
                aiLoad
                  ? range.highlight
                    ? "Rephrasing..."
                    : "Generating..."
                  : range.highlight
                  ? "AI Rephrase"
                  : "AI Generate"
              }
              addOns="bg-purple-800 !text-white !h-[2.85em] !rounded-full px-[25px] !font-[400] !text-[.85em] flex-row-reverse w-fit hover:bg-purple-900"
              icon={faCircleDot}
              icStyle={`mr-[1em] !text-white !text-[1em] ${
                aiLoad ? "!animate-ping " : ""
              } `}
              loading={aiLoad}
              click={aiAssist}
            />
          )}
        </div>
      )}
      <CKEditor
        editor={ClassicEditor as any}
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
        ref={editorRef}
        onReady={(editor:any) => {
          editorRef.current = editor;
          editor.editing.view.document.on("selectionChangeDone", () => {
            getHighlightedText(editor);
          });

          editor.editing.view.document.off("selectionChangeDone", () => {
            setRange({ range: "", highlight: "" });
          });
        }}
      />

      {suggestion.data.length > 0 && (
        <div className="z-50 md:w-[300px] max-h-[12em] overflow-y-scroll scrolling absolute top-[30%] right-0 flex flex-col gap-[15px] bg-main-100 border-[.8px] px-[15px] py-[10px] border-main-300 rounded-[10px] cursor-pointer">
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

const mapDispatchToProps = {
  makePatchAction,
  aiAssistAction,
};

export default connect(null, mapDispatchToProps)(TextEditor);
// export default TextEditor;
