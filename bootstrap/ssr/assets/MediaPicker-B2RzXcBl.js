import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { M as Modal, S as SecondaryButton } from "./Modal-B-IxVM06.js";
import axios from "axios";
import { P as PrimaryButton } from "./PrimaryButton-DgVfVBwo.js";
import { D as Dropdown } from "./Dropdown-CbnvImCK.js";
function MediaModal({ show, onClose, onSelect, title = "Select Media" }) {
  const [items, setItems] = useState([]);
  const [currentPath, setCurrentPath] = useState("");
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedUrl, setSelectedUrl] = useState(null);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const fetchMedia = async (path = currentPath, searchTerm = search, sort = sortBy, order = sortOrder) => {
    setLoading(true);
    try {
      const response = await axios.get(route("admin.media.fetch"), {
        params: {
          path,
          search: searchTerm || void 0,
          sort_by: sort,
          sort_order: order
        }
      });
      setItems(response.data.items);
      setBreadcrumbs(response.data.breadcrumbs);
      setCurrentPath(path);
    } catch (error) {
      console.error("Error fetching media:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (show) {
      fetchMedia();
    }
  }, [show, sortBy, sortOrder]);
  const handleSearch = (e) => {
    e.preventDefault();
    e.stopPropagation();
    fetchMedia();
  };
  const handleSelect = (item) => {
    if (item.type === "folder") {
      fetchMedia(item.path);
    } else if (item.mime?.startsWith("image/")) {
      setSelectedUrl(item.url || null);
    }
  };
  const confirmSelection = () => {
    if (selectedUrl) {
      onSelect(selectedUrl);
      onClose();
    }
  };
  return /* @__PURE__ */ jsx(Modal, { show, onClose, maxWidth: "2xl", children: /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-4", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium text-gray-900", children: title }),
      /* @__PURE__ */ jsx("button", { onClick: onClose, className: "text-gray-400 hover:text-gray-500", children: /* @__PURE__ */ jsx("svg", { className: "h-6 w-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M6 18L18 6M6 6l12 12" }) }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4", children: [
      /* @__PURE__ */ jsx("nav", { className: "flex", "aria-label": "Breadcrumb", children: /* @__PURE__ */ jsx("ol", { className: "flex items-center space-x-2", children: breadcrumbs.map((crumb, index) => /* @__PURE__ */ jsxs("li", { className: "flex items-center", children: [
        index > 0 && /* @__PURE__ */ jsx("span", { className: "text-gray-400 mx-2", children: "/" }),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: () => fetchMedia(crumb.path),
            className: `text-sm font-medium ${index === breadcrumbs.length - 1 ? "text-gray-900" : "text-blue-600 hover:text-blue-800"}`,
            children: crumb.name
          }
        )
      ] }, crumb.path)) }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
        /* @__PURE__ */ jsxs("form", { onSubmit: handleSearch, className: "relative flex-1 sm:w-64", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              placeholder: "Search...",
              value: search,
              onChange: (e) => setSearch(e.target.value),
              className: "block w-full pl-10 pr-3 py-1.5 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none", children: /* @__PURE__ */ jsx("svg", { className: "h-4 w-4 text-gray-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" }) }) })
        ] }),
        /* @__PURE__ */ jsxs(Dropdown, { children: [
          /* @__PURE__ */ jsx(Dropdown.Trigger, { children: /* @__PURE__ */ jsxs("button", { type: "button", className: "inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none", children: [
            /* @__PURE__ */ jsx("svg", { className: "h-4 w-4 mr-1 text-gray-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" }) }),
            "Sort"
          ] }) }),
          /* @__PURE__ */ jsx(Dropdown.Content, { children: [
            { label: "Name (A-Z)", sort: "name", order: "asc" },
            { label: "Name (Z-A)", sort: "name", order: "desc" },
            { label: "Size (Smallest)", sort: "size", order: "asc" },
            { label: "Size (Largest)", sort: "size", order: "desc" },
            { label: "Date (Oldest)", sort: "last_modified", order: "asc" },
            { label: "Date (Newest)", sort: "last_modified", order: "desc" }
          ].map((option) => /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              onClick: () => {
                setSortBy(option.sort);
                setSortOrder(option.order);
              },
              className: `w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center justify-between ${sortBy === option.sort && sortOrder === option.order ? "text-blue-600 font-semibold bg-blue-50" : "text-gray-700"}`,
              children: [
                option.label,
                sortBy === option.sort && sortOrder === option.order && /* @__PURE__ */ jsx("svg", { className: "h-4 w-4", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z", clipRule: "evenodd" }) })
              ]
            },
            `${option.sort}-${option.order}`
          )) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "border border-gray-200 rounded-lg min-h-[400px] max-h-[500px] overflow-y-auto p-4 bg-gray-50", children: loading ? /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center h-full", children: /* @__PURE__ */ jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" }) }) : /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4", children: items.map((item) => /* @__PURE__ */ jsxs(
      "div",
      {
        onClick: () => handleSelect(item),
        className: `relative group cursor-pointer border rounded-md p-1 transition-all ${selectedUrl === item.url ? "border-blue-500 ring-2 ring-blue-200" : "border-gray-200 bg-white hover:border-blue-300"}`,
        children: [
          /* @__PURE__ */ jsx("div", { className: "aspect-square flex items-center justify-center overflow-hidden rounded", children: item.type === "folder" ? /* @__PURE__ */ jsx("svg", { className: "h-12 w-12 text-yellow-400", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsx("path", { d: "M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" }) }) : item.mime?.startsWith("image/") ? /* @__PURE__ */ jsx("img", { src: item.url, alt: item.name, className: "h-full w-full object-cover" }) : /* @__PURE__ */ jsx("svg", { className: "h-10 w-10 text-gray-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" }) }) }),
          /* @__PURE__ */ jsx("div", { className: "mt-1 text-[10px] truncate text-center text-gray-600", children: item.name })
        ]
      },
      item.path
    )) }) }),
    /* @__PURE__ */ jsxs("div", { className: "mt-6 flex justify-end space-x-3", children: [
      /* @__PURE__ */ jsx(SecondaryButton, { type: "button", onClick: onClose, children: "Cancel" }),
      /* @__PURE__ */ jsx(
        PrimaryButton,
        {
          type: "button",
          onClick: confirmSelection,
          disabled: !selectedUrl,
          children: "Select Image"
        }
      )
    ] })
  ] }) });
}
function MediaPicker({ onSelect, currentValue, label = "Select Image" }) {
  const [isOpen, setIsOpen] = useState(false);
  return /* @__PURE__ */ jsxs("div", { children: [
    label && /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: label }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4", children: [
      /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 h-16 w-16 bg-gray-100 rounded-md overflow-hidden border border-gray-200", children: currentValue ? /* @__PURE__ */ jsx("img", { src: currentValue, alt: "Selected", className: "h-full w-full object-cover" }) : /* @__PURE__ */ jsx("div", { className: "h-full w-full flex items-center justify-center text-gray-400", children: /* @__PURE__ */ jsx("svg", { className: "h-8 w-8", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" }) }) }) }),
      /* @__PURE__ */ jsx(SecondaryButton, { type: "button", onClick: () => setIsOpen(true), children: "Change" }),
      currentValue && /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: () => onSelect(""),
          className: "text-sm text-red-600 hover:text-red-800",
          children: "Remove"
        }
      )
    ] }),
    /* @__PURE__ */ jsx(
      MediaModal,
      {
        show: isOpen,
        onClose: () => setIsOpen(false),
        onSelect
      }
    )
  ] });
}
export {
  MediaPicker as M,
  MediaModal as a
};
