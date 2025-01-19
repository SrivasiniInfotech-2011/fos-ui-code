import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function guarantorAmountValidator(
  additionalAmount: number,
  totalLoanAmount: number
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value || '';
    const isValid = (value + additionalAmount) < totalLoanAmount;
    return isValid ? null:{ validGuarantorAmount: false };
  };
}
