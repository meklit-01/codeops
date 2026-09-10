import { useRef, useState } from "react";
import Field from "./conponents/Fild";
import { validate } from "./validate";

function Checkout() {
  // All four fields are stored in ONE state object
  const [form, setForm] = useState({
    name: "",
    phone: "",
    area: "Bole",
    notes: "",
  });

  // Keeps track of fields the user has visited
  const [touched, setTouched] = useState({});

  // Tracks whether the order is being submitted
  const [submitting, setSubmitting] = useState(false);

  // Stores a general submit/failure message
  const [submitError, setSubmitError] = useState("");

  // Stores success message
  const [success, setSuccess] = useState(false);

  // Refs allow us to focus a field when necessary
  const nameRef = useRef(null);
  const phoneRef = useRef(null);
  const areaRef = useRef(null);
  const notesRef = useRef(null);

  // Validate on every render
  const errors = validate(form);

  // Check whether the form currently has errors
  const hasErrors = Object.keys(errors).length > 0;

  // One change handler for all four fields
  function handleChange(event) {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));

    // Remove old submit error when user starts correcting the form
    setSubmitError("");

    // Remove success message if the user edits the form
    setSuccess(false);
  }

  // Mark a field as touched
  function handleBlur(field) {
    setTouched((currentTouched) => ({
      ...currentTouched,
      [field]: true,
    }));
  }

  // Focus the first field that has a validation error
  function focusFirstInvalidField(currentErrors) {
    if (currentErrors.name) {
      nameRef.current?.focus();
      return;
    }

    if (currentErrors.phone) {
      phoneRef.current?.focus();
      return;
    }

    if (currentErrors.area) {
      areaRef.current?.focus();
      return;
    }

    if (currentErrors.notes) {
      notesRef.current?.focus();
    }
  }

  // Simulates sending the order to a server
  function fakeOrderRequest() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate a failed request
        reject(
          new Error(
            "The order could not be sent because the TeleBirr service is temporarily unavailable."
          )
        );
      }, 1500);
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    // Do not allow a second submission
    if (submitting) {
      return;
    }

    // Mark every field as touched
    setTouched({
      name: true,
      phone: true,
      area: true,
      notes: true,
    });

    // Validate before sending
    const currentErrors = validate(form);

    if (Object.keys(currentErrors).length > 0) {
      setSubmitError("Please correct the highlighted fields.");

      // Focus the first invalid field
      focusFirstInvalidField(currentErrors);

      return;
    }

    setSubmitting(true);
    setSubmitError("");
    setSuccess(false);

    try {
      // Send the order
      await fakeOrderRequest();

      // This would run if the request succeeded
      setSuccess(true);
    } catch (error) {
      // Keep all form values.
      // We only show the failure message.
      setSubmitError(error.message);

      // Since the simulated server failure does not identify
      // a particular bad field, focus the first field.
      nameRef.current?.focus();
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="checkout-container">
      <h1>Checkout</h1>

      <p className="checkout-intro">
        Complete your delivery information and place your order.
      </p>

      {/* General failure message */}
      {submitError && (
        <div className="submit-error" role="alert">
          {submitError}
        </div>
      )}

      {/* Success message */}
      {success && (
        <div className="success-message" role="status">
          Your order was placed successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        {/* NAME */}
        <Field
          id="name"
          label="Name"
          error={errors.name}
          touched={touched.name}
        >
          <input
            ref={nameRef}
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            onBlur={() => handleBlur("name")}
            placeholder="Enter your name"
          />
        </Field>

        {/* PHONE */}
        <Field
          id="phone"
          label="TeleBirr phone number"
          error={errors.phone}
          touched={touched.phone}
        >
          <input
            ref={phoneRef}
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            onBlur={() => handleBlur("phone")}
            placeholder="0912345678"
          />
        </Field>

        {/* AREA */}
        <Field
          id="area"
          label="Delivery area"
          error={errors.area}
          touched={touched.area}
        >
          <select
            ref={areaRef}
            name="area"
            value={form.area}
            onChange={handleChange}
            onBlur={() => handleBlur("area")}
          >
            <option value="Bole">Bole</option>
            <option value="Kazanchis">Kazanchis</option>
            <option value="Megenagna">Megenagna</option>
            <option value="Piassa">Piassa</option>
          </select>
        </Field>

        {/* NOTES */}
        <Field
          id="notes"
          label="Notes (optional)"
          error={errors.notes}
          touched={touched.notes}
        >
          <textarea
            ref={notesRef}
            name="notes"
            value={form.notes}
            onChange={handleChange}
            onBlur={() => handleBlur("notes")}
            placeholder="Optional delivery instructions"
            rows="4"
          />
        </Field>

        {/* SUBMIT BUTTON */}
        <button type="submit" disabled={submitting}>
          {submitting ? "Sending order..." : "Order — ETB 500"}
        </button>
      </form>
    </main>
  );
}

export default Checkout;