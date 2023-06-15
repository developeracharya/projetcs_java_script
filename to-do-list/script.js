//// DEFINING AND ALLOTING VARIABLE VALUE
const textEl = document.getElementById("text-input");
const dateEl = document.getElementById("date-input");
const addBtn = document.getElementById("add-btn");
const clearBtn = document.getElementById("clear-btn");
const tableContainer = document.querySelector("#table-container");
let globalData = [];
const storedData = JSON.parse(localStorage.getItem("data"));
const errorEl = document.getElementById("error-msg");

////// RENDER THE DATA IN HTML DOM
const renderData = (datas) => {
  // console.log(datas);
  let templete = `
  <tr>
  <td class="number">S.No</td>
  <td class="text">Text</td>
  <td class="date">Date</td>
  <td class="button-title">Button</td>
  </tr>`;
  let i = 1;
  if (datas) {
    for (let data of datas) {
      let rowClass = "";
      if (i & 1) {
        // console.log(i, "odd");
        rowClass = "odd-row";
      } else {
        // console.log(i, "even");
        rowClass = "even-row";
      }
      if (!data.finished) {
        templete += `
      <tr class = "${rowClass}" id="${data.rowid}">
      <td class="number number-${i}" id= "${data.numberid}">${i}.</td>
      <td class="text text-${i}" id= "${data.textid}">${data.text}</td>
      <td class="date date-${i}" id= "${data.dateid}">${data.date}</td>
      <td>
      <button class="edit-btn edit-btn-${i}" id= "${data.editbuttonid}">Edit</button>
      <button class="finished-btn finished-btn-${i}" id= "${data.finishedbuttonid}">Finished</button>
      <button class="delete-btn delete-btn-${i}" id= "${data.deletebuttonid}">Delete</button>
      </td>
      </tr>
      `;
        i++;
      } else {
        console.log(true);
        templete += `
        <tr class = "${rowClass}" id="${data}">
        <td class="number number-${i}" "${data.numberid}"><s>${i}.</s></td>
        <td class="text text-${i}" "${data.textid}"><s>${data.text}</s></td>
        <td class="date date-${i}" "${data.dateid}"><s>${data.date}</s></td>
        <td>
        <button class="edit-btn edit-btn-${i}" id= "${data.editbuttonid}">Edit</button>
        <button class="finished-btn finished-btn-${i}" id= "${data.finishedbuttonid}">Finished</button>
        <button class="delete-btn delete-btn-${i}" id= "${data.deletebuttonid}">Delete</button>
        </td>
        </tr>
        `;
        i++;
      }
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
addBtn.addEventListener("click", () => {
  if (textEl.value && dateEl.value) {
    // console.log(localStorageData);
    errorEl.innerHTML = "";
  let localStorageData = dataArray(textEl.value, dateEl.value);
    renderData(localStorageData);
    textEl.value = "";
    dateEl.value = "";
    localStorageData = [];
    window.location.reload();
  }
  /// IF INPUT EMPTY THEN THROW ERROR
  else
  {
    errorEl.innerHTML = `<h3 style="color: red; text-align: center; font-style: sans-serif;">EMPTY INPUT</h3>`;
    throw console.error("EMPTY INPUT");
  }
});

/////// RETRIVE OR SAVE DATA
function dataArray(text, date) {
  let localData = [];
  let dataFromLocalStorage = JSON.parse(localStorage.getItem("data"));
  if (dataFromLocalStorage) {
    localData = localData.concat(dataFromLocalStorage);
    console.log(localData);
  }
  // localData.push({ text: text, date: date, finished: false });
  let index = localData.length;
  localData.push({
    text: text,
    date: date,
    finished: false,
    editbuttonid: `edit-btn-${index}`,
    deletebuttonid: `delete-btn-${index}`,
    finishedbuttonid: `finished-btn-${index}`,
    numberid: `number-${index}`,
    textid: `text-${index}`,
    dateid: `date-${index}`,
    rowid: `row-${index}`
  });
  globalData = globalData.concat(localData);
  // console.log(globalData);
  localStorage.setItem("data", JSON.stringify(globalData));
  globalData = [];
  localData = [];
  return JSON.parse(localStorage.getItem("data"));
}

/////// CLEAR DATA BUTTON
clearBtn.addEventListener("dblclick", () => {
  localStorage.clear();
  globalData = [];
  renderData();
});

////// CAPTURING BUTTONS FROM HTML DOM 
const editBtn = document.querySelectorAll(".edit-btn");
const finishedBtn = document.querySelectorAll(".finished-btn");
const deleteBtn = document.querySelectorAll(".delete-btn");

///////DELETE BUTTON EVENT LISTNER

for (let btn of deleteBtn) {
  btn.addEventListener("click", (event) => {
    // console.log(event);
    window.location.reload();
    console.log(event.target.className);
    console.log(event.target.className.length);
    let index = parseInt(event.target.className.slice(22)) - 1;
    console.log(index);
    let localStorageData = JSON.parse(localStorage.getItem("data"));
    console.log(localStorageData[index]);
    let deleteData = localStorageData.splice(index, 1);
    // console.log(deleteData);
    localStorage.setItem("data", JSON.stringify(localStorageData));
    localStorageData = JSON.parse(localStorage.getItem("data"));
    console.log(localStorageData);
    renderData(localStorageData);
  });
}

///////FINISHED BUTTON EVENT LISTNER
for (let btn of finishedBtn) {
  btn.addEventListener("click", (event) => {
    let localStorageData = JSON.parse(localStorage.getItem("data"));
    let index = parseInt(event.target.className.slice(26));
    // console.log(event.target.className.length);
    if (!localStorageData[index - 1].finished) {
      localStorageData[index - 1].finished = true;
      localStorage.setItem("data", JSON.stringify(localStorageData));
      console.log(index);
      let numberEl = document.querySelector(`.number-${index}`);
      let textEl = document.querySelector(`.text-${index}`);
      let dateEl = document.querySelector(`.date-${index}`);
      numberEl.style.textDecoration = "line-through";
      textEl.style.textDecoration = "line-through";
      dateEl.style.textDecoration = "line-through";
    }
  });
}

///////EDIT BUTTON EVENT LISTNER
for (let btn of editBtn) {
  btn.addEventListener("click", (event) => {
    let index = parseInt(event.target.className.slice(18));
    console.log(event.target.className.length);
    let localStorageData = JSON.parse(localStorage.getItem("data"));
    textEl.value = localStorageData[index - 1].text;
    dateEl.value = localStorageData[index - 1].date;
    localStorageData.splice(index - 1, 1);
    localStorage.setItem("data", JSON.stringify(localStorageData));
    console.log(localStorageData);
    renderData(localStorageData);
  });
}
