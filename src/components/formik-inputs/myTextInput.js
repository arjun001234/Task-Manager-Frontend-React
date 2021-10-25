import { useField } from "formik";
import React from "react";

const MyUpdateInput = ({
  label,
  updateTask,
  isUpdated,
  dependency,
  ...props
}) => {
  const [field, meta] = useField(props);

  React.useEffect(() => {
    if (isUpdated === "Update") {
      updateTask();
    }
    // eslint-disable-next-line
  }, [isUpdated, dependency]);

  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input {...field} {...props} />
      {meta.touched && meta.error ? (
        <p className="error-msg">{meta.error}</p>
      ) : null}
    </>
  );
};

export default MyUpdateInput;
