import { jsxs, jsx } from "react/jsx-runtime";
import { P as PublicLayout } from "./PublicLayout-5WexOK-8.js";
import { Head, Link } from "@inertiajs/react";
import "react";
import "./SEO-BqzDCEc9.js";
import "./Dropdown-CbnvImCK.js";
import "@headlessui/react";
function Dashboard({ user, stats, activities }) {
  return /* @__PURE__ */ jsxs(PublicLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "My Dashboard" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-20", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-16 animate-fadeIn", children: [
        /* @__PURE__ */ jsxs("h1", { className: "text-5xl md:text-7xl font-black text-gray-900 tracking-tighter mb-6", children: [
          "Welcome back, ",
          /* @__PURE__ */ jsx("br", {}),
          /* @__PURE__ */ jsx("span", { className: "text-blue-600", children: user.name.split(" ")[0] })
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "text-xl text-gray-400 font-bold uppercase tracking-widest text-[10px]", children: [
          "Account Overview • Member since ",
          user.joined_at
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-10 mb-20", children: [
        /* @__PURE__ */ jsxs("div", { className: "lg:col-span-2 bg-white rounded-[3rem] p-8 md:p-12 shadow-xl border border-gray-100 animate-slideUp", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row items-center md:items-start space-y-8 md:space-y-0 md:space-x-10 mb-12 pb-12 border-b border-gray-50", children: [
            /* @__PURE__ */ jsx("div", { className: "h-32 w-32 rounded-[2.5rem] bg-black flex items-center justify-center text-5xl font-black text-white shadow-2xl shrink-0", children: user.name.charAt(0) }),
            /* @__PURE__ */ jsxs("div", { className: "text-center md:text-left", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-3xl font-black text-gray-900 mb-2", children: user.name }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-400 font-medium mb-6", children: user.email }),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap justify-center md:justify-start gap-4", children: [
                /* @__PURE__ */ jsx(
                  Link,
                  {
                    href: route("profile.edit"),
                    className: "px-8 py-3 bg-black text-white text-xs font-black uppercase tracking-widest rounded-xl hover:bg-gray-800 transition-all shadow-lg",
                    children: "Edit Profile"
                  }
                ),
                /* @__PURE__ */ jsx(
                  Link,
                  {
                    href: route("logout"),
                    method: "post",
                    as: "button",
                    className: "px-8 py-3 bg-white text-red-500 text-xs font-black uppercase tracking-widest rounded-xl border border-red-50 hover:bg-red-50 transition-all",
                    children: "Sign Out"
                  }
                )
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-4 gap-8 text-center sm:text-left", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black text-gray-300 uppercase tracking-[0.2em] mb-2", children: "Member Since" }),
              /* @__PURE__ */ jsx("p", { className: "text-lg font-black text-gray-900", children: stats.member_since })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black text-gray-300 uppercase tracking-[0.2em] mb-2", children: "Liked Stories" }),
              /* @__PURE__ */ jsx("p", { className: "text-lg font-black text-gray-900", children: stats.likes_count })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black text-gray-300 uppercase tracking-[0.2em] mb-2", children: "Read Stories" }),
              /* @__PURE__ */ jsx("p", { className: "text-lg font-black text-gray-900", children: stats.reads_count })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black text-gray-300 uppercase tracking-[0.2em] mb-2", children: "Account Status" }),
              /* @__PURE__ */ jsx("p", { className: "text-lg font-black text-blue-600 uppercase", children: "Verified" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-10", children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-black rounded-[3rem] p-10 text-white shadow-2xl animate-slideUp delay-100", children: [
            /* @__PURE__ */ jsx("h4", { className: "text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-6", children: "Discovery" }),
            /* @__PURE__ */ jsx("p", { className: "text-2xl font-black mb-8 leading-tight text-white", children: "Explore the latest stories today." }),
            /* @__PURE__ */ jsx(
              Link,
              {
                href: route("blog.articles"),
                className: "w-full flex items-center justify-center py-4 bg-white text-black font-black rounded-2xl hover:bg-blue-600 hover:text-white transition-all shadow-lg",
                children: "Open Library"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-blue-600 rounded-[3rem] p-10 text-white shadow-2xl animate-slideUp delay-200", children: [
            /* @__PURE__ */ jsx("h4", { className: "text-[10px] font-black uppercase tracking-[0.2em] text-blue-200 mb-6", children: "Support" }),
            /* @__PURE__ */ jsx("p", { className: "text-xl font-black mb-8 leading-tight", children: "Need help with your account?" }),
            /* @__PURE__ */ jsx(
              "a",
              {
                href: "mailto:support@arpon.blog",
                className: "text-xs font-black uppercase tracking-widest underline decoration-2 underline-offset-8 hover:text-blue-100 transition-colors",
                children: "Contact Support"
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-[3rem] p-8 md:p-12 border border-gray-100 shadow-sm animate-slideUp delay-300", children: [
        /* @__PURE__ */ jsx("div", { className: "flex flex-col md:flex-row items-center md:items-end justify-between mb-12 gap-6", children: /* @__PURE__ */ jsxs("div", { className: "text-center md:text-left", children: [
          /* @__PURE__ */ jsx("h4", { className: "text-3xl font-black text-gray-900 tracking-tight", children: "Recent Activity" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-400 font-medium", children: "Your latest interactions on the platform." })
        ] }) }),
        activities.length > 0 ? /* @__PURE__ */ jsx("div", { className: "space-y-6", children: activities.map((activity) => /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between p-6 bg-[#fafafa] rounded-[2rem] hover:bg-blue-50 transition-all group", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-6", children: [
            /* @__PURE__ */ jsx("div", { className: "h-14 w-14 rounded-2xl bg-white flex items-center justify-center text-blue-600 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all", children: activity.type === "like" ? /* @__PURE__ */ jsx("svg", { className: "h-6 w-6", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" }) }) : /* @__PURE__ */ jsx("svg", { className: "h-6 w-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" }) }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("p", { className: "text-sm font-medium text-gray-400 uppercase tracking-widest mb-1", children: [
                activity.type === "like" ? "Liked a story" : "Read a story",
                " • ",
                activity.created_at
              ] }),
              /* @__PURE__ */ jsx(Link, { href: route("posts.show", activity.post.slug), className: "text-xl font-black text-gray-900 group-hover:text-blue-600 transition-colors", children: activity.post.title }),
              /* @__PURE__ */ jsxs("p", { className: "text-xs font-bold text-gray-400 mt-2", children: [
                "In ",
                activity.post.category
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx(
            Link,
            {
              href: route("posts.show", activity.post.slug),
              className: "hidden md:flex h-12 w-12 rounded-full border border-gray-100 items-center justify-center text-gray-300 group-hover:border-blue-600 group-hover:text-blue-600 transition-all",
              children: /* @__PURE__ */ jsx("svg", { className: "h-5 w-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2.5", d: "M9 5l7 7-7 7" }) })
            }
          )
        ] }, activity.id)) }) : /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center py-20 text-center", children: [
          /* @__PURE__ */ jsx("div", { className: "h-20 w-20 bg-gray-50 rounded-[1.5rem] flex items-center justify-center mb-6 text-gray-300", children: /* @__PURE__ */ jsx("svg", { className: "h-10 w-10", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" }) }) }),
          /* @__PURE__ */ jsx("h5", { className: "text-xl font-black text-gray-900 mb-2", children: "No activity yet" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 max-w-xs mx-auto", children: "Start exploring and interacting with our stories to see your activity here." }),
          /* @__PURE__ */ jsx(
            Link,
            {
              href: route("blog.articles"),
              className: "mt-8 text-blue-600 font-black uppercase tracking-widest text-[10px] hover:underline underline-offset-8",
              children: "Browse Articles"
            }
          )
        ] })
      ] })
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
                .delay-200 { animation-delay: 200ms; }
                .delay-300 { animation-delay: 300ms; }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
            ` } })
  ] });
}
export {
  Dashboard as default
};
