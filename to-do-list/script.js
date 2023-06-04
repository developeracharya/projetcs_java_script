//// DEFINING AND ALLOTING VARIABLE VALUE
const textEl = document.getElementById("text-input");
const dateEl = document.getElementById("date-input");
const addBtn = document.getElementById("add-btn");
const clearBtn = document.getElementById("clear-btn");
const tableContainer = document.querySelector("#table-container");
let globalData = [];
const storedData = JSON.parse(localStorage.getItem("data"));

////// RENDER THE DATA IN DOM
const renderData = (datas) => {
  // console.log(datas);
  let templete = `
  <tr>
  <td class="number">S.No</td>
  <td class="text">Text</td>
  <td class="date">Date</td>
  </tr>`;
  let i = 1;
  if (datas) {
    for (let data of datas) {
      templete += `
      <tr>
      <td class="number">${i}.</td>
      <td class="text">${data.text}</td>
      <td class="date">${data.date}</td>
      </tr>
      `;
      i++;
    }
  }
  tableContainer.innerHTML = templete;
};

////// CHECK IF LOCALSTROAGE HAS DATA
if (storedData && storedData != []) {
  renderData(storedData);
  // console.log(storedData);
}

////// EVENT LISTNER FOR THE BUTTON
addBtn.addEventListener("click",  () => {
  
  let localStorageData = dataArray(textEl.value, dateEl.value);

  // console.log(localStorageData);
    renderData(localStorageData);
    textEl.value = "";
    dateEl.value = "";
  localStorageData = [];
});

/////// RETRIVE OR SAVE DATA
function  dataArray(text, date) {
  let localData = [];
  let dataFromLocalStorage = JSON.parse(localStorage.getItem("data"));
  if (dataFromLocalStorage) {
    localData = localData.concat(dataFromLocalStorage);
    console.log(localData);
  }
  localData.push({ "text": text, "date": date });

  globalData = globalData.concat(localData);
  // console.log(globalData);
  localStorage.setItem("data", JSON.stringify(globalData));
  globalData = [];
  localData = [];
  return JSON.parse(localStorage.getItem("data"));
};

/////// CLEAR DATA BUTTON
clearBtn.addEventListener("dblclick", () => {
  localStorage.clear();
  globalData = [];
  renderData();
});

