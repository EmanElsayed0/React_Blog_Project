import { Link } from "react-router-dom";

//assets
import User from "../../../assets/images/user.png";

const NO_OF_CHARS = 50;
export const Card = ({
  title,
  content,
  date,
  imageUser,
  imagePost,
  link,
  user,
}) => {
  const dateObj = new Date();
  const handleContent = content?.slice(0, NO_OF_CHARS);

  return (
    <div className="card rounded-md overflow-hidden card-compact w-96 bg-base-100 shadow-xl">
      <figure className="relative overflow-visible">
        <img src={imagePost ?? Pic} alt="support" />
        <Link to={`/user/${user._id}`}></Link>
      </figure>
      <div className="card-body">
        <h2 className="card-title text-black">{title}</h2>
        <p className="text-gray-400">
          {handleContent} {handleContent?.length > NO_OF_CHARS ? "..." : "."}
        </p>
        <p className="text-gray-400">
          <Link to={`/user/${user._id}`}>created by : {user.username}</Link>
        </p>
        <p className="text-gray-400">
          last update: {dateObj.toDateString(date)}
        </p>

        <div className="card-actions justify-end">
          <Link to={link} className="btn ">
            Read more
          </Link>
        </div>
      </div>
    </div>
  );
};
