// ServerLoader.jsx

import "../styles/ServerLoader.css";

function ServerLoader() {
  return (
    <div className="loader-container">

      <div className="bg1"></div>
      <div className="bg2"></div>
      <div className="bg3"></div>

      <div className="loader-card">

        <h1 className="logo">Galax¡O</h1>

        <div className="spinner"></div>

        <h2>Starting Backend...</h2>

        <p className="subtitle">
          This project is hosted on Render.
        </p>

        <p className="subtitle">
          The first startup may take around 30 seconds.
        </p>

        <div className="dots">
          Connecting to server<span>.</span><span>.</span><span>.</span>
        </div>

      </div>

    </div>
  );
}

export default ServerLoader;