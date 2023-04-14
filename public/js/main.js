const submitBtn = document.getElementById("submitBtn");
const cityName = document.getElementById("cityName");
const city_name = document.getElementById("city_name");
const temp_status = document.getElementById("temp_status");
const temp = document.getElementById("temp");
const datahide = document.querySelector(".middle_layer");
const today_date = document.getElementById("today_date");
const day = document.getElementById("day");

function formatDate() {
  const monthArr = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  var d = new Date(),
    month = monthArr[d.getMonth()],
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (day.length < 2) day = "0" + day;
  return [day, month, year].join("-");
}
function currentDay() {
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const d = new Date();
  return weekday[d.getDay()];
}
const getInfo = async () => {
  event.preventDefault();
  let cityValue = cityName.value;
  // console.log(cityValue);
  if (cityValue === "") {
    city_name.innerText = "Please write the name before search";
    datahide.classList.add("data_hide");
  } else {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&units=metric&appid=7c7cb936a81987f9c08c48e351133a00`;
      let wetherData = await fetch(url);
      let wetherDataResponse = await wetherData.json();
      let arrData = [wetherDataResponse];
      console.log("arrData", arrData);
      city_name.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`;
      temp.innerHTML = `<span>${arrData[0].main.temp}</span><sup>o</sup>C`;

      let tempMood = arrData[0].weather[0].main;
      console.log("tempMood", tempMood);
      if (tempMood == "Clear") {
        temp_status.innerHTML = `<i class="fas fa-sun" style="color: #eccc69;"></i>`;
      } else if (tempMood == "Clouds") {
        temp_status.innerHTML = `<i class="fas fa-cloud" style="color: #f1f2f6;"></i>`;
      } else if (tempMood == "Rain") {
        temp_status.innerHTML = `<i class="fas fa-rain" style="color: #a4b0be;"></i>`;
      } else {
        temp_status.innerHTML = `<i class="fa fa-cloud" style="color: #eccc69;"></i>`;
      }

      datahide.classList.remove("data_hide");
    } catch (error) {
      city_name.innerText = "Please write the name before search properly";
      datahide.classList.add("data_hide");
    }
  }
};

submitBtn.addEventListener("click", getInfo);
today_date.innerText = formatDate();
day.innerText = currentDay();
