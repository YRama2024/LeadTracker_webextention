let myleads=[]

const inputEL=document.getElementById("input-el")
const inputBtn=document.getElementById("input-btn")
const ulEl=document.getElementById("ul-el")
const deleteBtn=document.getElementById("delete-btn")
const tabBtn=document.getElementById("tab-btn")

tabBtn.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myleads.push(tabs[0].url)
        localStorage.setItem("myleads", JSON.stringify(myleads) )
        render(myleads)
    })
})

deleteBtn.addEventListener("dblclick", function(){
    localStorage.clear()
    myleads=[]
    render(myleads)
})

const leadsfromlocalstorage=JSON.parse(localStorage.getItem("myleads"))
console.log(leadsfromlocalstorage)

if(leadsfromlocalstorage){ //function for not getting the data erased when refreshed the page
    myleads=leadsfromlocalstorage
    render(myleads)
}
inputBtn.addEventListener("click", function(){
    myleads.push(inputEL.value)
    inputEL.value=""//blanks the input bar when button clicked
    localStorage.setItem("myleads", JSON.stringify(myleads))//feeding the myleads info in local storage
    render(myleads)
    console.log(localStorage.getItem("myleads"))
})
function render(leads){
    let listItems=""    // method with good performance
    for(let i=0;i<leads.length;i++){
        listItems +=
         `<li>
            <a target='_blank' href=${"http://leads[i]"}> ${leads[i]} </a>
        </li>`
    }
    ulEl.innerHTML=listItems
}