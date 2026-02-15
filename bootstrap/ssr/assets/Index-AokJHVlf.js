import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { A as AdminLayout } from "./AdminLayout-DomSls0d.js";
import { useForm, Head } from "@inertiajs/react";
import { M as MediaPicker } from "./MediaPicker-B2RzXcBl.js";
import "@headlessui/react";
import "axios";
import "./Modal-B-IxVM06.js";
import "./PrimaryButton-DgVfVBwo.js";
import "./Dropdown-CbnvImCK.js";
function Index({ settings }) {
  const [activeTab, setActiveTab] = useState("general");
  const { data, setData, patch, processing, errors, recentlySuccessful } = useForm({
    site_name: settings.site_name || "",
    app_description: settings.app_description || "",
    site_logo: settings.site_logo || "",
    site_favicon: settings.site_favicon || "",
    site_language: settings.site_language || "en",
    timezone: settings.timezone || "UTC",
    site_description: settings.site_description || "",
    site_keywords: settings.site_keywords || "",
    og_title: settings.og_title || "",
    og_description: settings.og_description || "",
    twitter_card: settings.twitter_card || "summary_large_image",
    google_analytics_id: settings.google_analytics_id || "",
    search_console_id: settings.search_console_id || "",
    admin_email: settings.admin_email || "",
    contact_phone: settings.contact_phone || "",
    contact_address: settings.contact_address || "",
    facebook_url: settings.facebook_url || "",
    twitter_url: settings.twitter_url || "",
    instagram_url: settings.instagram_url || "",
    linkedin_url: settings.linkedin_url || "",
    maintenance_mode: settings.maintenance_mode || "0",
    maintenance_message: settings.maintenance_message || ""
  });
  const submit = (e) => {
    e.preventDefault();
    patch(route("admin.settings.update"), {
      preserveScroll: true,
      onError: (errors2) => {
        if (errors2.site_name || errors2.app_description || errors2.site_logo || errors2.site_favicon || errors2.site_language || errors2.timezone) {
          setActiveTab("general");
        } else if (errors2.site_description || errors2.site_keywords || errors2.og_title || errors2.og_description || errors2.twitter_card || errors2.google_analytics_id || errors2.search_console_id) {
          setActiveTab("seo");
        } else if (errors2.admin_email || errors2.contact_phone || errors2.contact_address || errors2.facebook_url || errors2.twitter_url || errors2.instagram_url || errors2.linkedin_url) {
          setActiveTab("contact");
        } else if (errors2.maintenance_mode || errors2.maintenance_message) {
          setActiveTab("maintenance");
        }
      }
    });
  };
  const tabs = [
    { id: "general", name: "General", icon: /* @__PURE__ */ jsxs("svg", { className: "w-5 h-5 mr-2", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: [
      /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" }),
      /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z" })
    ] }) },
    { id: "seo", name: "SEO", icon: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 mr-2", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" }) }) },
    { id: "contact", name: "Contact & Social", icon: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 mr-2", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" }) }) },
    { id: "maintenance", name: "Maintenance", icon: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 mr-2", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" }) }) }
  ];
  return /* @__PURE__ */ jsxs(AdminLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "App Settings" }),
    /* @__PURE__ */ jsx("div", { className: "py-6", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-gray-900", children: "App Settings" }),
        /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-gray-600", children: "Configure your application's global behavior and metadata." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row", children: [
        /* @__PURE__ */ jsx("div", { className: "w-full lg:w-72 bg-gray-50/50 border-r border-gray-100", children: /* @__PURE__ */ jsx("nav", { className: "p-4 space-y-1", children: tabs.map((tab) => /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => setActiveTab(tab.id),
            className: `w-full flex items-center gap-x-3 px-4 py-3 text-sm font-bold rounded-xl transition-all ${activeTab === tab.id ? "bg-blue-600 text-white shadow-lg shadow-blue-200" : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"}`,
            children: [
              /* @__PURE__ */ jsx("span", { className: `${activeTab === tab.id ? "text-white" : "text-gray-400"}`, children: tab.icon }),
              tab.name
            ]
          },
          tab.id
        )) }) }),
        /* @__PURE__ */ jsx("div", { className: "flex-1 p-6 sm:p-10", children: /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "max-w-4xl", children: [
          Object.keys(errors).length > 0 && /* @__PURE__ */ jsx("div", { className: "mb-8 rounded-2xl bg-red-50 p-4 border border-red-100 animate-fadeIn", children: /* @__PURE__ */ jsxs("div", { className: "flex", children: [
            /* @__PURE__ */ jsx("div", { className: "flex-shrink-0", children: /* @__PURE__ */ jsx("svg", { className: "h-5 w-5 text-red-600", viewBox: "0 0 20 20", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414-1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z", clipRule: "evenodd" }) }) }),
            /* @__PURE__ */ jsxs("div", { className: "ml-3", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-sm font-black text-red-900 uppercase tracking-tight", children: "Submission Failed" }),
              /* @__PURE__ */ jsx("div", { className: "mt-2 text-xs text-red-700 font-bold", children: /* @__PURE__ */ jsx("ul", { role: "list", className: "list-disc space-y-1 pl-5", children: Object.values(errors).map((error, index) => /* @__PURE__ */ jsx("li", { children: error }, index)) }) })
            ] })
          ] }) }),
          activeTab === "general" && /* @__PURE__ */ jsxs("div", { className: "space-y-8 animate-fadeIn", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-gray-900", children: "General Identity" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 mt-1", children: "Core branding and regional settings for your blog." })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-8", children: [
              /* @__PURE__ */ jsxs("div", { className: "group", children: [
                /* @__PURE__ */ jsx("label", { htmlFor: "site_name", className: "block text-sm font-bold text-gray-700 mb-1 group-focus-within:text-blue-600 transition-colors", children: "Site Name" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    id: "site_name",
                    value: data.site_name,
                    onChange: (e) => setData("site_name", e.target.value),
                    className: "block w-full border-gray-200 bg-gray-50/50 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 sm:text-sm transition-all",
                    placeholder: "My Awesome Blog"
                  }
                ),
                errors.site_name && /* @__PURE__ */ jsx("p", { className: "mt-2 text-xs font-bold text-red-500 uppercase tracking-tight", children: errors.site_name })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { htmlFor: "app_description", className: "block text-sm font-bold text-gray-700 mb-1", children: "App Description" }),
                /* @__PURE__ */ jsx(
                  "textarea",
                  {
                    id: "app_description",
                    rows: 4,
                    value: data.app_description,
                    onChange: (e) => setData("app_description", e.target.value),
                    className: "block w-full border-gray-200 bg-gray-50/50 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 sm:text-sm transition-all",
                    placeholder: "Tell the world about your blog..."
                  }
                ),
                errors.app_description && /* @__PURE__ */ jsx("p", { className: "mt-2 text-xs font-bold text-red-500 uppercase tracking-tight", children: errors.app_description })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8", children: [
                /* @__PURE__ */ jsxs("div", { className: "bg-gray-50/50 p-4 rounded-2xl border border-gray-100", children: [
                  /* @__PURE__ */ jsx(
                    MediaPicker,
                    {
                      label: "Site Logo",
                      currentValue: data.site_logo,
                      onSelect: (url) => setData("site_logo", url)
                    }
                  ),
                  errors.site_logo && /* @__PURE__ */ jsx("p", { className: "mt-2 text-xs font-bold text-red-500 uppercase tracking-tight", children: errors.site_logo })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "bg-gray-50/50 p-4 rounded-2xl border border-gray-100", children: [
                  /* @__PURE__ */ jsx(
                    MediaPicker,
                    {
                      label: "Favicon",
                      currentValue: data.site_favicon,
                      onSelect: (url) => setData("site_favicon", url)
                    }
                  ),
                  errors.site_favicon && /* @__PURE__ */ jsx("p", { className: "mt-2 text-xs font-bold text-red-500 uppercase tracking-tight", children: errors.site_favicon })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { htmlFor: "site_language", className: "block text-sm font-bold text-gray-700 mb-1", children: "Default Language" }),
                  /* @__PURE__ */ jsxs(
                    "select",
                    {
                      id: "site_language",
                      value: data.site_language,
                      onChange: (e) => setData("site_language", e.target.value),
                      className: "block w-full border-gray-200 bg-gray-50/50 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 sm:text-sm transition-all",
                      children: [
                        /* @__PURE__ */ jsx("option", { value: "en", children: "English" }),
                        /* @__PURE__ */ jsx("option", { value: "es", children: "Spanish" }),
                        /* @__PURE__ */ jsx("option", { value: "fr", children: "French" }),
                        /* @__PURE__ */ jsx("option", { value: "de", children: "German" })
                      ]
                    }
                  ),
                  errors.site_language && /* @__PURE__ */ jsx("p", { className: "mt-2 text-xs font-bold text-red-500 uppercase tracking-tight", children: errors.site_language })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { htmlFor: "timezone", className: "block text-sm font-bold text-gray-700 mb-1", children: "Timezone" }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "text",
                      id: "timezone",
                      value: data.timezone,
                      onChange: (e) => setData("timezone", e.target.value),
                      className: "block w-full border-gray-200 bg-gray-50/50 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 sm:text-sm transition-all",
                      placeholder: "UTC"
                    }
                  ),
                  errors.timezone && /* @__PURE__ */ jsx("p", { className: "mt-2 text-xs font-bold text-red-500 uppercase tracking-tight", children: errors.timezone })
                ] })
              ] })
            ] })
          ] }),
          activeTab === "seo" && /* @__PURE__ */ jsxs("div", { className: "space-y-8 animate-fadeIn", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-gray-900", children: "SEO & Metadata" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 mt-1", children: "Optimize your visibility on search engines and social media." })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { htmlFor: "site_description", className: "block text-sm font-bold text-gray-700 mb-1", children: "Meta Description" }),
                /* @__PURE__ */ jsx(
                  "textarea",
                  {
                    id: "site_description",
                    rows: 3,
                    value: data.site_description,
                    onChange: (e) => setData("site_description", e.target.value),
                    className: "block w-full border-gray-200 bg-gray-50/50 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 sm:text-sm transition-all",
                    placeholder: "Maximum 160 characters for best results..."
                  }
                ),
                errors.site_description && /* @__PURE__ */ jsx("p", { className: "mt-2 text-xs font-bold text-red-500 uppercase tracking-tight", children: errors.site_description })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { htmlFor: "site_keywords", className: "block text-sm font-bold text-gray-700 mb-1", children: "Keywords" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    id: "site_keywords",
                    value: data.site_keywords,
                    onChange: (e) => setData("site_keywords", e.target.value),
                    className: "block w-full border-gray-200 bg-gray-50/50 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 sm:text-sm transition-all",
                    placeholder: "blog, laravel, coding, tech..."
                  }
                ),
                errors.site_keywords && /* @__PURE__ */ jsx("p", { className: "mt-2 text-xs font-bold text-red-500 uppercase tracking-tight", children: errors.site_keywords })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { htmlFor: "google_analytics_id", className: "block text-sm font-bold text-gray-700 mb-1", children: "Analytics ID" }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "text",
                      id: "google_analytics_id",
                      value: data.google_analytics_id,
                      onChange: (e) => setData("google_analytics_id", e.target.value),
                      className: "block w-full border-gray-200 bg-gray-50/50 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 sm:text-sm transition-all",
                      placeholder: "G-XXXXXXXXXX"
                    }
                  ),
                  errors.google_analytics_id && /* @__PURE__ */ jsx("p", { className: "mt-2 text-xs font-bold text-red-500 uppercase tracking-tight", children: errors.google_analytics_id })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { htmlFor: "search_console_id", className: "block text-sm font-bold text-gray-700 mb-1", children: "Search Console" }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "text",
                      id: "search_console_id",
                      value: data.search_console_id,
                      onChange: (e) => setData("search_console_id", e.target.value),
                      className: "block w-full border-gray-200 bg-gray-50/50 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 sm:text-sm transition-all",
                      placeholder: "Google verification code"
                    }
                  ),
                  errors.search_console_id && /* @__PURE__ */ jsx("p", { className: "mt-2 text-xs font-bold text-red-500 uppercase tracking-tight", children: errors.search_console_id })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "bg-blue-50/30 p-6 rounded-2xl border border-blue-50", children: [
                /* @__PURE__ */ jsx("h4", { className: "text-sm font-black text-blue-900 uppercase tracking-widest mb-4", children: "Open Graph (Social Sharing)" }),
                /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
                  /* @__PURE__ */ jsxs("div", { className: "md:col-span-2", children: [
                    /* @__PURE__ */ jsx("label", { htmlFor: "og_title", className: "block text-sm font-bold text-gray-700 mb-1", children: "Social Title" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        id: "og_title",
                        value: data.og_title,
                        onChange: (e) => setData("og_title", e.target.value),
                        className: "block w-full border-gray-200 bg-white rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 sm:text-sm transition-all"
                      }
                    ),
                    errors.og_title && /* @__PURE__ */ jsx("p", { className: "mt-2 text-xs font-bold text-red-500 uppercase tracking-tight", children: errors.og_title })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "md:col-span-2", children: [
                    /* @__PURE__ */ jsx("label", { htmlFor: "twitter_card", className: "block text-sm font-bold text-gray-700 mb-1", children: "Twitter Card" }),
                    /* @__PURE__ */ jsxs(
                      "select",
                      {
                        id: "twitter_card",
                        value: data.twitter_card,
                        onChange: (e) => setData("twitter_card", e.target.value),
                        className: "block w-full border-gray-200 bg-white rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 sm:text-sm transition-all",
                        children: [
                          /* @__PURE__ */ jsx("option", { value: "summary", children: "Summary" }),
                          /* @__PURE__ */ jsx("option", { value: "summary_large_image", children: "Summary with Large Image" })
                        ]
                      }
                    ),
                    errors.twitter_card && /* @__PURE__ */ jsx("p", { className: "mt-2 text-xs font-bold text-red-500 uppercase tracking-tight", children: errors.twitter_card })
                  ] })
                ] })
              ] })
            ] })
          ] }),
          activeTab === "contact" && /* @__PURE__ */ jsxs("div", { className: "space-y-8 animate-fadeIn", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-gray-900", children: "Contact & Social" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 mt-1", children: "Ways for your audience to connect with you." })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { htmlFor: "admin_email", className: "block text-sm font-bold text-gray-700 mb-1", children: "Admin Email" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "email",
                    id: "admin_email",
                    value: data.admin_email,
                    onChange: (e) => setData("admin_email", e.target.value),
                    className: "block w-full border-gray-200 bg-gray-50/50 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 sm:text-sm transition-all"
                  }
                ),
                errors.admin_email && /* @__PURE__ */ jsx("p", { className: "mt-2 text-xs font-bold text-red-500 uppercase tracking-tight", children: errors.admin_email })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { htmlFor: "contact_phone", className: "block text-sm font-bold text-gray-700 mb-1", children: "Phone Number" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    id: "contact_phone",
                    value: data.contact_phone,
                    onChange: (e) => setData("contact_phone", e.target.value),
                    className: "block w-full border-gray-200 bg-gray-50/50 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 sm:text-sm transition-all"
                  }
                ),
                errors.contact_phone && /* @__PURE__ */ jsx("p", { className: "mt-2 text-xs font-bold text-red-500 uppercase tracking-tight", children: errors.contact_phone })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "md:col-span-2", children: [
                /* @__PURE__ */ jsx("label", { htmlFor: "contact_address", className: "block text-sm font-bold text-gray-700 mb-1", children: "Office Address" }),
                /* @__PURE__ */ jsx(
                  "textarea",
                  {
                    id: "contact_address",
                    rows: 2,
                    value: data.contact_address,
                    onChange: (e) => setData("contact_address", e.target.value),
                    className: "block w-full border-gray-200 bg-gray-50/50 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 sm:text-sm transition-all"
                  }
                ),
                errors.contact_address && /* @__PURE__ */ jsx("p", { className: "mt-2 text-xs font-bold text-red-500 uppercase tracking-tight", children: errors.contact_address })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "md:col-span-2 space-y-6 pt-4", children: [
                /* @__PURE__ */ jsx("h4", { className: "text-sm font-black text-gray-400 uppercase tracking-widest border-b border-gray-50 pb-2", children: "Social Profiles" }),
                /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("label", { htmlFor: "facebook_url", className: "block text-sm font-bold text-gray-700 mb-1", children: "Facebook" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        id: "facebook_url",
                        value: data.facebook_url,
                        onChange: (e) => setData("facebook_url", e.target.value),
                        className: "block w-full border-gray-200 bg-gray-50/50 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 sm:text-sm transition-all"
                      }
                    ),
                    errors.facebook_url && /* @__PURE__ */ jsx("p", { className: "mt-2 text-xs font-bold text-red-500 uppercase tracking-tight", children: errors.facebook_url })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("label", { htmlFor: "twitter_url", className: "block text-sm font-bold text-gray-700 mb-1", children: "Twitter / X" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        id: "twitter_url",
                        value: data.twitter_url,
                        onChange: (e) => setData("twitter_url", e.target.value),
                        className: "block w-full border-gray-200 bg-gray-50/50 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 sm:text-sm transition-all"
                      }
                    ),
                    errors.twitter_url && /* @__PURE__ */ jsx("p", { className: "mt-2 text-xs font-bold text-red-500 uppercase tracking-tight", children: errors.twitter_url })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("label", { htmlFor: "instagram_url", className: "block text-sm font-bold text-gray-700 mb-1", children: "Instagram" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        id: "instagram_url",
                        value: data.instagram_url,
                        onChange: (e) => setData("instagram_url", e.target.value),
                        className: "block w-full border-gray-200 bg-gray-50/50 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 sm:text-sm transition-all"
                      }
                    ),
                    errors.instagram_url && /* @__PURE__ */ jsx("p", { className: "mt-2 text-xs font-bold text-red-500 uppercase tracking-tight", children: errors.instagram_url })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("label", { htmlFor: "linkedin_url", className: "block text-sm font-bold text-gray-700 mb-1", children: "LinkedIn" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        id: "linkedin_url",
                        value: data.linkedin_url,
                        onChange: (e) => setData("linkedin_url", e.target.value),
                        className: "block w-full border-gray-200 bg-gray-50/50 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 sm:text-sm transition-all"
                      }
                    ),
                    errors.linkedin_url && /* @__PURE__ */ jsx("p", { className: "mt-2 text-xs font-bold text-red-500 uppercase tracking-tight", children: errors.linkedin_url })
                  ] })
                ] })
              ] })
            ] })
          ] }),
          activeTab === "maintenance" && /* @__PURE__ */ jsxs("div", { className: "space-y-8 animate-fadeIn", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-gray-900", children: "System & Maintenance" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 mt-1", children: "Manage site availability and critical system messages." })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between p-6 bg-orange-50 rounded-2xl border border-orange-100", children: [
                /* @__PURE__ */ jsxs("div", { className: "max-w-md", children: [
                  /* @__PURE__ */ jsx("p", { className: "text-sm font-black text-orange-900 uppercase tracking-tight", children: "Maintenance Mode" }),
                  /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-orange-700 font-medium leading-relaxed", children: "When enabled, visitors will see a maintenance page. Admins can still access the dashboard." })
                ] }),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setData("maintenance_mode", data.maintenance_mode === "1" ? "0" : "1"),
                    className: `relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 ${data.maintenance_mode === "1" ? "bg-orange-600" : "bg-gray-200"}`,
                    children: /* @__PURE__ */ jsx("span", { className: `pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${data.maintenance_mode === "1" ? "translate-x-5" : "translate-x-0"}` })
                  }
                )
              ] }),
              errors.maintenance_mode && /* @__PURE__ */ jsx("p", { className: "mt-2 text-xs font-bold text-red-500 uppercase tracking-tight", children: errors.maintenance_mode }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { htmlFor: "maintenance_message", className: "block text-sm font-bold text-gray-700 mb-1", children: "Maintenance Message" }),
                /* @__PURE__ */ jsx(
                  "textarea",
                  {
                    id: "maintenance_message",
                    rows: 4,
                    value: data.maintenance_message,
                    onChange: (e) => setData("maintenance_message", e.target.value),
                    className: "block w-full border-gray-200 bg-gray-50/50 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 sm:text-sm transition-all",
                    placeholder: "Site is temporarily unavailable..."
                  }
                ),
                errors.maintenance_message && /* @__PURE__ */ jsx("p", { className: "mt-2 text-xs font-bold text-red-500 uppercase tracking-tight", children: errors.maintenance_message })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mt-12 pt-8 border-t border-gray-100 flex items-center justify-end", children: /* @__PURE__ */ jsx(
            "button",
            {
              type: "submit",
              disabled: processing,
              className: "inline-flex items-center px-8 py-3.5 border border-transparent text-sm font-black uppercase tracking-widest rounded-xl shadow-lg shadow-blue-100 text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-all transform hover:translate-y-[-2px] active:translate-y-[0px]",
              children: processing ? /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-x-2", children: [
                /* @__PURE__ */ jsxs("svg", { className: "animate-spin h-4 w-4 text-white", fill: "none", viewBox: "0 0 24 24", children: [
                  /* @__PURE__ */ jsx("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }),
                  /* @__PURE__ */ jsx("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })
                ] }),
                "Saving..."
              ] }) : "Save All Settings"
            }
          ) })
        ] }) })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsx("style", { dangerouslySetInnerHTML: { __html: `
                .animate-fadeIn {
                    animation: fadeIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(8px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            ` } })
  ] });
}
export {
  Index as default
};
