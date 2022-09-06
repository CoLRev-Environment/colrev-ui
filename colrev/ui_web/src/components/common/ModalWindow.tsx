import { Modal } from "bootstrap";
import { useEffect, useRef } from "react";
import ReactDOM from "react-dom";

const portalElement: any = document.getElementById("overlays");

const ModalWindow: React.FC<{
  title: string;
  isShowNext: boolean;
  isNextEnabled: boolean;
  isShowOk: boolean;
  isOkEnabled: boolean;
  onNext: any;
  onOk: any;
  onClose: any;
  children: any;
}> = ({
  title,
  isShowNext,
  isNextEnabled,
  isShowOk,
  isOkEnabled,
  onNext,
  onOk,
  onClose,
  children,
}) => {
  const modalRef = useRef<any>();

  const showModal = () => {
    const modalElement = modalRef.current;

    let modal = Modal.getInstance(modalElement);
    if (!modal) {
      modal = new Modal(modalElement, {
        backdrop: "static",
        keyboard: false,
      });
    }

    modal.show();
  };

  const hideModal = () => {
    const modalElement = modalRef.current;
    const modal = Modal.getInstance(modalElement);
    modal?.hide();
    onClose();
  };

  useEffect(() => {
    showModal();
  }, []);

  return (
    <>
      {ReactDOM.createPortal(
        <div className="modal fade" ref={modalRef} tabIndex={-1}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{title}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={hideModal}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">{children}</div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={hideModal}
                >
                  Cancel
                </button>
                {isShowNext && (
                  <button
                    type="button"
                    className="btn btn-primary"
                    disabled={!isNextEnabled}
                    onClick={() => onNext()}
                  >
                    Next
                  </button>
                )}
                {isShowOk && (
                  <button
                    type="button"
                    className="btn btn-primary"
                    disabled={!isOkEnabled}
                  >
                    Ok
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>,
        portalElement
      )}
    </>
  );
};

export default ModalWindow;
