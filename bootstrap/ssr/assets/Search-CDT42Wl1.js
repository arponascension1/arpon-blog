import { jsxs, jsx } from "react/jsx-runtime";
import { P as PublicLayout } from "./PublicLayout-5WexOK-8.js";
import { S as SEO } from "./SEO-BqzDCEc9.js";
import { Link } from "@inertiajs/react";
import "react";
import "./Dropdown-CbnvImCK.js";
import "@headlessui/react";
function Search({ posts, search, categories, popular_tags }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };
  return /* @__PURE__ */ jsxs(PublicLayout, { children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: `Search results for "${search}"`,
        robots: "noindex, follow"
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "bg-white border-b border-gray-100 pt-32 pb-20", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-6 sm:px-8 lg:px-10", children: /* @__PURE__ */ jsxs("div", { className: "max-w-3xl", children: [
      /* @__PURE__ */ jsx("span", { className: "inline-block py-1 px-3 bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-[0.2em] rounded-md mb-6 animate-fadeIn", children: "Discovery" }),
      /* @__PURE__ */ jsxs("h1", { className: "text-5xl md:text-6xl font-black text-gray-900 tracking-tighter mb-6 leading-tight animate-slideUp", children: [
        "Results for ",
        /* @__PURE__ */ jsxs("span", { className: "text-blue-600", children: [
          '"',
          search,
          '"'
        ] })
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "text-xl text-gray-500 font-medium animate-slideUp delay-100", children: [
        "We found ",
        posts.total,
        " matches for your query across articles, categories, and tags."
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-24", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row gap-20", children: [
      /* @__PURE__ */ jsxs("div", { className: "lg:w-2/3", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-16", children: [
          posts.data.map((post) => /* @__PURE__ */ jsx("article", { className: "group animate-fadeIn", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row gap-10", children: [
            /* @__PURE__ */ jsx("div", { className: "md:w-2/5 flex-shrink-0", children: /* @__PURE__ */ jsx(Link, { href: route("posts.show", post.slug), children: /* @__PURE__ */ jsx("div", { className: "aspect-[4/3] rounded-[2rem] overflow-hidden shadow-sm group-hover:shadow-xl transition-all duration-500", children: /* @__PURE__ */ jsx(
              "img",
              {
                src: post.featured_image,
                className: "h-full w-full object-cover transform group-hover:scale-110 transition-transform duration-700",
                alt: post.title
              }
            ) }) }) }),
            /* @__PURE__ */ jsxs("div", { className: "flex-1 flex flex-col justify-center", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3 mb-4", children: [
                post.category && /* @__PURE__ */ jsx(
                  Link,
                  {
                    href: route("blog.category", post.category.slug),
                    className: "text-[10px] font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-2 py-1 rounded-md hover:bg-blue-600 hover:text-white transition-all",
                    children: post.category.name
                  }
                ),
                /* @__PURE__ */ jsx("span", { className: "text-[10px] font-black text-gray-300 uppercase tracking-widest", children: formatDate(post.published_at) })
              ] }),
              /* @__PURE__ */ jsx("h3", { className: "text-3xl font-black text-gray-900 leading-tight mb-4 group-hover:text-blue-600 transition-colors", children: /* @__PURE__ */ jsx(Link, { href: route("posts.show", post.slug), children: post.title }) }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-500 leading-relaxed mb-8 line-clamp-2 font-medium", children: post.excerpt }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
                /* @__PURE__ */ jsx("div", { className: "h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center font-black text-gray-400 text-[10px]", children: post.author.name.charAt(0) }),
                /* @__PURE__ */ jsx("span", { className: "text-xs font-black text-gray-900 uppercase tracking-widest", children: post.author.name })
              ] })
            ] })
          ] }) }, post.id)),
          posts.data.length === 0 && /* @__PURE__ */ jsxs("div", { className: "text-center py-32 bg-white rounded-[3rem] border-4 border-dashed border-gray-100", children: [
            /* @__PURE__ */ jsx("div", { className: "h-24 w-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-8 text-gray-300", children: /* @__PURE__ */ jsx("svg", { className: "h-12 w-12", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" }) }) }),
            /* @__PURE__ */ jsx("h3", { className: "text-3xl font-black text-gray-900 mb-4", children: "No results found" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-400 max-w-sm mx-auto font-medium mb-10", children: "We couldn't find any articles matching your search. Try different keywords or browse our categories." }),
            /* @__PURE__ */ jsx(Link, { href: "/", className: "px-10 py-5 bg-black text-white font-black rounded-2xl hover:bg-gray-800 transition-all shadow-xl", children: "Explore All Stories" })
          ] })
        ] }),
        posts.last_page > 1 && /* @__PURE__ */ jsx("div", { className: "mt-24 flex justify-center", children: /* @__PURE__ */ jsx("div", { className: "flex space-x-2", children: posts.links.map((link, i) => /* @__PURE__ */ jsx(
          Link,
          {
            href: link.url || "#",
            className: `h-12 w-12 flex items-center justify-center rounded-2xl text-xs font-black transition-all ${link.active ? "bg-black text-white shadow-xl scale-110" : "bg-white text-gray-400 hover:text-black border border-gray-100"} ${!link.url && "opacity-30 cursor-not-allowed"}`,
            dangerouslySetInnerHTML: { __html: link.label }
          },
          i
        )) }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "lg:w-1/3 space-y-20", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h4", { className: "text-xs font-black text-gray-900 uppercase tracking-[0.2em] mb-10 pb-4 border-b-2 border-black inline-block", children: "Refine by Category" }),
          /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-3", children: categories.map((cat) => /* @__PURE__ */ jsxs(
            Link,
            {
              href: route("blog.category", cat.slug),
              className: "px-6 py-3 bg-white border border-gray-100 rounded-2xl text-sm font-bold text-gray-600 hover:border-black hover:text-black transition-all shadow-sm",
              children: [
                cat.name,
                /* @__PURE__ */ jsx("span", { className: "ml-2 text-[10px] text-gray-300 font-black", children: cat.posts_count })
              ]
            },
            cat.slug
          )) })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h4", { className: "text-xs font-black text-gray-900 uppercase tracking-[0.2em] mb-10 pb-4 border-b-2 border-black inline-block", children: "Popular Tags" }),
          /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: popular_tags.map((tag) => /* @__PURE__ */ jsxs(
            Link,
            {
              href: route("blog.tag", tag.slug),
              className: "px-4 py-2 bg-gray-50 text-gray-400 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-black hover:text-white transition-all",
              children: [
                "#",
                tag.name
              ]
            },
            tag.slug
          )) })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("style", { dangerouslySetInnerHTML: { __html: `
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-slideUp {
                    animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
                }
                .animate-fadeIn {
                    animation: fadeIn 1s ease both;
                }
                .delay-100 { animation-delay: 100ms; }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
            ` } })
  ] });
}
export {
  Search as default
};
