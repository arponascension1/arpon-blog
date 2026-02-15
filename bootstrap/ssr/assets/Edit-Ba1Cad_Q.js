import { jsxs, jsx } from "react/jsx-runtime";
import { A as AdminLayout } from "./AdminLayout-DmLr14pk.js";
import { useForm, Head, Link } from "@inertiajs/react";
import { M as MediaPicker } from "./MediaPicker-B2RzXcBl.js";
import "react";
import "axios";
import "@headlessui/react";
import "./Modal-B-IxVM06.js";
import "./PrimaryButton-DgVfVBwo.js";
import "./Dropdown-CbnvImCK.js";
function Edit({ user }) {
  const { data, setData, patch, processing, errors } = useForm({
    name: user.name,
    email: user.email,
    avatar: user.avatar || "",
    password: "",
    password_confirmation: "",
    is_admin: user.is_admin
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    patch(route("admin.users.update", user.id), {
      onSuccess: () => {
        setData("password", "");
        setData("password_confirmation", "");
      }
    });
  };
  return /* @__PURE__ */ jsxs(AdminLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Edit User" }),
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
        /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-gray-900", children: "Edit User" }),
        /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-gray-600", children: "Update user information and permissions" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "bg-white shadow-sm rounded-lg", children: /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "p-6 space-y-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "sm:w-1/3", children: [
            /* @__PURE__ */ jsx(
              MediaPicker,
              {
                label: "Profile Picture",
                currentValue: data.avatar,
                onSelect: (url) => setData("avatar", url)
              }
            ),
            errors.avatar && /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-red-600", children: errors.avatar })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "sm:w-2/3 space-y-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-6 sm:grid-cols-2", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { htmlFor: "name", className: "block text-sm font-medium text-gray-700", children: "Name" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    id: "name",
                    value: data.name,
                    onChange: (e) => setData("name", e.target.value),
                    className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm",
                    required: true
                  }
                ),
                errors.name && /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-red-600", children: errors.name })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { htmlFor: "email", className: "block text-sm font-medium text-gray-700", children: "Email" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "email",
                    id: "email",
                    value: data.email,
                    onChange: (e) => setData("email", e.target.value),
                    className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm",
                    required: true
                  }
                ),
                errors.email && /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-red-600", children: errors.email })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-6 sm:grid-cols-2", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { htmlFor: "password", className: "block text-sm font-medium text-gray-700", children: "New Password" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "password",
                    id: "password",
                    value: data.password,
                    onChange: (e) => setData("password", e.target.value),
                    className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm",
                    placeholder: "Leave empty to keep current password"
                  }
                ),
                errors.password && /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-red-600", children: errors.password })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { htmlFor: "password_confirmation", className: "block text-sm font-medium text-gray-700", children: "Confirm New Password" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "password",
                    id: "password_confirmation",
                    value: data.password_confirmation,
                    onChange: (e) => setData("password_confirmation", e.target.value),
                    className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm",
                    placeholder: "Leave empty to keep current password"
                  }
                ),
                errors.password_confirmation && /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-red-600", children: errors.password_confirmation })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "checkbox",
                  id: "is_admin",
                  checked: data.is_admin,
                  onChange: (e) => setData("is_admin", e.target.checked),
                  className: "h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                }
              ),
              /* @__PURE__ */ jsx("label", { htmlFor: "is_admin", className: "ml-2 block text-sm text-gray-900", children: "Grant admin privileges" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 p-4 rounded-md", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-sm font-medium text-gray-900 mb-2", children: "User Information" }),
          /* @__PURE__ */ jsxs("dl", { className: "grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2 text-sm", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("dt", { className: "font-medium text-gray-500", children: "User ID" }),
              /* @__PURE__ */ jsx("dd", { className: "text-gray-900", children: user.id })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("dt", { className: "font-medium text-gray-500", children: "Joined" }),
              /* @__PURE__ */ jsx("dd", { className: "text-gray-900", children: new Date(user.created_at).toLocaleDateString() })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("dt", { className: "font-medium text-gray-500", children: "Email Verified" }),
              /* @__PURE__ */ jsx("dd", { className: "text-gray-900", children: user.email_verified_at ? "Yes" : "No" })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("dt", { className: "font-medium text-gray-500", children: "Last Updated" }),
              /* @__PURE__ */ jsx("dd", { className: "text-gray-900", children: new Date(user.updated_at).toLocaleDateString() })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-end space-x-3 pt-4 border-t border-gray-200", children: [
          /* @__PURE__ */ jsx(
            Link,
            {
              href: "/admin/users",
              className: "px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "submit",
              disabled: processing,
              className: "px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50",
              children: processing ? "Updating..." : "Update User"
            }
          )
        ] })
      ] }) })
    ] }) })
  ] });
}
export {
  Edit as default
};
