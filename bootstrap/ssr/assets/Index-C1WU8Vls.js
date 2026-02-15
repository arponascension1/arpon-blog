import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { A as AdminLayout } from "./AdminLayout-DmLr14pk.js";
import { Head, Link } from "@inertiajs/react";
import { ResponsiveContainer, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, Area, PieChart, Pie, Cell, BarChart, Bar } from "recharts";
import "axios";
import "@headlessui/react";
const COLORS = ["#3B82F6", "#10B981", "#8B5CF6", "#F59E0B", "#EF4444", "#EC4899", "#06B6D4"];
function Index({ daily_views, category_views, top_posts, stats }) {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  return /* @__PURE__ */ jsxs(AdminLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Analytics Dashboard" }),
    /* @__PURE__ */ jsx("div", { className: "py-10 bg-[#f8fafc] min-h-screen", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row md:items-center justify-between mb-10", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h1", { className: "text-3xl font-black text-gray-900 tracking-tight", children: "Performance Analytics" }),
          /* @__PURE__ */ jsx("p", { className: "mt-2 text-gray-500 font-medium", children: "Detailed insights into your blog's traffic and engagement." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-4 md:mt-0 flex space-x-3", children: [
          /* @__PURE__ */ jsx("button", { className: "px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all shadow-sm", children: "Last 30 Days" }),
          /* @__PURE__ */ jsx("button", { className: "px-4 py-2 bg-black text-white rounded-xl text-sm font-bold hover:bg-gray-800 transition-all shadow-md", children: "Export Report" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-white p-6 rounded-3xl border border-gray-100 shadow-sm", children: [
          /* @__PURE__ */ jsx("p", { className: "text-xs font-black text-gray-400 uppercase tracking-widest mb-4", children: "Total Reach" }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-end justify-between", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "text-3xl font-black text-gray-900", children: stats.total_views.toLocaleString() }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-green-600 font-bold mt-1", children: "+12.5% from last month" })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "p-3 bg-blue-50 text-blue-600 rounded-2xl", children: /* @__PURE__ */ jsxs("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: [
              /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2.5", d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z" }),
              /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2.5", d: "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" })
            ] }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white p-6 rounded-3xl border border-gray-100 shadow-sm", children: [
          /* @__PURE__ */ jsx("p", { className: "text-xs font-black text-gray-400 uppercase tracking-widest mb-4", children: "Views Today" }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-end justify-between", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "text-3xl font-black text-gray-900", children: stats.views_today.toLocaleString() }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-blue-600 font-bold mt-1", children: "Live tracking active" })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "p-3 bg-pink-50 text-pink-600 rounded-2xl", children: /* @__PURE__ */ jsx("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2.5", d: "M13 10V3L4 14h7v7l9-11h-7z" }) }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white p-6 rounded-3xl border border-gray-100 shadow-sm", children: [
          /* @__PURE__ */ jsx("p", { className: "text-xs font-black text-gray-400 uppercase tracking-widest mb-4", children: "Avg. Engagement" }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-end justify-between", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "text-3xl font-black text-gray-900", children: stats.avg_views_per_post.toFixed(1) }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 font-medium mt-1", children: "Views per article" })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "p-3 bg-purple-50 text-purple-600 rounded-2xl", children: /* @__PURE__ */ jsx("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2.5", d: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" }) }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white p-6 rounded-3xl border border-gray-100 shadow-sm", children: [
          /* @__PURE__ */ jsx("p", { className: "text-xs font-black text-gray-400 uppercase tracking-widest mb-4", children: "Hot Category" }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-end justify-between", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "text-xl font-black text-gray-900 truncate max-w-[150px]", children: stats.most_active_category }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-orange-600 font-bold mt-1", children: "Trending now" })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "p-3 bg-orange-50 text-orange-600 rounded-2xl", children: /* @__PURE__ */ jsxs("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: [
              /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2.5", d: "M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.5-7 3 3 3 3.333 3.5 5 1.5 1 3 3 3 5.5 0 1.98-.79 3.772-2.07 5.07z" }),
              /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2.5", d: "M12.343 14.343L11 11l-1.343 3.343L7 16l3.343 1.343L11 20l1.343-3.343L16 15l-3.657-1.657z" })
            ] }) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10", children: [
        /* @__PURE__ */ jsxs("div", { className: "lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-10", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "text-xl font-black text-gray-900", children: "Traffic Overview" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 font-medium mt-1", children: "Daily views for the past month" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
              /* @__PURE__ */ jsx("span", { className: "h-3 w-3 rounded-full bg-blue-600" }),
              /* @__PURE__ */ jsx("span", { className: "text-xs font-bold text-gray-600", children: "Page Views" })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "h-[400px] w-full", children: isClient ? /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxs(AreaChart, { data: daily_views, children: [
            /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsxs("linearGradient", { id: "colorViews", x1: "0", y1: "0", x2: "0", y2: "1", children: [
              /* @__PURE__ */ jsx("stop", { offset: "5%", stopColor: "#3B82F6", stopOpacity: 0.1 }),
              /* @__PURE__ */ jsx("stop", { offset: "95%", stopColor: "#3B82F6", stopOpacity: 0 })
            ] }) }),
            /* @__PURE__ */ jsx(CartesianGrid, { strokeDasharray: "3 3", vertical: false, stroke: "#f1f5f9" }),
            /* @__PURE__ */ jsx(
              XAxis,
              {
                dataKey: "date",
                axisLine: false,
                tickLine: false,
                tick: { fill: "#94a3b8", fontSize: 12, fontWeight: 600 },
                dy: 10
              }
            ),
            /* @__PURE__ */ jsx(
              YAxis,
              {
                axisLine: false,
                tickLine: false,
                tick: { fill: "#94a3b8", fontSize: 12, fontWeight: 600 }
              }
            ),
            /* @__PURE__ */ jsx(
              Tooltip,
              {
                contentStyle: { borderRadius: "16px", border: "none", boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)", padding: "12px" },
                itemStyle: { fontWeight: 800, color: "#1e293b" }
              }
            ),
            /* @__PURE__ */ jsx(
              Area,
              {
                type: "monotone",
                dataKey: "views",
                stroke: "#3B82F6",
                strokeWidth: 4,
                fillOpacity: 1,
                fill: "url(#colorViews)",
                animationDuration: 1500
              }
            )
          ] }) }) : /* @__PURE__ */ jsx("div", { className: "h-full w-full bg-gray-50 rounded-2xl animate-pulse flex items-center justify-center", children: /* @__PURE__ */ jsx("span", { className: "text-gray-300 font-bold italic tracking-widest", children: "Generating Chart..." }) }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-black text-gray-900 mb-2", children: "Topic Performance" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 font-medium mb-10", children: "Views by category" }),
          /* @__PURE__ */ jsx("div", { className: "h-[300px] w-full", children: isClient ? /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxs(PieChart, { children: [
            /* @__PURE__ */ jsx(
              Pie,
              {
                data: category_views,
                cx: "50%",
                cy: "50%",
                innerRadius: 60,
                outerRadius: 100,
                paddingAngle: 5,
                dataKey: "views",
                animationDuration: 1500,
                children: category_views.map((entry, index) => /* @__PURE__ */ jsx(Cell, { fill: COLORS[index % COLORS.length] }, `cell-${index}`))
              }
            ),
            /* @__PURE__ */ jsx(
              Tooltip,
              {
                contentStyle: { borderRadius: "16px", border: "none", boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }
              }
            )
          ] }) }) : /* @__PURE__ */ jsx("div", { className: "h-full w-full rounded-full border-8 border-gray-50 animate-pulse" }) }),
          /* @__PURE__ */ jsx("div", { className: "mt-6 space-y-3", children: category_views.slice(0, 4).map((cat, i) => /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
              /* @__PURE__ */ jsx("span", { className: "h-3 w-3 rounded-full", style: { backgroundColor: COLORS[i % COLORS.length] } }),
              /* @__PURE__ */ jsx("span", { className: "text-sm font-bold text-gray-700", children: cat.name })
            ] }),
            /* @__PURE__ */ jsx("span", { className: "text-xs font-black text-gray-400", children: cat.views.toLocaleString() })
          ] }, i)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-8", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-xl font-black text-gray-900", children: "Elite Performance" }),
            /* @__PURE__ */ jsx(Link, { href: "/admin/posts", className: "text-xs font-black text-blue-600 uppercase tracking-widest hover:underline", children: "View All Posts" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
            top_posts.map((post, i) => /* @__PURE__ */ jsxs("div", { className: "group flex items-center justify-between p-4 hover:bg-gray-50 rounded-2xl transition-all border border-transparent hover:border-gray-100", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4", children: [
                /* @__PURE__ */ jsx("div", { className: "h-10 w-10 bg-gray-100 rounded-xl flex items-center justify-center font-black text-gray-400 group-hover:bg-black group-hover:text-white transition-all", children: i + 1 }),
                /* @__PURE__ */ jsxs("div", { className: "max-w-[200px] md:max-w-[350px]", children: [
                  /* @__PURE__ */ jsx("h4", { className: "text-sm font-bold text-gray-900 truncate", children: post.title }),
                  /* @__PURE__ */ jsxs("p", { className: "text-[10px] text-gray-400 font-black uppercase tracking-widest mt-1", children: [
                    "/posts/",
                    post.slug
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "text-right", children: [
                /* @__PURE__ */ jsx("span", { className: "text-lg font-black text-gray-900", children: post.views.toLocaleString() }),
                /* @__PURE__ */ jsx("p", { className: "text-[10px] text-gray-400 font-black uppercase tracking-widest", children: "Views" })
              ] })
            ] }, i)),
            top_posts.length === 0 && /* @__PURE__ */ jsx("div", { className: "py-10 text-center text-gray-400 italic font-medium", children: "No engagement data available yet." })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-black text-gray-900 mb-2", children: "Category Benchmarks" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 font-medium mb-10", children: "Popularity comparison by topic" }),
          /* @__PURE__ */ jsx("div", { className: "h-[400px] w-full", children: isClient ? /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxs(BarChart, { data: category_views, children: [
            /* @__PURE__ */ jsx(CartesianGrid, { strokeDasharray: "3 3", vertical: false, stroke: "#f1f5f9" }),
            /* @__PURE__ */ jsx(
              XAxis,
              {
                dataKey: "name",
                axisLine: false,
                tickLine: false,
                tick: { fill: "#94a3b8", fontSize: 10, fontWeight: 700 }
              }
            ),
            /* @__PURE__ */ jsx(
              YAxis,
              {
                axisLine: false,
                tickLine: false,
                tick: { fill: "#94a3b8", fontSize: 12, fontWeight: 600 }
              }
            ),
            /* @__PURE__ */ jsx(
              Tooltip,
              {
                cursor: { fill: "#f8fafc" },
                contentStyle: { borderRadius: "16px", border: "none", boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }
              }
            ),
            /* @__PURE__ */ jsx(
              Bar,
              {
                dataKey: "views",
                fill: "#8B5CF6",
                radius: [10, 10, 0, 0],
                barSize: 40,
                animationDuration: 2e3
              }
            )
          ] }) }) : /* @__PURE__ */ jsx("div", { className: "h-full w-full flex items-end space-x-4", children: [1, 2, 3, 4, 5].map((i) => /* @__PURE__ */ jsx("div", { className: "flex-1 bg-gray-50 rounded-t-xl", style: { height: `${i * 20}%` } }, i)) }) })
        ] })
      ] })
    ] }) })
  ] });
}
export {
  Index as default
};
