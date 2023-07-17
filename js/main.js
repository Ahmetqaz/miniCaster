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

const gridBody = document.getElementById("gridBody");
const data = [
  {
    imageSource: "./images/grid-image.png",
    imageDate: "added",
    title: "CryptoCommas",
    "subTitle-1": "Chain: Polygon",
    "subTitle-2": "Supply: 999",
    "subTitle-3": "Price: 9 MATIC",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam non ornare eros. Ut pharetra ornarelorem, sit amet bibendum quam imperdiet ut. Lorem ipsum dolor sit amet, consectetur adipiscing elit.Nullam non ornare eros.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam non ornareeros. Ut pharetra ornare lorem, sit amet bibendum quam imperdiet ut. Lorem ipsum dolor sit amet,consectetur adipiscing elit. Nullam non ornare eros.",
    buttonText: "Mint Here",
  },
  {
    imageSource: "./images/grid-image.png",
    imageDate: "added",
    title: "CryptoCommas",
    "subTitle-1": "Chain: Polygon",
    "subTitle-2": "Supply: 999",
    "subTitle-3": "Price: 9 MATIC",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam non ornare eros. Ut pharetra ornarelorem, sit amet bibendum quam imperdiet ut. Lorem ipsum dolor sit amet, consectetur adipiscing elit.Nullam non ornare eros.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam non ornareeros. Ut pharetra ornare lorem, sit amet bibendum quam imperdiet ut. Lorem ipsum dolor sit amet,consectetur adipiscing elit. Nullam non ornare eros.",
    buttonText: "Mint Here",
  },
  {
    imageSource: "./images/grid-image.png",
    imageDate: "added",
    title: "CryptoCommas",
    "subTitle-1": "Chain: Polygon",
    "subTitle-2": "Supply: 999",
    "subTitle-3": "Price: 9 MATIC",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam non ornare eros. Ut pharetra ornarelorem, sit amet bibendum quam imperdiet ut. Lorem ipsum dolor sit amet, consectetur adipiscing elit.Nullam non ornare eros.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam non ornareeros. Ut pharetra ornare lorem, sit amet bibendum quam imperdiet ut. Lorem ipsum dolor sit amet,consectetur adipiscing elit. Nullam non ornare eros.",
    buttonText: "Mint Here",
  },
];

data.forEach((item) => {
  gridBody.innerHTML += `
<div class="gridItem">
              <div class="gridItem__image">
                <div class="ratioImage ratioImage--contain">
                  <img src="${item.imageSource}" alt="">
                </div>
                <h6 class="gridItem__image-info _sm">
                ${item.imageDate}
                </h6>
              </div>
              <div class="gridItem__info">
                <h5 class="gridItem__info-title">
                ${item.title}
                </h5>
                <h6 class="gridItem__info-subtitle _sm">
                ${item["subTitle-1"]}
                </h6>
                <h6 class="gridItem__info-subtitle _sm">
                ${item["subTitle-2"]}
                </h6>
                <h6 class="gridItem__info-subtitle _sm">
                ${item["subTitle-3"]}
                </h6>
                <p class="gridItem__info-text">
                ${item.text}
                </p>
                <button class="button button--secondary">
                  <span class="text">
                  ${item.buttonText}
                  </span>
                </button>
                <div class="gridItem__info-box">
                  <a href="#" class="button button--ico">
                    <span class="ico">
                      <img src="./images/icons/globus.png" alt="">
                    </span>
                  </a>
                  <a href="https://discord.gg/vuCGBHMEZG" class="button button--ico">
                    <span class="ico">
                      <img src="./images/icons/discord.png" alt="">
                    </span>
                  </a>
                  <a href="https://twitter.com/AP3ST3RNFT" class="button button--ico">
                    <span class="ico">
                      <img src="./images/icons/twitter.png" alt="">
                    </span>
                  </a>
                </div>
              </div>
            </div>
`;
});
console.log(data);
