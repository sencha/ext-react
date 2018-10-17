import React,{Component} from 'react';
import { Modal,ModalManager,Effect} from 'react-dynamic-modal';

class MyModal extends Component{
  render(){
    const { text,onRequestClose } = this.props;
    return (
      <Modal
        onRequestClose={onRequestClose}
        effect={Effect.ScaleUp}>
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Sample Modal Dialog</h5>
            </div>
            <div class="modal-body">
              <p>What you input : {text}</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" data-dismiss="modal" onClick={ModalManager.close}>Close</button>
            </div>
          </div>
      </Modal>
    )
  }
}

export default MyModal