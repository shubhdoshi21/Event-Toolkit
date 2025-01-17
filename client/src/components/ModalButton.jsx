import React from 'react';

const ModalButton = ({ modal, onClick }) => {
  return (
    <>
      <style>
        {`
          .modal-button {
            position: relative;
            min-width: 150px;
            min-height: 150px;
            border-radius: 50%;
           
            transition: all 300ms ease;
          }
         
            .modal-button::before {
            content: "";
            position: absolute;
            top: -4px;
            left: -4px;
            right: -4px;
            bottom: -4px;
            border-radius: 50%;
            z-index:-1;
            border: 2px solid transparent;
            background: conic-gradient(
              from 90deg, 
              #9333ea, 
             #a855f7, 
              #f3f4f6, 
              purple
            );
          }
          .modal-button::after {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
         bottom:0;
            backdrop-filter: blur(20px); /* Adds blur effect */
            border-radius: 50%;
            z-index: -2; /* Places the blur effect behind the button */
          }
          .modal-button-text {
            display: flex; /* Enable Flexbox */
            align-items: center; /* Vertical alignment */
            justify-content: center; /* Horizontal alignment */
            padding: 0.5rem 0.75rem;
            font-weight: bold;
            font-size: 1.125rem;
            color: white;
            border-radius: 0.375rem;
            width: 100%;
            text-align: center;
            overflow: hidden;
          }
        `}
      </style>
      <button
        onClick={onClick}
        className="modal-button"
        style={{
          backgroundImage: `url(${modal.cityImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <span className="modal-button-text">{modal.cityName}</span>
      </button>
    </>
  );
};

export default ModalButton;
