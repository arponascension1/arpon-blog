import { jsxs, jsx } from "react/jsx-runtime";
import { P as PublicLayout } from "./PublicLayout-5WexOK-8.js";
import { S as SEO } from "./SEO-BqzDCEc9.js";
import { B as Breadcrumbs } from "./Breadcrumbs-Dch9lzjf.js";
import { Link } from "@inertiajs/react";
import "react";
import "./Dropdown-CbnvImCK.js";
import "@headlessui/react";
function Index({ posts, featured_posts, categories, tag, category }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric"
    });
  };
  const postsData = Array.isArray(posts) ? posts : posts.data;
  const isPaginated = !Array.isArray(posts);
  return /* @__PURE__ */ jsxs(PublicLayout, { children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: category ? `${category.name} Stories` : tag ? `Stories tagged with ${tag.name}` : "Explore our Stories",
        description: category ? `Browse all articles in the ${category.name} category.` : tag ? `Explore articles tagged with ${tag.name}.` : "Discover expert-led insights, creative thinking, and deep dives into technology, design, and culture.",
        keywords: category ? category.meta_keywords : tag ? tag.meta_keywords : void 0,
        breadcrumbs: category ? [
          { label: "Articles", url: route("blog.articles") },
          { label: category.name, url: route("blog.category", category.slug) }
        ] : tag ? [
          { label: "Articles", url: route("blog.articles") },
          { label: `Tag: ${tag.name}`, url: route("blog.tag", tag.slug) }
        ] : void 0
      }
    ),
    (tag || category) && /* @__PURE__ */ jsx("div", { className: "bg-white pt-20 pb-10 border-b border-gray-50", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-6 sm:px-8 lg:px-10", children: [
      /* @__PURE__ */ jsx(
        Breadcrumbs,
        {
          items: [
            { label: "Articles", url: route("blog.articles") },
            { label: category ? category.name : tag ? `Tag: ${tag.name}` : "", active: true }
          ]
        }
      ),
      /* @__PURE__ */ jsx("h1", { className: "text-4xl md:text-6xl font-black text-gray-900 tracking-tighter", children: category ? category.name : tag ? `Tag: ${tag.name}` : "" })
    ] }) }),
    !tag && !category && /* @__PURE__ */ jsxs("section", { className: "relative bg-white pt-20 pb-32 overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[800px] h-[800px] bg-blue-50 rounded-full blur-3xl opacity-50" }),
      /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-pink-50 rounded-full blur-3xl opacity-30" }),
      /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 relative", children: /* @__PURE__ */ jsxs("div", { className: "max-w-3xl", children: [
        /* @__PURE__ */ jsx("span", { className: "inline-block py-1.5 px-4 bg-black text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-8 animate-fadeIn", children: "Published Daily" }),
        /* @__PURE__ */ jsxs("h1", { className: "text-6xl md:text-8xl font-black text-gray-900 tracking-tighter leading-[0.9] mb-10 animate-slideUp", children: [
          "Explore the ",
          /* @__PURE__ */ jsx("br", {}),
          /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600", children: "Future" }),
          " of Ideas."
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-xl md:text-2xl text-gray-500 leading-relaxed max-w-2xl mb-12 animate-slideUp delay-100", children: "Discover expert-led insights, creative thinking, and deep dives into technology, design, and culture." }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-4 animate-slideUp delay-200", children: [
          /* @__PURE__ */ jsx(
            Link,
            {
              href: route("blog.articles"),
              className: "px-10 py-5 bg-black text-white font-black rounded-2xl hover:bg-gray-800 transition-all hover:shadow-2xl hover:-translate-y-1 active:translate-y-0",
              children: "Start Reading"
            }
          ),
          /* @__PURE__ */ jsx("button", { className: "px-10 py-5 bg-white text-black font-black border-2 border-gray-100 rounded-2xl hover:border-black transition-all", children: "Our Mission" })
        ] })
      ] }) })
    ] }),
    !tag && !category && featured_posts.length > 0 && /* @__PURE__ */ jsx("section", { className: "pb-32 bg-white", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-6 sm:px-8 lg:px-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-end justify-between mb-16", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-black tracking-tight text-gray-900 mb-2", children: "Featured Selection" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-500 font-medium", children: "Handpicked stories you shouldn't miss." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "hidden md:flex space-x-2", children: [
          /* @__PURE__ */ jsx("button", { className: "p-3 rounded-full border border-gray-100 hover:bg-gray-50 transition-colors", children: /* @__PURE__ */ jsx("svg", { className: "h-5 w-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M15 19l-7-7 7-7" }) }) }),
          /* @__PURE__ */ jsx("button", { className: "p-3 rounded-full border border-gray-100 hover:bg-gray-50 transition-colors text-blue-600", children: /* @__PURE__ */ jsx("svg", { className: "h-5 w-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M9 5l7 7-7 7" }) }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-10", children: [
        /* @__PURE__ */ jsx("div", { className: "lg:col-span-8 group", children: /* @__PURE__ */ jsx(Link, { href: route("posts.show", featured_posts[0].slug), children: /* @__PURE__ */ jsxs("div", { className: "relative h-[600px] w-full rounded-3xl overflow-hidden shadow-xl", children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: featured_posts[0].featured_image,
              className: "absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105",
              alt: featured_posts[0].featured_image_alt || featured_posts[0].title
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" }),
          /* @__PURE__ */ jsxs("div", { className: "absolute bottom-0 left-0 p-12 w-full", children: [
            /* @__PURE__ */ jsx("span", { className: "inline-block py-1 px-3 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest rounded-md mb-6", children: featured_posts[0].category?.name }),
            /* @__PURE__ */ jsx("h3", { className: "text-4xl md:text-5xl font-black text-white tracking-tight mb-6 leading-tight max-w-2xl", children: featured_posts[0].title }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4", children: [
              /* @__PURE__ */ jsx("div", { className: "h-10 w-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center font-bold text-white border border-white/30", children: featured_posts[0].author.name.charAt(0) }),
              /* @__PURE__ */ jsxs("div", { className: "text-white/80 text-sm font-medium", children: [
                "By ",
                /* @__PURE__ */ jsx("span", { className: "text-white font-bold", children: featured_posts[0].author.name }),
                " • ",
                formatDate(featured_posts[0].published_at)
              ] })
            ] })
          ] })
        ] }) }) }),
        /* @__PURE__ */ jsx("div", { className: "lg:col-span-4 flex flex-col gap-10", children: featured_posts.slice(1, 3).map((post) => /* @__PURE__ */ jsx(Link, { href: route("posts.show", post.slug), className: "group flex-1", children: /* @__PURE__ */ jsxs("div", { className: "relative h-full rounded-3xl overflow-hidden shadow-lg", children: [
          /* @__PURE__ */ jsx("img", { src: post.featured_image, className: "absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500", alt: post.featured_image_alt || post.title }),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/60 opacity-60 group-hover:opacity-70 transition-opacity" }),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 p-10 flex flex-col justify-end", children: /* @__PURE__ */ jsx("h4", { className: "text-2xl font-black text-white leading-tight", children: post.title }) })
        ] }) }, post.id)) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-32 bg-[#fafafa]", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-6 sm:px-8 lg:px-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row justify-between items-baseline mb-20 gap-8", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-5xl font-black text-gray-900 tracking-tighter mb-4", children: "Latest Stories" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-lg font-medium", children: "Recently published articles from our experts." })
        ] }),
        /* @__PURE__ */ jsx(
          Link,
          {
            href: route("blog.articles"),
            className: "px-8 py-4 bg-white border border-gray-100 rounded-2xl text-xs font-black uppercase tracking-widest text-black hover:bg-black hover:text-white transition-all shadow-sm",
            children: "View All Articles"
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8", children: postsData.map((post) => /* @__PURE__ */ jsxs("article", { className: "flex flex-col group animate-fadeIn", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-6 relative group overflow-hidden rounded-3xl shadow-sm", children: [
          /* @__PURE__ */ jsx(Link, { href: route("posts.show", post.slug), className: "block", children: /* @__PURE__ */ jsx("div", { className: "aspect-[4/5] bg-gray-100", children: /* @__PURE__ */ jsx(
            "img",
            {
              src: post.featured_image,
              className: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-105",
              alt: post.featured_image_alt || post.title
            }
          ) }) }),
          /* @__PURE__ */ jsx("div", { className: "absolute top-4 left-4 z-10", children: post.category && /* @__PURE__ */ jsx(
            Link,
            {
              href: route("blog.category", post.category.slug),
              className: "py-1.5 px-3 bg-white/90 backdrop-blur-md rounded-lg text-[9px] font-black uppercase tracking-widest text-black shadow-sm hover:bg-black hover:text-white transition-all",
              children: post.category.name
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col flex-1", children: [
          /* @__PURE__ */ jsx("div", { className: "flex items-center text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3", children: /* @__PURE__ */ jsx("span", { children: formatDate(post.published_at) }) }),
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-black text-gray-900 leading-tight mb-4 group-hover:text-blue-600 transition-colors line-clamp-2", children: /* @__PURE__ */ jsx(Link, { href: route("posts.show", post.slug), children: post.title }) }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2 mt-auto", children: [
            /* @__PURE__ */ jsx("div", { className: "h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-500 text-[8px]", children: post.author.name.charAt(0) }),
            /* @__PURE__ */ jsx("span", { className: "text-[9px] font-black text-gray-900 uppercase tracking-widest", children: post.author.name })
          ] })
        ] })
      ] }, post.id)) }),
      /* @__PURE__ */ jsx("div", { className: "mt-20 text-center", children: isPaginated && posts.last_page > 1 ? /* @__PURE__ */ jsx("div", { className: "flex justify-center space-x-2", children: posts.links.map((link, i) => /* @__PURE__ */ jsx(
        Link,
        {
          href: link.url || "#",
          className: `h-10 w-10 flex items-center justify-center rounded-xl text-[10px] font-black transition-all ${link.active ? "bg-black text-white shadow-lg" : "bg-white text-gray-400 hover:text-black border border-gray-100"} ${!link.url && "opacity-30 cursor-not-allowed"}`,
          dangerouslySetInnerHTML: { __html: link.label }
        },
        i
      )) }) : /* @__PURE__ */ jsxs(
        Link,
        {
          href: route("blog.articles"),
          className: "inline-flex items-center space-x-4 group",
          children: [
            /* @__PURE__ */ jsx("span", { className: "h-[1px] w-12 bg-gray-200 group-hover:w-20 group-hover:bg-blue-600 transition-all" }),
            /* @__PURE__ */ jsx("span", { className: "text-xs font-black uppercase tracking-[0.3em] text-gray-400 group-hover:text-blue-600 transition-colors", children: "Load More from Archive" }),
            /* @__PURE__ */ jsx("span", { className: "h-[1px] w-12 bg-gray-200 group-hover:w-20 group-hover:bg-blue-600 transition-all" })
          ]
        }
      ) })
    ] }) }),
    /* @__PURE__ */ jsx("style", { dangerouslySetInnerHTML: { __html: `
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
  Index as default
};
