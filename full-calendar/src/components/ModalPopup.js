import React from 'react'

const ModalPopup = () => {
    return (
        <div class="modal" id="modal1" data-animation="slideInOutLeft">
            <div class="modal-dialog">
                <header class="modal-header">
                    The header of the first modal
      <button class="close-modal" aria-label="close modal" data-close>Close</button>
                </header>
                <section class="modal-content">

                </section>
                <footer class="modal-footer">
                    The footer of the first modal
    </footer>
            </div>
        </div>
    )
}

export default ModalPopup
