import { ErrorMessage, Field, useField } from "formik";
import React from "react";

const TextInput = ({ label, ...rest }) => {
  
  const [field, meta] = useField(rest);

  return (
    <>
      <Field
        {...rest}
        {...field}
        className={
          rest.className
            ? rest.className
            : meta.touched && meta.error
            ? "login input error-outline"
            : "login input"
        }
      />
      <ErrorMessage
        name={rest.name}
        render={(msg) => <p className="error-msg">{msg}</p>}
      />
    </>
  );
};

export default TextInput;
