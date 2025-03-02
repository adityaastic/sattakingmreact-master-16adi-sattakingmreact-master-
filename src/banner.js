import React from "react";
import { useState, useEffect } from "react";
import moment from "moment";
const momenttz = require("moment-timezone");

const Banner = ({ sectiondata }) => {
  const todayDate = moment(new Date()).format("lll");
  //   var currentDate = moment(new Date()).tz("Asia/Kolkata").format("YYYY-MM-DD");
  //   var prevDate = moment(new Date())
  //     .subtract(1, "days")
  //     .tz("Asia/Kolkata")
  //     .format("YYYY-MM-DD");

  const [gamedata, setGameData] = useState([]);
  //   useEffect(() => {
  //     fetch("http://ec2-13-202-132-53.ap-south-1.compute.amazonaws.com/getData", {
  //       method: "POST", // or 'PUT' depending on your requirements
  //       headers: {
  //         "Content-Type": "application/json", // specify the content type
  //       },
  //       body: JSON.stringify({
  //         game_name: "",
  //         curr_date: currentDate,
  //         prev_date: prevDate,
  //         open_time: "market_sunday_time_open",
  //       }),
  //     })
  //       .then((response) => response.json())
  //       .then((json) => {
  //         setGameData(json);
  //       })
  //       .catch((error) => console.error(error));
  //   }, []);
  useEffect(() => {
    if (sectiondata) {
      setGameData(sectiondata);
     
    }
  }, [sectiondata]);
  return (
    <>
      <div className="banner text-white p-3 sattaReal">
        <h5 className="color">{todayDate} </h5>
       
        {gamedata?.map((todayData, index) => (
          <div key={index}>
            <p className="mb-0">{todayData?.gameName}</p>
            <p className="text-warning lh-1 blinking-text">
              {todayData?.result || "wait"}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Banner;
