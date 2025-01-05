import { Directive, Input } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms";

@Directive({
  selector: '[appSelectValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: SelectRequiredValidatorDirective,
    multi: true
  }]
})
export class SelectRequiredValidatorDirective implements Validator {

  @Input('appSelectValidator') defaultSelected: string;

  validate(control: AbstractControl<any, any>): ValidationErrors {
    return control.value == this.defaultSelected ? { 'defaultSelected': true } : null
  }

}
