import { jsxs, jsx } from "react/jsx-runtime";
import { A as AdminLayout } from "./AdminLayout-DmLr14pk.js";
import { Head, Link } from "@inertiajs/react";
import { ResponsiveContainer, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, Area, BarChart, Bar } from "recharts";
import "react";
import "axios";
import "@headlessui/react";
function Dashboard({ stats, recent_posts, popular_posts, recent_users, category_stats, recent_activity, chart_data }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };
  return /* @__PURE__ */ jsxs(AdminLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Admin Dashboard" }),
    /* @__PURE__ */ jsx("div", { className: "py-6", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-gray-900", children: "Dashboard Overview" }),
        /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-gray-600", children: "Quick overview of your application's current state." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8", children: [
        /* @__PURE__ */ jsx(
          StatCard,
          {
            title: "Total Views",
            value: stats.total_views,
            description: "All-time article views",
            icon: /* @__PURE__ */ jsxs("svg", { className: "h-6 w-6 text-white", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: [
              /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z" }),
              /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" })
            ] }),
            colorClass: "bg-pink-500"
          }
        ),
        /* @__PURE__ */ jsx(
          StatCard,
          {
            title: "Total Posts",
            value: stats.total_posts,
            description: `${stats.published_posts} published articles`,
            icon: /* @__PURE__ */ jsx("svg", { className: "h-6 w-6 text-white", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" }) }),
            colorClass: "bg-blue-500"
          }
        ),
        /* @__PURE__ */ jsx(
          StatCard,
          {
            title: "Total Users",
            value: stats.total_users,
            description: `${stats.admin_users} administrators`,
            icon: /* @__PURE__ */ jsx("svg", { className: "h-6 w-6 text-white", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" }) }),
            colorClass: "bg-green-500"
          }
        ),
        /* @__PURE__ */ jsx(
          StatCard,
          {
            title: "Categories",
            value: stats.total_categories,
            description: "Active topics",
            icon: /* @__PURE__ */ jsx("svg", { className: "h-6 w-6 text-white", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" }) }),
            colorClass: "bg-purple-500"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "lg:col-span-2 bg-white p-6 rounded-lg shadow-sm border border-gray-200", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-6", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-gray-900", children: "Traffic Overview" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500", children: "Post views over the last 14 days" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2 text-xs font-bold text-gray-400 uppercase tracking-widest", children: [
              /* @__PURE__ */ jsx("span", { className: "h-3 w-3 rounded-full bg-blue-500" }),
              /* @__PURE__ */ jsx("span", { children: "Views" })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "h-80 w-full", children: /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxs(AreaChart, { data: chart_data, margin: { top: 10, right: 10, left: -20, bottom: 0 }, children: [
            /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsxs("linearGradient", { id: "colorViews", x1: "0", y1: "0", x2: "0", y2: "1", children: [
              /* @__PURE__ */ jsx("stop", { offset: "5%", stopColor: "#3b82f6", stopOpacity: 0.1 }),
              /* @__PURE__ */ jsx("stop", { offset: "95%", stopColor: "#3b82f6", stopOpacity: 0 })
            ] }) }),
            /* @__PURE__ */ jsx(CartesianGrid, { strokeDasharray: "3 3", vertical: false, stroke: "#f3f4f6" }),
            /* @__PURE__ */ jsx(
              XAxis,
              {
                dataKey: "date",
                axisLine: false,
                tickLine: false,
                tick: { fill: "#9ca3af", fontSize: 10, fontWeight: 700 },
                dy: 10
              }
            ),
            /* @__PURE__ */ jsx(
              YAxis,
              {
                axisLine: false,
                tickLine: false,
                tick: { fill: "#9ca3af", fontSize: 10, fontWeight: 700 }
              }
            ),
            /* @__PURE__ */ jsx(
              Tooltip,
              {
                contentStyle: { backgroundColor: "#fff", borderRadius: "12px", border: "none", boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)" },
                itemStyle: { fontSize: "12px", fontWeight: 900, color: "#1f2937" }
              }
            ),
            /* @__PURE__ */ jsx(
              Area,
              {
                type: "monotone",
                dataKey: "views",
                stroke: "#3b82f6",
                strokeWidth: 3,
                fillOpacity: 1,
                fill: "url(#colorViews)",
                animationDuration: 1500
              }
            )
          ] }) }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white p-6 rounded-lg shadow-sm border border-gray-200", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-6", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-gray-900", children: "New Members" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500", children: "Registrations (14d)" })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "p-2 bg-green-50 rounded-md text-green-600", children: /* @__PURE__ */ jsx("svg", { className: "h-5 w-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" }) }) })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "h-80 w-full", children: /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxs(BarChart, { data: chart_data, margin: { top: 10, right: 0, left: -25, bottom: 0 }, children: [
            /* @__PURE__ */ jsx(CartesianGrid, { strokeDasharray: "3 3", vertical: false, stroke: "#f3f4f6" }),
            /* @__PURE__ */ jsx(
              XAxis,
              {
                dataKey: "date",
                axisLine: false,
                tickLine: false,
                tick: { fill: "#9ca3af", fontSize: 10, fontWeight: 700 },
                dy: 10
              }
            ),
            /* @__PURE__ */ jsx(
              YAxis,
              {
                axisLine: false,
                tickLine: false,
                tick: { fill: "#9ca3af", fontSize: 10, fontWeight: 700 }
              }
            ),
            /* @__PURE__ */ jsx(
              Tooltip,
              {
                cursor: { fill: "#f9fafb" },
                contentStyle: { backgroundColor: "#fff", borderRadius: "12px", border: "none", boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)" },
                itemStyle: { fontSize: "12px", fontWeight: 900, color: "#10b981" }
              }
            ),
            /* @__PURE__ */ jsx(Bar, { dataKey: "users", fill: "#10b981", radius: [4, 4, 0, 0], barSize: 12, animationDuration: 1500 })
          ] }) }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200", children: [
          /* @__PURE__ */ jsxs("div", { className: "px-4 py-5 sm:px-6 border-b border-gray-200 flex justify-between items-center bg-gray-50", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "text-lg leading-6 font-medium text-gray-900", children: "Popular Content" }),
              /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-gray-500", children: "The most read stories on your blog." })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "p-2 bg-pink-50 rounded-md text-pink-600", children: /* @__PURE__ */ jsx("svg", { className: "h-5 w-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" }) }) })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "px-4 py-5 sm:p-0", children: /* @__PURE__ */ jsxs("ul", { className: "divide-y divide-gray-200", children: [
            popular_posts.map((post) => /* @__PURE__ */ jsx("li", { className: "px-4 py-4 sm:px-6 hover:bg-gray-50 transition-colors", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
                /* @__PURE__ */ jsx(Link, { href: `/admin/posts/${post.id}/edit`, className: "text-sm font-semibold text-gray-900 truncate", children: post.title }),
                /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-500 mt-1", children: post.category?.name || "Uncategorized" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
                /* @__PURE__ */ jsx("span", { className: "text-lg font-black text-gray-900", children: post.views.toLocaleString() }),
                /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold text-gray-400 uppercase tracking-widest", children: "Views" })
              ] })
            ] }) }, post.id)),
            popular_posts.length === 0 && /* @__PURE__ */ jsx("li", { className: "px-4 py-8 text-center text-gray-500 italic", children: "No data yet." })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200", children: [
          /* @__PURE__ */ jsxs("div", { className: "px-4 py-5 sm:px-6 border-b border-gray-200 flex justify-between items-center bg-gray-50", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "text-lg leading-6 font-medium text-gray-900", children: "Category Impact" }),
              /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-gray-500", children: "Distribution of interest across topics." })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "p-2 bg-purple-50 rounded-md text-purple-600", children: /* @__PURE__ */ jsxs("svg", { className: "h-5 w-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: [
              /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" }),
              /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M20.488 9H15V1.512A9.025 9.025 0 0120.488 9z" })
            ] }) })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "p-6", children: /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
            category_stats.map((cat, i) => {
              const maxViews = Math.max(...category_stats.map((c) => c.total_views), 1);
              const percentage = cat.total_views / maxViews * 100;
              return /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-2", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-sm font-bold text-gray-700", children: cat.name }),
                  /* @__PURE__ */ jsxs("span", { className: "text-xs font-black text-gray-400 uppercase", children: [
                    cat.total_views.toLocaleString(),
                    " Views"
                  ] })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "w-full bg-gray-100 rounded-full h-2", children: /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: "bg-purple-600 h-2 rounded-full transition-all duration-1000",
                    style: { width: `${percentage}%` }
                  }
                ) })
              ] }, i);
            }),
            category_stats.length === 0 && /* @__PURE__ */ jsx("div", { className: "py-8 text-center text-gray-500 italic", children: "No category data yet." })
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200", children: [
          /* @__PURE__ */ jsxs("div", { className: "px-4 py-5 sm:px-6 border-b border-gray-200 flex justify-between items-center bg-gray-50", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "text-lg leading-6 font-medium text-gray-900", children: "Recent Posts" }),
              /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-gray-500", children: "The latest articles published on your blog." })
            ] }),
            /* @__PURE__ */ jsx(Link, { href: "/admin/posts", className: "text-sm font-medium text-blue-600 hover:text-blue-500", children: "View all" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "px-4 py-5 sm:p-0", children: /* @__PURE__ */ jsxs("ul", { className: "divide-y divide-gray-200", children: [
            recent_posts.map((post) => /* @__PURE__ */ jsx("li", { className: "px-4 py-4 sm:px-6 hover:bg-gray-50 transition-colors", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
                /* @__PURE__ */ jsx(Link, { href: `/admin/posts/${post.id}/edit`, className: "text-sm font-semibold text-blue-600 truncate", children: post.title }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center mt-1", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-500", children: post.author.name }),
                  /* @__PURE__ */ jsx("span", { className: "mx-2 text-gray-300", children: "•" }),
                  /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-500", children: post.category?.name || "Uncategorized" })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
                /* @__PURE__ */ jsx("span", { className: `px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${post.status === "published" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`, children: post.status }),
                /* @__PURE__ */ jsx("span", { className: "ml-4 text-xs text-gray-400", children: formatDate(post.published_at || post.created_at) })
              ] })
            ] }) }, post.id)),
            recent_posts.length === 0 && /* @__PURE__ */ jsx("li", { className: "px-4 py-8 text-center text-gray-500 italic", children: "No posts found yet." })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200", children: [
          /* @__PURE__ */ jsxs("div", { className: "px-4 py-5 sm:px-6 border-b border-gray-200 flex justify-between items-center bg-gray-50", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "text-lg leading-6 font-medium text-gray-900", children: "Recent Users" }),
              /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-gray-500", children: "Latest people to join your platform." })
            ] }),
            /* @__PURE__ */ jsx(Link, { href: "/admin/users", className: "text-sm font-medium text-blue-600 hover:text-blue-500", children: "View all" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "px-4 py-5 sm:p-0", children: /* @__PURE__ */ jsxs("ul", { className: "divide-y divide-gray-200", children: [
            recent_users.map((user) => /* @__PURE__ */ jsx("li", { className: "px-4 py-4 sm:px-6 hover:bg-gray-50 transition-colors", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
                /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500", children: user.name.charAt(0).toUpperCase() }),
                /* @__PURE__ */ jsxs("div", { className: "ml-4", children: [
                  /* @__PURE__ */ jsx("div", { className: "text-sm font-medium text-gray-900", children: user.name }),
                  /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-500", children: user.email })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-end", children: [
                user.is_admin ? /* @__PURE__ */ jsx("span", { className: "px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800 mb-1", children: "Admin" }) : /* @__PURE__ */ jsx("span", { className: "px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800 mb-1", children: "User" }),
                /* @__PURE__ */ jsxs("span", { className: "text-xs text-gray-400", children: [
                  "Joined ",
                  formatDate(user.created_at)
                ] })
              ] })
            ] }) }, user.id)),
            recent_users.length === 0 && /* @__PURE__ */ jsx("li", { className: "px-4 py-8 text-center text-gray-500 italic", children: "No users found yet." })
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200 mb-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "px-4 py-5 sm:px-6 border-b border-gray-200 bg-gray-50 flex justify-between items-center", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg leading-6 font-medium text-gray-900", children: "Platform Activity" }),
            /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-gray-500", children: "Real-time interactions from your readers." })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "p-2 bg-blue-50 rounded-md text-blue-600", children: /* @__PURE__ */ jsx("svg", { className: "h-5 w-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" }) }) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "p-6", children: recent_activity.length > 0 ? /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: recent_activity.map((activity) => /* @__PURE__ */ jsxs("div", { className: "flex items-start space-x-4 p-4 rounded-xl bg-gray-50 border border-gray-100 hover:bg-white hover:shadow-md transition-all group", children: [
          /* @__PURE__ */ jsx("div", { className: `p-2.5 rounded-lg shrink-0 ${activity.type === "like" ? "bg-red-50 text-red-600" : "bg-blue-50 text-blue-600"}`, children: activity.type === "like" ? /* @__PURE__ */ jsx("svg", { className: "h-5 w-5 fill-current", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" }) }) : /* @__PURE__ */ jsx("svg", { className: "h-5 w-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" }) }) }),
          /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-900 font-bold truncate group-hover:text-blue-600 transition-colors", children: activity.post }),
            /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-500 mt-1", children: [
              /* @__PURE__ */ jsx("span", { className: "font-black text-gray-900", children: activity.user }),
              activity.type === "like" ? " liked this" : " read this"
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-2", children: activity.created_at })
          ] })
        ] }, activity.id)) }) : /* @__PURE__ */ jsxs("div", { className: "py-12 text-center", children: [
          /* @__PURE__ */ jsx("div", { className: "inline-flex items-center justify-center p-4 bg-gray-50 rounded-full text-gray-300 mb-4", children: /* @__PURE__ */ jsx("svg", { className: "h-8 w-8", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", d: "M13 10V3L4 14h7v7l9-11h-7z" }) }) }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-500 italic", children: "Waiting for the first interactions..." })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "lg:col-span-2 bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200", children: [
          /* @__PURE__ */ jsx("div", { className: "px-4 py-5 sm:px-6 border-b border-gray-200 bg-gray-50", children: /* @__PURE__ */ jsx("h3", { className: "text-lg leading-6 font-medium text-gray-900", children: "Quick Actions" }) }),
          /* @__PURE__ */ jsx("div", { className: "p-6", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxs(
              Link,
              {
                href: "/admin/posts/create",
                className: "flex items-center p-4 bg-blue-50 rounded-lg border border-blue-100 hover:bg-blue-100 transition-colors group",
                children: [
                  /* @__PURE__ */ jsx("div", { className: "p-3 bg-blue-600 rounded-md text-white mr-4", children: /* @__PURE__ */ jsx("svg", { className: "h-5 w-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M12 4v16m8-8H4" }) }) }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-gray-900", children: "New Article" }),
                    /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500", children: "Draft a new post" })
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              Link,
              {
                href: "/admin/media",
                className: "flex items-center p-4 bg-purple-50 rounded-lg border border-purple-100 hover:bg-purple-100 transition-colors group",
                children: [
                  /* @__PURE__ */ jsx("div", { className: "p-3 bg-purple-600 rounded-md text-white mr-4", children: /* @__PURE__ */ jsx("svg", { className: "h-5 w-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" }) }) }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-gray-900", children: "Media Library" }),
                    /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500", children: "Manage your images" })
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              Link,
              {
                href: "/admin/categories/create",
                className: "flex items-center p-4 bg-green-50 rounded-lg border border-green-100 hover:bg-green-100 transition-colors group",
                children: [
                  /* @__PURE__ */ jsx("div", { className: "p-3 bg-green-600 rounded-md text-white mr-4", children: /* @__PURE__ */ jsx("svg", { className: "h-5 w-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M12 6v6m0 0v6m0-6h6m-6 0H6" }) }) }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-gray-900", children: "Add Category" }),
                    /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500", children: "New topic for posts" })
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              Link,
              {
                href: "/admin/users/create",
                className: "flex items-center p-4 bg-orange-50 rounded-lg border border-orange-100 hover:bg-orange-100 transition-colors group",
                children: [
                  /* @__PURE__ */ jsx("div", { className: "p-3 bg-orange-600 rounded-md text-white mr-4", children: /* @__PURE__ */ jsx("svg", { className: "h-5 w-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" }) }) }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-gray-900", children: "Invite User" }),
                    /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500", children: "Register new staff" })
                  ] })
                ]
              }
            )
          ] }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200", children: [
          /* @__PURE__ */ jsx("div", { className: "px-4 py-5 sm:px-6 border-b border-gray-200 bg-gray-50", children: /* @__PURE__ */ jsx("h3", { className: "text-lg leading-6 font-medium text-gray-900", children: "System" }) }),
          /* @__PURE__ */ jsx("div", { className: "p-6", children: /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-500 font-medium", children: "Server" }),
              /* @__PURE__ */ jsx("span", { className: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800", children: "Online" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-500 font-medium", children: "Database" }),
              /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-900 font-bold", children: "SQLite" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-500 font-medium", children: "PHP" }),
              /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-900 font-bold", children: "v8.3.6" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-500 font-medium", children: "Laravel" }),
              /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-900 font-bold", children: "v12.0" })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "mt-6 pt-6 border-t border-gray-100", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center text-xs text-gray-400", children: [
              /* @__PURE__ */ jsx("svg", { className: "h-4 w-4 mr-1", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" }) }),
              "Last backup: 2 hours ago"
            ] }) })
          ] }) })
        ] })
      ] })
    ] }) })
  ] });
}
function StatCard({ title, value, description, icon, colorClass }) {
  return /* @__PURE__ */ jsxs("div", { className: "bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200 hover:shadow-md transition-shadow", children: [
    /* @__PURE__ */ jsx("div", { className: "p-5", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
      /* @__PURE__ */ jsx("div", { className: `flex-shrink-0 ${colorClass} rounded-lg p-3 shadow-inner`, children: icon }),
      /* @__PURE__ */ jsx("div", { className: "ml-5 w-0 flex-1", children: /* @__PURE__ */ jsxs("dl", { children: [
        /* @__PURE__ */ jsx("dt", { className: "text-xs font-semibold text-gray-400 uppercase tracking-wider", children: title }),
        /* @__PURE__ */ jsx("dd", { className: "flex items-baseline", children: /* @__PURE__ */ jsx("div", { className: "text-2xl font-bold text-gray-900", children: value }) })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "bg-gray-50 px-5 py-3 border-t border-gray-100", children: /* @__PURE__ */ jsx("div", { className: "text-xs font-medium text-gray-500", children: description }) })
  ] });
}
export {
  Dashboard as default
};
