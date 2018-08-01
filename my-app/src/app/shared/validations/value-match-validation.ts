import { ValidatorFn, AbstractControl } from '@angular/forms';


export class ValueMatcherValidation {

    static matchValue(baseValue, confirmValue): ValidatorFn {
        return function(c: AbstractControl): { [key: string]: boolean } | null {
            const baseValControl = c.get(baseValue);
            const confirmValControl = c.get(confirmValue);
            if (baseValControl.pristine || confirmValControl.pristine) {
              return null;
            }
            if (baseValControl.value === confirmValControl.value) {
              return null;
            }
            return {'match': true };
          };
    }
}