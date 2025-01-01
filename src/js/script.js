const weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const month = [
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

const date = new Date();

const documentURL = import.meta.env.VITE_DOWNLOAD_URL;
alert(documentURL);

// set footer dates
document.getElementById("today-date").textContent = `${weekday[date.getDay()]}, ${date.getDate()} ${month[date.getMonth()]} ${date.getFullYear()}`;

// toggle hamburger menu
function toggleMenu() {
  document.getElementById("primaryNav").classList.toggle("open");
  document.getElementById("hamburgerBtn").classList.toggle("open");
}

const x = document.getElementById("hamburgerBtn");
x.onclick = toggleMenu;

const downloadCalendarPdf = document.getElementById("download-calendar-pdf");
const downloadYwGeneralCampInfoPdf = document.getElementById("download-yw-general-camp-info-pdf");
const downloadYwPackingListPdf = document.getElementById("download-yw-packing-list-pdf");
const downloadGeneralYmCampInfoForParentsPdf = document.getElementById("download-general-ym-camp-info-for-parents-pdf");
const downloadYmCampPackingListPdf = document.getElementById("download-ym-camp-packing-list-pdf");
const downloadBishopricYmCampRepresentativePdf = document.getElementById("download-bishopric-ym-camp-representative-pdf");

if(downloadCalendarPdf != null) {
  downloadCalendarPdf.addEventListener("click", () =>  {
    alert("You are about to download the calendar PDF");
  });
}
 
if(downloadYwGeneralCampInfoPdf != null) {
  downloadYwGeneralCampInfoPdf.addEventListener("click", () =>  {
    alert("You are about to download the YM Camp General Info PDF");
  });
}

if(downloadYwPackingListPdf != null) {
  downloadYwPackingListPdf.addEventListener("click", () =>  {
    alert("You are about to download the YM Camp Packing List PDF");
  });
}

if(downloadGeneralYmCampInfoForParentsPdf != null) {
  downloadGeneralYmCampInfoForParentsPdf.addEventListener("click", () =>  {
    alert("You are about to download the YM Camp Info for Parents PDF");
  });
}

if(downloadYmCampPackingListPdf != null) {
  downloadYmCampPackingListPdf.addEventListener("click", () =>  {
    alert("You are about to download the YM Camp Packing List PDF");
  });
}

if(downloadBishopricYmCampRepresentativePdf != null) {
  downloadBishopricYmCampRepresentativePdf.addEventListener("click", () =>  {
    alert("You are about to download the Bishopric and YM Camp Info PDF");
  });
}
