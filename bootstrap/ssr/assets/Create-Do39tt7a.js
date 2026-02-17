import { jsxs, jsx } from "react/jsx-runtime";
import { useEffect } from "react";
import { useForm, Head, Link } from "@inertiajs/react";
import { A as AdminLayout } from "./AdminLayout-pz44TeXA.js";
import { a as InputLabel, T as TextInput, I as InputError } from "./TextInput-Cpd-jkNw.js";
import { P as PrimaryButton } from "./PrimaryButton-DgVfVBwo.js";
import "@headlessui/react";
import "axios";
function Create() {
  const { data, setData, post, processing, errors } = useForm({
    name: "",
    slug: "",
    meta_title: "",
    meta_description: ""
  });
  useEffect(() => {
    const slug = data.name.toLowerCase().replace(/[^\w ]+/g, "").replace(/ +/g, "-");
    setData("slug", slug);
  }, [data.name]);
  const handleSubmit = (e) => {
    e.preventDefault();
    post("/admin/tags");
  };
  return /* @__PURE__ */ jsxs(AdminLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Create Tag" }),
    /* @__PURE__ */ jsx("div", { className: "py-6", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-6 flex justify-between items-center", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-gray-900", children: "Create Tag" }),
          /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-gray-600", children: "Add a new tag for your blog posts" })
        ] }),
        /* @__PURE__ */ jsx(
          Link,
          {
            href: "/admin/tags",
            className: "inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50",
            children: "Back to Tags"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-white shadow-sm rounded-lg p-6", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium text-gray-900 mb-4", children: "General Information" }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(InputLabel, { htmlFor: "name", value: "Name" }),
              /* @__PURE__ */ jsx(
                TextInput,
                {
                  id: "name",
                  type: "text",
                  className: "mt-1 block w-full",
                  value: data.name,
                  onChange: (e) => setData("name", e.target.value),
                  required: true
                }
              ),
              /* @__PURE__ */ jsx(InputError, { message: errors.name, className: "mt-2" })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(InputLabel, { htmlFor: "slug", value: "Slug" }),
              /* @__PURE__ */ jsx(
                TextInput,
                {
                  id: "slug",
                  type: "text",
                  className: "mt-1 block w-full",
                  value: data.slug,
                  onChange: (e) => setData("slug", e.target.value),
                  required: true
                }
              ),
              /* @__PURE__ */ jsx(InputError, { message: errors.slug, className: "mt-2" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white shadow-sm rounded-lg p-6", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium text-gray-900 mb-4", children: "SEO Settings" }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-6", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(InputLabel, { htmlFor: "meta_title", value: "Meta Title" }),
              /* @__PURE__ */ jsx(
                TextInput,
                {
                  id: "meta_title",
                  type: "text",
                  className: "mt-1 block w-full",
                  value: data.meta_title || "",
                  onChange: (e) => setData("meta_title", e.target.value),
                  placeholder: "If empty, tag name will be used"
                }
              ),
              /* @__PURE__ */ jsx(InputError, { message: errors.meta_title, className: "mt-2" })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(InputLabel, { htmlFor: "meta_description", value: "Meta Description" }),
              /* @__PURE__ */ jsx(
                "textarea",
                {
                  id: "meta_description",
                  className: "mt-1 block w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm",
                  rows: 2,
                  value: data.meta_description || "",
                  onChange: (e) => setData("meta_description", e.target.value)
                }
              ),
              /* @__PURE__ */ jsx(InputError, { message: errors.meta_description, className: "mt-2" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsx(PrimaryButton, { disabled: processing, children: "Create Tag" }) })
      ] })
    ] }) })
  ] });
}
export {
  Create as default
};
