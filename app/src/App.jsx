import { createClient, Provider } from 'urql';
import { CategorySelector } from './components/CategorySelector';

import styles from './App.module.css'
import { useState } from 'react';
import { GifDisplay } from './components/GifDisplay';

let client = createClient({
  url: 'http://localhost:8080/v1/graphql',
});

function App() {
  const [selectedValue, setSelectedValue] = useState('');

  return (
    <Provider value={client}>
      <div className={styles.container}>
        <CategorySelector onSelect={setSelectedValue} selectedValue={selectedValue} />
        <GifDisplay selectedValue={selectedValue} />
      </div>
    </Provider>
  )
}

export default App
