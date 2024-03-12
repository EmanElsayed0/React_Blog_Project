import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
//custom
import { Navbar } from "../../components/navbar/navbar";

import { PostHeader } from "../../container/Post/Post-header";
import { deletePostByID, getPostByID, editPost } from "../../services/posts";
import { alertMsg } from "../../utils/alert";
import { handleRes } from "../../utils/handle-res";

const Post = () => {
  const { id: post } = useParams();
  const navigate = useNavigate();
  //get user logged in
  const userID = localStorage.getItem("userID");
  const loggedInQuery = useQuery(["user-login", userID]);
  const userRes = handleRes(loggedInQuery);
  //get post
  const postQuery = useQuery(["post", post], () => getPostByID(post));
  const postRes = postQuery?.data?.data?.data;
  //delete post
  const deletePost = useMutation(deletePostByID, {
    onSuccess: (res) => {
      if (res?.data?.success) {
        navigate("/");
        alertMsg(res.data.message, res.data.success);
      }
    },
  });
  //edit post
  const updatePost = useMutation(
    (obj) => editPost(obj.id, { ...obj, id: undefined }),
    {
      onSuccess: (res) => {
        if (res?.data?.success) {
          alertMsg(res.data.message, res.data.success);
          navigate("/");
        } else {
          alertMsg("failed to update Post", false);
        }
      },
    }
  );
  return (
    <div>
      <Navbar user={userRes} />
      <PostHeader
        post={postRes}
        onDelete={deletePost.mutate}
        onUpdate={updatePost.mutate}
        loading={deletePost.isLoading || updatePost.isLoading}
      />
    </div>
  );
};

export default Post;
