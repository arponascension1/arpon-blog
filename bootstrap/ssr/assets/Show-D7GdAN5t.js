import { jsxs, jsx } from "react/jsx-runtime";
import { Head, Link } from "@inertiajs/react";
import { A as AdminLayout } from "./AdminLayout-DomSls0d.js";
import "react";
import "@headlessui/react";
import "axios";
function Show({ tag }) {
  return /* @__PURE__ */ jsxs(AdminLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: `Tag Details: ${tag.name}` }),
    /* @__PURE__ */ jsx("div", { className: "py-6", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-6 flex justify-between items-center", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("h1", { className: "text-2xl font-bold text-gray-900", children: [
            "Tag: ",
            tag.name
          ] }),
          /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-gray-600", children: "View tag details and statistics" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex space-x-3", children: [
          /* @__PURE__ */ jsx(
            Link,
            {
              href: `/admin/tags/${tag.id}/edit`,
              className: "inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-indigo-700",
              children: "Edit Tag"
            }
          ),
          /* @__PURE__ */ jsx(
            Link,
            {
              href: "/admin/tags",
              className: "inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50",
              children: "Back to Tags"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-white shadow-sm rounded-lg overflow-hidden", children: [
          /* @__PURE__ */ jsx("div", { className: "px-4 py-5 sm:px-6 border-b border-gray-200 bg-gray-50", children: /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium text-gray-900", children: "General Information" }) }),
          /* @__PURE__ */ jsx("div", { className: "px-4 py-5 sm:p-6", children: /* @__PURE__ */ jsxs("dl", { className: "grid grid-cols-1 gap-y-6", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("dt", { className: "text-sm font-medium text-gray-500", children: "Name" }),
              /* @__PURE__ */ jsx("dd", { className: "mt-1 text-sm text-gray-900", children: tag.name })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("dt", { className: "text-sm font-medium text-gray-500", children: "Slug" }),
              /* @__PURE__ */ jsx("dd", { className: "mt-1 text-sm text-gray-900", children: tag.slug })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("dt", { className: "text-sm font-medium text-gray-500", children: "Created At" }),
              /* @__PURE__ */ jsx("dd", { className: "mt-1 text-sm text-gray-900", children: new Date(tag.created_at).toLocaleString() })
            ] })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white shadow-sm rounded-lg overflow-hidden", children: [
          /* @__PURE__ */ jsx("div", { className: "px-4 py-5 sm:px-6 border-b border-gray-200 bg-gray-50", children: /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium text-gray-900", children: "SEO Metadata" }) }),
          /* @__PURE__ */ jsx("div", { className: "px-4 py-5 sm:p-6", children: /* @__PURE__ */ jsxs("dl", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("dt", { className: "text-sm font-medium text-gray-500", children: "Meta Title" }),
              /* @__PURE__ */ jsx("dd", { className: "mt-1 text-sm text-gray-900", children: tag.meta_title || tag.name })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("dt", { className: "text-sm font-medium text-gray-500", children: "Meta Description" }),
              /* @__PURE__ */ jsx("dd", { className: "mt-1 text-sm text-gray-900", children: tag.meta_description || "No meta description set." })
            ] })
          ] }) })
        ] })
      ] })
    ] }) })
  ] });
}
export {
  Show as default
};
