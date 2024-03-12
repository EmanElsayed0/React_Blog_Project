import myImage from "../../../assets/images/Blog post-rafiki.svg";
export const Header = ({ username }) => {
  return (
    <div className="flex justify-evenly pt-40">
      <div className=" text-black pt-40">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold capitalize">
            Hello {username?.split(" ")[0]}
          </h1>
          <p className="mb-5 capitalize">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Praesentium aliquam autem soluta incidunt quo neque adipisci magni
            in dolore quas eius unde aut, nisi, illo doloremque animi odit nobis
            impedit?
          </p>
        </div>
      </div>
      <div>
        <img src={myImage} alt="" width="600px" />
      </div>
    </div>
  );
};
