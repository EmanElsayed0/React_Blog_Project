import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { Form } from "../../components/shared/Form-builder/form-builder";
import { request } from "../../services/axios-utils";
import { signUp } from "../../services/user";
import { alertMsg } from "../../utils/alert";
import { inputs, registerSchema } from "./constant";
import myImage from "../../assets/images/Blog post-pana.svg";

export const SignUpSec = () => {
  const navigate = useNavigate();

  const mutation = useMutation(signUp, {
    onSuccess: (res) => {
      if (res?.data?.success) {
        navigate("/");
        alertMsg(
          res.data ? "welcome to our blog" : undefined,
          res.data.success
        );
        localStorage.setItem("userID", res.data.data.user._id);
        localStorage.setItem("jwt", res.data.data.access_token);
      } else {
        alertMsg(res?.response?.data?.message, res?.response?.data?.success);
      }
    },
  });

  return (
    <>
      <div className="text-center pt-20">
        <h1 className="text-5xl font-bold text-black">Register now</h1>
        <p className="py-6 text-gray-500">welcome to our blog !</p>
      </div>
      <div className="flex justify-evenly pt-30">
        <div className=" flex-col lg:flex-row-reverse">
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
              <Form
                inputs={inputs}
                schema={registerSchema}
                onSubmit={mutation.mutate}
              >
                <label className="label text-gray-500">
                  <span> have account?</span>
                  <Link
                    to="/sign-in"
                    className="label-text-alt link link-hover"
                  >
                    Sign in
                  </Link>
                </label>
              </Form>
            </div>
          </div>
        </div>
        <img src={myImage} alt="" width="700px" />
      </div>
    </>
  );
};
