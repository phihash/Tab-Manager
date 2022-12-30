const tabList = document.getElementById("tabList");

const onClose = (e) => {
  console.log(e.target.id);
  let removing = chrome.tabs.remove(Number(e.target.id));
  console.log(removing);
  //TODO 閉じるボタン押されたらonGroup解除しないといけない
  localStorage.removeItem(e.target.id);
}

const addTab =  (tab,index) => {
  const tabListItemElement = document.createElement("div");
  const h3Element = document.createElement("p");
  const tabCheckbox = document.createElement("input");
  tabCheckbox.setAttribute("type","checkbox")
  h3Element.innerText = `${index + 1} ${tab.title} `;
  tabCheckbox.id =  tab.id;
  tabCheckbox.addEventListener("click",onClose);
  tabList.appendChild(h3Element);
  tabListItemElement.appendChild(h3Element);
  tabListItemElement.appendChild(tabCheckbox);
  tabListItemElement.className = "d-flex"
  tabList.appendChild(tabListItemElement);
}

chrome.tabs.onRemoved.addListener(async () => {
  let getTabs = await chrome.tabs.query({currentWindow: true});
  viewTabs(getTabs);
});

const viewTabs = (getTabs) => {
  tabList.innerHTML = "";
  for(let i =0; i < getTabs.length  ;i++){
    addTab(getTabs[i],i);
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  let currentTabs = await chrome.tabs.query({currentWindow: true});
  viewTabs(currentTabs);
});

chrome.tabs.onUpdated.addListener(() => {
  window.alert("復活したな！")
})
