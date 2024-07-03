// ! =============> When Start ===============>

const searchParams = location.search;
const params = new URLSearchParams(searchParams);
const mode = document.getElementById("mode");

const id = params.get("id");

const detailsData = document.getElementById("detailsData");

let containerDetails = {
};

(async function () {
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "8dd89ae0e1mshf80784a0cd2c65cp1c9f91jsn1511c2580d83",
      "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
    },
  };

  const api = await fetch(
    `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}}`,
    options
  );

  const responseDetails = await api.json();

  containerDetails = responseDetails;

  showDetails();
})();

function showDetails() {
  const detailsBox = `
      <div class="col-md-4 pt-4">
         <figure>
            <img src="${containerDetails.thumbnail}" class="w-100" alt="details image" />
         </figure>
      </div>
      <div class="col-md-8">
         <div>
            <nav aria-label="breadcrumb">
               <ol class="breadcrumb" class="text-light">
                  <li class="breadcrumb-item text-reset"><a href="./home.html">Home</a></li>
                  <li class="breadcrumb-item text-info" aria-current="page">${containerDetails.title}</li>
               </ol>
            </nav>

            <h1>${containerDetails.title}</h1>

            <h3>About ${containerDetails.title}</h3>
            <p>${containerDetails.description}</p>
            <a class="btn btn-info" href="${containerDetails.game_url}"}>Open Game</a>
         </div>
      </div>
   `;

  detailsData.innerHTML = detailsBox;

  const backgroundImage = containerDetails.thumbnail.replace(
    "thumbnail",
    "background"
  );

  console.log(backgroundImage);

  document.body.style.cssText = `
   background-image: url('${backgroundImage}');
   background-size: cover;
   background-position: center;
   `;
};

if (localStorage.getItem("theme") != null) {
   const themeData = localStorage.getItem("theme"); // light Or dark

   if (themeData === "light") {
      mode.classList.replace("fa-sun", "fa-moon"); // sun to moon
   } else {
      mode.classList.replace("fa-moon", "fa-sun"); // moon to sun
   }

   document.documentElement.setAttribute("data-theme", themeData); // light Or dark
}

mode.addEventListener("click", function (e) {

   if (mode.classList.contains("fa-sun")) {
      mode.classList.replace("fa-sun", "fa-moon");

      document.documentElement.setAttribute("data-theme", "light");

      localStorage.setItem("theme", "light");
   } else {
      mode.classList.replace("fa-moon", "fa-sun");

      document.documentElement.setAttribute("data-theme", "dark");

      localStorage.setItem("theme", "dark");
   }

});