import './Modal.css';

export default function Modal(props) {
  const modalClassName = `modal${props.isOpen ? ' modal_opened' : ''}`;
  return (
    <div className={modalClassName}>
      <div className="modal__container">
        <div className="modal__close" onClick={props.close}></div>
        <div className="modal__image"></div>
        <span className="modal__text">{props.message}</span>
      </div>
    </div>
  );
}
