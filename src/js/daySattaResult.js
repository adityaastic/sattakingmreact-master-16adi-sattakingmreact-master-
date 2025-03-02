import "../App.css";
import moment from "moment";
import { useState, useEffect } from "react";
import myImage from "../images/new.gif";

import FooterDrop from "./footerDrop";
import { useLocation } from "react-router-dom";

function DaySattaResult({ dayGameData }) {
  const location = useLocation();
  const isDisc = location.pathname.includes("/disclaimer");
  const isContact = location.pathname.includes("/contact");
  const isPrivacy = location.pathname.includes("/privacy");
  const isAbout = location.pathname.includes("/about");
  const [data, setGameData] = useState([]);

  const currentTime = moment().format("HH:mm");
  const currentDate = moment().format("YYYY-MM-DD");

  useEffect(() => {
    setGameData(dayGameData);
  }, [dayGameData]);

  // based on current date and time get data
  const getTodayResult = (gameData) => {
    const itemTime = moment(gameData.open_time, "HH:mm");
    const currentMoment = moment(currentTime, "HH:mm");

    if (gameData?.curr_date?.date === currentDate) {
      return currentMoment.isSameOrAfter(itemTime)
        ? gameData?.curr_date?.result || ""
        : "";
    }
    return "";
  };
  return (
    <div>
      <div className="col-12 daywisereport">
        {!(isContact || isPrivacy || isDisc || isAbout) && (
          <div>
            <div className="dayCompoResult text-center mt-2">
              <div className="col-12">
                <div className="row">
                  {data && data.length > 0 ? (
                    data.map((gameData, index) => (
                      <div className="col-md-6 col-sm-12 gameBox ">
                        <div className="card">
                          <h6>{gameData?.game_name}</h6>
                          <span className="diffcolor1">
                            ( {gameData?.open_time} )
                          </span>
                          <div className="resultGame">
                            <span>{` { ${
                              gameData?.prev_date?.result || "No result"
                            } }`}</span>
                            <span>
                              <img src={myImage} alt="updateimage"></img>
                            </span>
                            <span className="diffcolor">
                              [
                              <span className="resultGame">
                                {getTodayResult(gameData)}
                              </span>
                              ]
                            </span>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p></p>
                  )}
                </div>
              </div>
            </div>

            <FooterDrop />
          </div>
        )}
      </div>
    </div>
  );
}

export default DaySattaResult;
