import { jsxs, jsx } from "react/jsx-runtime";
import { useEffect } from "react";
import { useForm, Head, Link } from "@inertiajs/react";
import { A as AdminLayout } from "./AdminLayout-DomSls0d.js";
import { I as InputError, a as InputLabel, T as TextInput } from "./TextInput-Cpd-jkNw.js";
import { P as PrimaryButton } from "./PrimaryButton-DgVfVBwo.js";
import { M as MediaPicker } from "./MediaPicker-B2RzXcBl.js";
import { S as SearchSelect } from "./SearchSelect-Bb7X9Dja.js";
import "@headlessui/react";
import "axios";
import "./Modal-B-IxVM06.js";
import "./Dropdown-CbnvImCK.js";
function Create({ parentCategories }) {
  const { data, setData, post, processing, errors } = useForm({
    name: "",
    slug: "",
    description: "",
    parent_id: "",
    image_url: "",
    meta_title: "",
    meta_description: "",
    meta_keywords: "",
    is_active: true,
    is_featured: false
  });
  useEffect(() => {
    const slug = data.name.toLowerCase().replace(/[^\w ]+/g, "").replace(/ +/g, "-");
    setData("slug", slug);
  }, [data.name]);
  const handleSubmit = (e) => {
    e.preventDefault();
    post("/admin/categories");
  };
  return /* @__PURE__ */ jsxs(AdminLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Create Category" }),
    /* @__PURE__ */ jsx("div", { className: "py-6", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-6 flex justify-between items-center", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-gray-900", children: "Create Category" }),
          /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-gray-600", children: "Add a new category for your blog posts" })
        ] }),
        /* @__PURE__ */ jsx(
          Link,
          {
            href: "/admin/categories",
            className: "inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50",
            children: "Back to Categories"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-white shadow-sm rounded-lg p-6", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium text-gray-900 mb-4", children: "General Information" }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row gap-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "md:w-1/3", children: [
              /* @__PURE__ */ jsx(
                MediaPicker,
                {
                  label: "Header Image",
                  currentValue: data.image_url,
                  onSelect: (url) => setData("image_url", url)
                }
              ),
              /* @__PURE__ */ jsx(InputError, { message: errors.image_url, className: "mt-2" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6", children: [
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
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "md:col-span-2", children: [
                /* @__PURE__ */ jsx(InputLabel, { htmlFor: "description", value: "Description" }),
                /* @__PURE__ */ jsx(
                  "textarea",
                  {
                    id: "description",
                    className: "mt-1 block w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm",
                    rows: 3,
                    value: data.description || "",
                    onChange: (e) => setData("description", e.target.value)
                  }
                ),
                /* @__PURE__ */ jsx(InputError, { message: errors.description, className: "mt-2" })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(InputLabel, { htmlFor: "parent_id", value: "Parent Category" }),
                /* @__PURE__ */ jsx(
                  SearchSelect,
                  {
                    options: [{ id: "", name: "None (Top Level)" }, ...parentCategories],
                    value: data.parent_id,
                    onChange: (value) => setData("parent_id", value),
                    placeholder: "Search parent categories..."
                  }
                ),
                /* @__PURE__ */ jsx(InputError, { message: errors.parent_id, className: "mt-2" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-6", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      id: "is_active",
                      type: "checkbox",
                      className: "h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded",
                      checked: data.is_active,
                      onChange: (e) => setData("is_active", e.target.checked)
                    }
                  ),
                  /* @__PURE__ */ jsx("label", { htmlFor: "is_active", className: "ml-2 block text-sm text-gray-900", children: "Active" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      id: "is_featured",
                      type: "checkbox",
                      className: "h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded",
                      checked: data.is_featured,
                      onChange: (e) => setData("is_featured", e.target.checked)
                    }
                  ),
                  /* @__PURE__ */ jsx("label", { htmlFor: "is_featured", className: "ml-2 block text-sm text-gray-900", children: "Featured" })
                ] })
              ] })
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
                  placeholder: "If empty, category name will be used"
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
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(InputLabel, { htmlFor: "meta_keywords", value: "Meta Keywords" }),
              /* @__PURE__ */ jsx(
                TextInput,
                {
                  id: "meta_keywords",
                  type: "text",
                  className: "mt-1 block w-full",
                  value: data.meta_keywords || "",
                  onChange: (e) => setData("meta_keywords", e.target.value),
                  placeholder: "keyword1, keyword2, keyword3"
                }
              ),
              /* @__PURE__ */ jsx(InputError, { message: errors.meta_keywords, className: "mt-2" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsx(PrimaryButton, { disabled: processing, children: "Create Category" }) })
      ] })
    ] }) })
  ] });
}
export {
  Create as default
};
