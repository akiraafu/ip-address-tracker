// get IP geo info
const input = document.getElementById("userInput");
const button = document.querySelector(".btn");
let ipAddress = document.querySelector(".ipAddress");
let locationOutput = document.querySelector(".location");
let timezoneOutput = document.querySelector(".timezone");
let ispOutput = document.querySelector(".isp");

// See their own IP Address on the map on the initial page load
const initialPage = () => {
    let API_URL = `https://geo.ipify.org/api/v2/country,city?apiKey=at_Fjg3Ql55BRq7aCffMc1fEcYzgxkjd&ipAddress=`;
    const getGeoIp = fetch(API_URL)
        .then((response) => response.json())
        .then((ip) => {
            return [ip.location, ip.isp, ip.ip];
        });

    const printAddress = async () => {
        const a = await getGeoIp;
        // console.log(a);

        let location = a[0];
        let getRegion = location["region"];
        let getCity = location["city"];
        let timezone = location["timezone"];
        timezoneOutput.innerHTML = `UTC ${timezone}`;

        locationOutput.innerHTML = `${getCity}, ${getRegion} `;

        let isp = a[1];
        ispOutput.innerHTML = `${isp}`;

        let ip = a[2];
        ipAddress.innerHTML = `${ip}`;

        let lat = location["lat"];
        let lng = location["lng"];

        // map
        let map = L.map("map").setView([lat, lng], 13);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 19,
            attribution: "© OpenStreetMap",
        }).addTo(map);
        let icon = L.icon({
            iconUrl: "./images/icon-location.svg",
            iconSize: [36, 46], // size of the icon
        });
        let marker = L.marker([lat, lng], { icon: icon }).addTo(map);
    };

    printAddress();
};

initialPage();

// use userInput
button.addEventListener("click", (e) => {
    e.preventDefault();
    const inputValue = input.value;
    ipAddress.innerHTML = inputValue;

    let API_URL = `https://geo.ipify.org/api/v2/country,city?apiKey=at_Fjg3Ql55BRq7aCffMc1fEcYzgxkjd&ipAddress=${inputValue}`;

    const getGeoIp = fetch(API_URL)
        .then((response) => response.json())
        .then((ip) => {
            return [ip.location, ip.isp];
        });

    const printAddress = async () => {
        const a = await getGeoIp;
        // console.log(a);

        let location = a[0];
        let getRegion = location["region"];
        let getCity = location["city"];
        let timezone = location["timezone"];
        timezoneOutput.innerHTML = `UTC ${timezone}`;

        locationOutput.innerHTML = `${getCity}, ${getRegion} `;

        let isp = a[1];
        ispOutput.innerHTML = `${isp}`;

        let lat = location["lat"];
        let lng = location["lng"];

        // map
        if (L.DomUtil.get("map") !== undefined) {
            L.DomUtil.get("map")._leaflet_id = null;
        }

        let map = L.map("map").setView([lat, lng], 13);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 19,
            attribution: "© OpenStreetMap",
        }).addTo(map);
        let icon = L.icon({
            iconUrl: "./images/icon-location.svg",
            iconSize: [36, 46], // size of the icon
        });
        let marker = L.marker([lat, lng], { icon: icon }).addTo(map);
    };

    printAddress();
});
