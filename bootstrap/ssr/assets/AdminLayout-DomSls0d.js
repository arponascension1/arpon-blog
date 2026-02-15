import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useRef, useEffect, Fragment } from "react";
import { Link, usePage } from "@inertiajs/react";
import { Transition, Dialog } from "@headlessui/react";
import axios from "axios";
function GlobalSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const searchRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  useEffect(() => {
    if (query.length < 2) {
      setResults(null);
      setIsOpen(false);
      return;
    }
    const timeoutId = setTimeout(async () => {
      setLoading(true);
      try {
        const response = await axios.get(route("admin.search"), {
          params: { query }
        });
        setResults(response.data);
        setIsOpen(true);
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setLoading(false);
      }
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [query]);
  const hasResults = results && (results.posts.length > 0 || results.users.length > 0 || results.categories.length > 0 || results.tags.length > 0);
  return /* @__PURE__ */ jsxs("div", { className: "relative flex-1 max-w-lg", ref: searchRef, children: [
    /* @__PURE__ */ jsxs("div", { className: "relative group", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none", children: /* @__PURE__ */ jsx("svg", { className: "h-4 w-4 text-gray-400 group-focus-within:text-blue-500 transition-colors", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2.5", d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" }) }) }),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "text",
          className: "block w-full pl-10 pr-3 py-2 border-0 bg-gray-100/50 rounded-xl leading-5 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white sm:text-sm transition-all border border-transparent focus:border-blue-100",
          placeholder: "Search anything...",
          value: query,
          onChange: (e) => setQuery(e.target.value),
          onFocus: () => query.length >= 2 && setIsOpen(true)
        }
      ),
      loading && /* @__PURE__ */ jsx("div", { className: "absolute inset-y-0 right-0 pr-3 flex items-center", children: /* @__PURE__ */ jsxs("svg", { className: "animate-spin h-4 w-4 text-blue-500", fill: "none", viewBox: "0 0 24 24", children: [
        /* @__PURE__ */ jsx("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }),
        /* @__PURE__ */ jsx("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx(
      Transition,
      {
        show: isOpen,
        enter: "transition ease-out duration-200",
        enterFrom: "transform opacity-0 translate-y-2 scale-95",
        enterTo: "transform opacity-100 translate-y-0 scale-100",
        leave: "transition ease-in duration-150",
        leaveFrom: "transform opacity-100 translate-y-0 scale-100",
        leaveTo: "transform opacity-0 translate-y-2 scale-95",
        children: /* @__PURE__ */ jsx("div", { className: "absolute mt-2 w-full bg-white shadow-2xl rounded-2xl border border-gray-100 z-50 max-h-[70vh] overflow-y-auto overflow-x-hidden ring-1 ring-black/5", children: !hasResults ? /* @__PURE__ */ jsxs("div", { className: "p-8 text-sm text-gray-500 text-center flex flex-col items-center", children: [
          /* @__PURE__ */ jsx("div", { className: "p-3 bg-gray-50 rounded-full mb-3 text-gray-300", children: /* @__PURE__ */ jsx("svg", { className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" }) }) }),
          /* @__PURE__ */ jsx("p", { className: "font-medium text-gray-900", children: "No results found" }),
          /* @__PURE__ */ jsxs("p", { className: "mt-1", children: [
            `We couldn't find anything for "`,
            query,
            '"'
          ] })
        ] }) : /* @__PURE__ */ jsxs("div", { className: "p-3 space-y-5", children: [
          results.posts.length > 0 && /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "px-3 py-1 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50 mb-2", children: "Posts" }),
            /* @__PURE__ */ jsx("ul", { className: "space-y-1", children: results.posts.map((post) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
              Link,
              {
                href: `/admin/posts/${post.id}/edit`,
                onClick: () => setIsOpen(false),
                className: "block px-3 py-2.5 text-sm font-semibold text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all",
                children: post.title
              }
            ) }, post.id)) })
          ] }),
          results.users.length > 0 && /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "px-3 py-1 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50 mb-2", children: "Users" }),
            /* @__PURE__ */ jsx("ul", { className: "space-y-1", children: results.users.map((user) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
              Link,
              {
                href: `/admin/users/${user.id}/edit`,
                onClick: () => setIsOpen(false),
                className: "block px-3 py-2.5 hover:bg-blue-50 rounded-xl transition-all group",
                children: [
                  /* @__PURE__ */ jsx("div", { className: "font-bold text-sm text-gray-700 group-hover:text-blue-600 transition-colors", children: user.name }),
                  /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-500", children: user.email })
                ]
              }
            ) }, user.id)) })
          ] }),
          results.categories.length > 0 && /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "px-3 py-1 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50 mb-2", children: "Categories" }),
            /* @__PURE__ */ jsx("ul", { className: "space-y-1", children: results.categories.map((category) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
              Link,
              {
                href: `/admin/categories/${category.id}/edit`,
                onClick: () => setIsOpen(false),
                className: "block px-3 py-2.5 text-sm font-semibold text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all",
                children: category.name
              }
            ) }, category.id)) })
          ] }),
          results.tags.length > 0 && /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "px-3 py-1 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50 mb-2", children: "Tags" }),
            /* @__PURE__ */ jsx("div", { className: "mt-2 flex flex-wrap gap-2 px-3 pb-2", children: results.tags.map((tag) => /* @__PURE__ */ jsxs(
              Link,
              {
                href: `/admin/tags/${tag.id}/edit`,
                onClick: () => setIsOpen(false),
                className: "inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gray-50 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-all border border-gray-100",
                children: [
                  "# ",
                  tag.name
                ]
              },
              tag.id
            )) })
          ] })
        ] }) })
      }
    )
  ] });
}
function AdminLayout({ children }) {
  const { auth, flash } = usePage().props;
  const user = auth.user;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showFlash, setShowFlash] = useState(false);
  const [flashMessage, setFlashMessage] = useState(null);
  useEffect(() => {
    const flashData = flash;
    if (flashData && (flashData.success || flashData.error)) {
      const message = flashData.success || flashData.error || "";
      setFlashMessage({
        type: flashData.success ? "success" : "error",
        message
      });
      setShowFlash(true);
      const timer = setTimeout(() => {
        setShowFlash(false);
      }, 5e3);
      return () => clearTimeout(timer);
    }
  }, [flash]);
  const dismissFlash = () => {
    setShowFlash(false);
  };
  const navigation = [
    {
      name: "Dashboard",
      href: "/admin/dashboard",
      icon: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" }) }),
      current: window.location.pathname === "/admin/dashboard"
    },
    {
      name: "Posts",
      href: "/admin/posts",
      icon: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" }) }),
      current: window.location.pathname.startsWith("/admin/posts")
    },
    {
      name: "Users",
      href: "/admin/users",
      icon: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" }) }),
      current: window.location.pathname.startsWith("/admin/users")
    },
    {
      name: "Categories",
      href: "/admin/categories",
      icon: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" }) }),
      current: window.location.pathname.startsWith("/admin/categories")
    },
    {
      name: "Tags",
      href: "/admin/tags",
      icon: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" }) }),
      current: window.location.pathname.startsWith("/admin/tags")
    },
    {
      name: "Media",
      href: "/admin/media",
      icon: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" }) }),
      current: window.location.pathname.startsWith("/admin/media")
    },
    {
      name: "Analytics",
      href: "/admin/analytics",
      icon: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" }) }),
      current: window.location.pathname === "/admin/analytics"
    },
    {
      name: "Settings",
      href: "/admin/settings",
      icon: /* @__PURE__ */ jsxs("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: [
        /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" }),
        /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z" })
      ] }),
      current: window.location.pathname === "/admin/settings"
    }
  ];
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gray-50", children: [
    /* @__PURE__ */ jsx(Transition.Root, { show: sidebarOpen, as: Fragment, children: /* @__PURE__ */ jsxs(Dialog, { as: "div", className: "relative z-50 lg:hidden", onClose: setSidebarOpen, children: [
      /* @__PURE__ */ jsx(
        Transition.Child,
        {
          as: Fragment,
          enter: "transition-opacity ease-linear duration-300",
          enterFrom: "opacity-0",
          enterTo: "opacity-100",
          leave: "transition-opacity ease-linear duration-300",
          leaveFrom: "opacity-100",
          leaveTo: "opacity-0",
          children: /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-gray-900/80 backdrop-blur-sm" })
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "fixed inset-0 flex", children: /* @__PURE__ */ jsx(
        Transition.Child,
        {
          as: Fragment,
          enter: "transition ease-in-out duration-300 transform",
          enterFrom: "-translate-x-full",
          enterTo: "translate-x-0",
          leave: "transition ease-in-out duration-300 transform",
          leaveFrom: "translate-x-0",
          leaveTo: "-translate-x-full",
          children: /* @__PURE__ */ jsxs(Dialog.Panel, { className: "relative mr-16 flex w-full max-w-xs flex-1", children: [
            /* @__PURE__ */ jsx(
              Transition.Child,
              {
                as: Fragment,
                enter: "ease-in-out duration-300",
                enterFrom: "opacity-0",
                enterTo: "opacity-100",
                leave: "ease-in-out duration-300",
                leaveFrom: "opacity-100",
                leaveTo: "opacity-0",
                children: /* @__PURE__ */ jsx("div", { className: "absolute left-full top-0 flex w-16 justify-center pt-5", children: /* @__PURE__ */ jsxs("button", { type: "button", className: "-m-2.5 p-2.5", onClick: () => setSidebarOpen(false), children: [
                  /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close sidebar" }),
                  /* @__PURE__ */ jsx("svg", { className: "h-6 w-6 text-white", fill: "none", viewBox: "0 0 24 24", strokeWidth: "1.5", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M6 18L18 6M6 6l12 12" }) })
                ] }) })
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4", children: [
              /* @__PURE__ */ jsx("div", { className: "flex h-16 shrink-0 items-center", children: /* @__PURE__ */ jsxs("h1", { className: "text-xl font-black text-gray-900 tracking-tight", children: [
                "ARPON",
                /* @__PURE__ */ jsx("span", { className: "text-blue-600", children: "BLOG" })
              ] }) }),
              /* @__PURE__ */ jsx("nav", { className: "flex flex-1 flex-col", children: /* @__PURE__ */ jsxs("ul", { role: "list", className: "flex flex-1 flex-col gap-y-7", children: [
                /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("ul", { role: "list", className: "-mx-2 space-y-1", children: navigation.map((item) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
                  Link,
                  {
                    href: item.href,
                    onClick: () => setSidebarOpen(false),
                    className: `group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 ${item.current ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"}`,
                    children: [
                      /* @__PURE__ */ jsx("span", { className: `${item.current ? "text-blue-600" : "text-gray-400 group-hover:text-blue-600"}`, children: item.icon }),
                      item.name
                    ]
                  }
                ) }, item.name)) }) }),
                /* @__PURE__ */ jsx("li", { className: "mt-auto", children: /* @__PURE__ */ jsxs(
                  Link,
                  {
                    href: route("profile.edit"),
                    onClick: () => setSidebarOpen(false),
                    className: "group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-blue-600",
                    children: [
                      /* @__PURE__ */ jsx("div", { className: "h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden shrink-0", children: user.avatar ? /* @__PURE__ */ jsx("img", { src: user.avatar, alt: "", className: "h-full w-full object-cover" }) : /* @__PURE__ */ jsx("span", { className: "text-[10px]", children: user.name.charAt(0) }) }),
                      /* @__PURE__ */ jsx("span", { className: "truncate", children: user.name })
                    ]
                  }
                ) })
              ] }) })
            ] })
          ] })
        }
      ) })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col", children: /* @__PURE__ */ jsxs("div", { className: "flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4", children: [
      /* @__PURE__ */ jsx("div", { className: "flex h-16 shrink-0 items-center", children: /* @__PURE__ */ jsxs("h1", { className: "text-xl font-black text-gray-900 tracking-tight", children: [
        "ARPON",
        /* @__PURE__ */ jsx("span", { className: "text-blue-600", children: "BLOG" })
      ] }) }),
      /* @__PURE__ */ jsx("nav", { className: "flex flex-1 flex-col", children: /* @__PURE__ */ jsxs("ul", { role: "list", className: "flex flex-1 flex-col gap-y-7", children: [
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("ul", { role: "list", className: "-mx-2 space-y-1", children: navigation.map((item) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
          Link,
          {
            href: item.href,
            className: `group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 ${item.current ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"}`,
            children: [
              /* @__PURE__ */ jsx("span", { className: `${item.current ? "text-blue-600" : "text-gray-400 group-hover:text-blue-600"}`, children: item.icon }),
              item.name
            ]
          }
        ) }, item.name)) }) }),
        /* @__PURE__ */ jsx("li", { className: "mt-auto", children: /* @__PURE__ */ jsxs(
          Link,
          {
            href: route("profile.edit"),
            className: "group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-blue-600",
            children: [
              /* @__PURE__ */ jsx("div", { className: "h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden shrink-0", children: user.avatar ? /* @__PURE__ */ jsx("img", { src: user.avatar, alt: "", className: "h-full w-full object-cover" }) : /* @__PURE__ */ jsx("span", { className: "text-[10px]", children: user.name.charAt(0) }) }),
              /* @__PURE__ */ jsx("span", { className: "truncate", children: user.name })
            ]
          }
        ) })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "lg:pl-64", children: [
      /* @__PURE__ */ jsxs("div", { className: "sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8", children: [
        /* @__PURE__ */ jsxs("button", { type: "button", className: "-m-2.5 p-2.5 text-gray-700 lg:hidden", onClick: () => setSidebarOpen(true), children: [
          /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Open sidebar" }),
          /* @__PURE__ */ jsx("svg", { className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", strokeWidth: "1.5", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" }) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "h-6 w-px bg-gray-200 lg:hidden", "aria-hidden": "true" }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-1 gap-x-4 self-stretch lg:gap-x-6", children: [
          /* @__PURE__ */ jsx("div", { className: "relative flex flex-1 items-center", children: /* @__PURE__ */ jsx("div", { className: "w-full max-w-lg", children: /* @__PURE__ */ jsx(GlobalSearch, {}) }) }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-x-4 lg:gap-x-6", children: [
            /* @__PURE__ */ jsx(Link, { href: "/", className: "text-sm font-semibold leading-6 text-gray-900 hover:text-blue-600 transition-colors hidden sm:block", children: "View Site" }),
            /* @__PURE__ */ jsx("div", { className: "hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200", "aria-hidden": "true" }),
            /* @__PURE__ */ jsx("div", { className: "flex items-center gap-x-2", children: /* @__PURE__ */ jsxs(
              Link,
              {
                href: route("logout"),
                method: "post",
                as: "button",
                className: "rounded-full bg-white p-1 text-gray-400 hover:text-red-600 transition-colors",
                children: [
                  /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Logout" }),
                  /* @__PURE__ */ jsx("svg", { className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", strokeWidth: "1.5", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" }) })
                ]
              }
            ) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("main", { className: "py-10", children: /* @__PURE__ */ jsxs("div", { className: "px-4 sm:px-6 lg:px-8", children: [
        showFlash && flashMessage && /* @__PURE__ */ jsx("div", { className: "mb-8 max-w-4xl mx-auto", children: /* @__PURE__ */ jsx(
          "div",
          {
            className: `rounded-xl p-4 shadow-sm border ${flashMessage.type === "success" ? "bg-green-50 border-green-100 text-green-800" : "bg-red-50 border-red-100 text-red-800"}`,
            children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-x-3", children: [
                flashMessage.type === "success" ? /* @__PURE__ */ jsx("svg", { className: "h-5 w-5 text-green-600", viewBox: "0 0 20 20", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z", clipRule: "evenodd" }) }) : /* @__PURE__ */ jsx("svg", { className: "h-5 w-5 text-red-600", viewBox: "0 0 20 20", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z", clipRule: "evenodd" }) }),
                /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold", children: flashMessage.message })
              ] }),
              /* @__PURE__ */ jsx("button", { onClick: dismissFlash, className: "p-1 hover:bg-black/5 rounded-md transition-colors", children: /* @__PURE__ */ jsx("svg", { className: "h-4 w-4", viewBox: "0 0 20 20", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z", clipRule: "evenodd" }) }) })
            ] })
          }
        ) }),
        children
      ] }) })
    ] })
  ] });
}
export {
  AdminLayout as A
};
