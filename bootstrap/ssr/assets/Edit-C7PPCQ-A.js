import { jsxs, jsx } from "react/jsx-runtime";
import { P as PublicLayout } from "./PublicLayout-5WexOK-8.js";
import { Head } from "@inertiajs/react";
import DeleteUserForm from "./DeleteUserForm-DyfxXCWO.js";
import UpdatePasswordForm from "./UpdatePasswordForm-B20XK4bj.js";
import UpdateProfileInformation from "./UpdateProfileInformationForm-Bp9-CMkL.js";
import "react";
import "./SEO-BqzDCEc9.js";
import "./Dropdown-CbnvImCK.js";
import "@headlessui/react";
import "./DangerButton-B7to2Tbx.js";
import "./TextInput-Cpd-jkNw.js";
import "./Modal-B-IxVM06.js";
import "./PrimaryButton-DgVfVBwo.js";
function Edit({
  mustVerifyEmail,
  status
}) {
  return /* @__PURE__ */ jsxs(PublicLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Profile" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-5xl mx-auto px-6 sm:px-8 lg:px-10 py-20", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-12", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-5xl md:text-7xl font-black text-gray-900 tracking-tighter mb-4", children: "Account Settings" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-400 font-bold uppercase tracking-widest text-[10px]", children: "Manage your account details and security preferences." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-12", children: [
        /* @__PURE__ */ jsx("div", { className: "bg-white p-8 md:p-12 shadow-xl rounded-[3rem] border border-gray-100 animate-slideUp", children: /* @__PURE__ */ jsx(
          UpdateProfileInformation,
          {
            mustVerifyEmail,
            status,
            className: "max-w-2xl"
          }
        ) }),
        /* @__PURE__ */ jsx("div", { className: "bg-white p-8 md:p-12 shadow-xl rounded-[3rem] border border-gray-100 animate-slideUp delay-100", children: /* @__PURE__ */ jsx(UpdatePasswordForm, { className: "max-w-2xl" }) }),
        /* @__PURE__ */ jsx("div", { className: "bg-white p-8 md:p-12 shadow-xl rounded-[3rem] border border-gray-100 animate-slideUp delay-200", children: /* @__PURE__ */ jsx(DeleteUserForm, { className: "max-w-2xl" }) })
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
                .delay-100 { animation-delay: 100ms; }
                .delay-200 { animation-delay: 200ms; }
            ` } })
  ] });
}
export {
  Edit as default
};
