// Toggle theme

var getTheme = window.localStorage && window.localStorage.getItem("theme");
const themeToggle = document.querySelector(".theme-toggle");
var metaThemeColor = document.querySelector("meta[name=theme-color]");

  //no theme specified, go with media preference. If no preference, go with dark
if (getTheme === null) {
  if (window.matchMedia('(prefers-color-scheme: light)').matches) {
    getTheme = 'light';
  }
  else {
    getTheme = 'dark';
  }
}

const isDark = getTheme === "dark";


if (getTheme !== null) {
  document.body.classList.toggle("dark-theme", isDark);
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
  window.localStorage &&
    window.localStorage.setItem(
      "theme",
      document.body.classList.contains("dark-theme") ? "dark" : "light",
    );
  document.body.classList.contains("dark-theme") ?
    metaThemeColor.setAttribute("content", "#252627") : metaThemeColor.setAttribute("content", "#fafafa");
  ;
});
