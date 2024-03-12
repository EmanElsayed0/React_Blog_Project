import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";

//custom component
import UserContainer from "../../container/User";
import { getUserByID, updateOneUser } from "../../services/user";
import { handleRes } from "../../utils/handle-res";
import { alertMsg } from "../../utils/alert";
import { Form } from "../../components/shared/Form-builder/form-builder";
import { inputs, userSchema } from "../../container/User/constant";
import { Modal } from "../../components/shared/Modal/modal";
import { useState } from "react";
import ImageUploader from "../../components/shared/Inputs/upload-imge";
import { Navbar } from "../../components/navbar/navbar";
const User = () => {
  const { id: userID } = useParams();
  const [photo, setPhoto] = useState();
  const [cover_photo, setCover] = useState();

  const [modals, setModals] = useState({
    data: false,
    photo: false,
    cover: false,
  });

  const navigate = useNavigate();
  //get user
  const userQuery = useQuery(["user", userID], () => getUserByID(userID), {
    onSuccess: (res) => {
      if (!res?.data?.success) {
        alertMsg("Something went wrong", false);
        navigate("/");
      }
    },
  });
  //get logged in user
  const loginUserQuery = useQuery([
    "user-login",
    localStorage.getItem("userID"),
  ]);

  //update User
  const updateUser = useMutation(updateOneUser, {
    onSuccess: (res) => {
      if (res?.data?.success) {
        alertMsg("user updated successfully", true);
        setModals({ photo: false, cover: false, data: false });
        userQuery.refetch();
      } else {
        alertMsg("failed to update user ", false);
      }
    },
  });

  //modals Toggler
  const modalsToggler = (name) => {
    setModals({ ...modals, [name]: !modals[name] });
  };

  //submit
  const handleSubmit = (data) => {
    updateUser.mutate({ ...data, photo, cover_photo });
  };

  const loggedInUser = handleRes(loginUserQuery);
  const user = handleRes(userQuery);
  const auth = loggedInUser?._id === user?._id;
  return (
    <div>
      <Navbar user={user} />

      <UserContainer user={user} isOwner={auth} modalsToggler={modalsToggler} />
      {/* modal to change information */}
      <Modal isOpen={modals.data} toggleModal={() => modalsToggler("data")}>
        <Form
          inputs={inputs}
          data={user}
          schema={userSchema}
          onSubmit={handleSubmit}
        />
      </Modal>
      {/* modal to change cover  */}
      <Modal isOpen={modals.cover} toggleModal={() => modalsToggler("cover")}>
        <h2 className="text-xl text-center font-bold pb-6 capitalize">
          change cover
        </h2>
        <ImageUploader urlImg={user?.cover_photo[0]?.url} setFile={setCover} />
        <div className="form-control mt-6">
          <button
            disabled={updateUser.isLoading}
            className="btn "
            onClick={() => handleSubmit(cover_photo)}
          >
            Update Cover
          </button>{" "}
        </div>
      </Modal>

      {/* modal to change photo */}
      <Modal isOpen={modals.photo} toggleModal={() => modalsToggler("photo")}>
        <h2 className="text-xl text-center font-bold pb-6 capitalize">
          change Photo
        </h2>
        <ImageUploader urlImg={user?.photo[0]?.url} setFile={setPhoto} />
        <div className="form-control mt-6">
          <button
            disabled={updateUser.isLoading}
            className="btn "
            onClick={() => handleSubmit(photo)}
          >
            Update Photo
          </button>{" "}
        </div>
      </Modal>
    </div>
  );
};

export default User;
