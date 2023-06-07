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
      <tr class = "${rowClass}" id="row-${i}">
      <td class="number" id= "number-${i}">${i}.</td>
      <td class="text" id= "text-${i}">${data.text}</td>
      <td class="date" id= "date-${i}">${data.date}</td>
      <td>
      <button class="edit-btn" id= "edit-btn-${i}">Edit</button>
      <button class="finished-btn" id= "finished-btn-${i}">Finished</button>
      <button class="delete-btn" id= "delete-btn-${i}">Delete</button>
      </td>
      </tr>
      `;
        i++;
      } else {
        console.log(true);
        templete += `
       
        <tr class = "${rowClass}" id="row-${i}">
        <td class="number" id= "number-${i}"><s>${i}.</s></td>
        <td class="text" id= "text-${i}"><s>${data.text}</s></td>
        <td class="date" id= "date-${i}"><s>${data.date}</s></td>
        <td>
        <button class="edit-btn" id= "edit-btn-${i}">Edit</button>
        <button class="finished-btn" id= "finished-btn-${i}">Finished</button>
        <button class="delete-btn" id= "delete-btn-${i}">Delete</button>
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
  let localStorageData = dataArray(textEl.value, dateEl.value);

  // console.log(localStorageData);
  renderData(localStorageData);
  textEl.value = "";
  dateEl.value = "";
  localStorageData = [];
});

/////// RETRIVE OR SAVE DATA
function dataArray(text, date) {
  let localData = [];
  let dataFromLocalStorage = JSON.parse(localStorage.getItem("data"));
  if (dataFromLocalStorage) {
    localData = localData.concat(dataFromLocalStorage);
    console.log(localData);
  }
  localData.push({ text: text, date: date, finished: false });

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

const editBtn = document.querySelectorAll(".edit-btn");
const finishedBtn = document.querySelectorAll(".finished-btn");
const deleteBtn = document.querySelectorAll(".delete-btn");
///////EDIT BUTTON EVENT LISTNER

for (let btn of deleteBtn) {
  btn.addEventListener("click", (event) => {
    console.log(event);
    let index = parseInt(event.target.id.slice(11));
    // console.log(index);
    let localStorageData = JSON.parse(localStorage.getItem("data"));
    // console.log(localStorageData[index - 1]);
    let deleteData = localStorageData.splice(index - 1, 1);
    console.log(deleteData);
    localStorage.setItem("data", JSON.stringify(localStorageData));
    localStorageData = JSON.parse(localStorage.getItem("data"));
    console.log(localStorageData);
    renderData(localStorageData);
  });
}
for (let btn of finishedBtn) {
  btn.addEventListener("click", (event) => {
    let index = parseInt(event.target.id.slice(13));
    let localStorageData = JSON.parse(localStorage.getItem("data"));
    localStorageData[index - 1].finished = true;
    localStorage.setItem("data", JSON.stringify(localStorageData));
    console.log(index);
    let numberEl = document.getElementById(`number-${index}`);
    let textEl = document.getElementById(`text-${index}`);
    let dateEl = document.getElementById(`date-${index}`);
    // console.log(typeof rowId);
    // console.log(tdEl);
    numberEl.style.textDecoration = "line-through";
    textEl.style.textDecoration = "line-through";
    dateEl.style.textDecoration = "line-through";
  });
}

for (let btn of editBtn) {
  btn.addEventListener("click", (event) => {
    let index = parseInt(event.target.id.slice(9));
    let localStorageData = JSON.parse(localStorage.getItem("data"));
    textEl.value = localStorageData[index - 1].text;
    dateEl.value =  localStorageData[index - 1].date;
    localStorageData.splice(index - 1, 1);
    localStorage.setItem("data", JSON.stringify(localStorageData));
    console.log(localStorageData);
    renderData(localStorageData);
    addBtn.addEventListener('click', () => {
      dataArray(textEl.value, dateEl.value);
      let localStorageData = JSON.parse(localStorage.getItem("data"));
      renderData(localStorageData);
    })
  })
}