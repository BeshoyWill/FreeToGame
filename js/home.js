// ? =============> Global ===============>

const links = document.querySelectorAll(".menu a");
const loader = document.querySelector(".loading");
const logout = document.querySelector(".logout-btn");
const mode = document.getElementById("mode");

// ! =============> When Start ===============>

getGames(links[0].dataset.category);

if (localStorage.getItem("theme") != null) {
   const themeData = localStorage.getItem("theme"); // light Or dark

   if (themeData === "light") {
      mode.classList.replace("fa-sun", "fa-moon"); // sun to moon
   } else {
      mode.classList.replace("fa-moon", "fa-sun"); // moon to sun
   }

   document.documentElement.setAttribute("data-theme", themeData); // light Or dark
}

// * =============> Events ===============>

links.forEach(function (link) {
  link.addEventListener("click", function () {
    //  let linkName = link.getAttribute("data-category"); //  another solution
    let category = link.dataset.category;

    document.querySelector(".menu .active").classList.remove("active");
    link.classList.add("active");

    getGames(category);
  });
});

logout.addEventListener("click", function () {
  localStorage.removeItem("uToken");
  location.href = "./index.html";
});

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

// ! =============> Func tions ===============>

async function getGames(categoryName) {
  loader.classList.remove("d-none");

  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "8dd89ae0e1mshf80784a0cd2c65cp1c9f91jsn1511c2580d83",
      "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
    },
  };

  const apiResponse = await fetch(
    `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${categoryName}`,
    options
  );

  const data = await apiResponse.json();

  console.log(data);
  displayData(data);

  loader.classList.add("d-none");
}

function displayData(gamesData) {
  let gamesBox = ``;

  for (let i = 0; i < gamesData.length; i++) {
    let videPath = gamesData[i].thumbnail.replace(
      "thumbnail.jpg",
      "videoplayback.webm"
    );

    gamesBox += `
         <div class="col">
            <div onmouseleave="stopVideo(event)" onmouseenter="startVideo(event)" onclick="showDetails(${gamesData[i].id})" class="card h-100 bg-transparent" role="button" >
               <div class="card-body">

                  <figure class="position-relative">
                     <img class="card-img-top object-fit-cover h-100" src="${gamesData[i].thumbnail}" />

                  <video muted="true"  preload="none" loop   class="w-100 d-none h-100 position-absolute top-0 start-0 z-3">
                  <source src="${videPath}"}>
                  </video>

                  </figure>

                  <figcaption>

                     <div class="hstack justify-content-between">
                        <h3 class="h6 small"> ${gamesData[i].title} </h3>
                        <span class="badge text-bg-primary p-2">Free</span>
                     </div>

                     <p class="card-text small text-center opacity-50">
                        ${gamesData[i].short_description}
                     </p>

                  </figcaption>
               </div>

               <footer class="card-footer small hstack justify-content-between">

                  <span class="badge badge-color">${gamesData[i].genre}</span>
                  <span class="badge badge-color">${gamesData[i].platform}</span>

               </footer>
            </div>
         </div>
      `;
  }

  document.getElementById("gameData").innerHTML = gamesBox;
}

function startVideo(e) {
  const videoEl = e.target.querySelector("video");

  videoEl.classList.remove("d-none");
  videoEl.muted = true;
  videoEl.play();
}

function stopVideo(e) {
  const videoEl = e.target.querySelector("video");

  videoEl.classList.add("d-none");
  videoEl.muted = true;
  videoEl.pause();
}

function showDetails(gameId) {
  location.href = `./details.html?id=${gameId}`;
}