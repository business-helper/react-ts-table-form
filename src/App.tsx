import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import { DefaultLayout } from 'layouts/DefaultLayout';
import { HomePage } from 'pages/Home';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <DefaultLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route index element={<HomePage />} />
        </Routes>
      </DefaultLayout>
    </BrowserRouter >
  );
}

export default App;