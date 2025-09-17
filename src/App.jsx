import React, { useEffect, useState } from 'react';
import './App.css'
import logo from './assets/OIP.png';
import serchIcon from './assets/search.png';
import sunicon from './assets/sun.png';
import rain from './assets/rain.png';
import snow from './assets/snow.png';
import clouds from './assets/cloudy.png';
import winder from './assets/windy.jpg';
import drizzle from './assets/drizzle.png';
import humid from './assets/humid.jpg'

const Images=({icon,temp,city,country,lat,lon,humidity,wind})=>{
  return (
    <>
      <div className="image">
        <img src={icon} alt=""  height={"160px"} width={"200px"}/>
      </div>
      <div className="temp">
       {temp}°C
      </div>
      <div className="cityname">
        {city}
      </div>
      <div className="coun_name">
        {country}
      </div>
      <div className="cord">
        <div><span>Latitude</span><span className='la'> {lat}</span></div>
        <div><span>Longitude</span><span className='lo'> {lon}</span></div>
      </div>
      <div className="data">
         <div className="ele">
          <img src={humid} alt="" height={"60px"} width={"74px"} />
          <div className="info">
                 <div className='per'>{humidity} %</div>
                 <div className='text'>humidity</div> 
          </div>
         </div>
         <div className="ele">
          <img src={winder} alt="" height={"60px"} width={"74px"} />
          <div className="info">
                 <div className='per'>{wind} km/hr</div>
                 <div className='text'>Wind Speed</div> 
          </div>
         </div>
      </div>
    </>
    );
};
 

function App() {
  let apiKey="519e71a8a791e58ed2558b36aa9c6fc4";
  const [text,settext]=useState("")
  const[icon, setIcon]=useState(sunicon);
  const[temp, setTemp]=useState(0);
  const[city, setCity]=useState("");
  const[country, setCountry]=useState("");
  const[lat, setLat]=useState(0);
  const[lon, setLon]=useState(0);
  const[humidity, setHumidity]=useState(0);
  const[windSpeed, setWindSpeed]=useState(0);
  const [notf,setNotf]=useState(false)
  const [load,setLoad]=useState(false);
  const [error,setError]=useState(null);

  const imgcodes={
    "01d":sunicon,
    "01n":sunicon,
    "02d":clouds,
    "02n":clouds,
    "03d":clouds,
    "03n":clouds,
    "04d":clouds,
    "04n":clouds,
    "09d":drizzle,
    "09n":drizzle,
    "10d":rain,
    "10n":rain,
    "11d":winder,
    "11n":winder,
    "13d":snow,
    "13n":snow, 
  }
  const search= async ()=>{
     setLoad(true);
    let url=`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${apiKey}&units=Metric`;
  try {
     let  data= await fetch(url);
     let res=await data.json();
    if (res.cod=="404")
    {
      console.error("error city not found");
      setNotf(true);
      setLoad(false);
      return;
    }
   setWindSpeed(res.wind.speed);   
    setHumidity(res.main.humidity);
    setTemp(Math.floor(res.main.temp));
    setCity(res.name);
    setCountry(res.sys.country);
    setLat(res.coord.lat);
    setLon(res.coord.lon);
    const iconCode=res.weather[0].icon;
    setIcon(imgcodes[iconCode] || "yet to be displayed");
    
    setNotf(false);
   

  } catch (error) {
    console.log("error",error.message);
    setError("eerror occurred");
  }
  finally{
    setLoad(false);
  }
  };
  const handleEnter=(e)=>{
    if(e.key=="Enter")
    {
      search();
    }

  }
  const handleText=(e)=>
  {
     settext(e.target.value);
  }  
  
  return (
    <>
    <div>
      <nav className="logo">
        <img src={logo} alt="" height={"100px"} width={"100px"}/>
        <h1 style={{marginLeft:"-170px"}}>D_Weather App</h1>
          <a>Home</a>
          <a>About</a>
          <a>Contact</a>
      </nav>
    </div>
      <div className="container">
        <div className='input-container'>
        <input type="text" className='search' value={text} placeholder='search the city' onChange={handleText} onKeyDown={handleEnter}/>
       <div className='searchIcon'>
         <img src={serchIcon} alt=""  height={"20px"} onClick={()=> search() } />
         </div>
        </div>
        {notf && <div className='notfound'>City not found</div>}
      {load && <div className='loading'>Loading...</div>}
      {
        error && <div className='error'> {error}</div>
      }

        { !load && !notf  && <Images icon={icon} temp={temp} city={city} country={country} lat={lat} lon={lon} humidity={humidity} wind={windSpeed}/>}
      </div>
      
      <footer style={{backgroundColor:"antiquewhite",padding:"20px",marginTop:"50px",textAlign:"center"}}>
      <small > &copy; copyright reserved <br /><b>D_weather app 2025</b></small>
      </footer>
    </>
  )
}

export default App;
