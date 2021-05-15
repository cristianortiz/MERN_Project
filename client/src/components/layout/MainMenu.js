import React, { useContext, useEffect } from "react";
import authContext from "../../context/auth/authContext";
const MainMenu = () => {
  //extract user data from authState through authContext
  const AuthContext = useContext(authContext);
  const { user_data, authenticatedUser, signOutUser } = AuthContext;

  useEffect(() => {
    authenticatedUser();
    // eslint-disable-next-line
  }, [authenticatedUser]);

  return (
    <header className="app-header">
      {user_data ? (
        <p className="name-user">
          Hello <span>{user_data.user_name}</span>
        </p>
      ) : null}

      <nav className="nav-principal">
        <button
          className="btn btn-blank session-close"
          onClick={() => signOutUser()}
        >
          Sign Out
        </button>
      </nav>
    </header>
  );
};

export default MainMenu;
