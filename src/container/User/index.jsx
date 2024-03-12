import { Avatar } from "../../components/shared/Avatar";

const UserContainer = ({ user, isOwner, modalsToggler }) => {
  return (
    <div>
      <div className="absolute user__cover-box">
        <img
          src={user?.cover_photo[0]?.url ?? Pic}
          alt="cover"
          className="user__cover"
        />
      </div>
      <div className="container p-10">
        <div className="user__photo flex justify-center w-1/4 py-5 ">
          <Avatar img={user?.photo[0]?.url} />
        </div>
        <div className="py-6">
          {isOwner && (
            <div className="flex gap-4 flex-wrap">
              <button className="btn " onClick={() => modalsToggler("data")}>
                Update Profile
              </button>
              <button
                className="btn btn-primary"
                onClick={() => modalsToggler("photo")}
              >
                Change Photo
              </button>
              <button
                className="btn  btn-secondary"
                onClick={() => modalsToggler("cover")}
              >
                Change Cover
              </button>
            </div>
          )}
          <h2 className="text-xl font-bold py-6 capitalize">
            Username:
            <span className=" font-normal py-6 capitalize">
              {" "}
              {user?.username}
            </span>
          </h2>
          <h2 className="text-5xl font-bold">Bio</h2>
          <p className="py-6">
            {user?.bio ??
              " Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae eta id nisi."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserContainer;
