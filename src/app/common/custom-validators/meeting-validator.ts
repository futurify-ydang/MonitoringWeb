import { ValidatorFn, AbstractControl, ControlContainer } from "@angular/forms";

export function searchKeywordTrainerValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
        let value = typeof(control.value);
        if(value === "object")
            return null;
        return {'trainer': {value: control.value}};
    };
  }

  export function searchKeywordGroupValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
        let value = typeof(control.value);
        if(value === "object")
            return null;
        return {'group': {value: control.value}};
    };
  }