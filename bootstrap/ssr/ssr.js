import { jsx } from "react/jsx-runtime";
import { createInertiaApp } from "@inertiajs/react";
import createServer from "@inertiajs/react/server";
import ReactDOMServer from "react-dom/server";
import { route } from "ziggy-js";
async function resolvePageComponent(path, pages) {
  for (const p of Array.isArray(path) ? path : [path]) {
    const page = pages[p];
    if (typeof page === "undefined") {
      continue;
    }
    return typeof page === "function" ? page() : page;
  }
  throw new Error(`Page not found: ${path}`);
}
const appName = "Arpon MVC";
createServer(
  (page) => createInertiaApp({
    page,
    render: ReactDOMServer.renderToString,
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(
      `./Pages/${name}.tsx`,
      /* @__PURE__ */ Object.assign({ "./Pages/Admin/Analytics/Index.tsx": () => import("./assets/Index-C36s45KS.js"), "./Pages/Admin/Categories/Create.tsx": () => import("./assets/Create-CAJlYSqN.js"), "./Pages/Admin/Categories/Edit.tsx": () => import("./assets/Edit-CU92YXSC.js"), "./Pages/Admin/Categories/Index.tsx": () => import("./assets/Index-h62p8saH.js"), "./Pages/Admin/Categories/Show.tsx": () => import("./assets/Show-BhB_3OO5.js"), "./Pages/Admin/Dashboard.tsx": () => import("./assets/Dashboard-DCJ5HuM_.js"), "./Pages/Admin/Media/Index.tsx": () => import("./assets/Index-DHyf5ZAR.js"), "./Pages/Admin/Posts/Create.tsx": () => import("./assets/Create-cFi61J7A.js"), "./Pages/Admin/Posts/Edit.tsx": () => import("./assets/Edit-tXNLvem1.js"), "./Pages/Admin/Posts/Index.tsx": () => import("./assets/Index-CVh3tV5t.js"), "./Pages/Admin/Settings/Index.tsx": () => import("./assets/Index-D03yxKr9.js"), "./Pages/Admin/Tags/Create.tsx": () => import("./assets/Create-Do39tt7a.js"), "./Pages/Admin/Tags/Edit.tsx": () => import("./assets/Edit-ROVUAAfj.js"), "./Pages/Admin/Tags/Index.tsx": () => import("./assets/Index-nJhfsEVp.js"), "./Pages/Admin/Tags/Show.tsx": () => import("./assets/Show-BMKIT_2n.js"), "./Pages/Admin/Users/Create.tsx": () => import("./assets/Create-C5ngjSQn.js"), "./Pages/Admin/Users/Edit.tsx": () => import("./assets/Edit-LXEKzOP0.js"), "./Pages/Admin/Users/Index.tsx": () => import("./assets/Index-D9RE4xr4.js"), "./Pages/Admin/Users/Show.tsx": () => import("./assets/Show-CNhQKaP-.js"), "./Pages/Auth/ConfirmPassword.tsx": () => import("./assets/ConfirmPassword-BR1JzOgb.js"), "./Pages/Auth/ForgotPassword.tsx": () => import("./assets/ForgotPassword-BGnx4sbr.js"), "./Pages/Auth/Login.tsx": () => import("./assets/Login-DBEZ1hc2.js"), "./Pages/Auth/Register.tsx": () => import("./assets/Register-DC6YqDth.js"), "./Pages/Auth/ResetPassword.tsx": () => import("./assets/ResetPassword-hpa6oi9x.js"), "./Pages/Auth/VerifyEmail.tsx": () => import("./assets/VerifyEmail-9fTJTXo1.js"), "./Pages/Blog/Articles.tsx": () => import("./assets/Articles-CoDUgVuH.js"), "./Pages/Blog/Index.tsx": () => import("./assets/Index-C8uXdxQz.js"), "./Pages/Blog/Search.tsx": () => import("./assets/Search-CDT42Wl1.js"), "./Pages/Blog/Show.tsx": () => import("./assets/Show-BCA2zYSK.js"), "./Pages/Client/Dashboard.tsx": () => import("./assets/Dashboard-Dchr9DyX.js"), "./Pages/Dashboard.tsx": () => import("./assets/Dashboard-asoeZ5r2.js"), "./Pages/Error.tsx": () => import("./assets/Error-F4gDhFPX.js"), "./Pages/Profile/Edit.tsx": () => import("./assets/Edit-C7PPCQ-A.js"), "./Pages/Profile/Partials/DeleteUserForm.tsx": () => import("./assets/DeleteUserForm-DyfxXCWO.js"), "./Pages/Profile/Partials/UpdatePasswordForm.tsx": () => import("./assets/UpdatePasswordForm-B20XK4bj.js"), "./Pages/Profile/Partials/UpdateProfileInformationForm.tsx": () => import("./assets/UpdateProfileInformationForm-Bp9-CMkL.js"), "./Pages/Welcome.tsx": () => import("./assets/Welcome-DSItyKBE.js") })
    ),
    setup: ({ App, props }) => {
      global.route = (name, params, absolute) => route(name, params, absolute, {
        // @ts-ignore
        ...page.props.ziggy,
        // @ts-ignore
        location: new URL(page.props.ziggy.location)
      });
      return /* @__PURE__ */ jsx(App, { ...props });
    }
  })
);
