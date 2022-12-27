const tabList = document.getElementById("tabList");
const setbtn = document.getElementById("setbtn");
const getbtn = document.getElementById("getbtn");
const deletebtn = document.getElementById("deletebtn");

function onError(error) {
  console.dir(error);
}

const addNewTab = (tabs , tab) => {

}

deletebtn.onclick = () => {
  chrome.storage.local.remove("宮城県", function(){
    console.log("削除されたわよな")
    var error = chrome.runtime.lastError;
       if (error) {
           console.error(error);
       }
   })
}

setbtn.onclick = () => {
  chrome.storage.local.set({"宮城県":"仙台市"}, alert("保存されたわよな"))
}

getbtn.onclick = async () => {
  let getData = await chrome.storage.local.get("宮城県")
  console.dir(getData);
  console.dir(getData["宮城県"]);
}


document.addEventListener("DOMContentLoaded", async () => {
  let getTabs = await chrome.tabs.query({currentWindow: true});
  for(let i =0; i < getTabs.length  ;i++){
    const h3Element = document.createElement("h3");
    h3Element.innerText = ` ${i + 1} ${getTabs[i].title} & ${getTabs[i].id}`;
    tabList.appendChild(h3Element);
  }
});
