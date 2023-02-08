export const NavBar = () => {
  return (
    <div className="navbar navbar-dark bg-dark mb-4 px-4">
      <span className="navbar-brand">
        <em className="fas fa-calendar-alt me-2"></em>
        Calendario
      </span>

      <button className="btn btn-outline-danger">
        <em className="fas fa-sign-out-alt "></em>
      </button>
    </div>
  );
};
