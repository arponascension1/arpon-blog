import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { A as AdminLayout } from "./AdminLayout-DmLr14pk.js";
import { useForm, Head } from "@inertiajs/react";
import { M as MediaPicker } from "./MediaPicker-B2RzXcBl.js";
import "axios";
import "@headlessui/react";
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
      preserveScroll: true
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
        /* @__PURE__ */ jsx("div", { className: "w-full md:w-64 bg-gray-50 border-r border-gray-200", children: /* @__PURE__ */ jsx("nav", { className: "p-4 space-y-1", children: tabs.map((tab) => /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => setActiveTab(tab.id),
            className: `w-full flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors ${activeTab === tab.id ? "bg-blue-600 text-white shadow-md" : "text-gray-600 hover:bg-gray-200 hover:text-gray-900"}`,
            children: [
              tab.icon,
              tab.name
            ]
          },
          tab.id
        )) }) }),
        /* @__PURE__ */ jsx("div", { className: "flex-1 p-6 md:p-8", children: /* @__PURE__ */ jsxs("form", { onSubmit: submit, children: [
          activeTab === "general" && /* @__PURE__ */ jsxs("div", { className: "space-y-6 animate-fadeIn", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium text-gray-900 border-b pb-2", children: "General Settings" }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-6", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { htmlFor: "site_name", className: "block text-sm font-medium text-gray-700", children: "Site Name" }),
                /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mb-1", children: "The name of your website as it appears in the browser tab and emails." }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    id: "site_name",
                    value: data.site_name,
                    onChange: (e) => setData("site_name", e.target.value),
                    className: "mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  }
                ),
                errors.site_name && /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-red-600", children: errors.site_name })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { htmlFor: "app_description", className: "block text-sm font-medium text-gray-700", children: "App Description" }),
                /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mb-1", children: "A detailed description of your application/blog." }),
                /* @__PURE__ */ jsx(
                  "textarea",
                  {
                    id: "app_description",
                    rows: 4,
                    value: data.app_description,
                    onChange: (e) => setData("app_description", e.target.value),
                    className: "mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  }
                ),
                errors.app_description && /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-red-600", children: errors.app_description })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(
                  MediaPicker,
                  {
                    label: "Logo",
                    currentValue: data.site_logo,
                    onSelect: (url) => setData("site_logo", url)
                  }
                ),
                /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mt-1", children: "Select your site's logo from the media library." }),
                errors.site_logo && /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-red-600", children: errors.site_logo })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(
                  MediaPicker,
                  {
                    label: "Favicon",
                    currentValue: data.site_favicon,
                    onSelect: (url) => setData("site_favicon", url)
                  }
                ),
                /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mt-1", children: "Select your site's favicon (usually 32x32 or 16x16 pixels)." }),
                errors.site_favicon && /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-red-600", children: errors.site_favicon })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { htmlFor: "site_language", className: "block text-sm font-medium text-gray-700", children: "Default Language" }),
                  /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mb-1", children: "Primary language for the site content." }),
                  /* @__PURE__ */ jsxs(
                    "select",
                    {
                      id: "site_language",
                      value: data.site_language,
                      onChange: (e) => setData("site_language", e.target.value),
                      className: "mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm",
                      children: [
                        /* @__PURE__ */ jsx("option", { value: "en", children: "English" }),
                        /* @__PURE__ */ jsx("option", { value: "es", children: "Spanish" }),
                        /* @__PURE__ */ jsx("option", { value: "fr", children: "French" }),
                        /* @__PURE__ */ jsx("option", { value: "de", children: "German" })
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { htmlFor: "timezone", className: "block text-sm font-medium text-gray-700", children: "Timezone" }),
                  /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mb-1", children: "Regional time offset for displaying dates and times." }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "text",
                      id: "timezone",
                      value: data.timezone,
                      onChange: (e) => setData("timezone", e.target.value),
                      className: "mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm",
                      placeholder: "UTC"
                    }
                  )
                ] })
              ] })
            ] })
          ] }),
          activeTab === "seo" && /* @__PURE__ */ jsxs("div", { className: "space-y-6 animate-fadeIn", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium text-gray-900 border-b pb-2", children: "SEO & Metadata" }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { htmlFor: "site_description", className: "block text-sm font-medium text-gray-700", children: "Meta Description" }),
                /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mb-1", children: "A short summary (max 160 chars) of your site for search engine results." }),
                /* @__PURE__ */ jsx(
                  "textarea",
                  {
                    id: "site_description",
                    rows: 3,
                    value: data.site_description,
                    onChange: (e) => setData("site_description", e.target.value),
                    className: "mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { htmlFor: "site_keywords", className: "block text-sm font-medium text-gray-700", children: "Keywords (comma separated)" }),
                /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mb-1", children: "Relevant keywords to help people find your site (e.g., blog, laravel, coding)." }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    id: "site_keywords",
                    value: data.site_keywords,
                    onChange: (e) => setData("site_keywords", e.target.value),
                    className: "mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { htmlFor: "google_analytics_id", className: "block text-sm font-medium text-gray-700", children: "Google Analytics ID" }),
                  /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mb-1", children: "Your GA4 or UA Measurement ID (e.g., G-XXXXXX)." }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "text",
                      id: "google_analytics_id",
                      value: data.google_analytics_id,
                      onChange: (e) => setData("google_analytics_id", e.target.value),
                      className: "mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm",
                      placeholder: "UA-XXXXX-Y"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { htmlFor: "search_console_id", className: "block text-sm font-medium text-gray-700", children: "Search Console Verification" }),
                  /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mb-1", children: "The value from the 'google-site-verification' meta tag." }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "text",
                      id: "search_console_id",
                      value: data.search_console_id,
                      onChange: (e) => setData("search_console_id", e.target.value),
                      className: "mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 p-4 rounded-lg border border-gray-200", children: [
                /* @__PURE__ */ jsx("h4", { className: "text-sm font-bold text-gray-700 mb-1", children: "Open Graph (Social Sharing)" }),
                /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mb-4", children: "Settings for how your site appears when shared on social media like Facebook and Twitter." }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("label", { htmlFor: "og_title", className: "block text-sm font-medium text-gray-700", children: "OG Title" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        id: "og_title",
                        value: data.og_title,
                        onChange: (e) => setData("og_title", e.target.value),
                        className: "mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("label", { htmlFor: "twitter_card", className: "block text-sm font-medium text-gray-700", children: "Twitter Card Type" }),
                    /* @__PURE__ */ jsxs(
                      "select",
                      {
                        id: "twitter_card",
                        value: data.twitter_card,
                        onChange: (e) => setData("twitter_card", e.target.value),
                        className: "mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm",
                        children: [
                          /* @__PURE__ */ jsx("option", { value: "summary", children: "Summary" }),
                          /* @__PURE__ */ jsx("option", { value: "summary_large_image", children: "Summary with Large Image" })
                        ]
                      }
                    )
                  ] })
                ] })
              ] })
            ] })
          ] }),
          activeTab === "contact" && /* @__PURE__ */ jsxs("div", { className: "space-y-6 animate-fadeIn", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium text-gray-900 border-b pb-2", children: "Contact & Social Links" }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { htmlFor: "admin_email", className: "block text-sm font-medium text-gray-700", children: "Admin Email" }),
                /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mb-1", children: "Primary email for system notifications and contact forms." }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "email",
                    id: "admin_email",
                    value: data.admin_email,
                    onChange: (e) => setData("admin_email", e.target.value),
                    className: "mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  }
                ),
                errors.admin_email && /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-red-600", children: errors.admin_email })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { htmlFor: "contact_phone", className: "block text-sm font-medium text-gray-700", children: "Contact Phone" }),
                /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mb-1", children: "Publicly displayed contact number." }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    id: "contact_phone",
                    value: data.contact_phone,
                    onChange: (e) => setData("contact_phone", e.target.value),
                    className: "mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "md:col-span-2", children: [
                /* @__PURE__ */ jsx("label", { htmlFor: "contact_address", className: "block text-sm font-medium text-gray-700", children: "Office Address" }),
                /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mb-1", children: "Physical address of your organization." }),
                /* @__PURE__ */ jsx(
                  "textarea",
                  {
                    id: "contact_address",
                    rows: 2,
                    value: data.contact_address,
                    onChange: (e) => setData("contact_address", e.target.value),
                    className: "mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-4 md:col-span-2 border-t pt-4", children: [
                /* @__PURE__ */ jsx("h4", { className: "text-sm font-bold text-gray-700", children: "Social Media Profiles" }),
                /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mb-4", children: "URLs to your official social media pages." }),
                /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("label", { htmlFor: "facebook_url", className: "block text-sm font-medium text-gray-700", children: "Facebook URL" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        id: "facebook_url",
                        value: data.facebook_url,
                        onChange: (e) => setData("facebook_url", e.target.value),
                        className: "mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("label", { htmlFor: "twitter_url", className: "block text-sm font-medium text-gray-700", children: "Twitter/X URL" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        id: "twitter_url",
                        value: data.twitter_url,
                        onChange: (e) => setData("twitter_url", e.target.value),
                        className: "mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("label", { htmlFor: "instagram_url", className: "block text-sm font-medium text-gray-700", children: "Instagram URL" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        id: "instagram_url",
                        value: data.instagram_url,
                        onChange: (e) => setData("instagram_url", e.target.value),
                        className: "mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("label", { htmlFor: "linkedin_url", className: "block text-sm font-medium text-gray-700", children: "LinkedIn URL" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        id: "linkedin_url",
                        value: data.linkedin_url,
                        onChange: (e) => setData("linkedin_url", e.target.value),
                        className: "mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      }
                    )
                  ] })
                ] })
              ] })
            ] })
          ] }),
          activeTab === "maintenance" && /* @__PURE__ */ jsxs("div", { className: "space-y-6 animate-fadeIn", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium text-gray-900 border-b pb-2", children: "Maintenance Mode" }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between p-4 bg-orange-50 rounded-lg border border-orange-200", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-orange-800", children: "Enable Maintenance Mode" }),
                  /* @__PURE__ */ jsx("p", { className: "text-xs text-orange-600", children: "When enabled, visitors will see a maintenance page instead of your site. Useful for updates." })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in", children: [
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "checkbox",
                      name: "toggle",
                      id: "toggle",
                      checked: data.maintenance_mode === "1",
                      onChange: (e) => setData("maintenance_mode", e.target.checked ? "1" : "0"),
                      className: "toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                    }
                  ),
                  /* @__PURE__ */ jsx("label", { htmlFor: "toggle", className: "toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer" })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { htmlFor: "maintenance_message", className: "block text-sm font-medium text-gray-700", children: "Maintenance Message" }),
                /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mb-1", children: "The message users will see when the site is in maintenance mode." }),
                /* @__PURE__ */ jsx(
                  "textarea",
                  {
                    id: "maintenance_message",
                    rows: 4,
                    value: data.maintenance_message,
                    onChange: (e) => setData("maintenance_message", e.target.value),
                    className: "mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  }
                )
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-10 pt-6 border-t flex items-center justify-between", children: [
            /* @__PURE__ */ jsx("div", { className: "flex items-center", children: recentlySuccessful && /* @__PURE__ */ jsxs("span", { className: "flex items-center text-sm text-green-600 font-medium", children: [
              /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 mr-1", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z", clipRule: "evenodd" }) }),
              "Settings saved successfully!"
            ] }) }),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "submit",
                disabled: processing,
                className: "inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-all transform hover:scale-105 active:scale-95",
                children: processing ? /* @__PURE__ */ jsxs(Fragment, { children: [
                  /* @__PURE__ */ jsxs("svg", { className: "animate-spin -ml-1 mr-3 h-5 w-5 text-white", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", children: [
                    /* @__PURE__ */ jsx("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }),
                    /* @__PURE__ */ jsx("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })
                  ] }),
                  "Saving..."
                ] }) : "Save All Settings"
              }
            )
          ] })
        ] }) })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsx("style", { dangerouslySetInnerHTML: { __html: `
                .animate-fadeIn {
                    animation: fadeIn 0.3s ease-in-out;
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .toggle-checkbox:checked {
                    right: 0;
                    border-color: #3b82f6;
                }
                .toggle-checkbox:checked + .toggle-label {
                    background-color: #3b82f6;
                }
                .toggle-checkbox {
                    right: 1.5rem;
                    transition: all 0.3s;
                }
                .toggle-label {
                    transition: all 0.3s;
                }
            ` } })
  ] });
}
export {
  Index as default
};
