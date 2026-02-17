import { jsxs, jsx } from "react/jsx-runtime";
import { P as PublicLayout } from "./PublicLayout-5WexOK-8.js";
import { S as SEO } from "./SEO-BqzDCEc9.js";
import { B as Breadcrumbs } from "./Breadcrumbs-Dch9lzjf.js";
import { Link, router } from "@inertiajs/react";
import "react";
import "./Dropdown-CbnvImCK.js";
import "@headlessui/react";
function Articles({ posts, categories, tags, filters }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric"
    });
  };
  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    if (!value) delete newFilters[key];
    router.get(route("blog.articles"), newFilters, { preserveState: true });
  };
  return /* @__PURE__ */ jsxs(PublicLayout, { children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: "Archive of Stories",
        description: "Browse our complete archive of thoughts, tutorials, and insights. Find all our stories in one place.",
        breadcrumbs: [{ label: "Articles", url: route("blog.articles") }]
      }
    ),
    /* @__PURE__ */ jsx("section", { className: "bg-white border-b border-gray-100 pt-32 pb-24", children: /* @__PURE__ */ jsxs("div", { className: "max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16", children: [
      /* @__PURE__ */ jsx(Breadcrumbs, { items: [{ label: "Articles", active: true }] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row justify-between items-end gap-10", children: [
        /* @__PURE__ */ jsxs("div", { className: "max-w-2xl", children: [
          /* @__PURE__ */ jsx("span", { className: "inline-block py-1.5 px-4 bg-black text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-8 animate-fadeIn", children: "Library" }),
          /* @__PURE__ */ jsxs("h1", { className: "text-6xl md:text-8xl font-black text-gray-900 tracking-tighter leading-[0.9] mb-10 animate-slideUp", children: [
            "Every Story ",
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("span", { className: "text-blue-600", children: "Ever Told." })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-xl text-gray-500 font-medium animate-slideUp delay-100", children: "Browse our complete archive of thoughts, tutorials, and insights across all categories." })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "animate-slideUp delay-200", children: /* @__PURE__ */ jsxs(
          "select",
          {
            value: filters.sort || "latest",
            onChange: (e) => handleFilterChange("sort", e.target.value),
            className: "appearance-none px-10 py-5 bg-gray-50 border-2 border-gray-100 rounded-2xl text-xs font-black uppercase tracking-widest focus:border-black focus:ring-0 transition-all cursor-pointer",
            children: [
              /* @__PURE__ */ jsx("option", { value: "latest", children: "Newest First" }),
              /* @__PURE__ */ jsx("option", { value: "oldest", children: "Oldest First" }),
              /* @__PURE__ */ jsx("option", { value: "popular", children: "Most Popular" })
            ]
          }
        ) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "sticky top-20 z-40 bg-[#fafafa]/80 backdrop-blur-md border-b border-gray-100 py-6", children: /* @__PURE__ */ jsx("div", { className: "max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-8 overflow-x-auto no-scrollbar pb-2", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => handleFilterChange("category", ""),
          className: `whitespace-nowrap text-xs font-black uppercase tracking-widest transition-all ${!filters.category ? "text-blue-600" : "text-gray-400 hover:text-black"}`,
          children: "All Topics"
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "h-4 w-[1px] bg-gray-200 shrink-0" }),
      categories.map((cat) => /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => handleFilterChange("category", cat.slug),
          className: `whitespace-nowrap text-xs font-black uppercase tracking-widest transition-all ${filters.category === cat.slug ? "text-blue-600" : "text-gray-400 hover:text-black"}`,
          children: cat.name
        },
        cat.slug
      ))
    ] }) }) }),
    /* @__PURE__ */ jsx("section", { className: "py-24", children: /* @__PURE__ */ jsxs("div", { className: "max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16", children: [
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12", children: posts.data.map((post) => /* @__PURE__ */ jsxs("article", { className: "flex flex-col group animate-fadeIn", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-8 relative group overflow-hidden rounded-[2.5rem] shadow-sm bg-white p-3 border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500", children: [
          /* @__PURE__ */ jsx(Link, { href: route("posts.show", post.slug), className: "block", children: /* @__PURE__ */ jsx("div", { className: "aspect-[1/1] overflow-hidden rounded-[2rem]", children: /* @__PURE__ */ jsx(
            "img",
            {
              src: post.featured_image,
              className: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-110",
              alt: post.featured_image_alt || post.title
            }
          ) }) }),
          /* @__PURE__ */ jsx("div", { className: "absolute top-8 left-8 z-10", children: post.category && /* @__PURE__ */ jsx(
            Link,
            {
              href: route("blog.category", post.category.slug),
              className: "py-2 px-4 bg-white/90 backdrop-blur-md rounded-xl text-[9px] font-black uppercase tracking-widest text-black shadow-lg hover:bg-black hover:text-white transition-all",
              children: post.category.name
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "px-2", children: [
          /* @__PURE__ */ jsx("div", { className: "flex items-center text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4", children: /* @__PURE__ */ jsx("span", { children: formatDate(post.published_at) }) }),
          /* @__PURE__ */ jsx("h3", { className: "text-2xl font-black text-gray-900 leading-[1.2] mb-4 group-hover:text-blue-600 transition-colors line-clamp-2", children: /* @__PURE__ */ jsx(Link, { href: route("posts.show", post.slug), children: post.title }) }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-500 leading-relaxed text-sm mb-8 line-clamp-3", children: post.excerpt }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pt-6 border-t border-gray-100", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
              /* @__PURE__ */ jsx("div", { className: "h-8 w-8 rounded-full bg-black flex items-center justify-center font-bold text-white text-[10px]", children: post.author.name.charAt(0) }),
              /* @__PURE__ */ jsx("span", { className: "text-[10px] font-black text-gray-900 uppercase tracking-widest", children: post.author.name })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "flex gap-2", children: post.tags.slice(0, 1).map((tag) => /* @__PURE__ */ jsxs("span", { className: "text-[9px] font-black text-blue-600 uppercase tracking-widest", children: [
              "#",
              tag.name
            ] }, tag.slug)) })
          ] })
        ] })
      ] }, post.id)) }),
      posts.data.length === 0 && /* @__PURE__ */ jsxs("div", { className: "text-center py-40", children: [
        /* @__PURE__ */ jsx("div", { className: "h-24 w-24 bg-white rounded-[2rem] shadow-xl flex items-center justify-center mx-auto mb-10 text-gray-300", children: /* @__PURE__ */ jsx("svg", { className: "h-10 w-10", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l4 4v10a2 2 0 01-2 2zM14 4v4h4" }) }) }),
        /* @__PURE__ */ jsx("h3", { className: "text-4xl font-black text-gray-900 mb-4 tracking-tighter", children: "No stories found." }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-500 mb-12", children: "Try adjusting your filters or search keywords." }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => router.get(route("blog.articles")),
            className: "px-10 py-5 bg-black text-white font-black rounded-2xl hover:bg-gray-800 transition-all shadow-2xl",
            children: "Reset All Filters"
          }
        )
      ] }),
      posts.last_page > 1 && /* @__PURE__ */ jsx("div", { className: "mt-32 flex justify-center", children: /* @__PURE__ */ jsx("div", { className: "flex space-x-3", children: posts.links.map((link, i) => /* @__PURE__ */ jsx(
        Link,
        {
          href: link.url || "#",
          className: `h-14 w-14 flex items-center justify-center rounded-[1.5rem] text-xs font-black transition-all shadow-sm ${link.active ? "bg-black text-white shadow-xl scale-110 z-10" : "bg-white text-gray-400 hover:text-black border border-gray-100 hover:shadow-md"} ${!link.url && "opacity-30 cursor-not-allowed"}`,
          dangerouslySetInnerHTML: { __html: link.label }
        },
        i
      )) }) })
    ] }) }),
    /* @__PURE__ */ jsx("style", { dangerouslySetInnerHTML: { __html: `
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(40px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-slideUp {
                    animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
                }
                .animate-fadeIn {
                    animation: fadeIn 1s ease both;
                }
                .delay-100 { animation-delay: 100ms; }
                .delay-200 { animation-delay: 200ms; }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
            ` } })
  ] });
}
export {
  Articles as default
};
