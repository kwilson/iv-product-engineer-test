import { createClient, Provider } from 'urql';
import { CategorySelector } from './components/CategorySelector';

let client = createClient({
  url: 'http://localhost:8080/v1/graphql',
});

function App() {
  return (
    <Provider value={client}>
      <CategorySelector />
    </Provider>
  )
}

export default App
