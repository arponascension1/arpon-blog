import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { A as AdminLayout } from "./AdminLayout-DmLr14pk.js";
import { useForm, Head, Link, router, WhenVisible } from "@inertiajs/react";
import { D as Dropdown } from "./Dropdown-CbnvImCK.js";
import "axios";
import "@headlessui/react";
function Index({ items, currentPath, breadcrumbs, allDirectories, filters }) {
  const [selectedItems, setSelectedItems] = useState([]);
  const [previewItem, setPreviewItem] = useState(null);
  const [isCreateFolderModalOpen, setIsCreateFolderModalOpen] = useState(false);
  const [renameItem, setRenameItem] = useState(null);
  const [moveItems, setMoveItems] = useState(null);
  const [search, setSearch] = useState(filters.search || "");
  const [directorySearch, setDirectorySearch] = useState("");
  const [expandedFolders, setExpandedFolders] = useState(["Root"]);
  const [viewMode, setViewMode] = useState(
    localStorage.getItem("media_view_mode") || "list"
  );
  const mediaItems = items.data;
  const toggleViewMode = (mode) => {
    setViewMode(mode);
    localStorage.setItem("media_view_mode", mode);
  };
  const getParams = (newSearch, newSortBy, newSortOrder, newPath) => {
    const finalSortBy = newSortBy !== void 0 ? newSortBy : filters.sort_by;
    const finalSortOrder = newSortOrder !== void 0 ? newSortOrder : filters.sort_order;
    const params = {
      path: (newPath !== void 0 ? newPath : currentPath) || void 0,
      search: (newSearch !== void 0 ? newSearch : search) || void 0,
      sort_by: finalSortBy === "name" ? void 0 : finalSortBy,
      sort_order: finalSortOrder === "asc" ? void 0 : finalSortOrder
    };
    return Object.fromEntries(Object.entries(params).filter(([_, v]) => v !== void 0));
  };
  const handleSearch = (e) => {
    e.preventDefault();
    router.get(route("admin.media.index"), getParams(), { preserveState: true });
  };
  const toggleSelection = (path) => {
    setSelectedItems(
      (prev) => prev.includes(path) ? prev.filter((p) => p !== path) : [...prev, path]
    );
  };
  const handleFileUpload = (e) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const formData = new FormData();
      formData.append("path", currentPath);
      files.forEach((file) => formData.append("files[]", file));
      router.post(route("admin.media.upload"), formData, {
        onSuccess: () => {
          e.target.value = "";
        }
      });
    }
  };
  const createFolder = (e) => {
    e.preventDefault();
    post(route("admin.media.folder"), {
      onSuccess: () => {
        setIsCreateFolderModalOpen(false);
        reset("name");
      }
    });
  };
  const handleRename = (e) => {
    e.preventDefault();
    router.post(route("admin.media.rename"), {
      path: renameItem?.path,
      new_name: data.new_name,
      type: renameItem?.type
    }, {
      onSuccess: () => {
        setRenameItem(null);
        reset("new_name");
      }
    });
  };
  const handleMove = (e) => {
    e.preventDefault();
    router.post(route("admin.media.move"), {
      items: moveItems?.map((i) => ({ path: i.path })),
      destination: data.destination === "Root" ? "" : data.destination
    }, {
      onSuccess: () => {
        setMoveItems(null);
        setSelectedItems([]);
        reset("destination");
      }
    });
  };
  const deleteSelected = () => {
    if (confirm("Are you sure you want to delete selected items?")) {
      const itemsToDelete = mediaItems.filter((item) => selectedItems.includes(item.path)).map((item) => ({ path: item.path, type: item.type }));
      router.delete(route("admin.media.destroy"), {
        data: { items: itemsToDelete },
        onSuccess: () => setSelectedItems([])
      });
    }
  };
  const formatSize = (bytes) => {
    if (!bytes) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };
  const basename = (path) => {
    return path.split("/").pop() || "";
  };
  const toggleExpand = (path, e) => {
    e.stopPropagation();
    setExpandedFolders(
      (prev) => prev.includes(path) ? prev.filter((p) => p !== path) : [...prev, path]
    );
  };
  const hasChildren = (path) => {
    if (path === "Root") return allDirectories.length > 1;
    return allDirectories.some((dir) => dir.startsWith(path + "/"));
  };
  const isFolderVisible = (path) => {
    if (directorySearch) return true;
    if (path === "Root") return true;
    const parts = path.split("/");
    if (!expandedFolders.includes("Root")) return false;
    let current = "";
    for (let i = 0; i < parts.length - 1; i++) {
      current += (current ? "/" : "") + parts[i];
      if (!expandedFolders.includes(current)) return false;
    }
    return true;
  };
  const filteredDirectories = allDirectories.filter((dir) => {
    const matchesSearch = dir.toLowerCase().includes(directorySearch.toLowerCase());
    const matchesVisibility = isFolderVisible(dir);
    return matchesSearch && matchesVisibility;
  });
  const getIndentLevel = (path) => {
    if (path === "Root") return 0;
    return (path.match(/\//g) || []).length + 1;
  };
  const { data, setData, post, processing, reset, errors } = useForm({
    name: "",
    path: currentPath,
    new_name: "",
    destination: ""
  });
  return /* @__PURE__ */ jsxs(AdminLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Media Management" }),
    /* @__PURE__ */ jsx("div", { className: "py-6", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row md:items-center md:justify-between mb-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0 mr-4", children: [
          /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-gray-900", children: "Media Management" }),
          /* @__PURE__ */ jsx("nav", { className: "flex mt-1", "aria-label": "Breadcrumb", children: /* @__PURE__ */ jsx("ol", { className: "flex items-center space-x-2", children: breadcrumbs.map((crumb, index) => /* @__PURE__ */ jsxs("li", { className: "flex items-center", children: [
            index > 0 && /* @__PURE__ */ jsx("span", { className: "text-gray-400 mx-2", children: "/" }),
            /* @__PURE__ */ jsx(
              Link,
              {
                href: route("admin.media.index", getParams(search, filters.sort_by, filters.sort_order, crumb.path)),
                className: `text-sm font-medium ${index === breadcrumbs.length - 1 ? "text-gray-900" : "text-blue-600 hover:text-blue-800"}`,
                children: crumb.name
              }
            )
          ] }, crumb.path)) }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-4 md:mt-0 flex flex-wrap gap-3 items-center", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center bg-gray-100 rounded-lg p-1 mr-2", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => toggleViewMode("list"),
                className: `p-1.5 rounded-md ${viewMode === "list" ? "bg-white shadow-sm text-blue-600" : "text-gray-500 hover:text-gray-700"}`,
                title: "List View",
                children: /* @__PURE__ */ jsx("svg", { className: "h-5 w-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M4 6h16M4 12h16M4 18h16" }) })
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => toggleViewMode("grid"),
                className: `p-1.5 rounded-md ${viewMode === "grid" ? "bg-white shadow-sm text-blue-600" : "text-gray-500 hover:text-gray-700"}`,
                title: "Grid View",
                children: /* @__PURE__ */ jsx("svg", { className: "h-5 w-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM6 14a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 14a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" }) })
              }
            )
          ] }),
          /* @__PURE__ */ jsxs(Dropdown, { children: [
            /* @__PURE__ */ jsx(Dropdown.Trigger, { children: /* @__PURE__ */ jsxs("button", { className: "inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer", children: [
              /* @__PURE__ */ jsx("svg", { className: "h-4 w-4 mr-2 text-gray-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" }) }),
              "Sort",
              /* @__PURE__ */ jsx("svg", { className: "ml-2 -mr-1 h-4 w-4 text-gray-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M19 9l-7 7-7-7" }) })
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
                onClick: () => {
                  router.get(route("admin.media.index"), getParams(search, option.sort, option.order), { preserveState: true });
                },
                className: `w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center justify-between transition-colors ${filters.sort_by === option.sort && filters.sort_order === option.order ? "text-blue-600 font-semibold bg-blue-50" : "text-gray-700"}`,
                children: [
                  option.label,
                  filters.sort_by === option.sort && filters.sort_order === option.order && /* @__PURE__ */ jsx("svg", { className: "h-4 w-4", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z", clipRule: "evenodd" }) })
                ]
              },
              `${option.sort}-${option.order}`
            )) })
          ] }),
          /* @__PURE__ */ jsxs("form", { onSubmit: handleSearch, className: "relative", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                placeholder: "Search files...",
                value: search,
                onChange: (e) => setSearch(e.target.value),
                className: "block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none", children: /* @__PURE__ */ jsx("svg", { className: "h-5 w-5 text-gray-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" }) }) })
          ] }),
          selectedItems.length > 0 && /* @__PURE__ */ jsxs("div", { className: "flex space-x-2", children: [
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: () => {
                  const itemsToMove = mediaItems.filter((item) => selectedItems.includes(item.path));
                  setMoveItems(itemsToMove);
                  setData("destination", currentPath);
                },
                className: "inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
                children: [
                  "Move (",
                  selectedItems.length,
                  ")"
                ]
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: deleteSelected,
                className: "inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500",
                children: "Delete"
              }
            )
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setIsCreateFolderModalOpen(true),
              className: "inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
              children: "New Folder"
            }
          ),
          /* @__PURE__ */ jsxs("label", { className: "inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer", children: [
            "Upload",
            /* @__PURE__ */ jsx("input", { type: "file", multiple: true, className: "hidden", onChange: handleFileUpload })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: `${viewMode === "list" ? "bg-white shadow overflow-hidden sm:rounded-md" : ""}`, children: [
        viewMode === "list" ? /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("ul", { className: "divide-y divide-gray-200", children: [
          mediaItems.length === 0 && /* @__PURE__ */ jsx("li", { className: "px-6 py-12 text-center text-gray-500", children: "This folder is empty." }),
          mediaItems.map((item) => /* @__PURE__ */ jsxs("li", { className: "hover:bg-gray-50 flex items-center px-4 py-4 sm:px-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center flex-1", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "checkbox",
                  checked: selectedItems.includes(item.path),
                  onChange: () => toggleSelection(item.path),
                  className: "h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mr-4"
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1 flex items-center", children: [
                /* @__PURE__ */ jsx("div", { className: "flex-shrink-0", children: item.type === "folder" ? /* @__PURE__ */ jsx("svg", { className: "h-10 w-10 text-yellow-400", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsx("path", { d: "M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" }) }) : /* @__PURE__ */ jsx("div", { className: "h-10 w-10 flex items-center justify-center bg-gray-100 rounded text-gray-400 overflow-hidden", children: item.mime && typeof item.mime === "string" && item.mime.startsWith("image/") ? /* @__PURE__ */ jsx("img", { src: item.url, alt: "", className: "h-full w-full object-cover" }) : /* @__PURE__ */ jsx("svg", { className: "h-8 w-8", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" }) }) }) }),
                /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1 px-4 flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex-1 truncate mr-4", children: [
                    item.type === "folder" ? /* @__PURE__ */ jsx(
                      Link,
                      {
                        href: route("admin.media.index", getParams(search, filters.sort_by, filters.sort_order, item.path)),
                        className: "text-sm font-medium text-blue-600 truncate hover:underline",
                        children: item.name
                      }
                    ) : /* @__PURE__ */ jsx(
                      "button",
                      {
                        onClick: () => setPreviewItem(item),
                        className: "text-sm font-medium text-gray-900 truncate hover:text-blue-600 text-left",
                        children: item.name
                      }
                    ),
                    /* @__PURE__ */ jsxs("div", { className: "text-xs text-gray-500 md:hidden", children: [
                      item.type === "file" ? formatSize(item.size) : "Folder",
                      item.last_modified && ` • ${new Date(item.last_modified * 1e3).toLocaleDateString()}`
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "hidden md:flex items-center text-sm text-gray-500", children: [
                    /* @__PURE__ */ jsx("div", { className: "w-32 truncate", children: item.type === "file" ? formatSize(item.size) : "-" }),
                    /* @__PURE__ */ jsx("div", { className: "w-48 truncate", children: item.last_modified ? new Date(item.last_modified * 1e3).toLocaleDateString() : "-" })
                  ] })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex space-x-2", children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => {
                    setRenameItem(item);
                    setData("new_name", item.name);
                  },
                  className: "p-1 text-gray-400 hover:text-blue-600",
                  title: "Rename",
                  children: /* @__PURE__ */ jsx("svg", { className: "h-5 w-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" }) })
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => {
                    setMoveItems([item]);
                    setData("destination", currentPath);
                  },
                  className: "p-1 text-gray-400 hover:text-blue-600",
                  title: "Move",
                  children: /* @__PURE__ */ jsx("svg", { className: "h-5 w-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" }) })
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => {
                    if (confirm("Are you sure you want to delete this?")) {
                      router.delete(route("admin.media.destroy"), {
                        data: { items: [{ path: item.path, type: item.type }] }
                      });
                    }
                  },
                  className: "p-1 text-gray-400 hover:text-red-600",
                  title: "Delete",
                  children: /* @__PURE__ */ jsx("svg", { className: "h-5 w-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" }) })
                }
              )
            ] })
          ] }, item.path))
        ] }) }) : /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4", children: [
          mediaItems.length === 0 && /* @__PURE__ */ jsx("div", { className: "col-span-full py-12 text-center text-gray-500 bg-white rounded-lg shadow", children: "This folder is empty." }),
          mediaItems.map((item) => /* @__PURE__ */ jsxs(
            "div",
            {
              className: `relative group bg-white rounded-lg shadow-sm border p-2 hover:shadow-md transition-shadow ${selectedItems.includes(item.path) ? "border-blue-500 ring-1 ring-blue-500" : "border-gray-200"}`,
              children: [
                /* @__PURE__ */ jsx("div", { className: `absolute top-2 left-2 z-10 transition-opacity ${selectedItems.includes(item.path) ? "opacity-100" : "opacity-0 group-hover:opacity-100 focus-within:opacity-100"}`, children: /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "checkbox",
                    checked: selectedItems.includes(item.path),
                    onChange: () => toggleSelection(item.path),
                    className: "h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  }
                ) }),
                /* @__PURE__ */ jsxs("div", { className: "absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col space-y-1", children: [
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: () => {
                        setRenameItem(item);
                        setData("new_name", item.name);
                      },
                      className: "p-1 bg-white rounded-full shadow-sm text-gray-400 hover:text-blue-600 border",
                      title: "Rename",
                      children: /* @__PURE__ */ jsx("svg", { className: "h-4 w-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" }) })
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: () => {
                        setMoveItems([item]);
                        setData("destination", currentPath);
                      },
                      className: "p-1 bg-white rounded-full shadow-sm text-gray-400 hover:text-blue-600 border",
                      title: "Move",
                      children: /* @__PURE__ */ jsx("svg", { className: "h-4 w-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" }) })
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: () => {
                        if (confirm("Are you sure you want to delete this?")) {
                          router.delete(route("admin.media.destroy"), {
                            data: { items: [{ path: item.path, type: item.type }] }
                          });
                        }
                      },
                      className: "p-1 bg-white rounded-full shadow-sm text-gray-400 hover:text-red-600 border",
                      title: "Delete",
                      children: /* @__PURE__ */ jsx("svg", { className: "h-4 w-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" }) })
                    }
                  )
                ] }),
                /* @__PURE__ */ jsx("div", { className: "aspect-square w-full mb-2 flex items-center justify-center bg-gray-50 rounded-md overflow-hidden", children: item.type === "folder" ? /* @__PURE__ */ jsx(
                  Link,
                  {
                    href: route("admin.media.index", getParams(search, filters.sort_by, filters.sort_order, item.path)),
                    className: "w-full h-full flex items-center justify-center text-yellow-400 hover:scale-110 transition-transform",
                    children: /* @__PURE__ */ jsx("svg", { className: "h-16 w-16", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsx("path", { d: "M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" }) })
                  }
                ) : /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => setPreviewItem(item),
                    className: "w-full h-full flex items-center justify-center group-hover:scale-105 transition-transform",
                    children: item.mime && typeof item.mime === "string" && item.mime.startsWith("image/") ? /* @__PURE__ */ jsx("img", { src: item.url, alt: "", className: "h-full w-full object-cover" }) : /* @__PURE__ */ jsx("svg", { className: "h-12 w-12 text-gray-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" }) })
                  }
                ) }),
                /* @__PURE__ */ jsxs("div", { className: "px-1", children: [
                  /* @__PURE__ */ jsx("div", { className: "text-xs font-medium text-gray-900 truncate", title: item.name, children: item.name }),
                  /* @__PURE__ */ jsx("div", { className: "text-[10px] text-gray-500 truncate", children: item.type === "file" ? formatSize(item.size) : "Folder" })
                ] })
              ]
            },
            item.path
          ))
        ] }),
        items.next_page_url && /* @__PURE__ */ jsx(
          WhenVisible,
          {
            data: "items",
            always: true,
            fallback: /* @__PURE__ */ jsx("div", { className: "py-8 text-center", children: /* @__PURE__ */ jsx("div", { className: "inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]", role: "status", children: /* @__PURE__ */ jsx("span", { className: "!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]", children: "Loading..." }) }) }),
            children: ({ fetching }) => fetching && /* @__PURE__ */ jsx("div", { className: "py-8 text-center text-gray-500", children: "Loading more items..." })
          }
        )
      ] })
    ] }) }),
    isCreateFolderModalOpen && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 overflow-y-auto", children: /* @__PURE__ */ jsxs("div", { className: "flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0", children: [
      /* @__PURE__ */ jsx("div", { className: "fixed inset-0 transition-opacity", "aria-hidden": "true", children: /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gray-500 opacity-75", onClick: () => setIsCreateFolderModalOpen(false) }) }),
      /* @__PURE__ */ jsx("span", { className: "hidden sm:inline-block sm:align-middle sm:h-screen", "aria-hidden": "true", children: "​" }),
      /* @__PURE__ */ jsx("div", { className: "inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full", children: /* @__PURE__ */ jsxs("form", { onSubmit: createFolder, children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium text-gray-900 mb-4", children: "Create New Folder" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              className: "w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500",
              placeholder: "Folder Name",
              value: data.name,
              onChange: (e) => setData("name", e.target.value),
              autoFocus: true
            }
          ),
          errors.name && /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-red-600", children: errors.name })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "submit",
              className: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm",
              disabled: processing,
              children: "Create"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              className: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm",
              onClick: () => setIsCreateFolderModalOpen(false),
              children: "Cancel"
            }
          )
        ] })
      ] }) })
    ] }) }),
    renameItem && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 overflow-y-auto", children: /* @__PURE__ */ jsxs("div", { className: "flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0", children: [
      /* @__PURE__ */ jsx("div", { className: "fixed inset-0 transition-opacity", "aria-hidden": "true", children: /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gray-500 opacity-75", onClick: () => setRenameItem(null) }) }),
      /* @__PURE__ */ jsx("span", { className: "hidden sm:inline-block sm:align-middle sm:h-screen", "aria-hidden": "true", children: "​" }),
      /* @__PURE__ */ jsx("div", { className: "inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full", children: /* @__PURE__ */ jsxs("form", { onSubmit: handleRename, children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4", children: [
          /* @__PURE__ */ jsxs("h3", { className: "text-lg font-medium text-gray-900 mb-4", children: [
            "Rename ",
            renameItem.type
          ] }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              className: "w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500",
              placeholder: "New Name",
              value: data.new_name,
              onChange: (e) => setData("new_name", e.target.value),
              autoFocus: true
            }
          ),
          errors.new_name && /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-red-600", children: errors.new_name })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "submit",
              className: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm",
              disabled: processing,
              children: "Rename"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              className: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm",
              onClick: () => setRenameItem(null),
              children: "Cancel"
            }
          )
        ] })
      ] }) })
    ] }) }),
    moveItems && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 overflow-y-auto", children: /* @__PURE__ */ jsxs("div", { className: "flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0", children: [
      /* @__PURE__ */ jsx("div", { className: "fixed inset-0 transition-opacity", "aria-hidden": "true", children: /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gray-500 opacity-75", onClick: () => setMoveItems(null) }) }),
      /* @__PURE__ */ jsx("span", { className: "hidden sm:inline-block sm:align-middle sm:h-screen", "aria-hidden": "true", children: "​" }),
      /* @__PURE__ */ jsx("div", { className: "inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full", children: /* @__PURE__ */ jsxs("form", { onSubmit: handleMove, children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium text-gray-900 mb-4", children: "Move Items" }),
          /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-500 mb-4", children: [
            "Select destination folder for ",
            moveItems.length,
            " item(s):"
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                className: "w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 pl-10 sm:text-sm",
                placeholder: "Search destination folder...",
                value: directorySearch,
                onChange: (e) => setDirectorySearch(e.target.value)
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none", children: /* @__PURE__ */ jsx("svg", { className: "h-4 w-4 text-gray-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" }) }) })
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: "border border-gray-200 rounded-md max-h-60 overflow-y-auto bg-gray-50", children: filteredDirectories.length === 0 ? /* @__PURE__ */ jsx("div", { className: "p-4 text-center text-sm text-gray-500", children: "No folders found" }) : /* @__PURE__ */ jsx("div", { className: "py-1", children: filteredDirectories.map((dir) => /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              onClick: () => setData("destination", dir === "Root" ? "" : dir),
              className: `w-full text-left px-4 py-2 text-sm flex items-center hover:bg-blue-50 transition-colors ${data.destination === dir || data.destination === "" && dir === "Root" ? "bg-blue-100 text-blue-700 font-semibold" : "text-gray-700"}`,
              children: [
                /* @__PURE__ */ jsxs("span", { style: { marginLeft: `${getIndentLevel(dir) * 1.25}rem` }, className: "flex items-center", children: [
                  /* @__PURE__ */ jsx(
                    "div",
                    {
                      className: "w-5 h-5 flex items-center justify-center mr-1 cursor-pointer hover:bg-gray-200 rounded",
                      onClick: (e) => hasChildren(dir) && toggleExpand(dir, e),
                      children: hasChildren(dir) ? /* @__PURE__ */ jsx(
                        "svg",
                        {
                          className: `h-3 w-3 transition-transform ${expandedFolders.includes(dir) ? "rotate-90" : ""}`,
                          fill: "none",
                          stroke: "currentColor",
                          viewBox: "0 0 24 24",
                          children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "3", d: "M9 5l7 7-7 7" })
                        }
                      ) : /* @__PURE__ */ jsx("div", { className: "w-1 h-1 bg-gray-300 rounded-full" })
                    }
                  ),
                  /* @__PURE__ */ jsx("svg", { className: `h-4 w-4 mr-2 ${dir === "Root" ? "text-blue-500" : "text-yellow-400"}`, fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsx("path", { d: "M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" }) }),
                  dir === "Root" ? "Root" : basename(dir)
                ] }),
                (data.destination === dir || data.destination === "" && dir === "Root") && /* @__PURE__ */ jsx("svg", { className: "h-4 w-4 ml-auto text-blue-600", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z", clipRule: "evenodd" }) })
              ]
            },
            dir
          )) }) }),
          data.destination !== void 0 && /* @__PURE__ */ jsxs("p", { className: "mt-3 text-xs text-gray-500 truncate", children: [
            "Destination: ",
            /* @__PURE__ */ jsx("span", { className: "font-semibold text-gray-700", children: data.destination || "Root" })
          ] }),
          errors.destination && /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-red-600", children: errors.destination })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "submit",
              className: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm",
              disabled: processing || !data.destination && data.destination !== "",
              children: "Move"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              className: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm",
              onClick: () => setMoveItems(null),
              children: "Cancel"
            }
          )
        ] })
      ] }) })
    ] }) }),
    previewItem && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 overflow-y-auto", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0", children: [
      /* @__PURE__ */ jsx("div", { className: "fixed inset-0 transition-opacity", "aria-hidden": "true", children: /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gray-900 opacity-90", onClick: () => setPreviewItem(null) }) }),
      /* @__PURE__ */ jsx("span", { className: "hidden sm:inline-block sm:align-middle sm:h-screen", "aria-hidden": "true", children: "​" }),
      /* @__PURE__ */ jsxs("div", { className: "inline-block align-middle bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-4xl sm:w-full", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-white px-4 py-3 border-b border-gray-200 flex justify-between items-center", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium text-gray-900 truncate pr-4", children: previewItem.name }),
          /* @__PURE__ */ jsx("button", { onClick: () => setPreviewItem(null), className: "text-gray-400 hover:text-gray-500", children: /* @__PURE__ */ jsx("svg", { className: "h-6 w-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M6 18L18 6M6 6l12 12" }) }) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "p-4 flex justify-center bg-gray-50", style: { maxHeight: "70vh", overflow: "auto" }, children: previewItem.mime && typeof previewItem.mime === "string" && previewItem.mime.startsWith("image/") ? /* @__PURE__ */ jsx("img", { src: previewItem.url, alt: previewItem.name, className: "max-w-full h-auto" }) : previewItem.mime === "application/pdf" ? /* @__PURE__ */ jsx("iframe", { src: previewItem.url, className: "w-full h-[60vh]" }) : previewItem.mime && typeof previewItem.mime === "string" && previewItem.mime.startsWith("text/") || previewItem.mime === "application/json" || previewItem.name.endsWith(".txt") ? /* @__PURE__ */ jsx("iframe", { src: previewItem.url, className: "w-full h-[60vh] bg-white" }) : /* @__PURE__ */ jsxs("div", { className: "text-center py-12", children: [
          /* @__PURE__ */ jsx("svg", { className: "mx-auto h-12 w-12 text-gray-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" }) }),
          /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-gray-500", children: "Preview not available for this file type." }),
          /* @__PURE__ */ jsx("a", { href: previewItem.url, target: "_blank", className: "mt-4 inline-flex items-center text-blue-600 hover:underline", children: "Open in new tab" })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "bg-gray-50 px-4 py-3 sm:px-6 flex justify-end", children: /* @__PURE__ */ jsx(
          "a",
          {
            href: previewItem.url,
            download: true,
            className: "inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
            children: "Download"
          }
        ) })
      ] })
    ] }) })
  ] });
}
export {
  Index as default
};
