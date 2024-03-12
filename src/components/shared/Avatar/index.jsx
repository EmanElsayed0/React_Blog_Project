import Default from "../../../assets/images/user.png";

export const Avatar = ({ img }) => {
  return (
    <div className="avatar">
      <div
        className={`w-fit rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 center-div`}
      >
        <img src={img ? img : Default} />
      </div>
    </div>
  );
};
