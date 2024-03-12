import React, { useState } from "react";
import { Icon } from "../../../Svg/svg";

const ImageUploader = ({ urlImg, setFile }) => {
  const [img, setImg] = useState("");
  const [url, setUrl] = useState(urlImg);
  //handle image
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    const reader = new FileReader();
    if (reader && file) reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImg(reader.result);
    };
  };
  const showImg = url || img;
  return (
    <div className="img-uploader m-auto flex justify-center gap-4 items-center">
      <div className="avatar block my-4">
        <div className="w-60  rounded overflow-hidden">
          {showImg && <img src={img ? img : url} />}
          {!showImg && (
            <div className="abs bg-slate-400 w-full h-full rounded ">
              <div className="abs">
                <Icon name="img" />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex gap-4">
        <button className="btn btn-primary">
          <label htmlFor="pop-img">
            {" "}
            <input
              type="file"
              className="upload-img__input hidden"
              id="pop-img"
              onChange={handleImageChange}
            />
            Upload
          </label>
        </button>
        <button
          className="btn btn-error"
          onClick={() => {
            setImg("");
            setUrl("");
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};
export default ImageUploader;
