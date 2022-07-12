import * as React from "react";
import { Routes,Route, BrowserRouter } from "react-router-dom";
import Spell from './features/spell/Spell';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-notifications-component/dist/theme.css';
import 'react-loading-skeleton/dist/skeleton.css'
import SpellDetails from './features/spell-details/SpellDetails';
import { ReactNotifications } from 'react-notifications-component';

export const App = (): JSX.Element => {
  return (
    <div>
      <ReactNotifications />
      <BrowserRouter>
        <Routes >
          <Route  path="/" element={<Spell />} />
          <Route  path="/spell/:name" element={<SpellDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
export default App;