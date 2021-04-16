import React from "react";
const MainMenu = () => {
  return (
    <header className="app-header">
      <p className="name-user">
        Hello <span>John Wayne</span>
      </p>
      <nav className="nav-principal">
        <a href="#!">Sign Out</a>
      </nav>
    </header>
  );
};

export default MainMenu;
