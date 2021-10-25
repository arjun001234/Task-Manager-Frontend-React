import React from 'react'
import MyUpdateInput from '../formik-inputs/myTextInput';
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as yup from "yup";
import TextInput from '../ui/textInput';
import { useDispatch } from 'react-redux';
import {  taskCreate, taskUpdate } from '../../Redux/tasksReducer';

const UpdateForm = ({state}) => {

    const dispatch = useDispatch();

    return (
        ['Update Task','Create Task'].includes(state.name) &&
        <Formik
            initialValues={{ task: state.data ? state.data.task : "Task", completed: state.data ? state.data.completed : false}}
            validationSchema={yup.object({
              task: yup
                .string()
                .required("Required")
                .min(8, "Title too small."),
              completed: yup.string().required("Required"),
            })}
            onSubmit={async (values, { setSubmitting }) => {
              if(state.name === 'Create Task'){
                dispatch(taskCreate(values))
              }else if(state.name === 'Update Task'){
                dispatch(taskUpdate(state.data,values))
              }
              setSubmitting(false);
            }}
          >
            {() => (
              <Form className={`create-task-form update-task-form ${state.show ? 'modelInAnim' : 'modelOutAnim'}`} key="2">
                <h1>{state.name === 'Create Task' ? 'Create a Task' : 'Update a Task'}</h1>
                <TextInput type="text" name="task" />
                <label htmlFor="completed" />
                <Field name="completed" as="select" className="input">
                  <option value="false">No</option>
                  <option value="true">Yes</option>
                </Field>
                <ErrorMessage
                  name="completed"
                  render={(msg) => <p className="error-msg">{msg}</p>}
                />
                <button type="submit">{state.name === 'Create Task' ? 'Create' : 'Update'}</button>
              </Form>
            )}
          </Formik>
    )
}

export default UpdateForm
