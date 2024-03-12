import { useMutation, useQuery } from "react-query";
//cust
import { Card } from "../../../components/shared/Card/card";
import { useEffect, useState } from "react";
import { Modal } from "../../../components/shared/Modal/modal";
import { Form } from "../../../components/shared/Form-builder/form-builder";
import { createPost, inputs } from "./constant";
import ImageUploader from "../../../components/shared/Inputs/upload-imge";
import { alertMsg } from "../../../utils/alert";
import { addPost, getPosts } from "../../../services/posts";
import { handleRes } from "../../../utils/handle-res";
import Pagination from "../../../components/shared/Pagination";
import { useNavigate } from "react-router-dom";

const PAGE_SIZE = 6;

export const Posts = ({ user }) => {
  const navigate = useNavigate();
  const [fetchPosts, setFetchPosts] = useState(true);
  //get posts
  const query = useQuery("posts", getPosts, {
    refetchOnMount: false,
    refetchInterval: 2000,
    enabled: fetchPosts,
    onSuccess: () => {
      setFetchPosts(false);
    },
  });
  //create post
  const mutatePost = useMutation(addPost, {
    onSuccess: (res) => {
      if (res.data.success) {
        toggleCreate(false);
        setFetchPosts(true);
        alertMsg("Post added Successfully", true);
      }
    },
  });

  let cards = handleRes(query);
  cards = cards?.slice().reverse();

  //pagination
  const [currPage, setCurrPage] = useState(1);

  const start = currPage * PAGE_SIZE - PAGE_SIZE;
  const numberOfPages = Math.ceil(cards?.length / PAGE_SIZE);
  let itemsToRender = cards?.slice(start, start + PAGE_SIZE);

  //modal
  const [create, toggleCreate] = useState(false);

  //file
  const [file, setFile] = useState();

  const handleSubmit = (data) => {
    if (!file) {
      alertMsg("image is required", false);
    } else {
      mutatePost.mutate({ ...data, photo: file });
    }
  };
  return (
    <div className="container relative py-10 ">
      <Modal
        isOpen={create}
        toggleModal={() => toggleCreate(false)}
        title="Create Post"
      >
        <ImageUploader setFile={setFile} />
        <Form
          inputs={inputs}
          disabled={mutatePost.isLoading}
          schema={createPost}
          onSubmit={handleSubmit}
        />
      </Modal>

      <h2 className="text-6xl py-10 text-center text-black">Latest post</h2>
      <div className="py-10 flex justify-center">
        <button
          disabled={mutatePost.isLoading}
          className="btn "
          onClick={() => {
            if (!user?._id) {
              alertMsg("please Sign in", false);
            } else {
              toggleCreate(true);
            }
          }}
        >
          create post
        </button>
      </div>
      <div className="posts flex gap-4 flex-wrap justify-around ">
        {itemsToRender?.map((item) => (
          <div className="my-5 m-auto " key={item._id}>
            <Card
              link={"/post/" + item._id}
              title={item.title}
              content={item.content}
              imagePost={item.photo[0]?.url}
              date={item?.updatedAt}
              user={item?.user}
            />
          </div>
        ))}
      </div>
      <div className="my-10 flex justify-center">
        {itemsToRender?.length > 0 && (
          <Pagination
            totalPages={numberOfPages}
            currentPage={currPage}
            next={() => setCurrPage(Math.min(currPage + 1, numberOfPages))}
            perv={() => setCurrPage(Math.max(currPage - 1, 1))}
          />
        )}
      </div>
    </div>
  );
};
