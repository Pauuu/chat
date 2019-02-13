import { AlertType } from '../enum/alert-type.enum';

export class Alert {
    text :String;
    type :AlertType;

    constructor(text, type = AlertType.Success){
        this.text = text;
        this.type = type;
    }


}
