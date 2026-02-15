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
      /* @__PURE__ */ Object.assign({ "./Pages/Admin/Analytics/Index.tsx": () => import("./assets/Index-C1WU8Vls.js"), "./Pages/Admin/Categories/Create.tsx": () => import("./assets/Create-CR9VpO2a.js"), "./Pages/Admin/Categories/Edit.tsx": () => import("./assets/Edit-BrQiftKX.js"), "./Pages/Admin/Categories/Index.tsx": () => import("./assets/Index-BLm8xdSy.js"), "./Pages/Admin/Categories/Show.tsx": () => import("./assets/Show-B_c295Ou.js"), "./Pages/Admin/Dashboard.tsx": () => import("./assets/Dashboard-BfBtlsse.js"), "./Pages/Admin/Media/Index.tsx": () => import("./assets/Index-DSPtYU0F.js"), "./Pages/Admin/Posts/Create.tsx": () => import("./assets/Create-DQeg-sIS.js"), "./Pages/Admin/Posts/Edit.tsx": () => import("./assets/Edit-sqbYpqER.js"), "./Pages/Admin/Posts/Index.tsx": () => import("./assets/Index-SD-hp1ss.js"), "./Pages/Admin/Settings/Index.tsx": () => import("./assets/Index-D95wl_OM.js"), "./Pages/Admin/Tags/Create.tsx": () => import("./assets/Create-Cp93RD-0.js"), "./Pages/Admin/Tags/Edit.tsx": () => import("./assets/Edit-TDgoriOQ.js"), "./Pages/Admin/Tags/Index.tsx": () => import("./assets/Index-CgYIUWne.js"), "./Pages/Admin/Tags/Show.tsx": () => import("./assets/Show-CKpXBmia.js"), "./Pages/Admin/Users/Create.tsx": () => import("./assets/Create-oeHrTk9H.js"), "./Pages/Admin/Users/Edit.tsx": () => import("./assets/Edit-Ba1Cad_Q.js"), "./Pages/Admin/Users/Index.tsx": () => import("./assets/Index-DSu2Tr83.js"), "./Pages/Admin/Users/Show.tsx": () => import("./assets/Show-BoojlBIU.js"), "./Pages/Auth/ConfirmPassword.tsx": () => import("./assets/ConfirmPassword-CRK_h_1F.js"), "./Pages/Auth/ForgotPassword.tsx": () => import("./assets/ForgotPassword-BmfGPehw.js"), "./Pages/Auth/Login.tsx": () => import("./assets/Login-oQWQfXu7.js"), "./Pages/Auth/Register.tsx": () => import("./assets/Register-rkixCf_F.js"), "./Pages/Auth/ResetPassword.tsx": () => import("./assets/ResetPassword-DNHV-Lhv.js"), "./Pages/Auth/VerifyEmail.tsx": () => import("./assets/VerifyEmail-9fTJTXo1.js"), "./Pages/Blog/Articles.tsx": () => import("./assets/Articles-BKtIb8ky.js"), "./Pages/Blog/Index.tsx": () => import("./assets/Index-BouDR5jB.js"), "./Pages/Blog/Search.tsx": () => import("./assets/Search-Dx-bDd9M.js"), "./Pages/Blog/Show.tsx": () => import("./assets/Show-DOZmU0lC.js"), "./Pages/Client/Dashboard.tsx": () => import("./assets/Dashboard-Se0oQVVI.js"), "./Pages/Dashboard.tsx": () => import("./assets/Dashboard-Cwx563hu.js"), "./Pages/Error.tsx": () => import("./assets/Error-DezopYaj.js"), "./Pages/Profile/Edit.tsx": () => import("./assets/Edit-CKcgV_rk.js"), "./Pages/Profile/Partials/DeleteUserForm.tsx": () => import("./assets/DeleteUserForm-C-BqVfPW.js"), "./Pages/Profile/Partials/UpdatePasswordForm.tsx": () => import("./assets/UpdatePasswordForm-C_DFiyAo.js"), "./Pages/Profile/Partials/UpdateProfileInformationForm.tsx": () => import("./assets/UpdateProfileInformationForm-DlKjXrMH.js"), "./Pages/Welcome.tsx": () => import("./assets/Welcome-DSItyKBE.js") })
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
