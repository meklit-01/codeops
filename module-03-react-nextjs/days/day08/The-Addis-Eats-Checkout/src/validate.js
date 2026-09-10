export function validate(form) {
  const errors = {};

  // Name validation
  if (!form.name.trim()) {
    errors.name = "Name is required.";
  }

  // TeleBirr phone validation
  const phonePattern = /^(09\d{8}|\+2519\d{8})$/;

  if (!form.phone.trim()) {
    errors.phone = "TeleBirr phone number is required.";
  } else if (!phonePattern.test(form.phone.trim())) {
    errors.phone =
      "Enter a valid TeleBirr number, for example 0912345678 or +251912345678.";
  }

  // Area validation
  if (!form.area) {
    errors.area = "Please select a delivery area.";
  }

  // Notes are optional, so there is no validation here.

  return errors;
}