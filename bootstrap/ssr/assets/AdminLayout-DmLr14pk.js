import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useRef, useEffect } from "react";
import { Link, usePage } from "@inertiajs/react";
import axios from "axios";
import { Transition } from "@headlessui/react";
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
    /* @__PURE__ */ jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none", children: /* @__PURE__ */ jsx("svg", { className: "h-5 w-5 text-gray-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" }) }) }),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "text",
          className: "block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all",
          placeholder: "Search posts, users, categories...",
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
        enter: "transition ease-out duration-100",
        enterFrom: "transform opacity-0 scale-95",
        enterTo: "transform opacity-100 scale-100",
        leave: "transition ease-in duration-75",
        leaveFrom: "transform opacity-100 scale-100",
        leaveTo: "transform opacity-0 scale-95",
        children: /* @__PURE__ */ jsx("div", { className: "absolute mt-1 w-full bg-white shadow-xl rounded-md border border-gray-200 z-50 max-h-[80vh] overflow-y-auto", children: !hasResults ? /* @__PURE__ */ jsxs("div", { className: "p-4 text-sm text-gray-500 text-center", children: [
          'No results found for "',
          query,
          '"'
        ] }) : /* @__PURE__ */ jsxs("div", { className: "p-2 space-y-4", children: [
          results.posts.length > 0 && /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "px-3 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wider", children: "Posts" }),
            /* @__PURE__ */ jsx("ul", { className: "mt-1 space-y-1", children: results.posts.map((post) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
              Link,
              {
                href: `/admin/posts/${post.id}/edit`,
                onClick: () => setIsOpen(false),
                className: "block px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-md transition-colors",
                children: post.title
              }
            ) }, post.id)) })
          ] }),
          results.users.length > 0 && /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "px-3 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wider", children: "Users" }),
            /* @__PURE__ */ jsx("ul", { className: "mt-1 space-y-1", children: results.users.map((user) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
              Link,
              {
                href: `/admin/users/${user.id}/edit`,
                onClick: () => setIsOpen(false),
                className: "block px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-md transition-colors",
                children: [
                  /* @__PURE__ */ jsx("div", { className: "font-medium", children: user.name }),
                  /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-500", children: user.email })
                ]
              }
            ) }, user.id)) })
          ] }),
          results.categories.length > 0 && /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "px-3 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wider", children: "Categories" }),
            /* @__PURE__ */ jsx("ul", { className: "mt-1 space-y-1", children: results.categories.map((category) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
              Link,
              {
                href: `/admin/categories/${category.id}/edit`,
                onClick: () => setIsOpen(false),
                className: "block px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-md transition-colors",
                children: category.name
              }
            ) }, category.id)) })
          ] }),
          results.tags.length > 0 && /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "px-3 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wider", children: "Tags" }),
            /* @__PURE__ */ jsx("div", { className: "mt-1 flex flex-wrap gap-1 px-3", children: results.tags.map((tag) => /* @__PURE__ */ jsx(
              Link,
              {
                href: `/admin/tags/${tag.id}/edit`,
                onClick: () => setIsOpen(false),
                className: "inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800 hover:bg-blue-100 hover:text-blue-800 transition-colors",
                children: tag.name
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
      name: "Reports",
      href: "#",
      icon: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" }) }),
      current: false
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
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gray-100", children: [
    /* @__PURE__ */ jsxs("div", { className: `fixed inset-0 z-50 lg:hidden ${sidebarOpen ? "block" : "hidden"}`, children: [
      /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-gray-600 bg-opacity-75", onClick: () => setSidebarOpen(false) }),
      /* @__PURE__ */ jsxs("div", { className: "relative flex-1 flex flex-col max-w-xs w-full bg-white", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 -mr-12 pt-2", children: /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            className: "ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white",
            onClick: () => setSidebarOpen(false),
            children: [
              /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close sidebar" }),
              /* @__PURE__ */ jsx("svg", { className: "h-6 w-6 text-white", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M6 18L18 6M6 6l12 12" }) })
            ]
          }
        ) }),
        /* @__PURE__ */ jsxs("div", { className: "flex-1 h-0 pt-5 pb-4 overflow-y-auto", children: [
          /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 flex items-center px-4", children: /* @__PURE__ */ jsx("h1", { className: "text-xl font-bold text-gray-900", children: "Admin Panel" }) }),
          /* @__PURE__ */ jsx("nav", { className: "mt-5 px-2 space-y-1", children: navigation.map((item) => /* @__PURE__ */ jsxs(
            Link,
            {
              href: item.href,
              className: `group flex items-center px-2 py-2 text-sm font-medium rounded-md ${item.current ? "bg-blue-100 text-blue-900" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}`,
              children: [
                item.icon,
                /* @__PURE__ */ jsx("span", { className: "ml-3", children: item.name })
              ]
            },
            item.name
          )) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col flex-grow bg-white border-r border-gray-200 pt-5 pb-4 overflow-y-auto", children: [
      /* @__PURE__ */ jsx("div", { className: "flex items-center flex-shrink-0 px-4", children: /* @__PURE__ */ jsx("h1", { className: "text-xl font-bold text-gray-900", children: "Admin Panel" }) }),
      /* @__PURE__ */ jsx("nav", { className: "mt-5 flex-1 px-2 space-y-1", children: navigation.map((item) => /* @__PURE__ */ jsxs(
        Link,
        {
          href: item.href,
          className: `group flex items-center px-2 py-2 text-sm font-medium rounded-md ${item.current ? "bg-blue-100 text-blue-900" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}`,
          children: [
            item.icon,
            /* @__PURE__ */ jsx("span", { className: "ml-3", children: item.name })
          ]
        },
        item.name
      )) })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "lg:pl-64 flex flex-col flex-1", children: [
      /* @__PURE__ */ jsx("div", { className: "lg:hidden", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between bg-white px-4 py-3 border-b border-gray-200", children: [
        /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            className: "-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500",
            onClick: () => setSidebarOpen(true),
            children: [
              /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Open sidebar" }),
              /* @__PURE__ */ jsx("svg", { className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M4 6h16M4 12h16M4 18h16" }) })
            ]
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "flex-1 mx-2 sm:mx-4", children: /* @__PURE__ */ jsx(GlobalSearch, {}) })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "hidden lg:block bg-white border-b border-gray-200", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center px-6 py-4", children: [
        /* @__PURE__ */ jsx("div", { className: "flex-1", children: /* @__PURE__ */ jsx(GlobalSearch, {}) }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
            /* @__PURE__ */ jsx("div", { className: "h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden", children: user.avatar ? /* @__PURE__ */ jsx("img", { src: user.avatar, alt: user.name, className: "h-full w-full object-cover" }) : /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-gray-700", children: user.name.charAt(0).toUpperCase() }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("div", { className: "text-sm font-medium text-gray-900", children: user.name }),
              /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-500", children: "Administrator" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs(
            Link,
            {
              href: "/dashboard",
              className: "inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
              children: [
                /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 mr-1", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" }) }),
                "App"
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            Link,
            {
              href: route("logout"),
              method: "post",
              as: "button",
              className: "inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500",
              children: [
                /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 mr-1", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" }) }),
                "Logout"
              ]
            }
          )
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs("main", { className: "flex-1", children: [
        showFlash && flashMessage && /* @__PURE__ */ jsx("div", { className: "fixed top-4 right-4 z-50 max-w-sm w-full", children: /* @__PURE__ */ jsx(
          "div",
          {
            className: `rounded-md p-4 ${flashMessage.type === "success" ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}`,
            children: /* @__PURE__ */ jsxs("div", { className: "flex", children: [
              /* @__PURE__ */ jsx("div", { className: "flex-shrink-0", children: flashMessage.type === "success" ? /* @__PURE__ */ jsx("svg", { className: "h-5 w-5 text-green-400", viewBox: "0 0 20 20", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z", clipRule: "evenodd" }) }) : /* @__PURE__ */ jsx("svg", { className: "h-5 w-5 text-red-400", viewBox: "0 0 20 20", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z", clipRule: "evenodd" }) }) }),
              /* @__PURE__ */ jsxs("div", { className: "ml-3", children: [
                /* @__PURE__ */ jsx(
                  "p",
                  {
                    className: `text-sm font-medium ${flashMessage.type === "success" ? "text-green-800" : "text-red-800"}`,
                    children: flashMessage.type === "success" ? "Success" : "Error"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "p",
                  {
                    className: `mt-1 text-sm ${flashMessage.type === "success" ? "text-green-700" : "text-red-700"}`,
                    children: flashMessage.message
                  }
                )
              ] }),
              /* @__PURE__ */ jsx("div", { className: "ml-auto pl-3", children: /* @__PURE__ */ jsx("div", { className: "-mx-1.5 -my-1.5", children: /* @__PURE__ */ jsxs(
                "button",
                {
                  onClick: dismissFlash,
                  className: `inline-flex rounded-md p-1.5 ${flashMessage.type === "success" ? "text-green-500 hover:bg-green-100" : "text-red-500 hover:bg-red-100"}`,
                  children: [
                    /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Dismiss" }),
                    /* @__PURE__ */ jsx("svg", { className: "h-5 w-5", viewBox: "0 0 20 20", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z", clipRule: "evenodd" }) })
                  ]
                }
              ) }) })
            ] })
          }
        ) }),
        children
      ] })
    ] })
  ] });
}
export {
  AdminLayout as A
};
