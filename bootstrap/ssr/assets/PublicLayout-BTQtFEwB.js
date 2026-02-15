import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { usePage, Link, router } from "@inertiajs/react";
import { S as SEO } from "./SEO-BqzDCEc9.js";
import { D as Dropdown } from "./Dropdown-CbnvImCK.js";
function PublicLayout({ children }) {
  const { auth, settings } = usePage().props;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const siteName = settings?.site_name || "Arpon Blog";
  const siteLogo = settings?.site_logo;
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const handleSearch = (e) => {
    e.preventDefault();
    router.get(route("blog.search"), { search: searchQuery });
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-[#fafafa] flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900", children: [
    /* @__PURE__ */ jsx(SEO, {}),
    /* @__PURE__ */ jsxs("nav", { className: `fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-white/80 backdrop-blur-md border-b border-gray-100 py-3 shadow-sm" : "bg-transparent py-5"}`, children: [
      /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-6 sm:px-8 lg:px-10", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-8", children: [
          /* @__PURE__ */ jsxs(Link, { href: "/", className: "flex items-center group", children: [
            siteLogo ? /* @__PURE__ */ jsx("img", { src: siteLogo, alt: siteName, className: "h-9 w-auto mr-3 transition-transform group-hover:scale-105" }) : /* @__PURE__ */ jsx("div", { className: "h-10 w-10 bg-black rounded-xl flex items-center justify-center text-white font-bold mr-3 shadow-lg group-hover:bg-blue-600 transition-colors", children: siteName.charAt(0) }),
            /* @__PURE__ */ jsx("span", { className: "text-xl font-extrabold tracking-tight text-gray-900", children: siteName })
          ] }),
          /* @__PURE__ */ jsxs("form", { onSubmit: handleSearch, className: "hidden lg:block relative group", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                placeholder: "Search stories...",
                value: searchQuery,
                onChange: (e) => setSearchQuery(e.target.value),
                className: "pl-10 pr-4 py-2 bg-gray-100/50 border-none rounded-full text-xs font-bold focus:bg-white focus:ring-2 focus:ring-black transition-all w-64"
              }
            ),
            /* @__PURE__ */ jsx("svg", { className: "absolute left-3 top-2.5 h-4 w-4 text-gray-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2.5", d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "hidden md:flex items-center space-x-10", children: [
          /* @__PURE__ */ jsxs("nav", { className: "flex space-x-8", children: [
            /* @__PURE__ */ jsxs(Link, { href: "/", className: "text-sm font-semibold text-gray-600 hover:text-black transition-colors relative group", children: [
              "Home",
              /* @__PURE__ */ jsx("span", { className: "absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all group-hover:w-full" })
            ] }),
            /* @__PURE__ */ jsxs(Link, { href: route("blog.articles"), className: "text-sm font-semibold text-gray-600 hover:text-black transition-colors relative group", children: [
              "Articles",
              /* @__PURE__ */ jsx("span", { className: "absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all group-hover:w-full" })
            ] }),
            /* @__PURE__ */ jsxs(Link, { href: "#", className: "text-sm font-semibold text-gray-600 hover:text-black transition-colors relative group", children: [
              "About",
              /* @__PURE__ */ jsx("span", { className: "absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all group-hover:w-full" })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex items-center space-x-5 pl-8 border-l border-gray-200", children: auth.user ? /* @__PURE__ */ jsxs(Dropdown, { children: [
            /* @__PURE__ */ jsx(Dropdown.Trigger, { children: /* @__PURE__ */ jsxs("button", { className: "flex items-center space-x-3 group focus:outline-none", children: [
              /* @__PURE__ */ jsxs("div", { className: "text-right hidden sm:block", children: [
                /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors", children: auth.user.name }),
                auth.user.is_admin && /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black uppercase tracking-widest text-blue-600", children: "Admin" })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "h-10 w-10 rounded-full border-2 border-transparent group-hover:border-blue-600 transition-all overflow-hidden bg-gray-100 shadow-sm", children: auth.user.avatar ? /* @__PURE__ */ jsx("img", { src: auth.user.avatar, alt: auth.user.name, className: "h-full w-full object-cover" }) : /* @__PURE__ */ jsx("div", { className: "h-full w-full flex items-center justify-center bg-blue-50 text-blue-600 font-bold text-sm", children: auth.user.name.charAt(0) }) })
            ] }) }),
            /* @__PURE__ */ jsxs(Dropdown.Content, { width: "48", children: [
              auth.user.is_admin && /* @__PURE__ */ jsx(Dropdown.Link, { href: "/admin/dashboard", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
                /* @__PURE__ */ jsxs("svg", { className: "w-4 h-4 mr-2", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: [
                  /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" }),
                  /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z" })
                ] }),
                "Admin Panel"
              ] }) }),
              /* @__PURE__ */ jsx(Dropdown.Link, { href: route("dashboard"), children: /* @__PURE__ */ jsxs("div", { className: "flex items-center font-semibold", children: [
                /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 mr-2", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" }) }),
                "Dashboard"
              ] }) }),
              /* @__PURE__ */ jsx(Dropdown.Link, { href: route("profile.edit"), children: /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
                /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 mr-2", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" }) }),
                "Profile"
              ] }) }),
              /* @__PURE__ */ jsx("div", { className: "border-t border-gray-100 my-1" }),
              /* @__PURE__ */ jsx(Dropdown.Link, { href: route("logout"), method: "post", as: "button", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center text-red-600", children: [
                /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 mr-2", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" }) }),
                "Log Out"
              ] }) })
            ] })
          ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(Link, { href: route("login"), className: "text-sm font-bold text-gray-900 hover:text-blue-600 transition-colors", children: "Login" }),
            /* @__PURE__ */ jsx(
              Link,
              {
                href: route("register"),
                className: "px-6 py-2.5 bg-black text-white text-sm font-bold rounded-full hover:bg-gray-800 transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0",
                children: "Get Started"
              }
            )
          ] }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "md:hidden flex items-center space-x-4", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setIsMenuOpen(true),
              className: "p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors",
              children: /* @__PURE__ */ jsx("svg", { className: "h-6 w-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" }) })
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setIsMenuOpen(!isMenuOpen),
              className: "p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors",
              children: /* @__PURE__ */ jsx("svg", { className: "h-6 w-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: isMenuOpen ? /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M6 18L18 6M6 6l12 12" }) : /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M4 6h16M4 12h16M4 18h16" }) })
            }
          )
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: `md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-100 transition-all duration-300 ease-in-out ${isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"}`, children: /* @__PURE__ */ jsxs("div", { className: "px-6 py-8 space-y-6", children: [
        /* @__PURE__ */ jsxs("form", { onSubmit: handleSearch, className: "relative group mb-8", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              placeholder: "Search stories...",
              value: searchQuery,
              onChange: (e) => setSearchQuery(e.target.value),
              className: "w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-black transition-all"
            }
          ),
          /* @__PURE__ */ jsx("svg", { className: "absolute left-4 top-4 h-6 w-6 text-gray-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2.5", d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" }) })
        ] }),
        /* @__PURE__ */ jsx(Link, { href: "/", className: "block text-lg font-bold text-gray-900", children: "Home" }),
        /* @__PURE__ */ jsx(Link, { href: route("blog.articles"), className: "block text-lg font-bold text-gray-900", children: "Articles" }),
        /* @__PURE__ */ jsx(Link, { href: "#", className: "block text-lg font-bold text-gray-900", children: "About" }),
        /* @__PURE__ */ jsx("div", { className: "pt-6 border-t border-gray-100 flex flex-col space-y-4", children: auth.user ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4 mb-4", children: [
            /* @__PURE__ */ jsx("div", { className: "h-12 w-12 rounded-full overflow-hidden bg-gray-100", children: auth.user.avatar ? /* @__PURE__ */ jsx("img", { src: auth.user.avatar, alt: auth.user.name, className: "h-full w-full object-cover" }) : /* @__PURE__ */ jsx("div", { className: "h-full w-full flex items-center justify-center bg-blue-50 text-blue-600 font-bold", children: auth.user.name.charAt(0) }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "font-bold text-gray-900", children: auth.user.name }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500", children: auth.user.email })
            ] })
          ] }),
          auth.user.is_admin && /* @__PURE__ */ jsx(Link, { href: "/admin/dashboard", className: "text-lg font-bold text-blue-600", children: "Admin Panel" }),
          /* @__PURE__ */ jsx(Link, { href: route("dashboard"), className: "text-lg font-bold text-gray-900", children: "Dashboard" }),
          /* @__PURE__ */ jsx(Link, { href: route("profile.edit"), className: "text-lg font-bold text-gray-900", children: "Profile" }),
          /* @__PURE__ */ jsx(Link, { href: route("logout"), method: "post", as: "button", className: "text-lg font-bold text-red-600 text-left", children: "Log Out" })
        ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(Link, { href: route("login"), className: "text-lg font-bold text-gray-900", children: "Login" }),
          /* @__PURE__ */ jsx(Link, { href: route("register"), className: "text-lg font-bold text-blue-600", children: "Register" })
        ] }) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx("main", { className: "flex-grow pt-24", children }),
    /* @__PURE__ */ jsx("footer", { className: "bg-white border-t border-gray-100 pt-24 pb-12", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-6 sm:px-8 lg:px-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-12 gap-16 mb-20", children: [
        /* @__PURE__ */ jsxs("div", { className: "md:col-span-5", children: [
          /* @__PURE__ */ jsx(Link, { href: "/", className: "flex items-center mb-6", children: /* @__PURE__ */ jsx("span", { className: "text-2xl font-black tracking-tighter text-gray-900", children: siteName }) }),
          /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-500 max-w-sm leading-relaxed mb-8", children: settings?.app_description || "High-quality insights for modern thinkers and builders. Stay curious." }),
          /* @__PURE__ */ jsxs("div", { className: "flex space-x-5", children: [
            settings?.facebook_url && /* @__PURE__ */ jsx("a", { href: settings.facebook_url, className: "h-10 w-10 flex items-center justify-center rounded-full bg-gray-50 text-gray-400 hover:bg-blue-50 hover:text-blue-600 transition-all", children: /* @__PURE__ */ jsx("i", { className: "fab fa-facebook-f" }) }),
            settings?.twitter_url && /* @__PURE__ */ jsx("a", { href: settings.twitter_url, className: "h-10 w-10 flex items-center justify-center rounded-full bg-gray-50 text-gray-400 hover:bg-blue-50 hover:text-blue-400 transition-all", children: /* @__PURE__ */ jsx("i", { className: "fab fa-twitter" }) }),
            settings?.instagram_url && /* @__PURE__ */ jsx("a", { href: settings.instagram_url, className: "h-10 w-10 flex items-center justify-center rounded-full bg-gray-50 text-gray-400 hover:bg-pink-50 hover:text-pink-600 transition-all", children: /* @__PURE__ */ jsx("i", { className: "fab fa-instagram" }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "md:col-span-2", children: [
          /* @__PURE__ */ jsx("h4", { className: "text-xs font-black text-gray-900 uppercase tracking-widest mb-8", children: "Magazine" }),
          /* @__PURE__ */ jsxs("ul", { className: "space-y-4", children: [
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { href: "/", className: "text-gray-500 hover:text-black transition-colors font-medium", children: "Stories" }) }),
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { href: "#", className: "text-gray-500 hover:text-black transition-colors font-medium", children: "Archive" }) }),
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { href: "#", className: "text-gray-500 hover:text-black transition-colors font-medium", children: "Topics" }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "md:col-span-2", children: [
          /* @__PURE__ */ jsx("h4", { className: "text-xs font-black text-gray-900 uppercase tracking-widest mb-8", children: "Company" }),
          /* @__PURE__ */ jsxs("ul", { className: "space-y-4", children: [
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { href: "#", className: "text-gray-500 hover:text-black transition-colors font-medium", children: "Our Story" }) }),
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { href: "#", className: "text-gray-500 hover:text-black transition-colors font-medium", children: "Manifesto" }) }),
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { href: "#", className: "text-gray-500 hover:text-black transition-colors font-medium", children: "Careers" }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "md:col-span-3", children: [
          /* @__PURE__ */ jsx("h4", { className: "text-xs font-black text-gray-900 uppercase tracking-widest mb-8", children: "Stay Updated" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 mb-6", children: "Receive our best stories in your inbox every week." }),
          /* @__PURE__ */ jsxs("div", { className: "flex", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "email",
                placeholder: "Email address",
                className: "w-full px-4 py-3 rounded-l-xl bg-gray-50 border-none focus:ring-2 focus:ring-black text-sm"
              }
            ),
            /* @__PURE__ */ jsx("button", { className: "px-4 py-3 bg-black text-white rounded-r-xl hover:bg-gray-800 transition-colors", children: /* @__PURE__ */ jsx("svg", { className: "h-5 w-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M14 5l7 7m0 0l-7 7m7-7H3" }) }) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "pt-12 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400 font-bold uppercase tracking-widest", children: [
        /* @__PURE__ */ jsxs("p", { children: [
          "© ",
          (/* @__PURE__ */ new Date()).getFullYear(),
          " ",
          siteName,
          ". All rights reserved."
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex space-x-10 mt-6 md:mt-0", children: [
          /* @__PURE__ */ jsx(Link, { href: "#", className: "hover:text-black transition-colors", children: "Privacy" }),
          /* @__PURE__ */ jsx(Link, { href: "#", className: "hover:text-black transition-colors", children: "Terms" }),
          /* @__PURE__ */ jsx(Link, { href: "#", className: "hover:text-black transition-colors", children: "Cookies" })
        ] })
      ] })
    ] }) })
  ] });
}
export {
  PublicLayout as P
};
