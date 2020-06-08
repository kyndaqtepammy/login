import React from 'react';
import DashboardMain from './components/DashboardMain';
import './assets/vendors4/jquery-toggles/css/toggles.css'
import './assets/vendors4/jquery-toggles/css/themes/toggles-light.css'
import './assets/dist/css/style.css'
import 'react-toastify/dist/ReactToastify.css';



function App() {
  return (
      <div className="App">
        {/* <Modal>
          <p>content</p>
        </Modal> */}
       <DashboardMain/>
      </div>
  );
}

export default App;
