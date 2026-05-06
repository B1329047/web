import './App.css';
import MultiButton from './Button';
import HelloCGU from './Hello';

function App() {
  return (
    <div className="App">
      <div>
        <HelloCGU />
        <MultiButton num={10} />
      </div>
    </div>
  );
}

export default App;