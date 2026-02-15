import { jsx, jsxs } from "react/jsx-runtime";
import { a as InputLabel, T as TextInput, I as InputError } from "./TextInput-Cpd-jkNw.js";
import { P as PublicLayout } from "./PublicLayout-BTQtFEwB.js";
import { useForm, Head, Link } from "@inertiajs/react";
import "react";
import "./SEO-BqzDCEc9.js";
import "./Dropdown-CbnvImCK.js";
import "@headlessui/react";
function Checkbox({
  className = "",
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "input",
    {
      ...props,
      type: "checkbox",
      className: "rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500 " + className
    }
  );
}
function Login({
  status,
  canResetPassword
}) {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: "",
    password: "",
    remember: false
  });
  const submit = (e) => {
    e.preventDefault();
    post(route("login"), {
      onFinish: () => reset("password")
    });
  };
  return /* @__PURE__ */ jsxs(PublicLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Log in" }),
    /* @__PURE__ */ jsxs("div", { className: "min-h-[80vh] flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-[#fafafa]", children: [
      /* @__PURE__ */ jsxs("div", { className: "sm:mx-auto sm:w-full sm:max-w-md text-center", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-5xl font-black text-gray-900 tracking-tighter mb-4 animate-slideUp", children: "Welcome Back" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-500 font-bold uppercase tracking-widest text-[10px] mb-8 animate-fadeIn", children: "Enter your credentials to access your account" })
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
                autoComplete: "username",
                isFocused: true,
                onChange: (e) => setData("email", e.target.value),
                placeholder: "your@email.com"
              }
            ),
            /* @__PURE__ */ jsx(InputError, { message: errors.email, className: "mt-2 ml-1" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-3 ml-1", children: [
              /* @__PURE__ */ jsx(InputLabel, { htmlFor: "password", value: "Password", className: "text-[10px] font-black uppercase tracking-[0.2em] text-gray-400" }),
              canResetPassword && /* @__PURE__ */ jsx(
                Link,
                {
                  href: route("password.request"),
                  className: "text-[10px] font-black uppercase tracking-widest text-blue-600 hover:text-black transition-colors",
                  children: "Forgot?"
                }
              )
            ] }),
            /* @__PURE__ */ jsx(
              TextInput,
              {
                id: "password",
                type: "password",
                name: "password",
                value: data.password,
                className: "w-full px-6 py-4 bg-gray-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-black transition-all",
                autoComplete: "current-password",
                onChange: (e) => setData("password", e.target.value),
                placeholder: "••••••••"
              }
            ),
            /* @__PURE__ */ jsx(InputError, { message: errors.password, className: "mt-2 ml-1" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsxs("label", { className: "flex items-center cursor-pointer group", children: [
            /* @__PURE__ */ jsx(
              Checkbox,
              {
                name: "remember",
                checked: data.remember,
                onChange: (e) => setData(
                  "remember",
                  e.target.checked || false
                ),
                className: "rounded-lg border-gray-200 text-black focus:ring-black h-5 w-5 transition-all"
              }
            ),
            /* @__PURE__ */ jsx("span", { className: "ms-3 text-xs font-bold text-gray-500 group-hover:text-black transition-colors", children: "Keep me logged in" })
          ] }) }),
          /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
            "button",
            {
              disabled: processing,
              className: "w-full py-5 bg-black text-white font-black rounded-2xl hover:bg-blue-600 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 active:translate-y-0 disabled:opacity-50 disabled:translate-y-0",
              children: "Log In"
            }
          ) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-12 pt-8 border-t border-gray-50 text-center", children: /* @__PURE__ */ jsxs("p", { className: "text-sm font-bold text-gray-400", children: [
          "Don't have an account?",
          " ",
          /* @__PURE__ */ jsx(
            Link,
            {
              href: route("register"),
              className: "text-blue-600 hover:text-black transition-colors",
              children: "Sign up for free"
            }
          )
        ] }) })
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
  Login as default
};
