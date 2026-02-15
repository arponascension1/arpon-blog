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
      /* @__PURE__ */ Object.assign({ "./Pages/Admin/Analytics/Index.tsx": () => import("./assets/Index-DjG6fBfd.js"), "./Pages/Admin/Categories/Create.tsx": () => import("./assets/Create-Bw4kIvbB.js"), "./Pages/Admin/Categories/Edit.tsx": () => import("./assets/Edit-BSQxRC-N.js"), "./Pages/Admin/Categories/Index.tsx": () => import("./assets/Index-DaDGVXzf.js"), "./Pages/Admin/Categories/Show.tsx": () => import("./assets/Show-BgHHFfZv.js"), "./Pages/Admin/Dashboard.tsx": () => import("./assets/Dashboard-DrppY7Sb.js"), "./Pages/Admin/Media/Index.tsx": () => import("./assets/Index-CdZcJj9f.js"), "./Pages/Admin/Posts/Create.tsx": () => import("./assets/Create-BFGfoobG.js"), "./Pages/Admin/Posts/Edit.tsx": () => import("./assets/Edit-DxTlUm7-.js"), "./Pages/Admin/Posts/Index.tsx": () => import("./assets/Index-CS71gKbI.js"), "./Pages/Admin/Settings/Index.tsx": () => import("./assets/Index-AokJHVlf.js"), "./Pages/Admin/Tags/Create.tsx": () => import("./assets/Create-BYfzkwgh.js"), "./Pages/Admin/Tags/Edit.tsx": () => import("./assets/Edit-D34o_Fd4.js"), "./Pages/Admin/Tags/Index.tsx": () => import("./assets/Index-zpWzIC-M.js"), "./Pages/Admin/Tags/Show.tsx": () => import("./assets/Show-D7GdAN5t.js"), "./Pages/Admin/Users/Create.tsx": () => import("./assets/Create-XeLovyxC.js"), "./Pages/Admin/Users/Edit.tsx": () => import("./assets/Edit-Cxzr2eD-.js"), "./Pages/Admin/Users/Index.tsx": () => import("./assets/Index-Bf3TJ9G3.js"), "./Pages/Admin/Users/Show.tsx": () => import("./assets/Show-ClS4lk7B.js"), "./Pages/Auth/ConfirmPassword.tsx": () => import("./assets/ConfirmPassword-BR1JzOgb.js"), "./Pages/Auth/ForgotPassword.tsx": () => import("./assets/ForgotPassword-Box8aa_Q.js"), "./Pages/Auth/Login.tsx": () => import("./assets/Login-D6kL34nE.js"), "./Pages/Auth/Register.tsx": () => import("./assets/Register-6EyDso35.js"), "./Pages/Auth/ResetPassword.tsx": () => import("./assets/ResetPassword-hpa6oi9x.js"), "./Pages/Auth/VerifyEmail.tsx": () => import("./assets/VerifyEmail-9fTJTXo1.js"), "./Pages/Blog/Articles.tsx": () => import("./assets/Articles-BKtIb8ky.js"), "./Pages/Blog/Index.tsx": () => import("./assets/Index-BouDR5jB.js"), "./Pages/Blog/Search.tsx": () => import("./assets/Search-Dx-bDd9M.js"), "./Pages/Blog/Show.tsx": () => import("./assets/Show-DOZmU0lC.js"), "./Pages/Client/Dashboard.tsx": () => import("./assets/Dashboard-Se0oQVVI.js"), "./Pages/Dashboard.tsx": () => import("./assets/Dashboard-Cwx563hu.js"), "./Pages/Error.tsx": () => import("./assets/Error-DezopYaj.js"), "./Pages/Profile/Edit.tsx": () => import("./assets/Edit-CMiOa24H.js"), "./Pages/Profile/Partials/DeleteUserForm.tsx": () => import("./assets/DeleteUserForm-DyfxXCWO.js"), "./Pages/Profile/Partials/UpdatePasswordForm.tsx": () => import("./assets/UpdatePasswordForm-B20XK4bj.js"), "./Pages/Profile/Partials/UpdateProfileInformationForm.tsx": () => import("./assets/UpdateProfileInformationForm-Bp9-CMkL.js"), "./Pages/Welcome.tsx": () => import("./assets/Welcome-DSItyKBE.js") })
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
