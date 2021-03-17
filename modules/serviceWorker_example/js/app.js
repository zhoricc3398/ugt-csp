const container = document.querySelector(".container")
const coffees = [
  { name: "Perspiciatis", image: "images/coffee1.jpg" },
  { name: "Voluptatem", image: "images/coffee2.jpg" },
  { name: "Explicabo", image: "images/coffee3.jpg" }
]


const showCoffees = () => {
  let output = ""
  coffees.forEach(
    ({ name, image }) =>
    (output += `
              <div class="card">
                <img class="card--avatar" src=${image} />
                <h1 class="card--title">${name}</h1>
                <a class="card--link" href="#">Taste</a>
              </div>
              `)
  )
  container.innerHTML = output
}

document.addEventListener("DOMContentLoaded", showCoffees);



if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("https://zhoricc3398.github.io/ugt-csp/modules/serviceWorker_example/serviceWorker.js")
      .then(res => console.log("service worker registered"))
      .catch(err => console.log("service worker not registered", err))
  })
} else {
  console.warn('service worker not supported');
}


var book = null;

var width = 600;
var height = 600;

var Rendition;

var url = 'https://zhoricc3398.github.io/ugt-csp/assets/test.epub';

// document.getElementById('bookChooser').addEventListener('change', function (e) {

fetch(url)
  .then((response) => response.blob())
  .then((responseJson) => {
    console.log(responseJson);


    var firstFile = responseJson;

    if (window.FileReader) {

      var reader = new FileReader();

      reader.onload = function (e) {

        // console.log(e);

        book = ePub(firstFile);

        Rendition = book.renderTo("area");

        //getting cover
        // book.coverUrl().then((result) => {
        // 	document.getElementById('cover').setAttribute('src', result);
        // })

        Rendition.display();

        /* Replace area with the id for your div to put the book in */
      };

      reader.readAsArrayBuffer(firstFile);

      reader.onloadend = (e) => {
        console.log(book);
      }

    } else {
      alert('Your browser does not support the required features. Please use a modern browser such as Google Chrome, or Mozilla Firefox');
    }
    // });
  })
  .catch((error) => {
    console.error(error);
  });

// next page
document.getElementById('nextPage').addEventListener('click', () => {
  // next page
  Rendition.next();
});

// prev page
document.getElementById('prevPage').addEventListener('click', () => {
  // next page
  Rendition.prev();
});