import React from 'react';
import ImageList from './ImageList';

function App() {
  return (
    <div className="App" style={{ fontFamily: 'Arial, sans-serif' }}>
      <header style={{ textAlign: 'center', padding: '20px', backgroundColor: '#282c34', color: 'white' }}>
        <h1>Image Management System</h1>
      </header>

      <main style={{ padding: '20px' }}>
        <section>
          <ImageList />
        </section>
      </main>
    </div>
  );
}

export default App;