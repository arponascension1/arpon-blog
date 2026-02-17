import { jsxs, jsx } from "react/jsx-runtime";
import { a as InputLabel, T as TextInput, I as InputError } from "./TextInput-Cpd-jkNw.js";
import { P as PublicLayout } from "./PublicLayout-5WexOK-8.js";
import { useForm, Head, Link } from "@inertiajs/react";
import "react";
import "./SEO-BqzDCEc9.js";
import "./Dropdown-CbnvImCK.js";
import "@headlessui/react";
function ForgotPassword({ status }) {
  const { data, setData, post, processing, errors } = useForm({
    email: ""
  });
  const submit = (e) => {
    e.preventDefault();
    post(route("password.email"));
  };
  return /* @__PURE__ */ jsxs(PublicLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Forgot Password" }),
    /* @__PURE__ */ jsxs("div", { className: "min-h-[80vh] flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-[#fafafa]", children: [
      /* @__PURE__ */ jsxs("div", { className: "sm:mx-auto sm:w-full sm:max-w-md text-center", children: [
        /* @__PURE__ */ jsx("div", { className: "h-20 w-20 bg-white rounded-3xl shadow-xl flex items-center justify-center mx-auto mb-8 animate-slideUp", children: /* @__PURE__ */ jsx("svg", { className: "h-10 w-10 text-blue-600", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" }) }) }),
        /* @__PURE__ */ jsx("h2", { className: "text-5xl font-black text-gray-900 tracking-tighter mb-4 animate-slideUp", children: "Lost Access?" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-500 font-bold uppercase tracking-widest text-[10px] mb-8 animate-fadeIn max-w-xs mx-auto", children: "No problem. Enter your email and we'll send a reset link." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-8 sm:mx-auto sm:w-full sm:max-w-xl animate-slideUp delay-100", children: /* @__PURE__ */ jsxs("div", { className: "bg-white py-12 px-8 shadow-2xl shadow-gray-200/50 sm:rounded-[3rem] border border-gray-100/50 sm:px-16", children: [
        status && /* @__PURE__ */ jsx("div", { className: "mb-6 p-4 bg-green-50 rounded-2xl text-sm font-bold text-green-600 border border-green-100", children: status }),
        /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "space-y-8", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(InputLabel, { htmlFor: "email", value: "Email Address", className: "text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-3 ml-1" }),
            /* @__PURE__ */ jsx(
              TextInput,
              {
                id: "email",
                type: "email",
                name: "email",
                value: data.email,
                className: "w-full px-6 py-4 bg-gray-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-black transition-all",
                isFocused: true,
                onChange: (e) => setData("email", e.target.value),
                placeholder: "your@email.com"
              }
            ),
            /* @__PURE__ */ jsx(InputError, { message: errors.email, className: "mt-2 ml-1" })
          ] }),
          /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
            "button",
            {
              disabled: processing,
              className: "w-full py-5 bg-black text-white font-black rounded-2xl hover:bg-blue-600 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 active:translate-y-0 disabled:opacity-50 disabled:translate-y-0",
              children: "Email Reset Link"
            }
          ) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-12 pt-8 border-t border-gray-50 text-center", children: /* @__PURE__ */ jsxs(
          Link,
          {
            href: route("login"),
            className: "text-sm font-bold text-gray-400 hover:text-black transition-colors flex items-center justify-center gap-2",
            children: [
              /* @__PURE__ */ jsx("svg", { className: "h-4 w-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2.5", d: "M10 19l-7-7m0 0l7-7m-7 7h18" }) }),
              "Back to Sign In"
            ]
          }
        ) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx("style", { dangerouslySetInnerHTML: { __html: `
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-slideUp {
                    animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
                }
                .animate-fadeIn {
                    animation: fadeIn 1s ease both;
                }
                .delay-100 { animation-delay: 100ms; }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
            ` } })
  ] });
}
export {
  ForgotPassword as default
};
