import { jsxs, jsx } from "react/jsx-runtime";
import React, { useState, useEffect } from "react";
import { router, Head, Link } from "@inertiajs/react";
import { A as AdminLayout } from "./AdminLayout-DmLr14pk.js";
import { P as Pagination, C as ConfirmationModal } from "./ConfirmationModal-DilHsETS.js";
import "axios";
import "@headlessui/react";
import "./Modal-B-IxVM06.js";
import "./DangerButton-B7to2Tbx.js";
function Index({ categories, parentCategories, filters, sort }) {
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [processingAction, setProcessingAction] = useState(false);
  const [searchTerm, setSearchTerm] = useState(filters.search || "");
  const [statusFilter, setStatusFilter] = useState(filters.status || "");
  const [parentIdFilter, setParentIdFilter] = useState(filters.parent_id || "");
  const [currentSort, setCurrentSort] = useState({
    field: sort?.field || "name",
    direction: sort?.direction || "asc"
  });
  const isFirstRender = React.useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const timeoutId = setTimeout(() => {
      if (searchTerm === (filters.search || "") && statusFilter === (filters.status || "") && parentIdFilter === (filters.parent_id || "") && currentSort.field === (sort?.field || "name") && currentSort.direction === (sort?.direction || "asc")) {
        return;
      }
      const params = {
        search: searchTerm || void 0,
        status: statusFilter || void 0,
        parent_id: parentIdFilter || void 0
      };
      if (currentSort.field !== "name" || currentSort.direction !== "asc") {
        params.sort = currentSort.field;
        params.direction = currentSort.direction;
      }
      router.get("/admin/categories", params, {
        preserveState: true,
        replace: true
      });
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [searchTerm, statusFilter, parentIdFilter, currentSort]);
  useEffect(() => {
    setSearchTerm(filters.search || "");
    setStatusFilter(filters.status || "");
    setParentIdFilter(filters.parent_id || "");
    if (sort?.field && sort?.direction) {
      setCurrentSort({
        field: sort.field,
        direction: sort.direction
      });
    }
  }, [filters.search, filters.status, filters.parent_id, sort?.field, sort?.direction]);
  const deleteCategory = () => {
    if (!categoryToDelete) return;
    setProcessingAction(true);
    router.delete(`/admin/categories/${categoryToDelete.id}`, {
      onFinish: () => {
        setProcessingAction(false);
        setCategoryToDelete(null);
      }
    });
  };
  const toggleActive = (category) => {
    router.patch(`/admin/categories/${category.id}/toggle-active`, {}, {
      preserveScroll: true
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
  const getSortIcon = (field) => {
    if (currentSort.field !== field) {
      return /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 text-gray-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4 4" }) });
    }
    return currentSort.direction === "asc" ? /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 text-blue-600", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M5 15l7-7 7 7" }) }) : /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 text-blue-600", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M19 9l-7 7-7-7" }) });
  };
  return /* @__PURE__ */ jsxs(AdminLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Manage Categories" }),
    /* @__PURE__ */ jsx("div", { className: "py-6", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8 flex justify-between items-center", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-gray-900", children: "Categories" }),
          /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-gray-600", children: "Organize your blog posts into categories" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex space-x-3", children: /* @__PURE__ */ jsxs(
          Link,
          {
            href: "/admin/categories/create",
            className: "inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
            children: [
              /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 mr-2", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M12 6v6m0 0v6m0-6h6m-6 0H6" }) }),
              "Add Category"
            ]
          }
        ) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "bg-white shadow-sm rounded-lg mb-6", children: /* @__PURE__ */ jsx("div", { className: "px-4 py-5 sm:p-6", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-4", children: [
        /* @__PURE__ */ jsx("div", { className: "flex-1", children: /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            placeholder: "Search categories...",
            value: searchTerm,
            onChange: (e) => setSearchTerm(e.target.value),
            className: "block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          }
        ) }),
        /* @__PURE__ */ jsx("div", { className: "sm:w-48", children: /* @__PURE__ */ jsxs(
          "select",
          {
            value: statusFilter,
            onChange: (e) => setStatusFilter(e.target.value),
            className: "block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm",
            children: [
              /* @__PURE__ */ jsx("option", { value: "", children: "All Status" }),
              /* @__PURE__ */ jsx("option", { value: "active", children: "Active" }),
              /* @__PURE__ */ jsx("option", { value: "inactive", children: "Inactive" })
            ]
          }
        ) }),
        /* @__PURE__ */ jsx("div", { className: "sm:w-48", children: /* @__PURE__ */ jsxs(
          "select",
          {
            value: parentIdFilter,
            onChange: (e) => setParentIdFilter(e.target.value),
            className: "block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm",
            children: [
              /* @__PURE__ */ jsx("option", { value: "", children: "All Parents" }),
              /* @__PURE__ */ jsx("option", { value: "top_level", children: "Top Level Only" }),
              parentCategories.map((cat) => /* @__PURE__ */ jsx("option", { value: cat.id, children: cat.name }, cat.id))
            ]
          }
        ) })
      ] }) }) }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white shadow-sm rounded-lg", children: [
        /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "min-w-full divide-y divide-gray-200", children: [
          /* @__PURE__ */ jsx("thead", { className: "bg-gray-50", children: /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx(
              "th",
              {
                scope: "col",
                className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100",
                onClick: () => handleSort("name"),
                children: /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-1", children: [
                  /* @__PURE__ */ jsx("span", { children: "Category" }),
                  getSortIcon("name")
                ] })
              }
            ),
            /* @__PURE__ */ jsx("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Slug" }),
            /* @__PURE__ */ jsx("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Parent" }),
            /* @__PURE__ */ jsx("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Status" }),
            /* @__PURE__ */ jsx("th", { scope: "col", className: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Actions" })
          ] }) }),
          /* @__PURE__ */ jsx("tbody", { className: "bg-white divide-y divide-gray-200", children: categories.data.map((category) => /* @__PURE__ */ jsxs("tr", { className: "hover:bg-gray-50", children: [
            /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
              category.image_url && /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 h-10 w-10 mr-4", children: /* @__PURE__ */ jsx("img", { src: category.image_url, alt: "", className: "h-10 w-10 rounded-md object-cover" }) }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("div", { className: "text-sm font-medium text-gray-900", children: category.name }),
                category.is_featured && /* @__PURE__ */ jsx("span", { className: "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800", children: "Featured" })
              ] })
            ] }) }),
            /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: category.slug }),
            /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: category.parent?.name || "-" }),
            /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => toggleActive(category),
                className: `inline-flex px-2 py-1 text-xs font-semibold rounded-full ${category.is_active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`,
                children: category.is_active ? "Active" : "Inactive"
              }
            ) }),
            /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap text-right text-sm font-medium", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end space-x-2", children: [
              /* @__PURE__ */ jsx(
                Link,
                {
                  href: `/admin/categories/${category.id}/edit`,
                  className: "text-indigo-600 hover:text-indigo-900",
                  children: "Edit"
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => setCategoryToDelete(category),
                  className: "text-red-600 hover:text-red-900",
                  children: "Delete"
                }
              )
            ] }) })
          ] }, category.id)) })
        ] }) }),
        /* @__PURE__ */ jsx(
          Pagination,
          {
            links: categories.links,
            current_page: categories.current_page,
            last_page: categories.last_page,
            from: categories.from,
            to: categories.to,
            total: categories.total
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(
      ConfirmationModal,
      {
        show: !!categoryToDelete,
        title: "Delete Category",
        message: `Are you sure you want to delete ${categoryToDelete?.name}? This action cannot be undone.`,
        onConfirm: deleteCategory,
        onClose: () => setCategoryToDelete(null),
        processing: processingAction
      }
    )
  ] });
}
export {
  Index as default
};
