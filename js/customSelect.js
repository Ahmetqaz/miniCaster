const customSelectInit = ({
  selectClassName,
  selectedClassName,
  optionsWrapperClassName,
  hideSelected = true,
  onStateChange = () => {},
}) => {
  document.querySelectorAll(`.${selectClassName}`).forEach((select) => {
    const input = select.querySelector("input[type='hidden']");
    const selected = select.querySelector(`.${selectedClassName}`);
    const options = select.querySelector(`.${optionsWrapperClassName}`);

    const clickEventHandler = (event) => {
      if (!select.contains(event.target)) {
        closeSelect();
      }
    };

    const closeSelect = () => {
      select.classList.remove("active");
      window.removeEventListener("click", clickEventHandler);
    };
    const setSelected = (li) => {
      if (!li || !input) {
        console.log("no input or invalid selcted option");
        return;
      }
      input.value = li.getAttribute("data-value");
      selected.innerHTML = li.innerHTML;
      input.dispatchEvent(new Event("change"));
      if (hideSelected) {
        options.querySelectorAll("li").forEach((item, index) => {
          item.style = "";
        });
        li.style = "display: none";
      }
      select.classList.add("selected");
    };

    select.onclick = () => {
      const isOpen = select.classList.contains("active");
      onStateChange(!isOpen, select);

      if (isOpen) {
        closeSelect();
      } else {
        select.classList.add("active");
        window.addEventListener("click", clickEventHandler);
      }
    };

    options.querySelectorAll("li").forEach((li, index) => {
      if (select.getAttribute("data-default-index") === index) setSelected(li);
      if (li.getAttribute("data-default")) {
        li.removeAttribute("data-default");
        setSelected(li);
      }

      li.onclick = () => setSelected(li);
    });
  });
};

customSelectInit({
  selectClassName: "input--select",
  selectedClassName: "input__selected",
  optionsWrapperClassName: "input__dropdown",
});
