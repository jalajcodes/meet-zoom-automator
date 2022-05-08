import "./App.css";
import Header from "./components/Header";
import Tabs from "./components/Tabs";
import { useAuth } from "./contexts/authContext";

function App() {
  const { isLoggedIn } = useAuth();

  return (
    <div className="App">
      <Header />
      {isLoggedIn && <Tabs />}
    </div>
  );
}

export default App;
