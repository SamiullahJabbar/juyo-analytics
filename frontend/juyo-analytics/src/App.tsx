import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider  } from "react-redux";
import { store } from "./app/store";
import Dashboardmain from "./routes/dashboard/dashboardmain";
import Login from "./routes/login/Login";
import SignUp from "./routes/signup/Signup";
import Analytic from "./routes/Analytic/Analytic";
import Forecast from "./routes/Forecast/Forecast";
import Reports from "./routes/Report/Reports";
import Settings from "./routes/Settings/Settings";
import AI from "./routes/AI Assistant/AI";
import Calculator from "./routes/Calculator/Calculator";
import Dashboardcanvas from "./routes/dashboard/dashboardcanvas";

function App() {

  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboardmain" element={<Dashboardmain />} />
          <Route
            path="/dashboardcanvas"
            element={<Dashboardcanvas />}
          />
          <Route
            path="/analytics"
            element={<Analytic />}
          />
          <Route
            path="/forecast"
            element={<Forecast />}
          />
          <Route
            path="/reports"
            element={<Reports />}
          />
          <Route
            path="/AI-Assistant"
            element={<AI />}
          />
          <Route
            path="/settings"
            element={<Settings />}
          />
            <Route
            path="/calculator"
            element={<Calculator />}
          />
       
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
