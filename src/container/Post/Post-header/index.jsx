import { useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

//custom
import { handleRes } from "../../../utils/handle-res";
import { Modal } from "../../../components/shared/Modal/modal";
import { createPost, inputs } from "../../Home/posts/constant";
import { Form } from "../../../components/shared/Form-builder/form-builder";
import ImageUploader from "../../../components/shared/Inputs/upload-imge";

export const PostHeader = ({ post, loading, onDelete, onUpdate }) => {
  const userID = localStorage.getItem("userID");
  const [file, setFile] = useState();
  const [modals, setModals] = useState({ update: false, delete: false });
  const userQuery = useQuery(["user-login", userID]);
  const loggedInQuery = handleRes(userQuery);

  //helper function
  const modalsHandler = (modal) => {
    setModals({ ...modals, [modal]: !modals[modal] });
  };

  const handleUpdate = (id, data) => {
    onUpdate({ ...data, id, photo: file ?? undefined });
    modalsHandler("update");
  };
  //variable
  const isOwner = loggedInQuery?._id === post?.user?._id;
  const dateObj = new Date();
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse justify-between w-5/6">
        <img
          src={post?.photo[0]?.url}
          className="max-w-sm rounded-lg shadow-2xl"
        />
        <div>
          <h1 className="text-5xl font-bold text-black">{post?.title}</h1>
          <p className="py-6 text-gray-400">{post?.content}</p>
          <p className="capitalize text-gray-400">
            created by : {post?.user?.username}
          </p>
          <p className="py-6 text-gray-400">
            last update: {dateObj.toDateString(post?.updatedAt)}
          </p>
          {isOwner && (
            <div className="flex gap-4">
              <button
                className="btn btn-primary"
                onClick={() => modalsHandler("update")}
              >
                update
              </button>
              <button
                className="btn btn-error"
                onClick={() => modalsHandler("delete")}
              >
                Delete
              </button>
            </div>
          )}
          <DeleteModal
            isOpen={modals.delete}
            item={post?.title}
            toggleModal={() => modalsHandler("delete")}
            submit={() => {
              onDelete(post?._id);
              modalsHandler("delete");
            }}
          />
          <Modal
            isOpen={modals.update}
            toggleModal={() => modalsHandler("update")}
            title="Update Post"
          >
            <ImageUploader urlImg={post?.photo[0].url} setFile={setFile} />
            <Form
              data={post}
              inputs={inputs}
              schema={createPost}
              onSubmit={(data) => {
                handleUpdate(post._id, data);
              }}
            />
          </Modal>
        </div>
      </div>
    </div>
  );
};

const DeleteModal = ({ isOpen, toggleModal, item, submit }) => {
  return (
    <Modal isOpen={isOpen} toggleModal={toggleModal}>
      <h2 className="text-xl font-bold">
        Do you want to delete {item} Article ?
      </h2>
      <div className="flex justify-end w-full gap-4 mt-5">
        <button className="btn btn-error" onClick={submit}>
          Delete
        </button>
        <button className="btn btn-primary" onClick={toggleModal}>
          Cancel
        </button>
      </div>
    </Modal>
  );
};
