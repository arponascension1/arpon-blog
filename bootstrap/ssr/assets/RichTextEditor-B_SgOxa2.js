import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import React, { useState, useRef, useMemo } from "react";
import { Combobox, Transition } from "@headlessui/react";
import JoditEditor from "jodit-react";
import { a as MediaModal } from "./MediaPicker-B2RzXcBl.js";
function MultiSelect({ options, selected, onChange, placeholder = "Search...", label }) {
  const [query, setQuery] = useState("");
  const selectedOptions = options.filter((option) => selected.includes(option.id));
  const filteredOptions = query === "" ? options : options.filter(
    (option) => option.name.toLowerCase().replace(/\s+/g, "").includes(query.toLowerCase().replace(/\s+/g, ""))
  );
  const handleSelect = (option) => {
    if (!option) return;
    if (selected.includes(option.id)) {
      onChange(selected.filter((id) => id !== option.id));
    } else {
      onChange([...selected, option.id]);
    }
  };
  const removeOption = (id) => {
    onChange(selected.filter((selectedId) => selectedId !== id));
  };
  return /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
    label && /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: label }),
    /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2 mb-2", children: selectedOptions.map((option) => /* @__PURE__ */ jsxs(
      "span",
      {
        className: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 group",
        children: [
          option.name,
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => removeOption(option.id),
              className: "ml-1.5 inline-flex items-center justify-center h-4 w-4 rounded-full text-blue-400 hover:bg-blue-200 hover:text-blue-500 focus:outline-none",
              children: /* @__PURE__ */ jsx("svg", { className: "h-3 w-3", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M6 18L18 6M6 6l12 12" }) })
            }
          )
        ]
      },
      option.id
    )) }),
    /* @__PURE__ */ jsx(Combobox, { value: null, onChange: handleSelect, children: /* @__PURE__ */ jsxs("div", { className: "relative mt-1", children: [
      /* @__PURE__ */ jsxs("div", { className: "relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left border border-gray-300 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 sm:text-sm", children: [
        /* @__PURE__ */ jsx(
          Combobox.Input,
          {
            className: "w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0",
            placeholder,
            displayValue: () => "",
            onChange: (event) => setQuery(event.target.value)
          }
        ),
        /* @__PURE__ */ jsx(Combobox.Button, { className: "absolute inset-y-0 right-0 flex items-center pr-2", children: /* @__PURE__ */ jsx("svg", { className: "h-5 w-5 text-gray-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M8 9l4-4 4 4m0 6l-4 4-4-4" }) }) })
      ] }),
      /* @__PURE__ */ jsx(
        Transition,
        {
          as: React.Fragment,
          leave: "transition ease-in duration-100",
          leaveFrom: "opacity-100",
          leaveTo: "opacity-0",
          afterLeave: () => setQuery(""),
          children: /* @__PURE__ */ jsx(Combobox.Options, { className: "absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm", children: filteredOptions.length === 0 && query !== "" ? /* @__PURE__ */ jsx("div", { className: "relative cursor-default select-none py-2 px-4 text-gray-700", children: "Nothing found." }) : filteredOptions.map((option) => /* @__PURE__ */ jsx(
            Combobox.Option,
            {
              className: ({ active }) => `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? "bg-blue-600 text-white" : "text-gray-900"}`,
              value: option,
              children: ({ selected: isSelected, active }) => /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx(
                  "span",
                  {
                    className: `block truncate ${selected.includes(option.id) ? "font-medium" : "font-normal"}`,
                    children: option.name
                  }
                ),
                selected.includes(option.id) ? /* @__PURE__ */ jsx(
                  "span",
                  {
                    className: `absolute inset-y-0 left-0 flex items-center pl-3 ${active ? "text-white" : "text-blue-600"}`,
                    children: /* @__PURE__ */ jsx("svg", { className: "h-5 w-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M5 13l4 4L19 7" }) })
                  }
                ) : null
              ] })
            },
            option.id
          )) })
        }
      )
    ] }) })
  ] });
}
function RichTextEditor({ value, onChange, placeholder = "Write something..." }) {
  const editorRef = useRef(null);
  const [mediaModalOpen, setMediaModalOpen] = useState(false);
  const [initialValue] = useState(value);
  const lastContent = useRef(value);
  const config = useMemo(() => ({
    readonly: false,
    placeholder,
    height: 600,
    minHeight: 600,
    scrollMode: "inside",
    toolbarSticky: false,
    toolbarAdaptive: false,
    autofocus: false,
    spellcheck: true,
    theme: "default",
    buttons: [
      "source",
      "|",
      "bold",
      "italic",
      "underline",
      "strikethrough",
      "|",
      "ul",
      "ol",
      "|",
      "outdent",
      "indent",
      "|",
      "font",
      "fontsize",
      "brush",
      "paragraph",
      "|",
      {
        name: "media",
        tooltip: "Insert from Media Library",
        iconURL: "data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2Utd2lkdGg9IjIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3QgeD0iMyIgeT0iMyIgd2lkdGg9IjE4IiBoZWlnaHQ9IjE4IiByeD0iMiIgcnk9IjIiLz48Y2lyY2xlIGN4PSI4LjUiIGN5PSI4LjUiIHI9IjEuNSIvPjxwb2x5bGluZSBwb2ludHM9IjIxIDE1IDE2IDEwIDUgMjEiLz48L3N2Zz4=",
        exec: (editor) => {
          setMediaModalOpen(true);
        }
      },
      "table",
      "link",
      "|",
      "align",
      "undo",
      "redo",
      "|",
      "hr",
      "eraser",
      "copyformat",
      "|",
      "fullsize",
      "print",
      "about"
    ],
    removeButtons: ["image", "file", "video"],
    showXPathInStatusbar: false,
    askBeforePasteHTML: false,
    askBeforePasteFromWord: false,
    defaultActionOnPaste: "insert_clear_html"
  }), [placeholder]);
  const handleMediaSelect = (url) => {
    if (editorRef.current) {
      const editor = editorRef.current;
      editor.selection.insertImage(url);
      const newContent = editor.value;
      lastContent.current = newContent;
      onChange(newContent);
    }
  };
  const handleBlur = (newContent) => {
    if (newContent !== lastContent.current) {
      lastContent.current = newContent;
      onChange(newContent);
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "w-full border border-gray-300 rounded-lg overflow-hidden bg-white jodit-editor-container min-h-[600px]", children: [
    /* @__PURE__ */ jsx(
      MediaModal,
      {
        show: mediaModalOpen,
        onClose: () => setMediaModalOpen(false),
        onSelect: handleMediaSelect,
        title: "Insert Image from Media Library"
      }
    ),
    /* @__PURE__ */ jsx(
      JoditEditor,
      {
        ref: editorRef,
        value: initialValue,
        config,
        onBlur: handleBlur,
        onChange: () => {
        }
      }
    ),
    /* @__PURE__ */ jsx("style", { dangerouslySetInnerHTML: { __html: `
                .jodit-editor-container .jodit-container:not(.jodit_fullsize) { border: none !important; height: 600px !important; }
                .jodit-editor-container .jodit-container:not(.jodit_fullsize) .jodit-workplace { height: 560px !important; overflow-y: auto !important; }
                .jodit-editor-container .jodit-wysiwyg { padding: 2rem !important; }
            ` } })
  ] });
}
export {
  MultiSelect as M,
  RichTextEditor as R
};
