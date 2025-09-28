"use strict";

window.addEventListener("DOMContentLoaded", function () {
  // tabs start
  const tabHeadersParent = document.querySelector(".tabheader__items");
  const tabHeaders = tabHeadersParent.querySelectorAll(".tabheader__item");
  const tabContents = document.querySelectorAll(".tabcontent");

  // function for hiddening all tabs and all active classes
  function hideTabContentsAndActiveClasses() {
    // tabContents.forEach((item) =>{
    //     item.style.display = "none"
    // })
    // tabHeaders.forEach((item) =>{
    //     item.classList.remove("tabheader__item_active")
    // })

    for (let i = 0; i < tabContents.length; i++) {
      // tabContents[i].style.display = "none";
      // tabHeaders[i].classList.remove("tabheader__item_active");
      tabContents[i].classList.remove("show", "fade");
      tabContents[i].classList.add("hide");
      tabHeaders[i].classList.remove("tabheader__item_active");
    }
  }

  // function for showing current tab and adding active class for current header
  function showTabContentsAndActiveClasses(i = 0) {
    // tabContents[i].style.display = "block";
    // tabHeaders[i].classList.add("tabheader__item_active");

    tabContents[i].classList.remove("hide");
    tabContents[i].classList.add("show", "fade");
    tabHeaders[i].classList.add("tabheader__item_active");
  }

  hideTabContentsAndActiveClasses();
  showTabContentsAndActiveClasses();

  // event delegation
  tabHeadersParent.addEventListener("click", (e) => {
    if (e.target && e.target.matches(".tabheader__item")) {
      for (let i = 0; i < tabHeaders.length; i++) {
        if (e.target == tabHeaders[i]) {
          hideTabContentsAndActiveClasses();
          showTabContentsAndActiveClasses(i);
        }
      }
    }
  });

  //tabs end

  //timer start
  const endTime = "2025-12-31 23:59:59";

  function getTimeRemaining(endTime) {
    const total = Date.parse(endTime) - Date.parse(new Date());

    let days, hours, minutes, seconds;

    if (total <= 0) {
      days = 0;
      hours = 0;
      minutes = 0;
      seconds = 0;
    } else {
      days = Math.floor(total / (1000 * 60 * 60 * 24));
      hours = Math.floor((total / (1000 * 60 * 60)) % 24);
      minutes = Math.floor((total / 1000 / 60) % 60);
      seconds = Math.floor((total / 1000) % 60);
    }
    return { total, days, hours, minutes, seconds };
  }

  function setZero(n) {
    return n >= 0 && n < 10 ? `0${n}` : n;
  }

  function setClock(selector, endTime) {
    const timer = document.querySelector(selector);
    const daysElem = timer.querySelector("#days");
    const hoursElem = timer.querySelector("#hours");
    const minutesElem = timer.querySelector("#minutes");
    const secondsElem = timer.querySelector("#seconds");

    const timeInterval = setInterval(updateClock, 1000);
    updateClock();

    function updateClock() {
      const { total, days, hours, minutes, seconds } =
        getTimeRemaining(endTime);
      daysElem.textContent = setZero(days);
      hoursElem.textContent = setZero(hours);
      minutesElem.textContent = setZero(minutes);
      secondsElem.textContent = setZero(seconds);

      // modified part for changing color of seconds
      if (secondsElem.textContent === "00") {
        secondsElem.style.color = "darkgreen";
      } else {
        secondsElem.style.color = "darkred";
      }

      if (total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }

  setClock(".timer", endTime);

  //timer end

  //modal start
  // taking all required elements
  const openModalTriggers = document.querySelectorAll("[data-modal-open]");
  const closeModalTrigger = document.querySelector("[data-modal-close]");
  const modal = document.querySelector(".modal");

  const modalTimerId = setTimeout(openModal, 320000);

  //using close function
  function closeModal() {
    modal.classList.remove("show");
    modal.classList.add("hidden");
    document.body.style.overflowY = "auto";
    clearTimeout(modalTimerId);
  }

  //using open function
  function openModal() {
    if (modal.classList.contains("hidden")) {
      modal.classList.remove("hidden");
      modal.classList.add("show");
      document.body.style.overflowY = "hidden";
      clearTimeout(modalTimerId);
    }
  }

  function showModalByScroll() {
    if (
      window.scrollY + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight - 1
    ) {
      openModal();
      window.removeEventListener("scroll", showModalByScroll);
    }
  }

  if (!modal.matches(".hidden") && !modal.matches(".show")) {
    modal.classList.add("hidden");
  }

  openModalTriggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      if (modal.classList.contains("hidden")) {
        openModal();
      }
    });
  });

  closeModalTrigger.addEventListener("click", () => {
    if (modal.classList.contains("show")) {
      closeModal();
    }
  });

  //using event delegation
  modal.addEventListener("click", (e) => {
    if (
      (e.target && e.target === modal) ||
      e.target.getAtribute("[data-modal-close]")
    ) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.matches(".show")) {
      closeModal();
    }
  });

  window.addEventListener("scroll", showModalByScroll);

  // modal end

  //Menu Cards start

  class MenuCard {
    constructor(coverSrc, coverAlt, title, descr, price, parentSelector) {
      this.coverSrc = coverSrc;
      this.coverAlt = coverAlt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.parentSelector = document.querySelector(parentSelector);
      this.usdRate = 41.25;
      this.changeToUAH();
    }
    changeToUAH() {
      this.price = this.price * this.usdRate;
    }
    render() {
      const elem = document.createElement("div");
      const { coverSrc, coverAlt, title, descr, price } = this;

      elem.innerHTML = `
      <div class="menu__item">
          <img src="${coverSrc}" alt="${coverAlt}" />
          <h3 class="menu__item-subtitle">${title}</h3>
          <div class="menu__item-descr">${descr}</div>
          <div class="menu__item-divider"></div>
          <div class="menu__item-price">
          <div class="menu__item-cost">Цена:</div>
          <div class="menu__item-total"><span>${price.toFixed(
            2
          )}</span> грн/день</div>
          </div>
        </div>`;
      this.parentSelector.append(elem);
    }
  }

  new MenuCard(
    "img/tabs/vegy.jpg",
    "vegy",
    'Меню "Фитнес"',
    ` 'Меню "Фитнес" - это новый подход к приготовлению блюд: 
     больше свежих овощей и фруктов. Продукт активных и здоровых людей. 
     Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',     
     `,
    5.55,
    ".menu__field .container"
  ).render();

  new MenuCard(
    "img/tabs/elite.jpg",
    "elite",
    "Меню “Премиум”",
    `В меню “Премиум” мы используем не только красивый дизайн упаковки, 
    но и качественное исполнение блюд. Красная рыба, морепродукты,
    фрукты - ресторанное меню без похода в ресторан!`,
    13.33,
    ".menu__field .container"
  ).render();

  new MenuCard(
    "img/tabs/post.jpg",
    "post",
    'Меню "Постное"',
    `Меню “Постное” - это тщательный подбор ингредиентов: 
    полное отсутствие продуктов животного происхождения,молоко из миндаля,
    овса, кокоса или гречки, правильное количество белков за счет тофу
    и импортных вегетарианских стейков.`,
    10.43,
    ".menu__field .container"
  ).render();

  //Menu Cards end

  // forms start

  // take all forms
  const forms = document.querySelectorAll("form");
  forms.forEach((form) => {
    postData(form);
  });

  const MESSAGES = {
    loading: "Загрузка...",
    success: "Спасибо! Скоро мы с вами свяжемся",
    failure: "Что-то пошло не так... Попробуйте еще раз",
  };

  function postData(form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const loading = document.createElement("div");
      loading.style.cssText = `      
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      font-size: 16px;
      margin-top: 16px;`;
      loading.innerHTML = `<img src="icons/spinner.svg" style="width: 16px;height: 16px;"/> <span>${MESSAGES.loading}</span>`;
      form.insertAdjacentElement("beforeend", loading);

      const formData = new FormData(e.target);

      const request = new XMLHttpRequest();
      request.open("POST", "http://localhost:4200/support/");
      request.setRequestHeader("Content-Type", "application/json");

      // converting formData to JSON

      request.send(JSON.stringify(Object.fromEntries(formData)));
      e.target.reset();

      // request.send(formData);
      request.addEventListener("load", (e) => {
        if (request.status === 200) {
          //console.log(request.response);
          //console.log("Успех:", request.response);
          //form.insertAdjacentHTML("beforeend", `<p>${MESSAGES.success}</p>`);

          ShowResponseModal(MESSAGES.success, loading);
        } else {
          //console.error("Ошибка:", request.status);
          //form.insertAdjacentHTML("beforeend", `<p>${MESSAGES.failure}</p>`);

          ShowResponseModal(MESSAGES.failure, loading);
        }
      });
    });
  }

  // showing modal window with response message
  function ShowResponseModal(message, loading) {
    loading.remove();
    // hiding previous modal window
    const prevModalDialog = document.querySelector(".modal__dialog");
    prevModalDialog.classList.add("hide");
    openModal();

    // creating new modal window
    const responseModal = document.createElement("div");
    responseModal.classList.add("modal__dialog");
    responseModal.innerHTML = `
    <div class="modal__content">          
            <div data-modal-close class="modal__close">&times;</div>
            <div class="modal__title">
              ${message}
            </div>                 
        </div>
    `;
    modal.append(responseModal);

    const srmId = setTimeout(() => {
      responseModal.remove();
      prevModalDialog.classList.remove("hide");
      prevModalDialog.classList.add("show");
      clearTimeout(srmId);
      closeModal();
    }, 2500);
  }

  //forms end


  //slider start
    
  // slider
  const slides = document.querySelectorAll(".offer__slide");
  const prevBtn = document.querySelector(".offer__slider-prev");
  const nextBtn = document.querySelector(".offer__slider-next");
  const total = document.querySelector("#total");
  const current = document.querySelector("#current");

  let slideIndex = 1;

  //total.textContent = slides.length < 10 ? `0${slides.length}` : slides.length;

  function setCurrentAndTotal(block,index) {
    if (slides.length < 10) {     
      block.textContent = `0${index}`;
    } else {
      block.textContent = index;
    }
  }

  // showSlides(slideIndex);
  function showSlides(n) {
    console.log(slides);
    if (n > slides.length) {
      slideIndex = 1;
    }
    if (n < 1) {
      slideIndex = slides.length;
    }

    // hide all slides
    slides.forEach((slide) => {      
      slide.classList.add("hide");
      slide.classList.remove("show" ,"fade");
    });
    slides[slideIndex - 1].classList.remove("hide");
    slides[slideIndex - 1].classList.add("show", "fade");   
    
    setCurrentAndTotal(current,slideIndex);

    // current.textContent = slideIndex < 10 ? `0${slideIndex}` : slideIndex;
    // total.textContent = slides.length < 10 ? `0${slides.length}` : slides.length;
  }
  // initial call
  function changeSlidesN(n) {
    showSlides((slideIndex += n));
  }

  changeSlidesN(0)
  setCurrentAndTotal(total,slides.length);
  // showSlides(slideIndex);
  prevBtn.addEventListener("click", () => {
    changeSlidesN(-1);
  });
  nextBtn.addEventListener("click", () => {
    changeSlidesN(1);
  });

setZero(n)

//slider end

});
