  
var utc = [
  "Pacific/Pago_Pago",
  "Pacific/Honolulu",
  "Pacific/Tahiti",
  "America/Anchorage",
  "America/Juneau",
  "America/Santa_Isabel",
  "America/Tijuana",
  "America/Vancouver",
  "America/Whitehorse",
  "America/Los_Angeles",
  "America/Phoenix",
  "America/Chihuahua",
  "America/Denver",
  "America/Edmonton",
  "America/Yellowknife",
  "America/Belize",
  "America/Costa_Rica",
  "America/El_Salvador",
  "America/Guatemala",
  "Pacific/Galapagos",
  "America/Chicago",
  "America/Indiana/Knox",
  "America/Matamoros",
  "America/Winnipeg",
  "America/Cancun",
  "America/Mexico_City",
  "America/Regina",
  "America/Bogota",
  "America/Cayman",
  "America/Jamaica",
  "America/Lima",
  "America/Panama",
  "America/Detroit",
  "America/Havana",
  "America/Indiana/Petersburg",
  "America/Iqaluit",
  "America/Montreal",
  "America/New_York",
  "America/Port-au-Prince",
  "America/Toronto",
  "America/Indianapolis",
  "America/Caracas",
  "America/Asuncion",
  "America/Halifax",
  "Atlantic/Bermuda",
  "America/Aruba",
  "America/La_Paz",
  "America/Puerto_Rico",
  "America/Santiago",
  "Antarctica/Palmer",
  "America/St_Johns",
  "America/Buenos_Aires",
  "America/Paramaribo",
  "Antarctica/Rothera",
  "America/Montevideo",
  "Atlantic/South_Georgia",
  "America/Scoresbysund",
  "Atlantic/Azores",
  "Atlantic/Cape_Verde",
  "Africa/Casablanca",
  "America/Danmarkshavn",
  "Europe/Isle_of_Man",
  "Europe/London",
  "Atlantic/Madeira",
  "Europe/Dublin",
  "Africa/Accra",
  "Africa/Ouagadougou",
  "Atlantic/Reykjavik",
  "Atlantic/St_Helena",
  "Arctic/Longyearbyen",
  "Europe/Berlin",
  "Europe/Malta",
  "Europe/Oslo",
  "Europe/Rome",
  "Europe/Stockholm",
  "Europe/Vienna",
  "Europe/Belgrade",
  "Europe/Budapest",
  "Europe/Prague",
  "Africa/Ceuta",
  "Europe/Brussels",
  "Europe/Copenhagen",
  "Europe/Madrid",
  "Europe/Paris",
  "Europe/Sarajevo",
  "Europe/Warsaw",
  "Africa/Algiers",
  "Africa/Lagos",
  "Africa/Tunis",
  "Africa/Windhoek",
  "Europe/Athens",
  "Europe/Bucharest",
  "Asia/Beirut",
  "Africa/Cairo",
  "Asia/Damascus",
  "Europe/Helsinki",
  "Europe/Nicosia",
  "Europe/Sofia",
  "Africa/Johannesburg",
  "Europe/Istanbul",
  "Asia/Jerusalem",
  "Africa/Tripoli",
  "Asia/Baghdad",
  "Asia/Kuwait",
  "Asia/Riyadh",
  "Africa/Addis_Ababa",
  "Africa/Djibouti",
  "Indian/Antananarivo",
  "Europe/Moscow",
  "Europe/Samara",
  "Asia/Tehran",
  "Asia/Dubai",
  "Indian/Mauritius",
  "Asia/Tbilisi",
  "Asia/Kabul",
  "Asia/Tashkent",
  "Indian/Maldives",
  "Asia/Karachi",
  "Asia/Kolkata",
  "Asia/Colombo",
  "Asia/Kathmandu",
  "Antarctica/Vostok",
  "Asia/Dhaka",
  "Asia/Rangoon",
  "Asia/Bangkok",
  "Asia/Hong_Kong",
  "Asia/Manila",
  "Asia/Singapore",
  "Antarctica/Casey",
  "Australia/Perth",
  "Asia/Taipei",
  "Asia/Ulaanbaatar",
  "Asia/Irkutsk",
  "Asia/Tokyo",
  "Asia/Seoul",
  "Australia/Adelaide",
  "Australia/Darwin",
  "Australia/Sydney",
  "Pacific/Guam",
  "Asia/Chita",
  "Pacific/Ponape",
  "Asia/Vladivostok",
  "Pacific/Auckland",
  "Pacific/Nauru",
  "Pacific/Fiji",
  "Asia/Anadyr",
  "Asia/Kamchatka",
  "Pacific/Tongatapu",
  "Pacific/Apia"
];


for(var i = 0; i < utc.length; i++){
var queryURL ="https://api.ipgeolocation.io/timezone";
$.ajax({
type: "GET",
url: queryURL,
data:{
  'tz' : utc[i],

'apiKey' : '1b51bf787f9348f4a954d4b7ba72ade1',

// 'apiKey' : 'af77de5fb3e042849edd4c67482147f8',

// 'apiKey' : 'ea34208be1244f88b4f11f251e8c3d60',

// 'apiKey' : 'fcf30077888745fcb8b2623c69d753f7',

// 'apiKey' : '89ad4e9738f845cca4869f35f53937c6',

// 'apiKey' : 'cd170e717dc84645beb6b8aec1fe93e9',

},
cache: false,
}).then(function (response) {
if((response.time_12.substring(0,2) == "05") && (response.time_12.slice(-2) == "PM")) 
$("#insertCity").text("in " + response.timezone);
if((response.time_12.substring(0,2) == "05") && (response.time_12.slice(-2) == "PM"))
$("#timebox").text(response.date_time_txt);
});

}