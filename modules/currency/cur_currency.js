var cur_wrapper_home = document.getElementById("home");
var cur_wrapper_catalogue = document.getElementById("catalogue");

if (cur_wrapper_home || cur_wrapper_catalogue) {
  var cur_container = document.getElementsByClassName("price-details");
  cur_container = [...cur_container];

  function cur_event(event) {
    const container = event.target.closest(".price-details");
    const priceElem = container
      .getElementsByClassName("price")[0]
      ?.getElementsByTagName("div")[0]
      ?.getElementsByTagName("span")[1];

    if (!priceElem) return;

    const rawText = priceElem.innerText.trim();
    const rate = USD_TO_GEL;
    const isActive = container.classList.contains("active");

    if (isActive) {
      // ლარი → დოლარი
      const gel = cur_format(rawText);
      const usd = gel / rate;
      priceElem.innerText = `$${usd.toFixed(2)}`;
      container.classList.remove("active");
    } else {
      // დოლარი → ლარი
      const usd = cur_format(rawText);
      const gel = usd * rate;
      priceElem.innerText = `${gel.toFixed(2)} ₾`;
      container.classList.add("active");
    }

    if (!container.hasAttribute("gel-currency")) {
      container.setAttribute("gel-currency", (cur_format(rawText) * rate).toFixed(2));
    }
  }

  function cur_append_transformer_button_home() {
    cur_container.forEach((x) => {
      var elem = document.createElement("div");
      elem.setAttribute("class", "currency-transformer-container");
      elem.innerText = isLoggedIn() ? "Georgian Lari" : "United States Dollar";
      elem.onclick = function (e) {
        cur_event(e);
      };
      x.appendChild(elem);
    });
  }

  function cur_append_transformer_button_catalogue() {
    cur_container.forEach((x) => {
      var elem = document.createElement("div");
      elem.setAttribute("class", "currency-transformer-container");
      elem.innerText = isLoggedIn() ? "Georgian Lari" : "United States Dollar";

      x.offsetParent.getElementsByClassName("product")[0].onclick = function (
        e
      ) {
        cur_restart_event_from_preview();
      };

      x.appendChild(elem);
    });
  }

  function cur_restart_event_from_preview() {
    var i = 0;
    var interval = setInterval(() => {
      i++;
      var elemContainer;

      if (window.innerWidth < 992) {
        elemContainer = document
          .getElementsByClassName("modal-body")[0]
          .getElementsByClassName("currency-transformer-container")[0];
      } else {
        elemContainer = document
          .getElementById("preview-placeholder")
          .getElementsByClassName("currency-transformer-container")[0];
      }

      if (i === 100) {
        clearInterval(interval);
      }

      elemContainer.onclick = function (e) {
        cur_event(e);
        clearInterval(interval);
      };
    }, 100);
  }

  function cur_format(value) {
    let numericPart = value.replace(/[^\d.,]/g, "").replace(",", ".");
    let num = Number(numericPart);
    return isNaN(num) ? 0 : num;
  }

  if (cur_wrapper_home) {
    cur_append_transformer_button_home();
  } else {
    cur_append_transformer_button_catalogue();
  }
}
