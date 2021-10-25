import { Formik, Form } from "formik";
import * as yup from "yup";
import React from "react";
import { useHistory } from "react-router-dom";
import TextInput from "../ui/textInput";
import { createUser } from "../../Requests/urls";
import axios from "axios";
import moment from 'moment';
import {useDispatch} from 'react-redux';
import { userActions } from "../../Redux/userReducer";

const Register = () => {

  const history = useHistory();

  const dispatch = useDispatch();

  return (
        <Formik
          initialValues={{ name: "", email: "", password: "", age: 0 }}
          validationSchema={yup.object({
            name: yup.string().required("Required").min(5, "Name too short."),
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
            age: yup
              .number()
              .positive("Age cannot be negative")
              .integer("Age should be an integer.")
              .max(80, "Max valued reached"),
          })}
          onSubmit={async (values, { setSubmitting, setErrors }) => {
            try {
              const response = await axios.post(createUser,values);
              const expirationTime = moment().add(30,'days').valueOf();
              localStorage.setItem("tm-token",response.data.token);
              localStorage.setItem("exp-time",expirationTime);
              dispatch(userActions.setUser({user: response.data.user}));
              dispatch(userActions.setLoggedInStatus());
              history.push('/text-anim');
            } catch (error) {
              if(error.response.data && error.response.data.errors && error.response.data.errors["password"]){
                setErrors({password: "Weak Password"})
              }
              if(error.response.data && error.response.data.keyValue["email"]){
                return setErrors({ email: "Email Exists" });
              }
            }
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="login content">
              <h1 className="login header">Hello There!</h1>
              <p className="greeting">Your Task Managing Solution</p>
              <TextInput type="text" name="name" placeholder="| Name" />
              <TextInput type="text" name="email" placeholder="| Email" />
              <TextInput type="password" name="password"  placeholder="| Password" />
              <TextInput type="number" name="age" placeholder="| Age" />
              <button className="welcome-button" type="submit">
                {isSubmitting ? "Registering..." : "Register"}
              </button>
            </Form>
          )}
        </Formik>
  );
};

export default Register;
