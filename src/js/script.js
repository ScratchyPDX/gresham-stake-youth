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

const VITE_YM_CAMP_BISHOPS_INFO_DOCUMENT_URL = import.meta.env.VITE_YM_CAMP_BISHOPS_INFO_DOCUMENT_URL;
const VITE_YM_CAMP_PACKING_LIST_DOCUMENT_URL = import.meta.env.VITE_YM_CAMP_PACKING_LIST_DOCUMENT_URL;
const VITE_YM_CAMP_PARENTS_INFO_DOCUMENT_URL = import.meta.env.VITE_YM_CAMP_PARENTS_INFO_DOCUMENT_URL;
const VITE_YOUTH_EVENTS_AND_DANCES_DOCUMENT_URL = import.meta.env.VITE_YOUTH_EVENTS_AND_DANCES_DOCUMENT_URL;
const VITE_YW_CAMP_GENERAL_INFO_DOCUMENT_URL = import.meta.env.VITE_YW_CAMP_GENERAL_INFO_DOCUMENT_URL;
const VITE_YW_CAMP_PACKING_LIST_DOCUMENT_URL = import.meta.env.VITE_YW_CAMP_PACKING_LIST_DOCUMENT_URL;

function downloadFile(url, filename) {
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.target = "_blank"; // Open in a new tab to force download
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

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
    downloadFile(VITE_YOUTH_EVENTS_AND_DANCES_DOCUMENT_URL, "youth-events-and-dances.pdf");
  });
}
 
if(downloadYwGeneralCampInfoPdf != null) {
  downloadYwGeneralCampInfoPdf.addEventListener("click", () =>  {
    downloadFile(VITE_YW_CAMP_GENERAL_INFO_DOCUMENT_URL, "yw-camp-general-info.pdf");
  });
}

if(downloadYwPackingListPdf != null) {
  downloadYwPackingListPdf.addEventListener("click", () =>  {
    downloadFile(VITE_YW_CAMP_PACKING_LIST_DOCUMENT_URL, "yw-camp-packing-list.pdf");
  });
}

if(downloadGeneralYmCampInfoForParentsPdf != null) {
  downloadGeneralYmCampInfoForParentsPdf.addEventListener("click", () =>  {
    downloadFile(VITE_YM_CAMP_PARENTS_INFO_DOCUMENT_URL, "ym-camp-parents-info.pdf");
  });
}

if(downloadYmCampPackingListPdf != null) {
  downloadYmCampPackingListPdf.addEventListener("click", () =>  {
    downloadFile(VITE_YM_CAMP_PACKING_LIST_DOCUMENT_URL, "ym-camp-packing-list.pdf");
  });
}

if(downloadBishopricYmCampRepresentativePdf != null) {
  downloadBishopricYmCampRepresentativePdf.addEventListener("click", () =>  {
    downloadFile(VITE_YM_CAMP_BISHOPS_INFO_DOCUMENT_URL, "ym-camp-bishops-info.pdf");
  });
}
