const tabList = document.getElementById("tabList");
const groupInput = document.getElementById("groupInput");

const onGroup = async (e) => {
  let message = groupInput.value;
  let groupTabs = JSON.parse(localStorage.getItem(message));
  localStorage.setItem(e.currentTarget.id,message);
  if(!groupTabs){
   localStorage.setItem(message,JSON.stringify([e.currentTarget.id]));
  }else{
    localStorage.setItem(message,JSON.stringify([...groupTabs,e.currentTarget.id]));
  }
  groupInput.value = "";
  // viewTabs(getTabs);
  let getTabs = await chrome.tabs.query({currentWindow: true});
  viewTabs(getTabs);

}

const onClose = (e) => {
  console.log(e.currentTarget.id);
  let removing = chrome.tabs.remove(Number(e.currentTarget.id));
  console.log(removing);
  //TODO 閉じるボタン押されたらonGroup解除しないといけない

}

const addTab =  (tab,index) => {
  const tabListItemElement = document.createElement("div");
  const h3Element = document.createElement("p");
  const removeButton = document.createElement("button");
  const groupButton = document.createElement("button");
  h3Element.innerText = `${index + 1} ${tab.title} `;
  removeButton.id =  tab.id;
  groupButton.id =  tab.id;
  let getGroup =  localStorage.getItem(tab.id);
  removeButton.textContent = "x";
  groupButton.textContent = "グループ";
  removeButton.addEventListener("click",onClose);
  groupButton.addEventListener("click",onGroup);
  tabList.appendChild(h3Element);
  if(getGroup){
    const spanElement = document.createElement("span");
      spanElement.innerHTML = getGroup;
      tabList.appendChild(spanElement)
  }
  tabListItemElement.appendChild(h3Element);
  tabListItemElement.appendChild(removeButton);
  tabListItemElement.appendChild(groupButton);
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
  let getTabs = await chrome.tabs.query({currentWindow: true});
  viewTabs(getTabs);
});
