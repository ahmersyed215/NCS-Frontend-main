import React, { useState,useEffect } from "react";
import "./Home.css";
import logo from "../../assets/nurse_details/Logo.png";
import nurseIcon from "../../assets/Dash_Board/nurse_icon.png";
import phoneVector from "../../assets/Login_page/Phone_vector.png";
import profileIcon from "../../assets/Dash_Board/Profile_vector.png";
import { LocationOnSharp, Phone } from "@mui/icons-material";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import BedsSection from "../../components/Beds Section/BedsSection";
import Boxes from "../../components/Boxes/Boxes";
import bg from "../../assets/Login_page/Login_page.jpg";
import { getAllBedsAPI } from "../../config/AuthenticationApi";

import io from "socket.io-client";
const bedsData = [
  {
    bed_id: 1,
    bed_number: "one",
    time_elapsed: 220,
    status: true,
  },
  {
    bed_id: 2,
    bed_number: "two",
    time_elapsed: 15,
    status: true,
  },
  {
    bed_id: 3,
    bed_number: "three",
    time_elapsed: 170,
    status: true,
  },
  {
    bed_id: 4,
    bed_number: "four",
    time_elapsed: 7200,
    status: false,
  },
  {
    bed_id: 5,
    bed_number: "five",
    time_elapsed: 60,
    status: true,
  },
  {
    bed_id: 6,
    bed_number: "six",
    time_elapsed: 320,
    status: true,
  },
  {
    bed_id: 7,
    bed_number: "seven",
    time_elapsed: 6400,
    status: true,
  },
  {
    bed_id: 8,
    bed_number: "eight",
    time_elapsed: 240,
    status: true, 
  },
  {
    bed_id: 9,
    bed_number: "nine",
    time_elapsed: 0,
    status: false,
  },
  {
    bed_id: 10,
    bed_number: "ten",
    time_elapsed: 240,
    status: true,
  },
];


let socket;
socket = io("http://192.168.18.240:5000");


  
var newArray = []
var refreshedArray =[]

function Home() {


const history = useHistory();
const ward_number = "1"


const [beds_data, setBedsData] = useState([]);

const [existingCalls, setExistingCalls] = useState([]);
const [initialState, setInitialState] = useState(false);
var calls = []

var initialArrayCheck  = false 

const getAllBeds = () => {
  getAllBedsAPI("?ward="+ward_number).then(function (val) {
    
    console.log("Data:",val)
    var info = val.data;

    
    for (var key in info) {

      const bedsVal = {
        bed_name: info[key].bed_name,
        bed_id: info[key].bed_id,
        ward_name: info[key].ward_name,
        ward_id: ward_number,
        status: false,
        start_time: 0,
        current_time:0,
        key:info[key].bed_id
      };

      newArray.push(bedsVal);
    }

    setBedsData([...newArray])

    
    console.log("existing",existingCalls)

  });
  
};


useEffect(() => {

  if(existingCalls.length>0 && beds_data.length>0 && !initialState){
  
  updateInitialArray(existingCalls,beds_data)
  }


}, [existingCalls]);


useEffect(() => {
  getAllBeds()
}, []);


useEffect(() => {
   
  socket.on("connect", () => {
    console.log("socket connected", socket.connected); // true
  });

  socket.on("data", (data) => {
    //console.log("data",data);
    updateUI(data)

  });

  socket.on("initial_data", (data) => {
    console.log("Initial Data",data);
    //updateInitialArray(data)
    calls = data 
    setExistingCalls(data)
  });

  socket.on("disconnect", () => {
    console.log("socket connected", socket.connected); // false
  });

}, []);



useEffect(() => {
  const interval = setInterval(() => {
    
    console.log("Data Beds :",newArray);

    newArray.map(function(x) { 
      x.current_time = Date.now(); 
      return x
    });

    setBedsData([...newArray])
    setExistingCalls([...calls])


  }, 500);
  return () => clearInterval(interval);
}, []);



const updateUI = (data) => {
  
  console.log("Data.bed",data)
  var bed_id = data.b_id
  console.log("Current Beds Data One:",newArray)

  var index = newArray.findIndex((x) => x.bed_id ==bed_id);
  console.log("value of index",index)


  if(index>=0){

  let bedItems = newArray;
  let item = { ...bedItems[index] };
  item.status = data.call;
  item.start_time = data.start_time;
  bedItems[index] = item;
  setBedsData([...bedItems]);

  console.log("Beds Data",beds_data)
  console.log("Beds Data New Array",newArray)
}

var index = calls.findIndex((x) => x.b_id ==bed_id);

calls.splice(index,1)
setExistingCalls(calls)

}

const updateInitialArray = (calls,beds) => {
  
  console.log(initialState)
  if(!initialState){
  setInitialState(true);

  console.log("Data Update",calls) 
  console.log("Current Beds Data Onec Update",beds)

  if(calls.length>0){
    var info = calls;
    for (var key in info) {
     
      console.log("Single item",info[key].b_id)
      var bed_id_check = info[key].b_id
      var index = beds.findIndex((x) => x.bed_id ==bed_id_check);

      if(index>=0){
      let bedItems = beds;
      let item = { ...bedItems[index] };
      item.status = info[key].call;
      item.start_time = info[key].start_time;
      bedItems[index] = item;
      refreshedArray = bedItems
      newArray = bedItems
      setBedsData([...newArray]);
      

      }

    }
    console.log("After Udate:",refreshedArray)
  }

  }
  

}






  return (
    <>
      <div class="home__bg" style={{ backgroundImage: `url(${bg})` }}></div>
      <div className="home">
        <div className="home__head">
          <div className="home__headLeft">
            <img className="home__logo" src={logo} />
          </div>
          <div className="home__headRight">
            <div className="headRight__section">
              <LocationOnSharp />
              <p>
                First Floor 271/1 <br /> block# 7 Karachi Admin Society, <br />{" "}
                Karachi
              </p>
            </div>
            <div className="headRight__section">
              <img className="vectorImage" src={phoneVector} />
              <p>+92 349 2047076</p>
            </div>
          </div>
        </div>

        <div className="home__body">
          <h1 className="bedHeading">All Bed Numbers</h1>
          <div className="bedsData">
            {beds_data.map((v, i) => (
              <BedsSection data={v} index={i} />
            ))}
          </div>
        </div>

        <div className="home__footer"> </div>
      </div>
    </>
  );
}

export default Home;
