
const dogCounter=document.querySelector('#dog-counter')
let i=0;
var dogAdoption=setInterval(dogAdoptions,50);
function dogAdoptions(){
    i++;
    dogCounter.textContent=i;
    if(i==70)
    {
        clearInterval(dogAdoption)
        dogCounter.textContent=`${i}+`;
    }
}
const catCounter=document.querySelector('#cat-counter')
let j=0;
var catAdoption=setInterval(catAdoptions,50);
function catAdoptions(){
    j++;
    catCounter.textContent=j;
    if(j==60)
    {
        clearInterval(catAdoption)
        catCounter.textContent=`${j}+`;
    }
}
const shelterCounter=document.querySelector('#shelter-counter')
let k=0;
var shelterAdoption=setInterval(shelterAdoptions,50);
function shelterAdoptions(){
    k++;
    shelterCounter.textContent=k;
    if(k==110)
    {
        clearInterval(shelterAdoption)
        shelterCounter.textContent=`${k}+`;
    }
}

