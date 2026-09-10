import { Children, cloneElement } from "react";

function Field({ id, label, error, touched, children }) {
  const showError = touched && error;
  const errorId = `${id}-error`;

  // Get the input/select/textarea passed inside Field
  const child = Children.only(children);

  // Add accessibility attributes to the field
  const control = cloneElement(child, {
    id: id,
    "aria-invalid": Boolean(showError),
    "aria-describedby": showError ? errorId : undefined,
  });

  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>

      {control}

      {showError && (
        <p id={errorId} className="error-message" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export default Field;