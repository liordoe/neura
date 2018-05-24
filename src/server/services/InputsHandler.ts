import {PROTOCOLS, SERVICES, FLAGS, ATTACK} from '../../types/inputs.types';

export default class InputsHandler {
    public static handle(inputs: Array<string>):Array<number> {
        return inputs.map(this.handleInput);
    }

    public static handleInput(entry, index) {
        let out;
        switch (index) {
            case 1:
                // Тип протокола
                out = PROTOCOLS.indexOf(entry);
                break;
            case 2:
                // Сервис назначения
                out = SERVICES.indexOf(entry);
                break;
            case 3:
                // Статус флага соединения
                out = FLAGS.indexOf(entry);
                break;
            case 41:
                // Attack type
                out = entry === ATTACK[0] ? 0 : 1;
                break;
            default:
                out = +entry;
        }

        return out;
    }
}