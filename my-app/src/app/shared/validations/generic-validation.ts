
import { FormGroup } from '@angular/forms';

export class GenericValidation {
    constructor(private validationMessages: { [key: string]: { [key: string]: string } }) {

    }

    processMessages(container: FormGroup): { [key: string]: string } {
        let messages = {};
        for (const controlKey in container.controls) {
            if (container.controls.hasOwnProperty(controlKey)) {
                const c = container.controls[controlKey];
                // Check if c is an instance of FormGroup(has other child controls.), process it's child.
                if (c instanceof FormGroup) {
                    // The same function will process the child.
                   const childMessages = this.processMessages(c);
                   Object.assign(messages, childMessages);
                } else {
                    if (this.validationMessages[controlKey]) {
                        messages[controlKey] = '';
                        if ((c.dirty || c.touched) && c.errors) {
                            Object.keys(c.errors).map(messageKey => {
                                if (this.validationMessages[controlKey][messageKey]) {
                                    messages[controlKey] += this.validationMessages[controlKey][messageKey] + ' ';
                                }
                            });
                        }
                    }
                }
            }
        }
        return messages;
    }
}