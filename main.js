const api={
    key:"4c34e360aed6dfc5f5300547008c67ac",
    base:"http://api.openweathermap.org/data/2.5"
}

const searchbox=document.getElementById("search-box");
searchbox.addEventListener("keypress",setQuery)

function setQuery(evt){
    if(evt.keyCode==13){
        getResults(searchbox.value);
        console.log("you entered the",searchbox.value)
    }
    
}

function getResults(query){
   fetch(`${api.base}/weather?q=${query}&units=metric&appid=${api.key}`).then((response)=>{
       return response.json()
   }).then(displayResult);
}

function displayResult(data){
    console.log(data);
    const city=document.querySelector(".city");
    city.innerText=`${data.name} , ${data.sys.country}`;
    const temp=document.querySelector(".temp");
    temp.innerText=`${data.main.temp}°c`;
    const date=document.querySelector(".date");
    let d=new Date();
    date.innerText=dayMonth(d);
    const weather=document.querySelector(".weather");
    weather.innerText=data.weather[0].main;
    const hilow=document.querySelector(".hi-low");
    hilow.innerText=`${data.main.temp_max}°c / ${data.main.temp_min}°c`;
    
    const body=document.getElementById("body");
    if(data.main.temp<=25){
        body.style.backgroundImage="url('bg1.jpg')"
    }
    else if(data.main.temp>25 && data.main.temp<=35){
        body.style.backgroundImage="url('bg.jpg')"
    }
    else{
        body.style.backgroundImage="url('bg3.jpg')"
    }

}

setTimeout(() => {
    const val="renukoot";
    getResults(val);
    console.log("the function is running");
}, 1);

function dayMonth(d){
    let day=["Sunday","Monday","Tuesday","Wednesday","Thusday","Friday","saturday"];
    let month=["Jan","Feb","Mar","Apr","May","June","July","Aug","Sept","Oct","Nov","Dec"];
    return `${day[d.getDay()]} ${d.getDate()} ${month[d.getMonth()]} ${d.getFullYear()}`;
}