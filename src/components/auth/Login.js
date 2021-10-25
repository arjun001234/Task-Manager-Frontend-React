import React from "react";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { useHistory } from "react-router-dom";
import TextInput from "../ui/textInput";
import { userActions } from "../../Redux/userReducer";
import { userLogin } from "../../Requests/urls";
import { useDispatch } from "react-redux";
import axios from "axios";
import moment from "moment";

const Login = () => {
  
  const history = useHistory();

  const dispatch = useDispatch();

  return (
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={yup.object({
            email: yup.string().required("Required").email("Invalid Email"),
            password: yup
              .string()
              .required("Required")
              .min(6, "Password too short.")
              .matches(
                /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
                {
                  message:
                    "Password must include at least one number and special Character",
                }
              ),
          })}
          onSubmit={async (values, { setSubmitting, setErrors}) => {
            try {
              const response = await axios.post(userLogin,values);
              const expirationTime = moment().add(30,'days').valueOf();
              localStorage.setItem("tm-token",response.data.token);
              localStorage.setItem("exp-time",expirationTime);
              dispatch(userActions.setUser({user: response.data.user}));
              dispatch(userActions.setLoggedInStatus());
              history.push('/text-anim');
            } catch (error) {
              if(error.response.data && error.response.data.error){
                if(error.response.data.error.includes('Email')){
                  setErrors({email: "Incorrect Email"})
                }else if(error.response.data.error.includes('Password')){
                  setErrors({password: "Incorrect Password"})
                }
              }
            }
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="login content">
              <h1 className="login header">Hello There!</h1>
              <TextInput type="text" name="email" placeholder="| Email" />
              <TextInput type="password" name="password"  placeholder="| Password" />
              <button className="welcome-button" type="submit">
                {isSubmitting ? "Logging..." : "Login"}
              </button>
            </Form>
          )}
        </Formik>
  );
};

export default Login;
