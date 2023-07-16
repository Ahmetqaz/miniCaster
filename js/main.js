var menu = document.getElementById("menu");
var menuBtn = document.getElementById("menuBtn");
var body = document.body;

const closeMenu = () => {
  menu.classList.remove("active");
  menuBtn.classList.remove("active");
  body.classList.remove("active");
};

menuBtn.onclick = function () {
  menu.classList.toggle("active");
  menuBtn.classList.toggle("active");
  body.classList.toggle("active");
};
window.onclick = function (event) {
  if (event.target == menu) {
    closeMenu();
  }
};

const header = document.getElementById("header");
if (header)
  window.addEventListener("scroll", () => {
    if (document.documentElement.scrollTop > 400) {
      header.classList.add("sticky");
    } else {
      header.classList.remove("sticky");
    }
  });

///
///
/// slick slider

///
///
/// tabEvents
const toggleBody = (isClosed) => {
  if (isClosed) {
    document.body.classList.add("active");
    if (menu) closeMenu();
  } else {
    document.body.classList.remove("active");
  }
};
document.querySelectorAll(`[data-event="tabEvent"]`).forEach((eventBtn) => {
  const tab = document.querySelector(eventBtn.getAttribute("data-tab"));
  if (tab) {
    eventBtn.onclick = (e) => {
      e.preventDefault();
      tab.classList.toggle("active");
      toggleBody(tab.classList.contains("active"));
    };
    tab.onclick = (e) => {
      if (e.target === e.currentTarget) {
        tab.classList.toggle("active");
        toggleBody(tab.classList.contains("active"));
      }
    };
  }
});
document.querySelectorAll(`[data-toggle]`).forEach((toggleBtn) => {
  console.log("btn ->");
  toggleBtn.onclick = () =>
    toggleBtn.classList.toggle(toggleBtn.getAttribute("data-toggle"));
});
///
///
///
///WOW JS
// new WOW().init({
//   boxClass: "wow",
// });
// const tabBtn = document.querySelectorAll(".tabBtn");
// const tabEvent = document.querySelectorAll(".tabEvent");
// tabBtn.forEach((e) => {
//   onTabClick(tabBtn, tabEvent, e);
// });
// function onTabClick(tabBtns, tabItems, item) {
//   item.addEventListener("click", function (e) {
//     let currentBtn = item;
//     let tabId = currentBtn.getAttribute("data-tab");
//     let currentTab = document.querySelector(tabId);
//     if (currentBtn.classList.contains("active")) {
//       console.log("now active");
//       const faq = currentBtn.parentElement.querySelector(".tabEvent");
//       if (faq) {
//         faq.classList.remove("active");
//         currentBtn.classList.remove("active");
//       }
//     } else if (!currentBtn.classList.contains("active")) {
//       tabBtns.forEach(function (item) {
//         item.classList.remove("active");
//       });

//       tabItems.forEach(function (item) {
//         item.classList.remove("active");
//       });
//       currentBtn.classList.add("active");
//       currentTab.classList.add("active");
//     }
//   });
// }