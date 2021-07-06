let myLeads = []
const inputEl = document.getElementById("input-el"); 
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))

// Checking if leadsFromLocalStorage is truthy. 
// If so, we will set myLeads to its value and call renderLeads()

if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage
  render(myLeads)
}


tabBtn.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        render(myLeads)
    })
})

// Rendering the leads below the button(s)

function render(leads) {
  let listItems = ""
  for (let i = 0; i < leads.length; i++) {
    listItems += `
      <li>
        <a target='_blank' href='${leads[i]}'>
          ${leads[i]}
        </a>
      </li>
    `
  }
  ulEl.innerHTML = listItems
}

// Deleting leads, clearing the localStorage and cleaning out the DOM 

deleteBtn.addEventListener("dblclick", function () {
  localStorage.clear()
  myLeads = []
  //ulEl.remove("ul")
  render(myLeads)
})

// Grabbing the input and setting it to the localStorage

inputBtn.addEventListener("click", function () {
  myLeads.push(inputEl.value)
  inputEl.value = "" 
  localStorage.setItem("myLeads", JSON.stringify(myLeads))
  render(myLeads)

  //console.log(localStorage.getItem("myLeads"))
})

