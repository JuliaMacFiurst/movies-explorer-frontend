import React from "react";

import "./More.css";

export default function More({ isHidden }) {
    return (
        <section className={`more ${!isHidden && 'more_unvisible'}`}>
            <button className="more__button" type="button">Ещё</button>
        </section>
    )
}