import { useRef, useState } from "react"
import "./App.css"

// Exercise 3:
// Pure validation function
function validate(form) {
  const errors = {}

  if (!form.name.trim()) {
    errors.name = "Name is required."
  }

  if (!form.phone.trim()) {
    errors.phone = "TeleBirr phone is required."
  } else if (!/^(09\d{8}|\+2519\d{8})$/.test(form.phone)) {
    errors.phone = "Enter a valid TeleBirr phone number."
  }

  if (!form.area) {
    errors.area = "Delivery area is required."
  }

  return errors
}

function App() {
  // Exercise 1:
  // One state object for the whole form
  const [form, setForm] = useState({
    name: "",
    phone: "",
    area: "",
    notes: "",
  })

  // Exercise 4:
  // Track fields the user has visited
  const [touched, setTouched] = useState({})

  // Exercise 6:
  // Track submitting state
  const [submitting, setSubmitting] = useState(false)

  // Exercise 7:
  // Store failed request reason
  const [submitError, setSubmitError] = useState("")

  // Exercise 6:
  const total = 850

  // Exercise 7:
  // References used to focus the first bad field
  const nameRef = useRef(null)
  const phoneRef = useRef(null)
  const areaRef = useRef(null)

  // Exercise 1 + 2:
  // Update form values
  function handleChange(event) {
    const { name, value } = event.target

    setForm({
      ...form,
      [name]: value,
    })

    setSubmitError("")
  }

  // Exercise 4:
  // Mark field as touched when leaving it
  function handleBlur(event) {
    const { name } = event.target

    setTouched({
      ...touched,
      [name]: true,
    })
  }

  // Exercise 7:
  // Focus first invalid field
  function focusFirstError(errors) {
    if (errors.name) {
      nameRef.current?.focus()
      return
    }

    if (errors.phone) {
      phoneRef.current?.focus()
      return
    }

    if (errors.area) {
      areaRef.current?.focus()
    }
  }

  // Exercise 6 + 7:
  async function handleSubmit(event) {
    event.preventDefault()

    setSubmitError("")

    // Exercise 3:
    const errors = validate(form)

    // If validation fails
    if (Object.keys(errors).length > 0) {
      setTouched({
        name: true,
        phone: true,
        area: true,
        notes: true,
      })

      // Exercise 7:
      focusFirstError(errors)

      return
    }

    // Exercise 6:
    setSubmitting(true)

    try {
      // Exercise 7:
      // Simulate a failed request
      await new Promise((_, reject) => {
        setTimeout(() => {
          reject(
            new Error(
              "Payment service is temporarily unavailable. Please try again."
            )
          )
        }, 2000)
      })
    } catch (error) {
      // Show reason for failure
      setSubmitError(error.message)

      // Form values are NOT cleared
    } finally {
      setSubmitting(false)
    }
  }

  // Exercise 3:
  // Validate during render
  const errors = validate(form)

  return (
    <main>
      <h1>Checkout</h1>

      {/* Exercise 7: failed request message */}
      {submitError && (
        <div role="alert">
          {submitError}
        </div>
      )}

      <form onSubmit={handleSubmit}>

        {/* Exercise 1 + 4 + 5 */}
        <label htmlFor="name">
          Name
        </label>

        <input
          ref={nameRef}
          id="name"
          name="name"
          value={form.name}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={Boolean(
            touched.name && errors.name
          )}
          aria-describedby={
            touched.name && errors.name
              ? "name-error"
              : undefined
          }
        />

        {touched.name && errors.name && (
          <p id="name-error" role="alert">
            {errors.name}
          </p>
        )}

        {/* Exercise 1 + 4 + 5 */}
        <label htmlFor="phone">
          TeleBirr Phone
        </label>

        <input
          ref={phoneRef}
          id="phone"
          name="phone"
          type="tel"
          value={form.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={Boolean(
            touched.phone && errors.phone
          )}
          aria-describedby={
            touched.phone && errors.phone
              ? "phone-error"
              : undefined
          }
        />

        {touched.phone && errors.phone && (
          <p id="phone-error" role="alert">
            {errors.phone}
          </p>
        )}

        {/* Exercise 2 + 4 + 5 */}
        <label htmlFor="area">
          Delivery Area
        </label>

        <select
          ref={areaRef}
          id="area"
          name="area"
          value={form.area}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={Boolean(
            touched.area && errors.area
          )}
          aria-describedby={
            touched.area && errors.area
              ? "area-error"
              : undefined
          }
        >
          <option value="">
            Select an area
          </option>

          <option value="Bole">
            Bole
          </option>

          <option value="Kazanchis">
            Kazanchis
          </option>

          <option value="Megenagna">
            Megenagna
          </option>

          <option value="Piassa">
            Piassa
          </option>
        </select>

        {touched.area && errors.area && (
          <p id="area-error" role="alert">
            {errors.area}
          </p>
        )}

        {/* Exercise 1 + 4 + 5 */}
        <label htmlFor="notes">
          Notes (optional)
        </label>

        <textarea
          id="notes"
          name="notes"
          value={form.notes}
          onChange={handleChange}
          onBlur={handleBlur}
        />

        {/* Exercise 6 */}
        <p>
          Total: ETB {total}
        </p>

        <button
          type="submit"
          disabled={submitting}
        >
          {submitting
            ? `Submitting... — ETB ${total}`
            : `Place Order — ETB ${total}`}
        </button>
      </form>
    </main>
  )
}

export default App

