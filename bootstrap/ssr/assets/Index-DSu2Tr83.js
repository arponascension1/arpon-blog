import { jsxs, jsx } from "react/jsx-runtime";
import React, { useState, useEffect } from "react";
import { usePage, router, Head, Link } from "@inertiajs/react";
import { A as AdminLayout } from "./AdminLayout-DmLr14pk.js";
import { P as Pagination, C as ConfirmationModal } from "./ConfirmationModal-DilHsETS.js";
import "axios";
import "@headlessui/react";
import "./Modal-B-IxVM06.js";
import "./DangerButton-B7to2Tbx.js";
function Index({ users, filters, sort }) {
  const { props } = usePage();
  const [userToDelete, setUserToDelete] = useState(null);
  const [userToToggleAdmin, setUserToToggleAdmin] = useState(null);
  const [processingAction, setProcessingAction] = useState(false);
  const [searchTerm, setSearchTerm] = useState(filters.search || "");
  const [roleFilter, setRoleFilter] = useState(filters.role || "");
  const [currentSort, setCurrentSort] = useState({
    field: sort?.field || "created_at",
    direction: sort?.direction || "desc"
  });
  const isFirstRender = React.useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const timeoutId = setTimeout(() => {
      if (searchTerm === (filters.search || "") && roleFilter === (filters.role || "") && currentSort.field === (sort?.field || "created_at") && currentSort.direction === (sort?.direction || "desc")) {
        return;
      }
      const params = {
        search: searchTerm || void 0,
        role: roleFilter || void 0
      };
      if (currentSort.field !== "created_at" || currentSort.direction !== "desc") {
        params.sort = currentSort.field;
        params.direction = currentSort.direction;
      }
      router.get("/admin/users", params, {
        preserveState: true,
        replace: true
      });
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [searchTerm, roleFilter, currentSort]);
  useEffect(() => {
    setSearchTerm(filters.search || "");
    setRoleFilter(filters.role || "");
    if (sort?.field && sort?.direction) {
      setCurrentSort({
        field: sort.field,
        direction: sort.direction
      });
    }
  }, [filters.search, filters.role, sort?.field, sort?.direction]);
  const confirmDeleteUser = (user) => {
    setUserToDelete(user);
  };
  const deleteUser = () => {
    if (!userToDelete) return;
    setProcessingAction(true);
    router.delete(`/admin/users/${userToDelete.id}`, {
      onFinish: () => {
        setProcessingAction(false);
        setUserToDelete(null);
      }
    });
  };
  const confirmToggleAdmin = (user) => {
    setUserToToggleAdmin(user);
  };
  const toggleAdmin = () => {
    if (!userToToggleAdmin) return;
    setProcessingAction(true);
    router.patch(
      `/admin/users/${userToToggleAdmin.id}/toggle-admin`,
      {},
      {
        onFinish: () => {
          setProcessingAction(false);
          setUserToToggleAdmin(null);
        }
      }
    );
  };
  const clearFilters = () => {
    setSearchTerm("");
    setRoleFilter("");
    setCurrentSort({
      field: "created_at",
      direction: "desc"
    });
  };
  const handleSort = (field) => {
    if (currentSort.field === field) {
      setCurrentSort({
        field,
        direction: currentSort.direction === "asc" ? "desc" : "asc"
      });
    } else {
      setCurrentSort({
        field,
        direction: "desc"
      });
    }
  };
  const getSortIcon = (field) => {
    if (currentSort.field !== field) {
      return /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 text-gray-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4 4" }) });
    }
    return currentSort.direction === "asc" ? /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 text-blue-600", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M5 15l7-7 7 7" }) }) : /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 text-blue-600", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M19 9l-7 7-7-7" }) });
  };
  return /* @__PURE__ */ jsxs(AdminLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Manage Users" }),
    /* @__PURE__ */ jsx("div", { className: "py-6", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8 flex justify-between items-center", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-gray-900", children: "Users" }),
          /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-gray-600", children: "Manage user accounts and permissions" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex space-x-3", children: [
          /* @__PURE__ */ jsxs(
            Link,
            {
              href: "/admin/users/create",
              className: "inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
              children: [
                /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 mr-2", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M12 6v6m0 0v6m0-6h6m-6 0H6" }) }),
                "Add User"
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            Link,
            {
              href: "/admin/dashboard",
              className: "inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
              children: [
                /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 mr-2", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M10 19l-7-7m0 0l7-7m-7 7h18" }) }),
                "Back to Dashboard"
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "bg-white shadow-sm rounded-lg mb-6", children: /* @__PURE__ */ jsxs("div", { className: "px-4 py-5 sm:p-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-4", children: [
          /* @__PURE__ */ jsx("div", { className: "flex-1", children: /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              placeholder: "Search users...",
              value: searchTerm,
              onChange: (e) => setSearchTerm(e.target.value),
              className: "block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            }
          ) }),
          /* @__PURE__ */ jsx("div", { className: "sm:w-48", children: /* @__PURE__ */ jsxs(
            "select",
            {
              value: roleFilter,
              onChange: (e) => setRoleFilter(e.target.value),
              className: "block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm",
              children: [
                /* @__PURE__ */ jsx("option", { value: "", children: "All Roles" }),
                /* @__PURE__ */ jsx("option", { value: "admin", children: "Admin" }),
                /* @__PURE__ */ jsx("option", { value: "user", children: "User" })
              ]
            }
          ) }),
          (searchTerm || roleFilter || (currentSort.field !== "created_at" || currentSort.direction !== "desc")) && /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: clearFilters,
              className: "inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
              children: "Clear Filters"
            }
          )
        ] }),
        (searchTerm || roleFilter || (currentSort.field !== "created_at" || currentSort.direction !== "desc")) && /* @__PURE__ */ jsxs("div", { className: "mt-3 text-sm text-gray-600", children: [
          "Active filters:",
          searchTerm && /* @__PURE__ */ jsxs("span", { className: "ml-2 font-medium", children: [
            'Search: "',
            searchTerm,
            '"'
          ] }),
          roleFilter && /* @__PURE__ */ jsxs("span", { className: "ml-2 font-medium", children: [
            "Role: ",
            roleFilter
          ] }),
          (currentSort.field !== "created_at" || currentSort.direction !== "desc") && /* @__PURE__ */ jsxs("span", { className: "ml-2 font-medium", children: [
            "Sort: ",
            currentSort.field,
            " (",
            currentSort.direction === "asc" ? "↑" : "↓",
            ")"
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white shadow-sm rounded-lg", children: [
        /* @__PURE__ */ jsx("div", { className: "px-4 py-5 sm:px-6 border-b border-gray-200", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg leading-6 font-medium text-gray-900", children: "All Users" }),
            /* @__PURE__ */ jsx("p", { className: "mt-1 max-w-2xl text-sm text-gray-500", children: "A list of all users in your application including their name, email, role and registration date." })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex items-center space-x-2", children: /* @__PURE__ */ jsxs("span", { className: "text-sm text-gray-500", children: [
            users.total,
            " total users"
          ] }) })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "min-w-full divide-y divide-gray-200", children: [
          /* @__PURE__ */ jsx("thead", { className: "bg-gray-50", children: /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx(
              "th",
              {
                scope: "col",
                className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100",
                onClick: () => handleSort("name"),
                children: /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-1", children: [
                  /* @__PURE__ */ jsx("span", { children: "User" }),
                  getSortIcon("name")
                ] })
              }
            ),
            /* @__PURE__ */ jsx("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Email" }),
            /* @__PURE__ */ jsx("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Role" }),
            /* @__PURE__ */ jsx(
              "th",
              {
                scope: "col",
                className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100",
                onClick: () => handleSort("created_at"),
                children: /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-1", children: [
                  /* @__PURE__ */ jsx("span", { children: "Joined" }),
                  getSortIcon("created_at")
                ] })
              }
            ),
            /* @__PURE__ */ jsx("th", { scope: "col", className: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Actions" })
          ] }) }),
          /* @__PURE__ */ jsx("tbody", { className: "bg-white divide-y divide-gray-200", children: users.data.map((user) => /* @__PURE__ */ jsxs("tr", { className: "hover:bg-gray-50", children: [
            /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
              /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 h-10 w-10", children: /* @__PURE__ */ jsx("div", { className: "h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden", children: user.avatar ? /* @__PURE__ */ jsx("img", { src: user.avatar, alt: user.name, className: "h-full w-full object-cover" }) : /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-gray-700", children: user.name.charAt(0).toUpperCase() }) }) }),
              /* @__PURE__ */ jsxs("div", { className: "ml-4", children: [
                /* @__PURE__ */ jsx("div", { className: "text-sm font-medium text-gray-900", children: user.name }),
                /* @__PURE__ */ jsxs("div", { className: "text-sm text-gray-500", children: [
                  "ID: ",
                  user.id
                ] })
              ] })
            ] }) }),
            /* @__PURE__ */ jsxs("td", { className: "px-6 py-4 whitespace-nowrap", children: [
              /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-900", children: user.email }),
              user.email_verified_at && /* @__PURE__ */ jsx("div", { className: "text-xs text-green-600", children: "Verified" })
            ] }),
            /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ jsx("span", { className: `inline-flex px-2 py-1 text-xs font-semibold rounded-full ${user.is_admin ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`, children: user.is_admin ? "Admin" : "User" }) }),
            /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: new Date(user.created_at).toLocaleDateString() }),
            /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap text-right text-sm font-medium", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end space-x-2", children: [
              /* @__PURE__ */ jsx(
                Link,
                {
                  href: `/admin/users/${user.id}`,
                  className: "text-blue-600 hover:text-blue-900",
                  children: "View"
                }
              ),
              /* @__PURE__ */ jsx(
                Link,
                {
                  href: `/admin/users/${user.id}/edit`,
                  className: "text-indigo-600 hover:text-indigo-900",
                  children: "Edit"
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => confirmToggleAdmin(user),
                  className: `inline-flex items-center px-2 py-1 rounded-md text-xs font-medium transition-colors ${user.is_admin ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200" : "bg-green-100 text-green-700 hover:bg-green-200"}`,
                  children: user.is_admin ? "Remove Admin" : "Make Admin"
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => confirmDeleteUser(user),
                  className: "text-red-600 hover:text-red-900",
                  children: "Delete"
                }
              )
            ] }) })
          ] }, user.id)) })
        ] }) }),
        /* @__PURE__ */ jsx(
          Pagination,
          {
            links: users.links,
            current_page: users.current_page,
            last_page: users.last_page,
            from: users.from,
            to: users.to,
            total: users.total
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(
      ConfirmationModal,
      {
        show: !!userToDelete,
        title: "Delete User",
        message: `Are you sure you want to delete ${userToDelete?.name}? This action cannot be undone.`,
        onConfirm: deleteUser,
        onClose: () => setUserToDelete(null),
        processing: processingAction
      }
    ),
    /* @__PURE__ */ jsx(
      ConfirmationModal,
      {
        show: !!userToToggleAdmin,
        title: userToToggleAdmin?.is_admin ? "Remove Admin Privileges" : "Grant Admin Privileges",
        message: `Are you sure you want to ${userToToggleAdmin?.is_admin ? "remove admin privileges from" : "grant admin privileges to"} ${userToToggleAdmin?.name}?`,
        confirmText: userToToggleAdmin?.is_admin ? "Remove Admin" : "Make Admin",
        onConfirm: toggleAdmin,
        onClose: () => setUserToToggleAdmin(null),
        processing: processingAction
      }
    )
  ] });
}
export {
  Index as default
};
