import React from 'react';
import { FamilyList } from '../components/FamilyList';
import { Family } from '../models/Models';

function App() {
  return (
    <div>
      {Object.keys(Family).map(x => (
        <FamilyList family={x as Family} />
      ))}
    </div>
  );
}

export default App;
