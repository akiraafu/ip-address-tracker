// get IP geo info
const input = document.getElementById("userInput");
const button = document.querySelector(".btn");
let ipAddress = document.querySelector(".ipAddress");
let locationOutput = document.querySelector(".location");
let timezoneOutput = document.querySelector(".timezone");
let ispOutput = document.querySelector(".isp");

button.addEventListener("click", (e) => {
    e.preventDefault();
    const inputValue = input.value;

    ipAddress.innerHTML = inputValue;
    printAddress();
});

const inputValue = input.value;
let API_URL = `https://geo.ipify.org/api/v2/country,city?apiKey=at_Fjg3Ql55BRq7aCffMc1fEcYzgxkjd&ipAddress=${inputValue}`;

const getGeoIp = fetch(API_URL)
    .then((response) => response.json())
    .then((ip) => {
        return [ip.location, ip.isp];
    })
    .then(function (result) {
        return result;
    });

const printAddress = async () => {
    const a = await getGeoIp;
    // console.log(a);

    let location = a[0];
    // console.log(location);
    let getRegion = location["region"];
    let getCity = location["city"];
    let timezone = location["timezone"];
    timezoneOutput.innerHTML = `UTC${timezone}`;

    locationOutput.innerHTML = `${getCity}, ${getRegion} `;

    let isp = a[1];
    ispOutput.innerHTML = `${isp}`;

    let lat = location["lat"];
    let lng = location["lng"];
    // map
    let map = L.map("map").setView([lat, lng], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: "© OpenStreetMap",
    }).addTo(map);

    let marker = L.marker([lat, lng]).addTo(map);
};
