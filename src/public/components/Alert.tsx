import * as React from 'react';
import {Modal, Button} from "react-bootstrap";


export default class Alert extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className="static-modal">
            <Modal.Dialog>
                <Modal.Header>
                    <Modal.Title>Обнаружена вероятная атака</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    Обнаружена атака с вероятностью <strong>98.127371412</strong>%.
                    Атака произведена с адресов <strong>[105.240.168.96, 236.30.195.72]</strong> на порт&nbsp;
                    <strong>443/tcp</strong>.
                    Из-за высокой опасности система заблокировала доступ к атакуемому порту на следующие пять минут.
                </Modal.Body>

                <Modal.Footer>
                    <Button bsStyle="primary">Закрыть</Button>
                    <Button>Отменить блокировку порта</Button>
                </Modal.Footer>
            </Modal.Dialog>
        </div>
    };
}
