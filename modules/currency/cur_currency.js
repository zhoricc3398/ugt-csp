var cur_wrapper_home = document.getElementById("home");
var cur_wrapper_catalogue = document.getElementById("catalogue");


console.log("v=1");

if (cur_wrapper_home || cur_wrapper_catalogue) {
  function cur_event(event) {
    const container = event.target.closest(".price-details");
    if (!container) return;

    const priceElem = container
      .getElementsByClassName("price")[0]
      ?.getElementsByTagName("div")[0]
      ?.getElementsByTagName("span")[1];

    if (!priceElem) return;

    const rawText = priceElem.innerText.trim();
    const rate = USD_TO_GEL;

    const isLari = rawText.includes("₾");
    const isUsd = rawText.includes("$");

    const current = cur_format(rawText);
    let newValue = "";

    if (isLari) {
      newValue = `$${(current / rate).toFixed(2)}`;
      container.classList.remove("active");
    } else if (isUsd) {
      newValue = `${(current * rate).toFixed(2)} ₾`;
      container.classList.add("active");
    } else {
      return; // ვალუტის სიმბოლო ვერ მოიძებნა
    }

    priceElem.innerText = newValue;

    if (!container.hasAttribute("gel-currency")) {
      container.setAttribute("gel-currency", (cur_format(rawText) * rate).toFixed(2));
    }
  }

  function cur_append_transformer_buttons() {
    const containers = document.querySelectorAll(".price-details");

    containers.forEach((x) => {
      if (x.querySelector(".currency-transformer-container")) return;

      var elem = document.createElement("div");
      elem.setAttribute("class", "currency-transformer-container");
      elem.innerText = isLoggedIn() ? "Georgian Lari" : "United States Dollar";
      elem.onclick = function (e) {
        cur_event(e);
      };
      x.appendChild(elem);
    });
  }

  function cur_bind_preview_button() {
    const previewWrapper = document.getElementById("product-preview-selected-pricedetails");
    if (!previewWrapper) return;

    const btn = previewWrapper.querySelector(".currency-transformer-container");
    if (!btn) return;

    btn.onclick = function (e) {
      cur_event(e);
    };
  }

  function cur_restart_event_from_preview() {
    var i = 0;
    var interval = setInterval(() => {
      i++;

      cur_bind_preview_button();

      const container = document.getElementById("product-preview-selected-pricedetails");
      if (container?.classList.contains("currency-loaded") || i === 100) {
        clearInterval(interval);
      } else {
        container?.classList.add("currency-loaded");
      }
    }, 100);
  }

  function cur_format(value) {
    let numericPart = value.replace(/[^\d.,]/g, "").replace(",", ".");
    let num = Number(numericPart);
    return isNaN(num) ? 0 : num;
  }

  // პირველადი რენდერი
  cur_append_transformer_buttons();
  cur_bind_preview_button();

  if (cur_wrapper_catalogue) {
    const observer = new MutationObserver(() => {
      cur_append_transformer_buttons();
    });

    observer.observe(cur_wrapper_catalogue, { childList: true, subtree: true });
  }
}
