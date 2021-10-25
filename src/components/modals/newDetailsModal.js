import React from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { updateUserRequest } from "../../Requests/requests";

const NewDetailModal = ({ handleCloseModal, fetchUser }) => {

  const token = localStorage.getItem("tm-token");

  return (
    <main className={`modal-container`} >
      <Formik
        initialValues={{ name: "", email: "" }}
        validationSchema={yup.object({
          name: yup.string().required("Required").min(5, "Name too short."),
          email: yup.string().required("Required").email("Invalid Email"),
        })}
        onSubmit={async (values, { setSubmitting,setErrors }) => {
          await updateUserRequest(values, token, (result, error) => {
            if (error) {
              console.log(error);
              setErrors({email: "Invalid Email"});
            }
            if (result) {
              console.log(result);
              handleCloseModal();
            }
          });
          fetchUser();
          setSubmitting(false);
        }}
      >
        <Form className="modal">
          <FontAwesomeIcon
            icon={faTimes}
            className="close-modal"
            onClick={handleCloseModal}
          />
          <p className="modal-text">Enter New Values </p>
          <Field
            name="name"
            type="text"
            className="modal-input"
            placeholder="Enter new name"
          />
          <ErrorMessage
            name="name"
            render={(msg) => <p className="error-msg">{msg}</p>}
          />
          <Field
            name="email"
            type="text"
            className="modal-input"
            placeholder="Enter new email"
          />
          <ErrorMessage
            name="email"
            render={(msg) => <p className="error-msg">{msg}</p>}
          />
          <button type="submit" className="modal-button">
            Update
          </button>
        </Form>
      </Formik>
    </main>
  );
};

export default NewDetailModal;
