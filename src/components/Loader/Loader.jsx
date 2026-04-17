import "./Loader.css";

const Loader = () => {
  return (
    <div className="loader" id="loader">
      <div className="loader__content">
        <div className="loader__spinner">
          <div className="loader__ring"></div>
          <div className="loader__ring loader__ring--inner"></div>
        </div>
        <p className="loader__text">Loading your portfolio...</p>
      </div>

      <div className="loader__skeleton-cards">
        <div className="loader__skeleton-card">
          <div className="skeleton skeleton--title"></div>
          <div className="skeleton skeleton--row"></div>
          <div className="skeleton skeleton--row skeleton--short"></div>
          <div className="skeleton skeleton--row"></div>
          <div className="skeleton skeleton--footer"></div>
        </div>
        <div className="loader__skeleton-card">
          <div className="skeleton skeleton--title"></div>
          <div className="skeleton skeleton--row"></div>
          <div className="skeleton skeleton--row skeleton--short"></div>
          <div className="skeleton skeleton--row"></div>
          <div className="skeleton skeleton--footer"></div>
        </div>
      </div>

      <div className="loader__skeleton-table">
        <div className="skeleton skeleton--table-header"></div>
        {[...Array(5)].map((_, i) => (
          <div className="skeleton skeleton--table-row" key={i}></div>
        ))}
      </div>
    </div>
  );
};

export default Loader;
