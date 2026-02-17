import { jsxs, jsx } from "react/jsx-runtime";
import { useForm, Head, Link } from "@inertiajs/react";
import { A as AdminLayout } from "./AdminLayout-pz44TeXA.js";
import { a as InputLabel, T as TextInput, I as InputError } from "./TextInput-Cpd-jkNw.js";
import { P as PrimaryButton } from "./PrimaryButton-DgVfVBwo.js";
import { M as MediaPicker } from "./MediaPicker-B2RzXcBl.js";
import { R as RichTextEditor, M as MultiSelect } from "./RichTextEditor-B_SgOxa2.js";
import { S as SearchSelect } from "./SearchSelect-Bb7X9Dja.js";
import "react";
import "@headlessui/react";
import "axios";
import "./Modal-B-IxVM06.js";
import "./Dropdown-CbnvImCK.js";
import "jodit-react";
function Edit({ post: initialPost, categories, tags }) {
  const { data, setData, put, processing, errors } = useForm({
    category_id: initialPost.category_id.toString(),
    title: initialPost.title,
    slug: initialPost.slug,
    content: initialPost.content,
    excerpt: initialPost.excerpt || "",
    featured_image: initialPost.featured_image || "",
    status: initialPost.status,
    is_featured: initialPost.is_featured,
    published_at: initialPost.published_at ? initialPost.published_at.substring(0, 16) : "",
    tags: initialPost.tags?.map((t) => t.id) || [],
    meta_title: initialPost.meta_title || "",
    meta_description: initialPost.meta_description || "",
    meta_keywords: initialPost.meta_keywords || ""
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    put(`/admin/posts/${initialPost.id}`);
  };
  return /* @__PURE__ */ jsxs(AdminLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: `Edit Post: ${initialPost.title}` }),
    /* @__PURE__ */ jsx("div", { className: "py-6", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
        /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("h1", { className: "text-2xl font-bold text-gray-900 line-clamp-1", children: [
          "Edit: ",
          initialPost.title
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "flex space-x-3", children: [
          /* @__PURE__ */ jsx(
            Link,
            {
              href: "/admin/posts",
              className: "inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsx(PrimaryButton, { disabled: processing, children: "Update Post" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsx("div", { className: "bg-white shadow-sm rounded-lg p-6 border border-gray-200", children: /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(InputLabel, { htmlFor: "title", value: "Post Title" }),
            /* @__PURE__ */ jsx(
              TextInput,
              {
                id: "title",
                type: "text",
                className: "mt-1 block w-full text-xl font-bold border-none bg-gray-50 focus:bg-white transition-all",
                value: data.title,
                onChange: (e) => setData("title", e.target.value),
                placeholder: "Enter an engaging title...",
                required: true
              }
            ),
            /* @__PURE__ */ jsx(InputError, { message: errors.title, className: "mt-2" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(InputLabel, { htmlFor: "content", value: "Content" }),
            /* @__PURE__ */ jsx("div", { className: "mt-1", children: /* @__PURE__ */ jsx(
              RichTextEditor,
              {
                value: data.content,
                onChange: (content) => setData("content", content),
                placeholder: "Start writing your story..."
              }
            ) }),
            /* @__PURE__ */ jsx(InputError, { message: errors.content, className: "mt-2" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(InputLabel, { htmlFor: "excerpt", value: "Excerpt (Short Summary)" }),
            /* @__PURE__ */ jsx(
              "textarea",
              {
                id: "excerpt",
                className: "mt-1 block w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm",
                rows: 2,
                value: data.excerpt,
                onChange: (e) => setData("excerpt", e.target.value),
                placeholder: "A brief summary for search results and social media..."
              }
            ),
            /* @__PURE__ */ jsx(InputError, { message: errors.excerpt, className: "mt-2" })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
          /* @__PURE__ */ jsx("div", { className: "space-y-6", children: /* @__PURE__ */ jsxs("div", { className: "bg-white shadow-sm rounded-lg p-6 border border-gray-200", children: [
            /* @__PURE__ */ jsxs("h2", { className: "text-lg font-medium text-gray-900 mb-4 flex items-center", children: [
              /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 mr-2 text-blue-500", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" }) }),
              "Post Settings"
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(InputLabel, { htmlFor: "category_id", value: "Category" }),
                /* @__PURE__ */ jsx(
                  SearchSelect,
                  {
                    options: categories,
                    value: data.category_id,
                    onChange: (value) => setData("category_id", value.toString()),
                    placeholder: "Select category...",
                    required: true
                  }
                ),
                /* @__PURE__ */ jsx(InputError, { message: errors.category_id, className: "mt-2" })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(InputLabel, { htmlFor: "tags", value: "Tags" }),
                /* @__PURE__ */ jsx(
                  MultiSelect,
                  {
                    options: tags,
                    selected: data.tags,
                    onChange: (selectedIds) => setData("tags", selectedIds),
                    placeholder: "Add tags..."
                  }
                ),
                /* @__PURE__ */ jsx(InputError, { message: errors.tags, className: "mt-2" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "pt-2", children: [
                /* @__PURE__ */ jsx(
                  MediaPicker,
                  {
                    label: "Featured Image",
                    currentValue: data.featured_image,
                    onSelect: (url) => setData("featured_image", url)
                  }
                ),
                /* @__PURE__ */ jsx(InputError, { message: errors.featured_image, className: "mt-2" })
              ] })
            ] })
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: "space-y-6", children: /* @__PURE__ */ jsxs("div", { className: "bg-white shadow-sm rounded-lg p-6 border border-gray-200 h-full", children: [
            /* @__PURE__ */ jsxs("h2", { className: "text-lg font-medium text-gray-900 mb-4 flex items-center", children: [
              /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 mr-2 text-green-500", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" }) }),
              "Publishing"
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx(InputLabel, { htmlFor: "status", value: "Status" }),
                  /* @__PURE__ */ jsxs(
                    "select",
                    {
                      id: "status",
                      className: "mt-1 block w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm text-sm",
                      value: data.status,
                      onChange: (e) => setData("status", e.target.value),
                      children: [
                        /* @__PURE__ */ jsx("option", { value: "draft", children: "Draft" }),
                        /* @__PURE__ */ jsx("option", { value: "published", children: "Published" }),
                        /* @__PURE__ */ jsx("option", { value: "scheduled", children: "Scheduled" })
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx(InputLabel, { htmlFor: "is_featured", value: "Featured" }),
                  /* @__PURE__ */ jsxs("div", { className: "mt-3 flex items-center", children: [
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
                    /* @__PURE__ */ jsx("label", { htmlFor: "is_featured", className: "ml-2 block text-sm text-gray-700", children: "Feature Post" })
                  ] })
                ] })
              ] }),
              data.status === "scheduled" && /* @__PURE__ */ jsxs("div", { className: "animate-in fade-in slide-in-from-top-1 duration-200", children: [
                /* @__PURE__ */ jsx(InputLabel, { htmlFor: "published_at", value: "Publish Date & Time" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    id: "published_at",
                    type: "datetime-local",
                    className: "mt-1 block w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm text-sm",
                    value: data.published_at,
                    onChange: (e) => setData("published_at", e.target.value)
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "pt-4 border-t border-gray-100", children: [
                /* @__PURE__ */ jsx(InputLabel, { htmlFor: "slug", value: "URL Slug" }),
                /* @__PURE__ */ jsx(
                  TextInput,
                  {
                    id: "slug",
                    type: "text",
                    className: "mt-1 block w-full text-xs text-gray-500 bg-gray-50",
                    value: data.slug,
                    onChange: (e) => setData("slug", e.target.value),
                    required: true
                  }
                )
              ] })
            ] })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white shadow-sm rounded-lg p-6 border border-gray-200", children: [
          /* @__PURE__ */ jsxs("h2", { className: "text-lg font-medium text-gray-900 mb-4 flex items-center", children: [
            /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 mr-2 text-purple-500", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" }) }),
            "SEO Metadata"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(InputLabel, { htmlFor: "meta_title", value: "Meta Title" }),
                /* @__PURE__ */ jsx(
                  TextInput,
                  {
                    id: "meta_title",
                    type: "text",
                    className: "mt-1 block w-full",
                    value: data.meta_title,
                    onChange: (e) => setData("meta_title", e.target.value),
                    placeholder: "SEO title..."
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(InputLabel, { htmlFor: "meta_keywords", value: "Meta Keywords" }),
                /* @__PURE__ */ jsx(
                  TextInput,
                  {
                    id: "meta_keywords",
                    type: "text",
                    className: "mt-1 block w-full",
                    value: data.meta_keywords,
                    onChange: (e) => setData("meta_keywords", e.target.value),
                    placeholder: "news, blog, updates..."
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(InputLabel, { htmlFor: "meta_description", value: "Meta Description" }),
              /* @__PURE__ */ jsx(
                "textarea",
                {
                  id: "meta_description",
                  className: "mt-1 block w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm",
                  rows: 4,
                  value: data.meta_description,
                  onChange: (e) => setData("meta_description", e.target.value),
                  placeholder: "Brief description for search engines..."
                }
              )
            ] })
          ] })
        ] })
      ] })
    ] }) }) })
  ] });
}
export {
  Edit as default
};
