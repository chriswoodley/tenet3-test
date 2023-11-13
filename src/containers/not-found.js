import React from 'react';
import { useRouteError, Link } from "react-router-dom";
import layoutStyles from '../styles/layout.module.css';
import classNames from 'classnames';

function NotFound() {
  const { statusText, error } = useRouteError();

  return (
    <div
      className={classNames(layoutStyles.container)}
    >
      <main
        className={classNames(layoutStyles.content)}
      >
        <div>
          <h1>
            {statusText || error.message}
          </h1>

          <p>
            It looks like you made a wrong turn. Lets get you back on the
            right path.
          </p>

          <p>
            <Link to="/">Back to Home</Link>
          </p>
        </div>
      </main>
    </div>
  );
}

export default NotFound;