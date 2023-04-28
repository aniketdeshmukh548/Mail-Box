import {Route, Routes } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import MailBoxPage from './pages/MailBoxPage';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path='/' exact element={<HomePage />}></Route>
        <Route path='/auth' element={<AuthPage />} />
        <Route path='/profile' element={<UserProfile />} />
        <Route path='/mail' element={<MailBoxPage />} />
        </Routes>
    </Layout>
  );
}

export default App;
