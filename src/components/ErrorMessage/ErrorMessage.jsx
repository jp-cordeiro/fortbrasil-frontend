import React from 'react';

import './error-message.scss';

export default function ErrorMessage({ message }) {
  return (
    <div id="error-message">
      <span>{message}</span>
    </div>
  );
}
