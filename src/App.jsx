import { useHarvesting } from "./context/HarvestingContext";
import Header from "./components/Header/Header";
import Disclaimer from "./components/Disclaimer/Disclaimer";
import CapitalGainsCards from "./components/CapitalGainsCards/CapitalGainsCards";
import HoldingsTable from "./components/HoldingsTable/HoldingsTable";
import Loader from "./components/Loader/Loader";
import "./App.css";

const AppContent = () => {
  const { loading, error } = useHarvesting();

  if (loading) {
    return (
      <>
        <Header />
        <Loader />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="error" id="error-state">
          <div className="error__content">
            <div className="error__icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 9v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  stroke="#ef4444"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h2 className="error__title">Something went wrong</h2>
            <p className="error__message">{error}</p>
            <button className="error__btn" onClick={() => window.location.reload()}>
              Try Again
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="app__main" id="main-content">
        <div className="app__container">
          <Disclaimer />
          <CapitalGainsCards />
          <HoldingsTable />
        </div>
      </main>
    </>
  );
};

const App = () => {
  return <AppContent />;
};

export default App;
