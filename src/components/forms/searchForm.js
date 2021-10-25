import { Form, Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { searchTasks } from "../../Redux/tasksReducer";
import TextInput from "../ui/textInput";

const SearchForm = ({setSearch}) => {

  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{ text: "" }}
      validationSchema={yup.object({
        text: yup.string(),
      })}
      onSubmit={async ({text}, { setSubmitting }) => {
        if(text === ''){
          setSearch(false);
        }else{
          setSearch(true);
          dispatch(searchTasks(text));
        }
        setSubmitting(false);
      }}
    >
      <Form className="search">
        <TextInput
          className="search-input"
          type="text"
          name="text"
          placeholder="Search"
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </Form>
    </Formik>
  );
};

export default SearchForm;
