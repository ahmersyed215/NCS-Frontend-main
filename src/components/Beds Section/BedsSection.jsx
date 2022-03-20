import React, { useState } from "react";
import "./BedsSection.css";

function BedsSection({ data, index }) {
  //   const [bedsData, setBedsData] = useState({
  //     bed_id: 1,
  //     bed_number: "one",
  //     time_elapsed: 0,
  //     status: true,
  //   });

  //   const timeConversion = data.time_elapsed / 60;
  //   var mins = ~~((data.time_elapsed % 3600) / 60);

  var totalSeconds = Math.round((data.current_time - data.start_time)/1000)-8;
  var minutesCheck = (Math.floor(totalSeconds/60))
  var  minutes = minutesCheck-1
  var seconds = totalSeconds - (minutesCheck*60) 
  //var minutes = parseInt(data.time_elapsed / 60);
  //var seconds = data.time_elapsed % 60;

  return (
    <div className="bedsSection">
      <div className="bedsSection__container">
        {data.status ? (
          <div>

          
            <div className={totalSeconds > 180 ? "squareBoxRed" : `squareBoxGreen`}>
              <p >{data.bed_name}</p>
            </div>

            <div className="bedsSection__time">
              <p className="bedsSection__timeMin">
                {minutes} {minutes > 1 ? "mins" : "min"}
              </p>

              
              <p className="bedsSection__timeSec">
                {seconds && seconds} {seconds > 1 ? "sec" : "sec"}
              </p> 
            </div>
          </div>
        ) : (
          <div className="squareBox">
            <div className="circleBox">{data.bed_name}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BedsSection;
