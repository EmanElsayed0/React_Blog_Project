export const Modal = ({ isOpen, toggleModal, title, children }) => {
  if (isOpen)
    return (
      <div className="modal__overlay" onClick={toggleModal}>
        <div
          className="modal__box bg-base-200"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-4xl pb-3 text-center text-black">{title}</h2>
          {children}
        </div>
      </div>
    );
};
