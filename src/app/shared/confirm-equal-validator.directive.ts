import { Directive } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms";

@Directive({
  selector: '[appConfirmEqualValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: ConfirmEqualValidatorDirective,
    multi: true
  }]
})
export class ConfirmEqualValidatorDirective implements Validator {

  validate(passwordGroup: AbstractControl<any, any>): ValidationErrors {
    const passwordField = passwordGroup.get('password');
    const confirmPasswordField = passwordGroup.get('confirmPassword');

    if (passwordField && confirmPasswordField && passwordField.value != confirmPasswordField.value) {
      return { 'notEqual': true }
    }
    return null;
  }
}
