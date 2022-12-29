const tabList = document.getElementById("tabList");

chrome.tabs.onRemoved.addListener(async () => {
  let getTabs = await chrome.tabs.query({currentWindow: true});
  viewTabs(getTabs);
});


const onClose = (e) => {
  console.log(e.currentTarget.id);
  let removing = chrome.tabs.remove(Number(e.currentTarget.id));
  console.log(removing);
}



const addTab = (tab,index) => {
  const h3Element = document.createElement("h3");
  const removeButton = document.createElement("button");
  h3Element.innerText = `${index + 1} ${tab.title} `;
  removeButton.id =  tab.id;
  removeButton.textContent = "閉じる";
  removeButton.addEventListener("click",onClose);
  tabList.appendChild(h3Element);
  tabList.appendChild(removeButton);
}


const viewTabs = (getTabs) => {
  tabList.innerHTML = "";
  for(let i =0; i < getTabs.length  ;i++){
    addTab(getTabs[i],i);
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  let getTabs = await chrome.tabs.query({currentWindow: true});
  viewTabs(getTabs);
});
