import React, { useRef } from "react";

import './InfoTooltip.css';

export default function InfoTooltip(props) {
    const { isOpen, onClose, message } = props;

    const overlayRef = useRef(null);

    function onOverlayClick(event) {
        if (event.target === overlayRef.current) {
            onClose()
        };
    };

    return (
        <div className={`tooltip ${isOpen && 'tooltip_is-opened'}`} ref={overlayRef} onClick={onOverlayClick}>
            <div className="tooltip__container">
                <button className="tooltip__button-close" type="button" onClick={onClose}></button>
                <p className="tooltip__text">{message}</p>
            </div>
        </div>
    );
};
