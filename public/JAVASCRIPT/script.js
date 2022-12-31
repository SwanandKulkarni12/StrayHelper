'use strict';
let checkboxes=document.querySelectorAll('.checkbox')
console.log(checkboxes);
for(let checkbox of checkboxes){
    checkbox.addEventListener('click',()=>{
        if(checkbox.checked==true)
        console.log(checkbox.value);
    })
}
const search=document.querySelector('#search')
console.log(search);
const searchBtn=document.querySelector('#search-btn')
console.log(searchBtn);
searchBtn.addEventListener('click',()=>{
    console.log(search.value);
    search.value=''
})
search.addEventListener('click',()=>{
    search.addEventListener('keypress',(e)=>{
        if(e.key==='Enter')
        {
            console.log('Yes');
            search.value=''
        }
    })
})