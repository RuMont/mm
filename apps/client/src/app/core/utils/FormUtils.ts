import { FormGroup, ValidationErrors } from '@angular/forms';

/**
 * Utility function to check if a form field is invalid.
 * @param form - The form group that contains the control.
 * @param control - The specific form control to check.
 * @returns True if the field is invalid and has been touched or dirty, otherwise false.
 */
export function isFieldInvalid(form: FormGroup, controlName: string): boolean {
  const control = form.get(controlName);
  return !!control && control.invalid && (control.touched || control.dirty);
}

/**
 * Utility function to retrieve validation errors for a form field.
 * @param form - The form group containing the control.
 * @param controlName - The name of the control.
 * @returns The validation errors object if errors exist, otherwise null.
 */
export function getFieldErrors(form: FormGroup, controlName: string): ValidationErrors | null {
  const control = form.get(controlName);
  return control ? control.errors : null;
}
