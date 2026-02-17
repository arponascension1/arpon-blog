import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { P as PublicLayout } from "./PublicLayout-5WexOK-8.js";
import { S as SEO } from "./SEO-BqzDCEc9.js";
import { B as Breadcrumbs } from "./Breadcrumbs-Dch9lzjf.js";
import { usePage, Link, router } from "@inertiajs/react";
import "./Dropdown-CbnvImCK.js";
import "@headlessui/react";
function SocialShare({ url, title, description }) {
  const [copied, setShortCopied] = useState(false);
  const shareLinks = [
    {
      name: "Twitter",
      icon: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" }) }),
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      color: "hover:bg-black hover:text-white"
    },
    {
      name: "Facebook",
      icon: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" }) }),
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      color: "hover:bg-[#1877F2] hover:text-white"
    },
    {
      name: "LinkedIn",
      icon: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" }) }),
      url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
      color: "hover:bg-[#0A66C2] hover:text-white"
    }
  ];
  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    setShortCopied(true);
    setTimeout(() => setShortCopied(false), 2e3);
  };
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center space-y-4", children: [
    /* @__PURE__ */ jsx("span", { className: "text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 vertical-text hidden lg:block mb-4", children: "Share Story" }),
    /* @__PURE__ */ jsxs("div", { className: "flex lg:flex-col gap-3", children: [
      shareLinks.map((link) => /* @__PURE__ */ jsx(
        "a",
        {
          href: link.url,
          target: "_blank",
          rel: "noopener noreferrer",
          className: `h-12 w-12 flex items-center justify-center rounded-2xl bg-white border border-gray-100 text-gray-400 shadow-sm transition-all duration-300 ${link.color} hover:shadow-xl hover:-translate-y-1 active:translate-y-0`,
          title: `Share on ${link.name}`,
          children: link.icon
        },
        link.name
      )),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: copyToClipboard,
          className: `h-12 w-12 flex items-center justify-center rounded-2xl border transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1 active:translate-y-0 ${copied ? "bg-green-500 border-green-500 text-white" : "bg-white border-gray-100 text-gray-400 hover:bg-gray-50"}`,
          title: "Copy Link",
          children: copied ? /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "3", d: "M5 13l4 4L19 7" }) }) : /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2.5", d: "M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" }) })
        }
      )
    ] })
  ] });
}
const GoogleAd = ({
  className = "",
  style = { display: "block" },
  adClient,
  adSlot,
  adFormat = "auto",
  fullWidthResponsive = true
}) => {
  const { settings } = usePage().props;
  const defaultAdClient = adClient || settings?.google_adsense_client_id || "";
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("AdSense error:", e);
    }
  }, []);
  return /* @__PURE__ */ jsx("div", { className: `google-ad-container my-8 ${className}`, children: /* @__PURE__ */ jsx(
    "ins",
    {
      className: "adsbygoogle",
      style,
      "data-ad-client": defaultAdClient,
      "data-ad-slot": adSlot,
      "data-ad-format": adFormat,
      "data-full-width-responsive": fullWidthResponsive ? "true" : "false"
    }
  ) });
};
function Show({ post, related_posts, is_liked }) {
  const [progress, setProgress] = useState(0);
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric"
    });
  };
  const handleLike = () => {
    router.post(route("posts.like", post.id), {}, {
      preserveScroll: true
    });
  };
  useEffect(() => {
    const updateProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollTop = window.scrollY;
      setProgress(scrollTop / scrollHeight * 100);
    };
    window.addEventListener("scroll", updateProgress);
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);
  const { url } = usePage();
  const siteUrl = typeof window !== "undefined" ? window.location.origin : "";
  const fullUrl = `${siteUrl}${url}`;
  return /* @__PURE__ */ jsxs(PublicLayout, { children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: post.meta_title || post.title,
        description: post.meta_description || post.excerpt,
        keywords: post.meta_keywords || void 0,
        image: post.featured_image,
        ogType: "article",
        breadcrumbs: [
          { label: "Articles", url: route("blog.articles") },
          { label: post.title, url: route("posts.show", post.slug) }
        ],
        schema: {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": post.title,
          "description": post.excerpt,
          "image": post.featured_image,
          "author": {
            "@type": "Person",
            "name": post.author.name
          },
          "datePublished": post.published_at,
          "publisher": {
            "@type": "Organization",
            "name": "Arpon Blog",
            "logo": {
              "@type": "ImageObject",
              "url": "/favicon.ico"
            }
          },
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": route("posts.show", post.slug)
          }
        }
      }
    ),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "fixed top-0 left-0 h-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 z-[100] transition-all duration-100 ease-out",
        style: { width: `${progress}%` }
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "bg-[#fafafa] min-h-screen", children: [
      /* @__PURE__ */ jsxs("header", { className: "relative pt-32 pb-40 overflow-hidden bg-white", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-blue-50 rounded-full blur-3xl opacity-40" }),
        /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-indigo-50 rounded-full blur-3xl opacity-30" }),
        /* @__PURE__ */ jsxs("div", { className: "max-w-5xl mx-auto px-6 sm:px-8 lg:px-10 relative text-center", children: [
          /* @__PURE__ */ jsx("div", { className: "flex justify-center mb-8 animate-fadeIn", children: /* @__PURE__ */ jsx(
            Breadcrumbs,
            {
              items: [
                { label: "Articles", url: route("blog.articles") },
                { label: post.title, active: true }
              ]
            }
          ) }),
          /* @__PURE__ */ jsxs("div", { className: "mb-12 animate-fadeIn flex justify-center items-center gap-4", children: [
            post.category && /* @__PURE__ */ jsx(
              Link,
              {
                href: route("blog.category", post.category.slug),
                className: "px-6 py-2 bg-black text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-full hover:bg-blue-600 transition-all shadow-lg",
                children: post.category.name
              }
            ),
            /* @__PURE__ */ jsx("span", { className: "text-xs font-black text-gray-400 uppercase tracking-widest", children: formatDate(post.published_at) })
          ] }),
          /* @__PURE__ */ jsx("h1", { className: "text-5xl md:text-8xl font-black text-gray-900 tracking-tighter leading-[0.95] mb-16 animate-slideUp", children: post.title }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row items-center justify-center gap-8 animate-slideUp delay-100", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4 p-2 pl-2 pr-6 bg-gray-50 rounded-2xl border border-gray-100 shadow-sm", children: [
              /* @__PURE__ */ jsx("div", { className: "h-12 w-12 rounded-xl bg-black flex items-center justify-center font-black text-white shadow-xl", children: post.author.name.charAt(0) }),
              /* @__PURE__ */ jsxs("div", { className: "text-left", children: [
                /* @__PURE__ */ jsx("p", { className: "text-sm font-black text-gray-900 uppercase tracking-widest", children: post.author.name }),
                /* @__PURE__ */ jsx("p", { className: "text-[10px] text-blue-600 font-black uppercase tracking-widest", children: "Featured Author" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 text-xs font-black text-gray-400 uppercase tracking-[0.2em]", children: [
              /* @__PURE__ */ jsx("svg", { className: "h-5 w-5 text-gray-300", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" }) }),
              "8 min read"
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "max-w-[1800px] mx-auto px-6 sm:px-10 lg:px-12 -mt-32 relative z-10", children: [
        post.featured_image && /* @__PURE__ */ jsx("div", { className: "mb-24 animate-fadeIn", children: /* @__PURE__ */ jsx("div", { className: "relative h-[500px] md:h-[850px] rounded-[5rem] overflow-hidden shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] border-[16px] border-white ring-1 ring-gray-100", children: /* @__PURE__ */ jsx(
          "img",
          {
            src: post.featured_image,
            alt: post.featured_image_alt || post.title,
            className: "w-full h-full object-cover"
          }
        ) }) }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row gap-12 lg:gap-16", children: [
          /* @__PURE__ */ jsx("div", { className: "hidden xl:block w-20 relative", children: /* @__PURE__ */ jsxs("div", { className: "sticky top-32 space-y-8", children: [
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: handleLike,
                className: `w-full aspect-square rounded-2xl flex flex-col items-center justify-center transition-all border ${is_liked ? "bg-red-50 border-red-100 text-red-600 shadow-lg shadow-red-100" : "bg-white border-gray-100 text-gray-400 hover:border-red-200 hover:text-red-400"}`,
                children: [
                  /* @__PURE__ */ jsx("svg", { className: `h-6 w-6 mb-1 ${is_liked ? "fill-current" : "fill-none"}`, stroke: "currentColor", strokeWidth: "2", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" }) }),
                  /* @__PURE__ */ jsx("span", { className: "text-[10px] font-black", children: post.likes_count })
                ]
              }
            ),
            /* @__PURE__ */ jsx(SocialShare, { url: fullUrl, title: post.title })
          ] }) }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1 bg-white rounded-[4rem] p-10 md:p-16 lg:p-24 shadow-2xl border border-gray-50 shadow-gray-200/40", children: [
            post.excerpt && /* @__PURE__ */ jsx("div", { className: "mb-20 pb-20 border-b border-gray-50", children: /* @__PURE__ */ jsxs("p", { className: "text-3xl md:text-6xl font-black text-gray-900 tracking-tighter leading-[1] transition-all", children: [
              '"',
              post.excerpt,
              '"'
            ] }) }),
            /* @__PURE__ */ jsx(
              "div",
              {
                className: "prose prose-2xl prose-slate max-w-none text-gray-800 leading-[1.9] font-serif prose-headings:font-sans prose-headings:font-black prose-headings:tracking-tighter prose-a:text-blue-600 prose-img:rounded-[3rem] prose-blockquote:border-l-[12px] prose-blockquote:border-black prose-blockquote:bg-gray-50 prose-blockquote:py-10 prose-blockquote:px-16 prose-blockquote:rounded-r-[3rem] prose-blockquote:not-italic prose-blockquote:font-sans prose-blockquote:font-bold prose-blockquote:text-gray-900",
                dangerouslySetInnerHTML: { __html: post.content }
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "xl:hidden mt-20 p-10 bg-gray-50 rounded-[3rem] border border-gray-100", children: [
              /* @__PURE__ */ jsx("h4", { className: "text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-8 text-center", children: "Interactions" }),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-8", children: [
                /* @__PURE__ */ jsxs(
                  "button",
                  {
                    onClick: handleLike,
                    className: `flex items-center space-x-3 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${is_liked ? "bg-red-600 text-white shadow-xl shadow-red-200" : "bg-white text-gray-900 border border-gray-200"}`,
                    children: [
                      /* @__PURE__ */ jsx("svg", { className: `h-5 w-5 ${is_liked ? "fill-current" : "fill-none"}`, stroke: "currentColor", strokeWidth: "2.5", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" }) }),
                      /* @__PURE__ */ jsxs("span", { children: [
                        is_liked ? "Liked" : "Like this story",
                        " • ",
                        post.likes_count
                      ] })
                    ]
                  }
                ),
                /* @__PURE__ */ jsx(SocialShare, { url: fullUrl, title: post.title })
              ] })
            ] }),
            post.tags.length > 0 && /* @__PURE__ */ jsxs("div", { className: "mt-24 pt-16 border-t border-gray-50", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 mb-8", children: [
                /* @__PURE__ */ jsx("span", { className: "text-[10px] font-black uppercase tracking-[0.3em] text-gray-400", children: "Filed Under" }),
                /* @__PURE__ */ jsx("div", { className: "h-[1px] flex-1 bg-gray-50" })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-4", children: post.tags.map((tag) => /* @__PURE__ */ jsxs(
                Link,
                {
                  href: route("blog.tag", tag.slug),
                  className: "px-8 py-3 bg-gray-50 text-gray-500 text-xs font-black uppercase tracking-widest rounded-2xl hover:bg-black hover:text-white transition-all border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1",
                  children: [
                    "#",
                    tag.name
                  ]
                },
                tag.slug
              )) })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "lg:w-[400px] shrink-0 space-y-16", children: [
            /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-xl shadow-gray-200/50", children: [
              /* @__PURE__ */ jsx("h4", { className: "text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-8", children: "The Author" }),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center text-center", children: [
                /* @__PURE__ */ jsx("div", { className: "h-24 w-24 rounded-[2rem] bg-black flex items-center justify-center text-3xl font-black text-white shadow-2xl mb-6", children: post.author.name.charAt(0) }),
                /* @__PURE__ */ jsx("h5", { className: "text-xl font-black text-gray-900 mb-4", children: post.author.name }),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 leading-relaxed mb-8", children: "Exploring the intersection of technology, design, and modern culture through deep-dive analysis." }),
                /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
                  /* @__PURE__ */ jsx("button", { className: "h-10 w-10 flex items-center justify-center rounded-xl bg-gray-50 text-gray-400 hover:text-blue-600 transition-all border border-gray-100", children: /* @__PURE__ */ jsx("i", { className: "fab fa-twitter" }) }),
                  /* @__PURE__ */ jsx("button", { className: "h-10 w-10 flex items-center justify-center rounded-xl bg-gray-50 text-gray-400 hover:text-pink-600 transition-all border border-gray-100", children: /* @__PURE__ */ jsx("i", { className: "fab fa-instagram" }) })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsx(
              GoogleAd,
              {
                adSlot: "1234567890",
                className: "mb-16"
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2.5rem] p-10 text-white shadow-2xl shadow-blue-200", children: [
              /* @__PURE__ */ jsx("h4", { className: "text-[10px] font-black uppercase tracking-[0.2em] text-blue-200 mb-6", children: "Never Miss a Story" }),
              /* @__PURE__ */ jsx("p", { className: "text-lg font-bold mb-8", children: "Join 10,000+ subscribers for weekly insights." }),
              /* @__PURE__ */ jsxs("form", { className: "space-y-4", children: [
                /* @__PURE__ */ jsx("input", { type: "email", placeholder: "Email address", className: "w-full px-6 py-4 rounded-2xl bg-white/10 border-none text-white placeholder-blue-200 focus:ring-2 focus:ring-white transition-all text-sm" }),
                /* @__PURE__ */ jsx("button", { className: "w-full bg-white text-blue-600 font-black py-4 rounded-2xl hover:bg-blue-50 transition-all shadow-xl", children: "Subscribe" })
              ] })
            ] })
          ] })
        ] })
      ] }),
      related_posts.length > 0 && /* @__PURE__ */ jsx("section", { className: "mt-40 pt-32 pb-32 bg-white border-t border-gray-100", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-6 sm:px-8 lg:px-10", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row justify-between items-end mb-20 gap-8", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h2", { className: "text-5xl font-black text-gray-900 tracking-tighter mb-4", children: "Further Reading" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-400 font-black uppercase tracking-widest text-[10px]", children: "Continue your journey" })
          ] }),
          /* @__PURE__ */ jsx(Link, { href: "/", className: "px-8 py-4 bg-gray-50 text-gray-900 font-black rounded-2xl text-[10px] uppercase tracking-widest hover:bg-black hover:text-white transition-all", children: "View All Stories" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-12", children: related_posts.map((rp) => /* @__PURE__ */ jsxs("div", { className: "group flex flex-col", children: [
          /* @__PURE__ */ jsxs("div", { className: "aspect-[16/10] rounded-[2.5rem] overflow-hidden mb-8 shadow-sm group-hover:shadow-2xl transition-all duration-500 relative", children: [
            /* @__PURE__ */ jsx(Link, { href: route("posts.show", rp.slug), children: /* @__PURE__ */ jsx(
              "img",
              {
                src: rp.featured_image,
                alt: rp.featured_image_alt || rp.title,
                className: "h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              }
            ) }),
            rp.category && /* @__PURE__ */ jsx("div", { className: "absolute top-6 left-6 z-10", children: /* @__PURE__ */ jsx(
              Link,
              {
                href: route("blog.category", rp.category.slug),
                className: "py-1.5 px-3 bg-white/90 backdrop-blur-md rounded-lg text-[8px] font-black uppercase tracking-widest text-black shadow-sm hover:bg-black hover:text-white transition-all",
                children: rp.category.name
              }
            ) })
          ] }),
          /* @__PURE__ */ jsx(Link, { href: route("posts.show", rp.slug), children: /* @__PURE__ */ jsx("h3", { className: "text-2xl font-black text-gray-900 leading-tight group-hover:text-blue-600 transition-colors line-clamp-2", children: rp.title }) }),
          /* @__PURE__ */ jsxs("div", { className: "mt-6 pt-6 border-t border-gray-100 flex items-center justify-between text-[10px] font-black text-gray-400 uppercase tracking-widest", children: [
            /* @__PURE__ */ jsx("span", { children: formatDate(rp.published_at) }),
            /* @__PURE__ */ jsx(Link, { href: route("posts.show", rp.slug), className: "text-gray-900 hover:text-blue-600", children: /* @__PURE__ */ jsx("svg", { className: "h-5 w-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "3", d: "M17 8l4 4m0 0l-4 4m4-4H3" }) }) })
          ] })
        ] }, rp.id)) })
      ] }) })
    ] }),
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
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                .vertical-text {
                    writing-mode: vertical-rl;
                    text-orientation: mixed;
                    transform: rotate(180deg);
                }
            ` } })
  ] });
}
export {
  Show as default
};
