"use strict";

window.addEventListener("DOMContentLoaded", function () {
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
      tabContents[i].classList.remove("show","fade");
      tabContents[i].classList.add("hide");
      tabHeaders[i].classList.remove("tabheader__item_active");
    }
  }

  // function for showing current tab and adding active class for current header
  function showTabContentsAndActiveClasses(i = 0) {
    // tabContents[i].style.display = "block";
    // tabHeaders[i].classList.add("tabheader__item_active");

    tabContents[i].classList.remove("hide");
    tabContents[i].classList.add("show" ,"fade");
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
});
