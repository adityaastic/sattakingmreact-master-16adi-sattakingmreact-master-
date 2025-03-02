import React from "react";
import { useNavigate } from "react-router-dom";
import AdvertisementComponent from "../utilities/advertismentComponent";
function FooterButton() {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="footerButton pt-5">
      <AdvertisementComponent type="random" />
      <div className="col-12">
        <div className="row">
          <div className="col-md-3 col-sm-12 col-xs-12 p-2">
            <a href="/">
              <button className="p-1">Satta King</button>
            </a>
          </div>
          <div className="col-md-3 col-sm-12 col-xs-12 p-2">
            <a href="/disclaimer">
              {" "}
              <button className="p-1">Disclaimer</button>
            </a>
          </div>
          <div className="col-md-3 col-sm-12 col-xs-12 p-2">
            <a href="/about">
              <button className="p-1">About Us</button>
            </a>
          </div>
          <div className="col-md-3 col-sm-12 col-xs-12 p-2">
            <a href="/privacy">
              <button className="p-1">Privacy Policy</button>
            </a>
          </div>

          <div className="col-md-2 col-sm-12 col-xs-12 p-2">
            <a href="/contact">
              <button className="p-1">Contact Us</button>
            </a>
          </div>
          <div className="col-md-2 col-sm-12 col-xs-12 p-2 ">
            <a href="/">
              <button className="p-1 ">Satta Result</button>
            </a>
          </div>
          <div className="col-md-3 col-sm-12 col-xs-12 p-2">
            <a href="/">
              <button className="p-1">Satta King Online</button>
            </a>
          </div>
          <div className="col-md-2 col-sm-12 col-xs-12 p-2 ">
            <a href="/">
              <button className="p-1 ">Gali Satta</button>
            </a>
          </div>
          <div className="col-md-3 col-sm-12">
            <a href="/">
              <button className="p-1">Satta king chart</button>
            </a>
          </div>
          <div className="col-md-3 col-sm-12 col-xs-12 p-2 ">
            <a href="/">
              <button className="p-1 ">Desawar Result</button>
            </a>
          </div>
          <div className="col-md-2 col-sm-12 col-xs-12 p-2 ">
            <a href="/">
              <button className="p-1 ">Satta king leak</button>
            </a>
          </div>
          <div className="col-md-3 col-sm-12 col-xs-12 p-2 ">
            <a href="/">
              <button className="p-1 ">Satta king record</button>
            </a>
          </div>
          <div className="col-md-2 col-sm-12 col-xs-12 p-2 ">
            <a href="/">
              <button className="p-1 ">Satta Matka</button>
            </a>
          </div>
        </div>
        <marquee className="colorwhite">
          Satta king, Sattaking, Satta king 2020, Satta king up, Satta result,
          Satta king result, Satta king online, Gali result, Desawar result,
          Satta king chart, Satta king live, Gali satta, Deshawar live result,
          Gali live result, Satta matka, Satta matka king, Satta king up, Satta
          king 2020 chart, Satta king desawar, Satta king gali, Gali live
          result, Disawar live result, Satta Number, Satta Game, Gali Number,
          Delhi Satta king, Satta Bazar, Black satta king, Gali Single Jodi,
          Black Satta Result, Desawar Single Jodi
        </marquee>

        <div className="text-center colorwhite">Copyright © Satta king</div>
      </div>
    </div>
  );
}

export default FooterButton;
