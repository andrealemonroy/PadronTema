import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Users from './components/Users';
import Roles from './components/Roles';
import Options from './components/Options';
import BasicInfo from './components/BasicInfo';
import HumanResources from './components/HumanResources';
import Payroll from './components/Payroll';
import MasterData from './components/tables/MasterData';
import Projects from './components/tables/Projects';
import Periodic from './components/evaluation/Periodic';
import OnDemand from './components/evaluation/OnDemand';
import LoginPage from './components/LoginPage';

import OptionsByRoles from './components/OptionsByRoles';
import Incidents from './components/Incidents';
import Contracts from './components/reports/Contracts';
import Reports from './components/reports/Reports';
import DatosDerechohabiente from './components/DatosDerechohabiente';
import DatosPersonales from './components/tabs/DatosPersonales';
import Direccion from './components/tabs/Direccion';
import SistemaPensionario from './components/tabs/SistemaPensionario';
import DatosLaborales from './components/tabs/DatosLaborales';
import DatosEducativos from './components/tabs/DatosEducativos';
import TrabajoRemoto from './components/tabs/TrabajoRemoto';
import Otros from './components/tabs/Otros';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <div className="flex h-full">
        {isAuthenticated ? (
          <>
            <Sidebar />
            <div className="flex-grow p-4 max-w-6xl">
              <Routes>
                <Route path="/users" element={<Users />} />
                <Route path="/roles" element={<Roles />} />
                <Route path="/options" element={<Options />} />
                <Route path="/options-by-roles" element={<OptionsByRoles />} />
                <Route path="/basic-info" element={<BasicInfo />} />
                <Route path="/tabs/DatosPersonales" element={<DatosPersonales />} />
                <Route path="/tabs/Direccion" element={<Direccion />} />
                <Route path="/tabs/SistemaPensionario" element={<SistemaPensionario />} />
                <Route path="/tabs/DatosLaborales" element={<DatosLaborales />} />
                <Route path="/tabs/DatosEducativos" element={<DatosEducativos />} />
                <Route path="/tabs/TrabajoRemoto" element={<TrabajoRemoto />} />
                <Route path="/tabs/Hobbies" element={<Otros />} />
                <Route path="/human-resources" element={<HumanResources />} />
                <Route path="/DatosDerechohabiente" element={<DatosDerechohabiente />} />
                <Route path="/incidents" element={<Incidents />} />
                <Route path="/payroll" element={<Payroll />} />
                <Route path="/tables/master-data" element={<MasterData />} />
                <Route path="/tables/projects" element={<Projects />} />
                <Route path="/evaluation/periodic" element={<Periodic />} />
                <Route path="/evaluation/on-demand" element={<OnDemand />} />
                <Route path="/reports/contracts" element={<Contracts />} />
                <Route path="/reports/general" element={<Reports />} />
                <Route path="*" element={<Navigate to="/users" />} />
              </Routes>
            </div>
          </>
        ) : (
          <Routes>
            <Route path="/" element={<LoginPage onLogin={handleLogin} />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;
