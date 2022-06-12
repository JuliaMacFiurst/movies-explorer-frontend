import React from "react";

import "./ButtonSubmit.css";

export default function ButtonSubmit({ text }) {
  return (
    <button className="button-submit" type="submit">
      {text}
    </button>
  );
}
