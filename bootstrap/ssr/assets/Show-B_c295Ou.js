import { jsxs, jsx } from "react/jsx-runtime";
import { Head, Link } from "@inertiajs/react";
import { A as AdminLayout } from "./AdminLayout-DmLr14pk.js";
import "react";
import "axios";
import "@headlessui/react";
function Show({ category }) {
  return /* @__PURE__ */ jsxs(AdminLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: `Category Details: ${category.name}` }),
    /* @__PURE__ */ jsx("div", { className: "py-6", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-6 flex justify-between items-center", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("h1", { className: "text-2xl font-bold text-gray-900", children: [
            "Category: ",
            category.name
          ] }),
          /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-gray-600", children: "View category details and statistics" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex space-x-3", children: [
          /* @__PURE__ */ jsx(
            Link,
            {
              href: `/admin/categories/${category.id}/edit`,
              className: "inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-indigo-700",
              children: "Edit Category"
            }
          ),
          /* @__PURE__ */ jsx(
            Link,
            {
              href: "/admin/categories",
              className: "inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50",
              children: "Back to Categories"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "md:col-span-2 space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-white shadow-sm rounded-lg overflow-hidden", children: [
            /* @__PURE__ */ jsx("div", { className: "px-4 py-5 sm:px-6 border-b border-gray-200 bg-gray-50", children: /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium text-gray-900", children: "General Information" }) }),
            /* @__PURE__ */ jsx("div", { className: "px-4 py-5 sm:p-6", children: /* @__PURE__ */ jsxs("dl", { className: "grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("dt", { className: "text-sm font-medium text-gray-500", children: "Name" }),
                /* @__PURE__ */ jsx("dd", { className: "mt-1 text-sm text-gray-900", children: category.name })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("dt", { className: "text-sm font-medium text-gray-500", children: "Slug" }),
                /* @__PURE__ */ jsx("dd", { className: "mt-1 text-sm text-gray-900", children: category.slug })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "sm:col-span-2", children: [
                /* @__PURE__ */ jsx("dt", { className: "text-sm font-medium text-gray-500", children: "Description" }),
                /* @__PURE__ */ jsx("dd", { className: "mt-1 text-sm text-gray-900", children: category.description || "No description provided." })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("dt", { className: "text-sm font-medium text-gray-500", children: "Parent Category" }),
                /* @__PURE__ */ jsx("dd", { className: "mt-1 text-sm text-gray-900", children: category.parent?.name || "None (Top Level)" })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("dt", { className: "text-sm font-medium text-gray-500", children: "Status" }),
                /* @__PURE__ */ jsx("dd", { className: "mt-1", children: /* @__PURE__ */ jsx("span", { className: `inline-flex px-2 py-1 text-xs font-semibold rounded-full ${category.is_active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`, children: category.is_active ? "Active" : "Inactive" }) })
              ] })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white shadow-sm rounded-lg overflow-hidden", children: [
            /* @__PURE__ */ jsx("div", { className: "px-4 py-5 sm:px-6 border-b border-gray-200 bg-gray-50", children: /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium text-gray-900", children: "SEO Metadata" }) }),
            /* @__PURE__ */ jsx("div", { className: "px-4 py-5 sm:p-6", children: /* @__PURE__ */ jsxs("dl", { className: "space-y-4", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("dt", { className: "text-sm font-medium text-gray-500", children: "Meta Title" }),
                /* @__PURE__ */ jsx("dd", { className: "mt-1 text-sm text-gray-900", children: category.meta_title || category.name })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("dt", { className: "text-sm font-medium text-gray-500", children: "Meta Description" }),
                /* @__PURE__ */ jsx("dd", { className: "mt-1 text-sm text-gray-900", children: category.meta_description || "No meta description set." })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("dt", { className: "text-sm font-medium text-gray-500", children: "Meta Keywords" }),
                /* @__PURE__ */ jsx("dd", { className: "mt-1 text-sm text-gray-900", children: category.meta_keywords || "No meta keywords set." })
              ] })
            ] }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-white shadow-sm rounded-lg overflow-hidden", children: [
            /* @__PURE__ */ jsx("div", { className: "px-4 py-5 sm:px-6 border-b border-gray-200 bg-gray-50", children: /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium text-gray-900", children: "Statistics" }) }),
            /* @__PURE__ */ jsx("div", { className: "px-4 py-5 sm:p-6", children: /* @__PURE__ */ jsxs("div", { className: "text-center py-4", children: [
              /* @__PURE__ */ jsx("div", { className: "text-3xl font-bold text-gray-900", children: "0" }),
              /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-500 uppercase tracking-wide", children: "Total Posts" })
            ] }) })
          ] }),
          category.image_url && /* @__PURE__ */ jsxs("div", { className: "bg-white shadow-sm rounded-lg overflow-hidden", children: [
            /* @__PURE__ */ jsx("div", { className: "px-4 py-5 sm:px-6 border-b border-gray-200 bg-gray-50", children: /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium text-gray-900", children: "Thumbnail" }) }),
            /* @__PURE__ */ jsx("div", { className: "p-4", children: /* @__PURE__ */ jsx("img", { src: category.image_url, alt: category.name, className: "w-full h-auto rounded-lg shadow-inner" }) })
          ] })
        ] })
      ] })
    ] }) })
  ] });
}
export {
  Show as default
};
