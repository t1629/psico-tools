import LoginForm from "./components/LoginForm";
import Nav from "./components/Nav";
import "./App.css";

function App() {
  return (
    <div className="app-shell">
      <Nav />
      <main className="app-content">
        <LoginForm />
      </main>
    </div>
  );
}

export default App;
