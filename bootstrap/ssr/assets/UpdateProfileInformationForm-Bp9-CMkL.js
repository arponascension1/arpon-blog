import { jsxs, jsx } from "react/jsx-runtime";
import { a as InputLabel, I as InputError, T as TextInput } from "./TextInput-Cpd-jkNw.js";
import { Transition } from "@headlessui/react";
import { usePage, useForm, Link } from "@inertiajs/react";
import { useRef } from "react";
function UpdateProfileInformation({
  mustVerifyEmail,
  status,
  className = ""
}) {
  const user = usePage().props.auth.user;
  const fileInput = useRef(null);
  const { data, setData, post, errors, processing, recentlySuccessful } = useForm({
    name: user.name,
    email: user.email,
    avatar: null,
    _method: "PATCH"
    // Use post with _method: 'PATCH' for file uploads in Inertia
  });
  const submit = (e) => {
    e.preventDefault();
    post(route("profile.update"), {
      preserveScroll: true,
      onSuccess: () => {
        if (fileInput.current) {
          fileInput.current.value = "";
        }
      }
    });
  };
  return /* @__PURE__ */ jsxs("section", { className, children: [
    /* @__PURE__ */ jsxs("header", { children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-black text-gray-900 tracking-tight", children: "Profile Information" }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-gray-500 font-medium", children: "Update your account's profile information and email address." })
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "mt-10 space-y-8", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "avatar", value: "Profile Picture", className: "mb-4" }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-6", children: [
          /* @__PURE__ */ jsx("div", { className: "shrink-0", children: user.avatar ? /* @__PURE__ */ jsx("img", { className: "h-20 w-20 object-cover rounded-[1.5rem] shadow-lg border-2 border-white ring-1 ring-gray-100", src: user.avatar, alt: user.name }) : /* @__PURE__ */ jsx("div", { className: "h-20 w-20 rounded-[1.5rem] bg-black flex items-center justify-center text-2xl font-black text-white shadow-lg", children: user.name.charAt(0) }) }),
          /* @__PURE__ */ jsxs("label", { className: "block", children: [
            /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Choose profile photo" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "file",
                ref: fileInput,
                onChange: (e) => setData("avatar", e.target.files ? e.target.files[0] : null),
                className: "block w-full text-xs text-gray-500\n                                    file:mr-4 file:py-2.5 file:px-6\n                                    file:rounded-xl file:border-0\n                                    file:text-[10px] file:font-black file:uppercase file:tracking-widest\n                                    file:bg-black file:text-white\n                                    hover:file:bg-gray-800 transition-all cursor-pointer\n                                "
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsx(InputError, { className: "mt-2", message: errors.avatar })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(InputLabel, { htmlFor: "name", value: "Name" }),
          /* @__PURE__ */ jsx(
            TextInput,
            {
              id: "name",
              className: "mt-2 block w-full",
              value: data.name,
              onChange: (e) => setData("name", e.target.value),
              required: true,
              autoComplete: "name"
            }
          ),
          /* @__PURE__ */ jsx(InputError, { className: "mt-2", message: errors.name })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(InputLabel, { htmlFor: "email", value: "Email Address" }),
          /* @__PURE__ */ jsx(
            TextInput,
            {
              id: "email",
              type: "email",
              className: "mt-2 block w-full",
              value: data.email,
              onChange: (e) => setData("email", e.target.value),
              required: true,
              autoComplete: "username"
            }
          ),
          /* @__PURE__ */ jsx(InputError, { className: "mt-2", message: errors.email })
        ] })
      ] }),
      mustVerifyEmail && user.email_verified_at === null && /* @__PURE__ */ jsxs("div", { className: "bg-orange-50 p-6 rounded-2xl border border-orange-100", children: [
        /* @__PURE__ */ jsxs("p", { className: "text-sm text-orange-800 font-medium", children: [
          "Your email address is unverified.",
          /* @__PURE__ */ jsx(
            Link,
            {
              href: route("verification.send"),
              method: "post",
              as: "button",
              className: "ml-2 rounded-md text-sm text-orange-600 font-bold underline hover:text-orange-900 focus:outline-none",
              children: "Click here to re-send the verification email."
            }
          )
        ] }),
        status === "verification-link-sent" && /* @__PURE__ */ jsx("div", { className: "mt-2 text-sm font-bold text-green-600", children: "A new verification link has been sent to your email address." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 pt-6 border-t border-gray-50", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "submit",
            disabled: processing,
            className: "px-10 py-4 bg-black text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-gray-800 transition-all shadow-xl disabled:opacity-50",
            children: "Save Changes"
          }
        ),
        /* @__PURE__ */ jsx(
          Transition,
          {
            show: recentlySuccessful,
            enter: "transition ease-in-out",
            enterFrom: "opacity-0",
            leave: "transition ease-in-out",
            leaveTo: "opacity-0",
            children: /* @__PURE__ */ jsx("p", { className: "text-sm text-green-600 font-bold", children: "Profile updated successfully." })
          }
        )
      ] })
    ] })
  ] });
}
export {
  UpdateProfileInformation as default
};
