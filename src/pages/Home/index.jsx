import { useQuery } from "react-query";

//custom
import { Footer } from "../../components/footer/footer";
import { Navbar } from "../../components/navbar/navbar";
import { Header } from "../../container/Home/header/header";
import { Posts } from "../../container/Home/posts/posts";
import { getUserByID } from "../../services/user";
import { handleRes } from "../../utils/handle-res";

const Home = () => {
  const userID = localStorage.getItem("userID");
  const userQuery = useQuery(["user-login", userID], () => getUserByID(userID));

  const user = handleRes(userQuery);
  const username = handleRes(userQuery)?.username;

  return (
    <div>
      <Navbar user={user} />
      <Header username={username} />
      <Posts user={user} />
      <Footer />
    </div>
  );
};

export default Home;
