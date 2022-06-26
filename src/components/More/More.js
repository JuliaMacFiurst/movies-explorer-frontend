import React from "react";

import "./More.css";

export default function More({ onClick }) {
    return (
        <section className={`more`}>
            <button className="more__button" type="button" onClick={onClick}>Ещё</button>
        </section>
    )
}