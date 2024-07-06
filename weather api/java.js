
const usertab = document.querySelector(".btab1");
const searchtab = document.querySelector(".btab2");
const accessscreen = document.querySelector(".permission");
const homescreen = document.querySelector(".currloc");
const searchscreen = document.querySelector(".sloc");
const loadscreen = document.querySelector(".load");
const grantbutton = document.querySelector(".gbutton");
const iscreen = document.querySelector('.textinput');
const sbut = document.querySelector('.searchbutton');
const searchres = document.querySelector('.sd');


sbut.addEventListener('click',async()=>
  {
  searchscreen.style.scale=0;
  loadscreen.style.scale=1;
  await getdata(iscreen.value);
  loadscreen.style.scale=0;
  searchscreen.style.scale=1;
  searchres.style.scale=1;});

async function getdata(name)
{
  let jp = await fetch(`https://api.weatherapi.com/v1/current.json?key=5a3785963e56475aa2640738240207&q=${name}`);
  let md2 = await jp.json();
  const cityname2 = document.querySelector('.city');
  const statename2 = document.querySelector('.state');
  const temp2 = document.querySelector('.tem');
  const  cond2= document.querySelector('.text');
  const i2 = document.querySelector('.icon2');
  const wind2 = document.querySelector('.dataw2');
  const cloud2 = document.querySelector('.datac2');
  const humidity2 = document.querySelector('.datah2');

  cityname2.innerText = md2?.location?.name;
  statename2.innerText = md2?.location?.region +" , "+md2?.location?.country;
  temp2.innerText = md2?.current?.temp_c + '°C';
  cond2.innerText =md2?.current?.condition?.text;
  i2.src=md2?.current?.condition?.icon;
  wind2.innerText = md2?.current?.wind_kph+" km/hr";
  cloud2.innerText = md2?.current?.cloud;
  humidity2.innerText = md2?.current?.humidity;

}



let x = document.createElement('p');
let latlong="";
let currhome = accessscreen;
let currtab=usertab;
usertab.classList.add("back");
accessscreen.style.scale =1;

usertab.addEventListener('click',()=>{ changetab(usertab)});
searchtab.addEventListener('click',()=>{changetab(searchtab)});


function changetab(tab)
{
  if(tab==currtab)return;
  currtab.classList.remove('back');
  tab.classList.add('back');
  currtab=tab;
  if(currtab==usertab){currhome.style.scale=1; searchres.style.scale=0; searchscreen.style.scale=0;}
 else{
    currhome.style.scale=0; searchscreen.style.scale=1;}
  
}
grantbutton.addEventListener('click',async()=>
{ accessscreen.style.scale=0;
  
  currhome=homescreen;
   try{
      await getLocation();
   }
   catch(e){
       alert("error");
   }   
  
})


async function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

async function showPosition(position) {
  const userCoordinates =  position.coords.latitude +"," + position.coords.longitude;
  sessionStorage.setItem("user-coordinates", JSON.stringify(userCoordinates));
  await setattributvalue(userCoordinates);
}


async function setattributvalue(cordinates)
{loadscreen.style.scale=1;
  const cityname = document.querySelector('.city1');
  const statename = document.querySelector('.state1');
  const temp = document.querySelector('.tem1');
  const  cond= document.querySelector('.text1');
  const i1 = document.querySelector('.icon1');
  const wind = document.querySelector('.dataw');
  const cloud = document.querySelector('.datac');
  const humidity = document.querySelector('.datah');
  try{
    let z= cordinates;
    let jp = await fetch(`https://api.weatherapi.com/v1/current.json?key=5a3785963e56475aa2640738240207&q=${z}`);
    let md = await jp.json();
    console.log(md);
    cityname.innerText = md?.location?.name;
   statename.innerText = md?.location?.region +" , "+md?.location?.country;
   temp.innerText = md?.current?.temp_c + '°C';
   cond.innerText =md?.current?.condition?.text;
   i1.src=md?.current?.condition?.icon;
   wind.innerText = md?.current?.wind_kph+" km/hr";
   cloud.innerText = md?.current?.cloud;
   humidity.innerText = md?.current?.humidity;
   loadscreen.style.scale=0;
   currhome.style.scale=1;
  }
  catch(e){}
}




  

