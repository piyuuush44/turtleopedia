import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'camelToSentanceCase'
})
export class CamelToSentanceCasePipe implements PipeTransform {

    transform(value: any): any {
        return ((value.replace(/([a-z])([A-Z][a-z])/g, '$1 $2')
            .charAt(0).toUpperCase() + value
            .slice(1)
            .replace(/([a-z])([A-Z][a-z])/g, '$1 $2')).replace(/\w+[.!?]?$/, ''));
    }

}
