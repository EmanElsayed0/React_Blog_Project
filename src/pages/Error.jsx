import React from "react";
import { Link } from "react-router-dom";
import myImage from "../assets/Images/404 error with portals-pana.svg";

export default function Error() {
  return (
    <>
      <div className="flex flex-col items-center mt-20">
        <img src={myImage} alt="" width="800px" style={{ margin: "0 auto" }} />
        <button className="btn text-white mt-4">
          <Link to={"/"}>Go To Home</Link>
        </button>
      </div>
    </>
  );
}
