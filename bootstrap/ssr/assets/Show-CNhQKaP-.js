import { jsxs, jsx } from "react/jsx-runtime";
import { A as AdminLayout } from "./AdminLayout-pz44TeXA.js";
import { Head, Link } from "@inertiajs/react";
import "react";
import "@headlessui/react";
import "axios";
function Show({ user, activities }) {
  return /* @__PURE__ */ jsxs(AdminLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: `User: ${user.name}` }),
    /* @__PURE__ */ jsx("div", { className: "py-6", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsx("div", { className: "flex items-center mb-4", children: /* @__PURE__ */ jsxs(
          Link,
          {
            href: "/admin/users",
            className: "inline-flex items-center text-sm text-gray-500 hover:text-gray-700",
            children: [
              /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 mr-1", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M10 19l-7-7m0 0l7-7m-7 7h18" }) }),
              "Back to Users"
            ]
          }
        ) }),
        /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-gray-900", children: "User Details" }),
        /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-gray-600", children: "View user information and activity" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white shadow-sm rounded-lg", children: [
        /* @__PURE__ */ jsx("div", { className: "px-4 py-5 sm:px-6 border-b border-gray-200", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
            /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 h-12 w-12", children: /* @__PURE__ */ jsx("div", { className: "h-12 w-12 rounded-full bg-gray-300 flex items-center justify-center", children: /* @__PURE__ */ jsx("span", { className: "text-lg font-medium text-gray-700", children: user.name.charAt(0).toUpperCase() }) }) }),
            /* @__PURE__ */ jsxs("div", { className: "ml-4", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-lg leading-6 font-medium text-gray-900", children: user.name }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500", children: user.email })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
            /* @__PURE__ */ jsx("span", { className: `inline-flex px-3 py-1 text-sm font-semibold rounded-full ${user.is_admin ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`, children: user.is_admin ? "Admin" : "User" }),
            /* @__PURE__ */ jsxs(
              Link,
              {
                href: `/admin/users/${user.id}/edit`,
                className: "inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
                children: [
                  /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 mr-1", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" }) }),
                  "Edit"
                ]
              }
            )
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "px-4 py-5 sm:p-6", children: /* @__PURE__ */ jsxs("dl", { className: "grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2", children: [
          /* @__PURE__ */ jsxs("div", { className: "sm:col-span-1", children: [
            /* @__PURE__ */ jsx("dt", { className: "text-sm font-medium text-gray-500", children: "Full Name" }),
            /* @__PURE__ */ jsx("dd", { className: "mt-1 text-sm text-gray-900", children: user.name })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "sm:col-span-1", children: [
            /* @__PURE__ */ jsx("dt", { className: "text-sm font-medium text-gray-500", children: "Email Address" }),
            /* @__PURE__ */ jsx("dd", { className: "mt-1 text-sm text-gray-900", children: user.email })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "sm:col-span-1", children: [
            /* @__PURE__ */ jsx("dt", { className: "text-sm font-medium text-gray-500", children: "User ID" }),
            /* @__PURE__ */ jsx("dd", { className: "mt-1 text-sm text-gray-900", children: user.id })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "sm:col-span-1", children: [
            /* @__PURE__ */ jsx("dt", { className: "text-sm font-medium text-gray-500", children: "Role" }),
            /* @__PURE__ */ jsx("dd", { className: "mt-1 text-sm text-gray-900", children: /* @__PURE__ */ jsx("span", { className: `inline-flex px-2 py-1 text-xs font-semibold rounded-full ${user.is_admin ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`, children: user.is_admin ? "Administrator" : "Regular User" }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "sm:col-span-1", children: [
            /* @__PURE__ */ jsx("dt", { className: "text-sm font-medium text-gray-500", children: "Account Created" }),
            /* @__PURE__ */ jsxs("dd", { className: "mt-1 text-sm text-gray-900", children: [
              new Date(user.created_at).toLocaleDateString(),
              " at ",
              new Date(user.created_at).toLocaleTimeString()
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "sm:col-span-1", children: [
            /* @__PURE__ */ jsx("dt", { className: "text-sm font-medium text-gray-500", children: "Last Updated" }),
            /* @__PURE__ */ jsxs("dd", { className: "mt-1 text-sm text-gray-900", children: [
              new Date(user.updated_at).toLocaleDateString(),
              " at ",
              new Date(user.updated_at).toLocaleTimeString()
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "sm:col-span-1", children: [
            /* @__PURE__ */ jsx("dt", { className: "text-sm font-medium text-gray-500", children: "Email Verification" }),
            /* @__PURE__ */ jsx("dd", { className: "mt-1 text-sm text-gray-900", children: user.email_verified_at ? /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center text-green-600", children: [
              /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 mr-1", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" }) }),
              "Verified on ",
              new Date(user.email_verified_at).toLocaleDateString()
            ] }) : /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center text-yellow-600", children: [
              /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 mr-1", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z" }) }),
              "Not verified"
            ] }) })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "px-4 py-5 sm:px-6 border-t border-gray-200", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg leading-6 font-medium text-gray-900 mb-4", children: "Recent Activity" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            activities.map((activity) => /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
              /* @__PURE__ */ jsx("div", { className: "flex-shrink-0", children: /* @__PURE__ */ jsx("div", { className: `h-8 w-8 rounded-full flex items-center justify-center ${activity.type === "like" ? "bg-red-100" : "bg-blue-100"}`, children: activity.type === "like" ? /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 text-red-600", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" }) }) : /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 text-blue-600", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" }) }) }) }),
              /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
                /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-900", children: activity.description }),
                /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500", children: activity.created_at })
              ] })
            ] }, activity.id)),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
              /* @__PURE__ */ jsx("div", { className: "flex-shrink-0", children: /* @__PURE__ */ jsx("div", { className: "h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center", children: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 text-blue-600", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" }) }) }) }),
              /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
                /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-900", children: "Account created" }),
                /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-500", children: [
                  new Date(user.created_at).toLocaleDateString(),
                  " at ",
                  new Date(user.created_at).toLocaleTimeString()
                ] })
              ] })
            ] }),
            user.updated_at !== user.created_at && /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
              /* @__PURE__ */ jsx("div", { className: "flex-shrink-0", children: /* @__PURE__ */ jsx("div", { className: "h-8 w-8 rounded-full bg-green-100 flex items-center justify-center", children: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 text-green-600", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" }) }) }) }),
              /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
                /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-900", children: "Profile updated" }),
                /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-500", children: [
                  new Date(user.updated_at).toLocaleDateString(),
                  " at ",
                  new Date(user.updated_at).toLocaleTimeString()
                ] })
              ] })
            ] })
          ] })
        ] })
      ] })
    ] }) })
  ] });
}
export {
  Show as default
};
