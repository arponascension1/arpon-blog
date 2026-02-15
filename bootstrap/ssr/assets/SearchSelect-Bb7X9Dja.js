import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import React, { useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
function SearchSelect({ options, value, onChange, placeholder = "Select...", label, required = false }) {
  const [query, setQuery] = useState("");
  const selectedOption = options.find((option) => option.id.toString() === value.toString()) || null;
  const filteredOptions = query === "" ? options : options.filter(
    (option) => option.name.toLowerCase().replace(/\s+/g, "").includes(query.toLowerCase().replace(/\s+/g, ""))
  );
  return /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
    label && /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: label }),
    /* @__PURE__ */ jsx(Combobox, { value: selectedOption, onChange: (option) => option && onChange(option.id), children: /* @__PURE__ */ jsxs("div", { className: "relative mt-1", children: [
      /* @__PURE__ */ jsxs("div", { className: "relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left border border-gray-300 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 sm:text-sm", children: [
        /* @__PURE__ */ jsx(
          Combobox.Input,
          {
            className: "w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0",
            displayValue: (option) => option?.name || "",
            placeholder,
            onChange: (event) => setQuery(event.target.value),
            required
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
                    className: `block truncate ${isSelected ? "font-medium" : "font-normal"}`,
                    children: option.name
                  }
                ),
                isSelected ? /* @__PURE__ */ jsx(
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
export {
  SearchSelect as S
};
