import { jsxs, jsx } from "react/jsx-runtime";
import { a as InputLabel, T as TextInput, I as InputError } from "./TextInput-Cpd-jkNw.js";
import { P as PublicLayout } from "./PublicLayout-BTQtFEwB.js";
import { useForm, Head, Link } from "@inertiajs/react";
import "react";
import "./SEO-BqzDCEc9.js";
import "./Dropdown-CbnvImCK.js";
import "@headlessui/react";
function Register() {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: "",
    email: "",
    password: "",
    password_confirmation: ""
  });
  const submit = (e) => {
    e.preventDefault();
    post(route("register"), {
      onFinish: () => reset("password", "password_confirmation")
    });
  };
  return /* @__PURE__ */ jsxs(PublicLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Register" }),
    /* @__PURE__ */ jsxs("div", { className: "min-h-[80vh] flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-[#fafafa]", children: [
      /* @__PURE__ */ jsxs("div", { className: "sm:mx-auto sm:w-full sm:max-w-md text-center", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-5xl font-black text-gray-900 tracking-tighter mb-4 animate-slideUp", children: "Join the Blog" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-500 font-bold uppercase tracking-widest text-[10px] mb-8 animate-fadeIn", children: "Create your account to start interacting with stories" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-8 sm:mx-auto sm:w-full sm:max-w-xl animate-slideUp delay-100", children: /* @__PURE__ */ jsxs("div", { className: "bg-white py-12 px-8 shadow-2xl shadow-gray-200/50 sm:rounded-[3rem] border border-gray-100/50 sm:px-16", children: [
        /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(InputLabel, { htmlFor: "name", value: "Full Name", className: "text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-3 ml-1" }),
            /* @__PURE__ */ jsx(
              TextInput,
              {
                id: "name",
                name: "name",
                value: data.name,
                className: "w-full px-6 py-4 bg-gray-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-black transition-all",
                autoComplete: "name",
                isFocused: true,
                onChange: (e) => setData("name", e.target.value),
                placeholder: "John Doe",
                required: true
              }
            ),
            /* @__PURE__ */ jsx(InputError, { message: errors.name, className: "mt-2 ml-1" })
          ] }),
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
                onChange: (e) => setData("email", e.target.value),
                placeholder: "john@example.com",
                required: true
              }
            ),
            /* @__PURE__ */ jsx(InputError, { message: errors.email, className: "mt-2 ml-1" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(InputLabel, { htmlFor: "password", value: "Password", className: "text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-3 ml-1" }),
              /* @__PURE__ */ jsx(
                TextInput,
                {
                  id: "password",
                  type: "password",
                  name: "password",
                  value: data.password,
                  className: "w-full px-6 py-4 bg-gray-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-black transition-all",
                  autoComplete: "new-password",
                  onChange: (e) => setData("password", e.target.value),
                  placeholder: "••••••••",
                  required: true
                }
              ),
              /* @__PURE__ */ jsx(InputError, { message: errors.password, className: "mt-2 ml-1" })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(
                InputLabel,
                {
                  htmlFor: "password_confirmation",
                  value: "Confirm Password",
                  className: "text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-3 ml-1"
                }
              ),
              /* @__PURE__ */ jsx(
                TextInput,
                {
                  id: "password_confirmation",
                  type: "password",
                  name: "password_confirmation",
                  value: data.password_confirmation,
                  className: "w-full px-6 py-4 bg-gray-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-black transition-all",
                  autoComplete: "new-password",
                  onChange: (e) => setData("password_confirmation", e.target.value),
                  placeholder: "••••••••",
                  required: true
                }
              ),
              /* @__PURE__ */ jsx(
                InputError,
                {
                  message: errors.password_confirmation,
                  className: "mt-2 ml-1"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "pt-4", children: /* @__PURE__ */ jsx(
            "button",
            {
              disabled: processing,
              className: "w-full py-5 bg-black text-white font-black rounded-2xl hover:bg-blue-600 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 active:translate-y-0 disabled:opacity-50 disabled:translate-y-0",
              children: "Create Account"
            }
          ) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-12 pt-8 border-t border-gray-50 text-center", children: /* @__PURE__ */ jsxs("p", { className: "text-sm font-bold text-gray-400", children: [
          "Already have an account?",
          " ",
          /* @__PURE__ */ jsx(
            Link,
            {
              href: route("login"),
              className: "text-blue-600 hover:text-black transition-colors",
              children: "Sign in instead"
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
  Register as default
};
