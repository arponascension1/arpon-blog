import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@inertiajs/react";
import { M as Modal, S as SecondaryButton } from "./Modal-B-IxVM06.js";
import { D as DangerButton } from "./DangerButton-B7to2Tbx.js";
function Pagination({ links, current_page, last_page, from, to, total }) {
  if (last_page <= 1) return null;
  const renderPaginationLinks = () => {
    const items = [];
    const onEachSide = 1;
    const prevLink = links[0];
    items.push(
      prevLink.url ? /* @__PURE__ */ jsx(
        Link,
        {
          href: prevLink.url,
          preserveScroll: true,
          preserveState: true,
          className: "relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50",
          dangerouslySetInnerHTML: { __html: prevLink.label }
        },
        "prev"
      ) : /* @__PURE__ */ jsx(
        "span",
        {
          className: "relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-gray-50 text-sm font-medium text-gray-400 cursor-not-allowed",
          dangerouslySetInnerHTML: { __html: prevLink.label }
        },
        "prev-disabled"
      )
    );
    const firstPageLink = links.find((l) => l.label === "1");
    if (firstPageLink) {
      items.push(
        /* @__PURE__ */ jsx(
          Link,
          {
            href: firstPageLink.url,
            preserveScroll: true,
            preserveState: true,
            className: `relative inline-flex items-center px-4 py-2 border text-sm font-medium ${current_page === 1 ? "z-10 bg-blue-50 border-blue-500 text-blue-600" : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"}`,
            children: "1"
          },
          "page-1"
        )
      );
    }
    if (current_page > onEachSide + 2) {
      items.push(
        /* @__PURE__ */ jsx("span", { className: "relative inline-flex items-center px-4 py-2 border border-gray-300 bg-gray-50 text-sm font-medium text-gray-700", children: "..." }, "ellipsis-start")
      );
    }
    const start = Math.max(2, current_page - onEachSide);
    const end = Math.min(last_page - 1, current_page + onEachSide);
    for (let i = start; i <= end; i++) {
      const pageLink = links.find((l) => l.label === i.toString());
      if (pageLink) {
        items.push(
          /* @__PURE__ */ jsx(
            Link,
            {
              href: pageLink.url,
              preserveScroll: true,
              preserveState: true,
              className: `relative inline-flex items-center px-4 py-2 border text-sm font-medium ${current_page === i ? "z-10 bg-blue-50 border-blue-500 text-blue-600" : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"}`,
              children: i
            },
            `page-${i}`
          )
        );
      }
    }
    if (current_page < last_page - onEachSide - 1) {
      items.push(
        /* @__PURE__ */ jsx("span", { className: "relative inline-flex items-center px-4 py-2 border border-gray-300 bg-gray-50 text-sm font-medium text-gray-700", children: "..." }, "ellipsis-end")
      );
    }
    if (last_page > 1) {
      const lastPageLink = links.find((l) => l.label === last_page.toString());
      if (lastPageLink) {
        items.push(
          /* @__PURE__ */ jsx(
            Link,
            {
              href: lastPageLink.url,
              preserveScroll: true,
              preserveState: true,
              className: `relative inline-flex items-center px-4 py-2 border text-sm font-medium ${current_page === last_page ? "z-10 bg-blue-50 border-blue-500 text-blue-600" : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"}`,
              children: last_page
            },
            `page-${last_page}`
          )
        );
      }
    }
    const nextLink = links[links.length - 1];
    items.push(
      nextLink.url ? /* @__PURE__ */ jsx(
        Link,
        {
          href: nextLink.url,
          preserveScroll: true,
          preserveState: true,
          className: "relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50",
          dangerouslySetInnerHTML: { __html: nextLink.label }
        },
        "next"
      ) : /* @__PURE__ */ jsx(
        "span",
        {
          className: "relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-gray-50 text-sm font-medium text-gray-400 cursor-not-allowed",
          dangerouslySetInnerHTML: { __html: nextLink.label }
        },
        "next-disabled"
      )
    );
    return items;
  };
  return /* @__PURE__ */ jsxs("div", { className: "bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex-1 flex justify-between sm:hidden", children: [
      links[0]?.url ? /* @__PURE__ */ jsx(
        Link,
        {
          href: links[0].url,
          preserveScroll: true,
          preserveState: true,
          className: "relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50",
          dangerouslySetInnerHTML: { __html: links[0].label }
        }
      ) : /* @__PURE__ */ jsx(
        "span",
        {
          className: "relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-400 bg-gray-50 cursor-not-allowed",
          dangerouslySetInnerHTML: { __html: links[0].label }
        }
      ),
      links[links.length - 1]?.url ? /* @__PURE__ */ jsx(
        Link,
        {
          href: links[links.length - 1].url,
          preserveScroll: true,
          preserveState: true,
          className: "ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50",
          dangerouslySetInnerHTML: { __html: links[links.length - 1].label }
        }
      ) : /* @__PURE__ */ jsx(
        "span",
        {
          className: "ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-400 bg-gray-50 cursor-not-allowed",
          dangerouslySetInnerHTML: { __html: links[links.length - 1].label }
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "hidden sm:flex-1 sm:flex sm:items-center sm:justify-between", children: [
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-700", children: [
        "Showing ",
        /* @__PURE__ */ jsx("span", { className: "font-medium", children: from || 0 }),
        " to",
        " ",
        /* @__PURE__ */ jsx("span", { className: "font-medium", children: to || 0 }),
        " of",
        " ",
        /* @__PURE__ */ jsx("span", { className: "font-medium", children: total }),
        " results"
      ] }) }),
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("nav", { className: "relative z-0 inline-flex rounded-md shadow-sm -space-x-px", "aria-label": "Pagination", children: renderPaginationLinks() }) })
    ] })
  ] });
}
function ConfirmationModal({
  show,
  title,
  message,
  onConfirm,
  onClose,
  confirmText = "Delete",
  cancelText = "Cancel",
  processing = false
}) {
  return /* @__PURE__ */ jsx(Modal, { show, onClose, maxWidth: "md", children: /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium text-gray-900", children: title }),
    /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-gray-600", children: message }),
    /* @__PURE__ */ jsxs("div", { className: "mt-6 flex justify-end", children: [
      /* @__PURE__ */ jsx(SecondaryButton, { onClick: onClose, children: cancelText }),
      /* @__PURE__ */ jsx(
        DangerButton,
        {
          className: "ms-3",
          disabled: processing,
          onClick: onConfirm,
          children: confirmText
        }
      )
    ] })
  ] }) });
}
export {
  ConfirmationModal as C,
  Pagination as P
};
