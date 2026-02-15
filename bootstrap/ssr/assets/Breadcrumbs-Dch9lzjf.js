import { jsx, jsxs } from "react/jsx-runtime";
import { Link } from "@inertiajs/react";
function Breadcrumbs({ items }) {
  if (items.length === 0) return null;
  return /* @__PURE__ */ jsx("nav", { className: "flex mb-8", "aria-label": "Breadcrumb", children: /* @__PURE__ */ jsxs("ol", { className: "flex items-center space-x-2", children: [
    /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { href: "/", className: "text-xs font-black uppercase tracking-widest text-gray-400 hover:text-black transition-colors", children: "Home" }) }),
    items.map((item, index) => /* @__PURE__ */ jsxs("li", { className: "flex items-center space-x-2", children: [
      /* @__PURE__ */ jsx("svg", { className: "h-3 w-3 text-gray-300", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "3", d: "M9 5l7 7-7 7" }) }),
      item.url && !item.active ? /* @__PURE__ */ jsx(Link, { href: item.url, className: "text-xs font-black uppercase tracking-widest text-gray-400 hover:text-black transition-colors", children: item.label }) : /* @__PURE__ */ jsx("span", { className: "text-xs font-black uppercase tracking-widest text-gray-900", children: item.label })
    ] }, index))
  ] }) });
}
export {
  Breadcrumbs as B
};
