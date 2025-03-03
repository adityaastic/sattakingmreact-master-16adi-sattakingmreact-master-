import "./App.css";
import moment from "moment";
import "moment-timezone";
import React, { useState, useEffect } from "react";

import Disclaimer from "./js/disclaimer";

import ContactUs from "./js/contact";
import PrivacyPolicy from "./js/privacy";
import AboutUs from "./js/about";
import { useLocation } from "react-router-dom";
import trackVisitor from "./utilities/tracker";
import DaySattaResult from "./js/daySattaResult";
import AdvertisementComponent from "./utilities/advertismentComponent";
import { Helmet } from "react-helmet";
const momenttz = require("moment-timezone");

function App() {
  const location = useLocation();
  const todayDate = moment(new Date()).format("lll");
  const isDisc = location.pathname.includes("/disclaimer");
  const isContact = location.pathname.includes("/contact");
  const isPrivacy = location.pathname.includes("/privacy");
  const isAbout = location.pathname.includes("/about");
  var currentDate = moment().tz("Asia/Kolkata").format("YYYY-MM-DD");
  const currentTime = moment().format("HH:mm");
  const [data, setData] = useState([]); // State to store data fetched from backend
  const [datagame, setDataFor] = useState([]); // State to store processed data for display

  var prevDate = moment()
    .subtract(1, "days")
    .tz("Asia/Kolkata")
    .format("YYYY-MM-DD");

  useEffect(() => {
    trackVisitor();
  }, []);

  useEffect(() => {
    fetch("https://api.sattakingvip.co.in/getData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        game_name: "",
        curr_date: currentDate,
        prev_date: prevDate,
        open_time: "market_sunday_time_open",
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        // Sort data based on open_time
        const sortedData = json.sort((a, b) => {
          const timeA = moment(a.open_time, "HH:mm");
          const timeB = moment(b.open_time, "HH:mm");
          return timeA.diff(timeB);
        });

        // Set sorted data into state
        setData(sortedData);
      })
      .catch((error) => console.error(error));
  }, [currentDate, prevDate]);
  // page scroll
  function pageScroll() {
    const tableSection = document.getElementById("monthTable");
    if (tableSection) {
      tableSection.scrollIntoView({ behavior: "smooth" });
    }
  }

  // useEffect(() => {
  //   if (data?.length > 0) {
  //     // Convert current time to a moment object for comparison
  //     const currentMoment = moment(currentTime, "HH:mm");

  //     // Process and filter the data
  //     const processedData = data.map((item) => {
  //       const itemTime = moment(item.open_time, "HH:mm");
  //       const resultAvailable = item?.curr_date?.result ? true : false;

  //       return {
  //         gameName: item.game_name,
  //         result: resultAvailable ? item?.curr_date?.result : "wait",
  //         openTime: item.open_time,
  //         isAvailable: resultAvailable,
  //         itemTime: itemTime,
  //       };
  //     });

  //     // Sort the processed data by open_time
  //     const sortedProcessedData = processedData.sort((a, b) => {
  //       return a.itemTime.diff(b.itemTime);
  //     });

  //     // Separate records into those with available results and those with "wait"
  //     const availableResults = sortedProcessedData.filter(
  //       (item) => item.isAvailable
  //     );
  //     const upcomingRecords = sortedProcessedData.filter(
  //       (item) => !item.isAvailable
  //     );

  //     // Determine the records to display
  //     let recordsToDisplay = [];

  //     if (availableResults.length > 0) {
  //       // Show available results and include records up to the next upcoming record
  //       recordsToDisplay = [...availableResults];

  //       const lastAvailableIndex = sortedProcessedData.indexOf(
  //         availableResults[availableResults.length - 1]
  //       );
  //       const nextRecord = sortedProcessedData[lastAvailableIndex + 1];
  //       if (nextRecord) {
  //         recordsToDisplay.push(nextRecord);
  //       }
  //     } else {
  //       // No available results, show up to 3 upcoming records with "wait"
  //       recordsToDisplay = [...upcomingRecords.slice(0, 3)];
  //     }

  //     // Ensure only 3 records are shown
  //     if (recordsToDisplay.length > 3) {
  //       // Remove the oldest record if more than 3 records are present
  //       recordsToDisplay = recordsToDisplay.slice(-3);
  //     }

  //     // Update state with the processed and limited data
  //     setDataFor(recordsToDisplay);

  //     // Debugging log
  //   }
  // }, [data, currentTime]);

  useEffect(() => {
    if (data?.length > 0) {
      const currentMoment = moment(currentTime, "HH:mm");
  
      const processedData = data.map((item) => {
        const itemTime = moment(item.open_time, "HH:mm");
        const resultAvailable = item?.curr_date?.result ? true : false;
  
        return {
          gameName: item.game_name,
          result: resultAvailable ? item?.curr_date?.result : "wait",
          openTime: item.open_time,
          isAvailable: resultAvailable,
          itemTime: itemTime,
        };
      });
  
      const sortedProcessedData = processedData.sort((a, b) =>
        a.itemTime.diff(b.itemTime)
      );
  
      const availableResults = sortedProcessedData.filter((item) => item.isAvailable);
      const upcomingRecords = sortedProcessedData.filter((item) => !item.isAvailable);
  
      let recordsToDisplay = [];
  
      if (availableResults.length > 0) {
        recordsToDisplay = [...availableResults];
  
        const lastAvailableIndex = sortedProcessedData.indexOf(
          availableResults[availableResults.length - 1]
        );
        const nextRecord = sortedProcessedData[lastAvailableIndex + 1];
        if (nextRecord) {
          recordsToDisplay.push(nextRecord);
        }
      } else {
        recordsToDisplay = [...upcomingRecords.slice(0, 3)];
      }
  
      if (recordsToDisplay.length > 3) {
        recordsToDisplay = recordsToDisplay.slice(-3);
      }
  
      // Move "wait" items to the top
      recordsToDisplay.sort((a, b) => (a.result === "wait" ? -1 : 1));
  
      setDataFor(recordsToDisplay);
    }
  }, [data, currentTime]);
  return (
    <div className="App">
      {/* seo setup start */}
      <Helmet>
        <title>Baba Matka</title>
        <meta name="description" content="sattasport, satta sport, sattaking" />
        <meta
          name="Keywords"
          content="Satta kingm, sattakingreal, satta king real, sattaking real, Satta King, Satta King live result, Satta king online result, Satta king online, Satta king result today, Gali result, Desawar result, Faridabad result, Gaziyabad result, Satta matka king, Satta Bazar, Black satta king, Satta king 2017, satta king 2018, Gali Leak Number, Gali Single Jodi, Black Satta Result, Desawar Single Jodi, Satta king up, Satta king desawar, Satta king gali, Satta king 2019 chart, Satta baba king, Satta king chart, Gali live result, Disawar live result, Satta Number, Matka Number, Satta.com, Satta Game, Gali Number, Delhi Satta king,"
        />
        <link rel="canonical" href="https://sattakingm.co.in/" />
      </Helmet>
      {/* seo setup end */}
      <div className="col-12 navbar1">
        <div className="row">
          <div className="col-md-3 col-sm-12 link1">
            <a href="/">HOME</a>
          </div>
          <div className="col-md-3 col-sm-12 link1">
            <a href="http://s-king.co">SATTA KING</a>
          </div>
          <div className="col-md-3 col-sm-12 link1">
            <a onClick={pageScroll}>Result Charts</a>
          </div>
          <div className="col-md-3 col-sm-12 link1">
            <a href="/">Sitemap</a>
          </div>
        </div>
      </div>
      <marquee className="marqu">
        Satta king, Sattaking, Satta king 2020, Satta king up, Satta result,
        Satta king result, Satta king online, Gali result, Desawar result, Satta
        king chart, Satta king live, Gali satta, Deshawar live result, Gali live
        result, Satta matka, Satta matka king, Satta king up, Satta king 2020
        chart, Satta king desawar, Satta king gali, Gali live result, Disawar
        live result, Satta Number, Satta Game, Gali Number, Delhi Satta king,
        Satta Bazar, Black satta king, Gali Single Jodi, Black Satta Result,
        Desawar Single Jodi
      </marquee>
      <div className="col-12 text-center header-heading">
        <h6>SATTA KING | SATTAKING | SATTA RESULT</h6>
        <h1>SATTA KING</h1>
      </div>
      <div className="banner text-white p-3 sattaReal">
        <h5 className="color">{todayDate} </h5>
        {datagame?.map((todayData, index) => (
          <div key={index} className="game">
            <h2 className="mb-0">{todayData?.gameName}</h2>
            <h3 className=" lh-1 blinking-text">{todayData?.result || ""}</h3>
          </div>
        ))}
      </div>
      <AdvertisementComponent type="odd" />
      <DaySattaResult dayGameData={data} />

      {isDisc && <Disclaimer style={{ display: "none" }} />}
      {isContact && <ContactUs style={{ display: "none" }} />}
      {isPrivacy && <PrivacyPolicy style={{ display: "none" }} />}
      {isAbout && <AboutUs style={{ display: "none" }} />}
    </div>
  );
}

export default App;
