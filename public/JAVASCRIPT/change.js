const sakshi=document.querySelector('.sakshi')
const swanand=document.querySelector('.swanand')
const shrinidhee=document.querySelector('.shrinidhee')
const neel=document.querySelector('.neel')
const vaishanvi=document.querySelector('.vaishanvi')
const back=document.querySelector('#back-arrow');
const next=document.querySelector('#next-arrow');
let r=0;

next.addEventListener('click',()=>{
    if(r==0)
    {
        r++;
        sakshi.classList.toggle('hidden');
        swanand.classList.remove('hidden');
    }
    else if(r==1)
    {
        r++;
        shrinidhee.classList.remove('hidden');
        swanand.classList.add('hidden');
    }
    else if(r==2)
    {
        r++;
        shrinidhee.classList.add('hidden');
        neel.classList.remove('hidden');
    }
    else if(r==3)
    {
        r++;
        neel.classList.add('hidden');
       vaishanvi.classList.remove('hidden');
    }
    else if(r==4)
    {
        r=0;
        vaishanvi.classList.add('hidden');
        sakshi.classList.remove('hidden')
    }
})
back.addEventListener('click',()=>{
    if(r==1)
    {
        r--;
        sakshi.classList.remove('hidden');
        swanand.classList.add('hidden');
    }
    else if(r==2)
    {
        r--;
        shrinidhee.classList.add('hidden');
       swanand.classList.remove('hidden');
    }
    else if(r==3)
    {
        r--;
        neel.classList.add('hidden');
       shrinidhee.classList.remove('hidden');
    }
    else if(r==4)
    {
        r--;
        vaishanvi.classList.add('hidden');
        neel.classList.remove('hidden')
    }
})