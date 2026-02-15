import { jsxs, jsx } from "react/jsx-runtime";
import React, { useState, useEffect } from "react";
import { router, Head, Link } from "@inertiajs/react";
import { A as AdminLayout } from "./AdminLayout-DomSls0d.js";
import { P as Pagination, C as ConfirmationModal } from "./ConfirmationModal-DilHsETS.js";
import { S as SearchSelect } from "./SearchSelect-Bb7X9Dja.js";
import "@headlessui/react";
import "axios";
import "./Modal-B-IxVM06.js";
import "./DangerButton-B7to2Tbx.js";
function Index({ posts, categories, filters, sort }) {
  const [postToDelete, setPostToDelete] = useState(null);
  const [processingAction, setProcessingAction] = useState(false);
  const [searchTerm, setSearchTerm] = useState(filters.search || "");
  const [categoryFilter, setCategoryFilter] = useState(filters.category_id || "");
  const [statusFilter, setStatusFilter] = useState(filters.status || "");
  const [currentSort, setCurrentSort] = useState({
    field: sort?.field || "created_at",
    direction: sort?.direction || "desc"
  });
  const isFirstRender = React.useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const timeoutId = setTimeout(() => {
      if (searchTerm === (filters.search || "") && categoryFilter === (filters.category_id || "") && statusFilter === (filters.status || "") && currentSort.field === (sort?.field || "created_at") && currentSort.direction === (sort?.direction || "desc")) {
        return;
      }
      const params = {
        search: searchTerm || void 0,
        category_id: categoryFilter || void 0,
        status: statusFilter || void 0
      };
      if (currentSort.field !== "created_at" || currentSort.direction !== "desc") {
        params.sort = currentSort.field;
        params.direction = currentSort.direction;
      }
      router.get("/admin/posts", params, {
        preserveState: true,
        replace: true
      });
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [searchTerm, categoryFilter, statusFilter, currentSort]);
  useEffect(() => {
    setSearchTerm(filters.search || "");
    setCategoryFilter(filters.category_id || "");
    setStatusFilter(filters.status || "");
    if (sort?.field && sort?.direction) {
      setCurrentSort({
        field: sort.field,
        direction: sort.direction
      });
    }
  }, [filters.search, filters.category_id, filters.status, sort?.field, sort?.direction]);
  const deletePost = () => {
    if (!postToDelete) return;
    setProcessingAction(true);
    router.delete(`/admin/posts/${postToDelete.id}`, {
      onFinish: () => {
        setProcessingAction(false);
        setPostToDelete(null);
      }
    });
  };
  const handleSort = (field) => {
    if (currentSort.field === field) {
      setCurrentSort({
        field,
        direction: currentSort.direction === "asc" ? "desc" : "asc"
      });
    } else {
      setCurrentSort({
        field,
        direction: "desc"
      });
    }
  };
  const getStatusBadge = (status) => {
    switch (status) {
      case "published":
        return /* @__PURE__ */ jsx("span", { className: "px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800", children: "Published" });
      case "draft":
        return /* @__PURE__ */ jsx("span", { className: "px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800", children: "Draft" });
      case "scheduled":
        return /* @__PURE__ */ jsx("span", { className: "px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800", children: "Scheduled" });
      default:
        return null;
    }
  };
  const getSortIcon = (field) => {
    if (currentSort.field !== field) {
      return /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 text-gray-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4 4" }) });
    }
    return currentSort.direction === "asc" ? /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 text-blue-600", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M5 15l7-7 7 7" }) }) : /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 text-blue-600", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M19 9l-7 7-7-7" }) });
  };
  return /* @__PURE__ */ jsxs(AdminLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Manage Posts" }),
    /* @__PURE__ */ jsx("div", { className: "py-6", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8 flex justify-between items-center", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-gray-900", children: "Posts" }),
          /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-gray-600", children: "Manage your blog content" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex space-x-3", children: /* @__PURE__ */ jsxs(
          Link,
          {
            href: "/admin/posts/create",
            className: "inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700",
            children: [
              /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 mr-2", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M12 6v6m0 0v6m0-6h6m-6 0H6" }) }),
              "New Post"
            ]
          }
        ) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "bg-white shadow-sm rounded-2xl border border-gray-100 mb-6 overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "px-4 py-5 sm:p-6 bg-white", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-12 gap-4", children: [
        /* @__PURE__ */ jsx("div", { className: "sm:col-span-6 lg:col-span-7", children: /* @__PURE__ */ jsxs("div", { className: "relative group", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none", children: /* @__PURE__ */ jsx("svg", { className: "h-4 w-4 text-gray-400 group-focus-within:text-blue-500 transition-colors", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" }) }) }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              placeholder: "Search posts...",
              value: searchTerm,
              onChange: (e) => setSearchTerm(e.target.value),
              className: "block w-full pl-10 pr-3 py-2 border-gray-200 bg-gray-50/50 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 sm:text-sm transition-all"
            }
          )
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "sm:col-span-3 lg:col-span-3", children: /* @__PURE__ */ jsx(
          SearchSelect,
          {
            options: [{ id: "", name: "All Categories" }, ...categories],
            value: categoryFilter,
            onChange: (value) => setCategoryFilter(value.toString()),
            placeholder: "Category..."
          }
        ) }),
        /* @__PURE__ */ jsx("div", { className: "sm:col-span-3 lg:col-span-2", children: /* @__PURE__ */ jsxs(
          "select",
          {
            value: statusFilter,
            onChange: (e) => setStatusFilter(e.target.value),
            className: "block w-full border-gray-200 bg-gray-50/50 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 sm:text-sm transition-all",
            children: [
              /* @__PURE__ */ jsx("option", { value: "", children: "All Status" }),
              /* @__PURE__ */ jsx("option", { value: "draft", children: "Draft" }),
              /* @__PURE__ */ jsx("option", { value: "published", children: "Published" }),
              /* @__PURE__ */ jsx("option", { value: "scheduled", children: "Scheduled" })
            ]
          }
        ) })
      ] }) }) }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white shadow-sm rounded-2xl border border-gray-100 overflow-hidden", children: [
        /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "min-w-full divide-y divide-gray-100", children: [
          /* @__PURE__ */ jsx("thead", { className: "bg-gray-50/50", children: /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx(
              "th",
              {
                scope: "col",
                className: "px-6 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest cursor-pointer hover:bg-gray-100 transition-colors",
                onClick: () => handleSort("title"),
                children: /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-1", children: [
                  /* @__PURE__ */ jsx("span", { children: "Title" }),
                  getSortIcon("title")
                ] })
              }
            ),
            /* @__PURE__ */ jsx("th", { scope: "col", className: "px-6 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest", children: "Category" }),
            /* @__PURE__ */ jsx("th", { scope: "col", className: "px-6 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest", children: "Status" }),
            /* @__PURE__ */ jsx(
              "th",
              {
                scope: "col",
                className: "px-6 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest cursor-pointer hover:bg-gray-100 transition-colors",
                onClick: () => handleSort("created_at"),
                children: /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-1", children: [
                  /* @__PURE__ */ jsx("span", { children: "Date" }),
                  getSortIcon("created_at")
                ] })
              }
            ),
            /* @__PURE__ */ jsx("th", { scope: "col", className: "px-6 py-4 text-right text-[10px] font-black text-gray-400 uppercase tracking-widest", children: "Actions" })
          ] }) }),
          /* @__PURE__ */ jsxs("tbody", { className: "bg-white divide-y divide-gray-50", children: [
            posts.data.map((post) => /* @__PURE__ */ jsxs("tr", { className: "hover:bg-gray-50/50 transition-colors group", children: [
              /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
                post.featured_image && /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 h-10 w-14 mr-4", children: /* @__PURE__ */ jsx("img", { src: post.featured_image, alt: "", className: "h-full w-full rounded-lg object-cover shadow-sm" }) }),
                /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsx("div", { className: "text-sm font-bold text-gray-900 line-clamp-1 group-hover:text-blue-600 transition-colors", children: post.title }),
                  /* @__PURE__ */ jsxs("div", { className: "text-[10px] font-bold text-gray-400 uppercase tracking-tight", children: [
                    "By ",
                    post.author?.name
                  ] })
                ] })
              ] }) }),
              /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ jsx("span", { className: "text-xs font-semibold text-gray-600 bg-gray-100 px-2 py-1 rounded-md", children: post.category?.name || "Uncategorized" }) }),
              /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: getStatusBadge(post.status) }),
              /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap text-xs font-bold text-gray-500 uppercase", children: new Date(post.published_at || post.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) }),
              /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap text-right text-sm font-medium", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end space-x-3", children: [
                /* @__PURE__ */ jsx(
                  Link,
                  {
                    href: `/admin/posts/${post.id}/edit`,
                    className: "text-blue-600 hover:text-blue-700 p-1.5 hover:bg-blue-50 rounded-lg transition-all",
                    title: "Edit Post",
                    children: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" }) })
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => setPostToDelete(post),
                    className: "text-red-500 hover:text-red-600 p-1.5 hover:bg-red-50 rounded-lg transition-all",
                    title: "Delete Post",
                    children: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" }) })
                  }
                )
              ] }) })
            ] }, post.id)),
            posts.data.length === 0 && /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: 5, className: "px-6 py-12 text-center text-gray-500 italic", children: "No posts found matching your criteria." }) })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx(
          Pagination,
          {
            links: posts.links,
            current_page: posts.current_page,
            last_page: posts.last_page,
            from: posts.from,
            to: posts.to,
            total: posts.total
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(
      ConfirmationModal,
      {
        show: !!postToDelete,
        title: "Delete Post",
        message: `Are you sure you want to delete "${postToDelete?.title}"?`,
        onConfirm: deletePost,
        onClose: () => setPostToDelete(null),
        processing: processingAction
      }
    )
  ] });
}
export {
  Index as default
};
