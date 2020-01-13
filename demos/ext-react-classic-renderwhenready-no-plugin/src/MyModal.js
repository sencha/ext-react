import React,{Component} from 'react';
import { Modal,ModalManager,Effect} from 'react-dynamic-modal';

class MyModal extends Component{
  render(){
    const { text,onRequestClose } = this.props;
    return (
      <Modal
        onRequestClose={onRequestClose}
        effect={Effect.ScaleUp}>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Sample Modal Dialog</h5>
            </div>
            <div className="modal-body">
              <p>What you input : {text}</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={ModalManager.close}>Close</button>
            </div>
          </div>
      </Modal>
    )
  }
}

export default MyModal