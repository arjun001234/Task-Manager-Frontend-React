import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { notificationActions } from "../../Redux/notificationReducer";
import { userUpdate } from "../../Redux/userReducer";
import TextInput from "../ui/textInput";

const ChangePassword = ({state}) => {

  const dispatch = useDispatch();

  return (
    state.name === 'Change Password' &&
    <Formik
      initialValues={{ password: "",confirmPassword: "" }}
      validationSchema={yup.object({
        password: yup
          .string()
          .required("Required")
          .min(6, "Password too short.")
          .matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/, {
            message:
              "Password must include at least one number and special Character",
          }),
        confirmPassword: yup.string().required()
      })}
      onSubmit={ async (values, { setSubmitting,setErrors}) => {
        if(values.confirmPassword !== values.password){
          return setErrors({confirmPassword: "Password do not match"});
        }
        dispatch(userUpdate({password: values.confirmPassword}))
        setSubmitting(false);
      }}
    >
      <Form className={`create-task-form update-task-form ${state.show ? 'modelInAnim' : 'modelOutAnim'}`}>
        <h1>Password Change</h1>
        <TextInput name="password" placeholder="| Password" />
        <TextInput name="confirmPassword" placeholder="| Confirm Password" />
        <button type="submit" className="modal-button" style={{width: '200px'}}>
          Change Password
        </button>
      </Form>
    </Formik>
  );
};

export default ChangePassword;
