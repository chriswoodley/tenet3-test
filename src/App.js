import React, { useCallback } from 'react';
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import layoutStyles from './styles/layout.module.css';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import buttonStyles from './styles/button.module.css';

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const elapsedTime = useSelector(state => state.time.elapsedTime);

  const gotoSetTimes = useCallback(() => {
    navigate('/');
  }, [navigate]);

  return (
    <div
      className={classNames(layoutStyles.container)}
    >
      <header 
        className={classNames(layoutStyles.head)}
      >
        {
          location.pathname === '/timer' ? (
            <button
              type="button"
              onClick={gotoSetTimes}
              disabled={elapsedTime > 0}
              className={classNames(buttonStyles.default)}
            >
              &lt; Set Times
            </button>
          ) : null
        }
      </header>

      <main
        className={classNames(layoutStyles.content)}
      >
        <Outlet />
      </main>
    </div>
  );
}

export default App;
