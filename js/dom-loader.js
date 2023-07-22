const DATA_URL = "/data/events.json";
// "https://www.mintcaster.xyz/minicaster/data/events.json";

const wrapper = document.getElementById("wrapper");
const loader = document.getElementById("loader");
const gridBody = document.getElementById("gridBody");
const DateTime = luxon.DateTime;

function PopupController() {
  const popup = document.getElementById("popup");
  const popupInner = popup.querySelector(".popUp__inner");
  const popupContent = document.getElementById("popupContent");

  this.close = () => {
    document.body.classList.remove("active");
    popup.classList.remove("active");
  };
  this.open = () => {
    document.body.classList.add("active");
    popup.classList.add("active");
  };
  popup.onclick = ({ target }) => {
    if (target === popup) this.close();
  };
  popupInner.onclick = ({ target }) => {
    if (target === popupInner) this.close();
  };
  this.fire = ({ innerElement, createInnerElement }) => {
    popupContent.innerHTML = "";
    let innerNode = createInnerElement();
    if (innerNode) popupContent.append(innerNode);

    const closeBtn = popupContent.querySelector(".close");
    if (closeBtn) closeBtn.onclick = () => this.close();
    this.open();
  };
}
const popupController = new PopupController();

function TimerController(date, showOnce) {
  this.date = date;
  this.timeInterval = 30000; // ms
  this.nextInterval = null;

  this.wrapper = document.createElement("div");
  this.dayElement = document.createElement("span");
  this.hourElement = document.createElement("span");
  this.minutesElement = document.createElement("span");

  this.wrapper.className = "gridItem__image-date";
  this.dayElement.className = "date date--day";
  this.hourElement.className = "date date--hour";
  this.minutesElement.className = "date date--minutes";

  this.setTime = (date) => {
    let diff =
      date && !date.invalid
        ? date.diff(DateTime.now(), ["days", "hours", "minutes"]).toObject()
        : null;
    this.dayElement.innerText = `${parseInt(diff.days)}d`;
    this.hourElement.innerText = `${parseInt(diff.hours)}h`;
    this.minutesElement.innerText = `${parseInt(diff.minutes)}m `;
  };

  this.counter = (ms) => {
    if (ms >= this.nextInterval) {
      this.setTime(this.date);
      this.nextInterval = ms + this.timeInterval;
    }

    requestAnimationFrame(this.counter);
  };

  if (!showOnce) requestAnimationFrame(this.counter);
  else this.setTime(this.date);
  this.wrapper.append(this.dayElement, this.hourElement, this.minutesElement);

  // this.wrapper.prototype.startCounter = () => {
  //   requestAnimationFrame(this.counter);
  // };
  return this.wrapper;
}

function CardsController() {
  const createImage = ({ url, mint, onClick, isModal }) => {
    const imgWrapper = document.createElement("div");
    imgWrapper.className = "gridItem__image";
    let date = mint
      ? DateTime.fromFormat(mint, "MMMM dd, yyyy - hh.mm a")
      : null;

    imgWrapper.innerHTML += `<div class="ratioImage"><img src="${url}" alt=""></div>`;

    if (mint.toLowerCase() === "minting")
      imgWrapper.innerHTML += `<h6 class="gridItem__image-info _sm">${mint.toUpperCase()}</h6>`;
    else if (date && !date.invalid) {
      let counter = new TimerController(date, isModal);
      imgWrapper.appendChild(counter);
    } else {
      imgWrapper.innerHTML += `<h6 class="gridItem__image-info _sm">${mint.toUpperCase()}</h6>`;
      console.log(!date, date.invalid, mint.toLowerCase() === "minting", mint);
    }

    if (isModal) imgWrapper.innerHTML += `<div class="close"></div>`;
    if (onClick) imgWrapper.onclick = onClick;

    return imgWrapper;
  };
  const createCardContent = ({ wrapper, data, onClick, isModal }) => {
    const info = document.createElement("div");
    const links = document.createElement("div");
    const button = document.createElement("a");

    info.className = "gridItem__info";
    links.className = "gridItem__info-box";

    button.className = "button button--secondary";
    button.innerHTML += `<span class="text">${data.button}</span>`;
    button.href = data.link;

    wrapper.append(
      createImage({
        url: data.image,
        mint: data.mint,
        onClick,
        isModal,
      })
    );

    info.innerHTML += `
    <h5 class="gridItem__info-title">${data.title}</h5>
    <h6 class="gridItem__info-subtitle _sm">Chain: ${data.blockchain}</h6>
    <h6 class="gridItem__info-subtitle _sm">Supply: ${data.supply}</h6>
    <h6 class="gridItem__info-subtitle _sm">Price: ${data.price}</h6>
    <p class="gridItem__info-text ${isModal ? "_full" : ""}">${
      data.description
    }</p>`;

    if (data.website)
      links.innerHTML += `
    <a href="${data.websit}" class="button button--ico">
        <span class="ico"><img src="./images/icons/globus.png" alt=""></span>
    </a>`;
    if (data.discord)
      links.innerHTML += `
    <a href="${data.discord}" class="button button--ico">
    <span class="ico"><img src="./images/icons/discord.png" alt=""></span>
    </a>`;
    if (data.twitter)
      links.innerHTML += `
    <a href="${data.twitter}" class="button button--ico">
    <span class="ico">
        <img src="./images/icons/twitter.png" alt="">
    </span>
    </a>`;
    info.querySelector(".gridItem__info-title").onclick = () => onClick();
    info.append(button, links);
    wrapper.append(info);
  };
  this.createPopupCard = (data) => {
    const gridItem = document.createElement("div");
    gridItem.className = "gridItem _modal";

    createCardContent({
      wrapper: gridItem,
      data,
      isModal: true,
    });
    return gridItem;
  };
  this.createCard = (data) => {
    const gridItem = document.createElement("div");
    gridItem.className = "gridItem zoomIn";

    createCardContent({
      wrapper: gridItem,
      data,
      onClick: () => {
        popupController.fire({
          createInnerElement: () => this.createPopupCard(data),
        });
      },
    });
    return gridItem;
  };
  this.appendCards = (wrapper, dataList) => {
    dataList.forEach((itemData) => {
      wrapper.appendChild(this.createCard(itemData));
    });
  };
  this.updateCards = (wrapper, dataList) => {
    wrapper.innerHTML = "";
    this.appendCards(wrapper, dataList);
  };
}
function TabsController() {
  const tabEvents = document.querySelectorAll("[data-toggle]");
  const tabs = document.querySelectorAll(".collapse");

  this.updateLoadMore = () => {};

  const setActiveTab = (id) => {
    let activeTab = null;
    tabEvents.forEach((button) => {
      let tabId = button.dataset.toggle;
      button.className =
        tabId === id ? "button button--primary" : "button button--border";
    });
    tabs.forEach((tab) => {
      tab.classList.toggle("active", tab.id === id);
      activeTab = tab.id === id ? tab : activeTab;
    });
    this.updateLoadMore(id, activeTab);
  };

  this.setUpdateLoadMore = (callback) => {
    this.updateLoadMore = callback;
    setActiveTab(tabEvents[0].dataset.toggle, tabs[0]);
  };

  tabEvents.forEach((button) => {
    button.onclick = () => setActiveTab(button.dataset.toggle);
  });
}

function DomController({ data, loadBy }) {
  const cards = new CardsController();
  const tabs = new TabsController();

  const featuredWrapper = document.getElementById("featured");
  const mintingWrapper = document.getElementById("minting");
  const upcomingWrapper = document.getElementById("upcoming");
  const loadMore = document.getElementById("loade-more");

  this.featured = data.featured;
  this.minting = data.minting;
  this.upcoming = data.upcoming.sort((a, b) => {
    let aMint = DateTime.fromFormat(a.mint, "MMMM dd, yyyy - hh.mm a");
    let bMint = DateTime.fromFormat(b.mint, "MMMM dd, yyyy - hh.mm a");

    if (aMint && bMint) {
      return aMint.ts - bMint.ts;
    }
    return undefined;
  });

  cards.updateCards(featuredWrapper, this.featured);
  cards.updateCards(mintingWrapper, [...this.minting].splice(0, loadBy));
  cards.updateCards(upcomingWrapper, [...this.upcoming].splice(0, loadBy));

  tabs.setUpdateLoadMore((id, activeTab) => {
    const checkAndDisableLoadMore = (childrenLength) => {
      const children = activeTab.querySelectorAll(".gridItem");
      let length = childrenLength ?? children.length;

      if (length >= this[id].length) {
        loadMore.style.display = "none";
        loadMore.onclick = null;
        return false;
      }
      return true;
    };

    if (!checkAndDisableLoadMore()) return;
    loadMore.style.display = "";
    loadMore.onclick = () => {
      const children = activeTab.querySelectorAll(".gridItem");
      let n = children.length + loadBy;
      cards.appendCards(
        activeTab,
        [...this[id]].splice(children.length, loadBy)
      );
      checkAndDisableLoadMore(n);
    };
  });
}

const initAll = () => {
  wrapper.style.display = "none";
  const onFetch = (data) => {
    new DomController({
      data,
      loadBy: 6,
    });

    wrapper.style.display = "";
    loader.style.display = "none";
  };
  fetch(DATA_URL)
    .then((response) => response.json())
    .then(onFetch);
};

initAll();
