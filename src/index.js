import Dashboard from "./views/Dashboard.ts";
import Products from "./views/products/Products";
import Settings from "./views/Settings.ts";
import "./style/index.scss";

// nav bar
const handleNavLogic = () => {
  const menu = document.querySelector("#mobile-menu");
  const menuLinks = document.querySelector(".navbar__menu");
  const navLogo = document.querySelector("#navbar__logo");

  // Display Mobile Menu
  const mobileMenu = () => {
    menu.classList.toggle("is-active");
    menuLinks.classList.toggle("active");
  };

  menu.addEventListener("click", mobileMenu);
};

const pathToRegex = (path) =>
  new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

const getParams = (match) => {
  const values = match.result.slice(1);
  const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(
    (result) => result[1]
  );

  return Object.fromEntries(
    keys.map((key, i) => {
      return [key, values[i]];
    })
  );
};

const navigateTo = (url) => {
  window.history.pushState(null, null, url);
  router();
};

const router = () => {
  document.getElementById("root").innerHTML = "";

  const routes = [
    { path: "/", view: Dashboard },
    { path: "/products", view: Products },
    // { path: "/posts/:id", view: PostView },
    { path: "/settings", view: Settings },
  ];

  // Test each route for potential match
  const potentialMatches = routes.map((route) => {
    return {
      route: route,
      result: window.location.pathname.match(pathToRegex(route.path)),
    };
  });
  let match = potentialMatches.find(
    (potentialMatch) => potentialMatch.result !== null
  );

  if (!match) {
    match = {
      route: routes[0],
      result: [window.location.pathname],
    };
  }

  const view = new match.route.view(
    getParams(match),
    document.getElementById("root")
  );

  view.render();
};

window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (e) => {
    if (e.target.matches("[data-link]")) {
      e.preventDefault();
      navigateTo(e.target.href);
    }
  });
  document.querySelector("#navbar__logo").addEventListener("click", () => {
    if (document.body.className === "") {
      document.body.classList.toggle("dark-mode");
    } else {
      document.body.className = "";
    }
  });

  router();
  handleNavLogic();
});
