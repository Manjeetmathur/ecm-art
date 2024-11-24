import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Toaster } from "react-hot-toast";
function App() {

  return (
    <div className="m-">
      <Toaster/>
        <Header />
        <main>
          <Outlet></Outlet>
        </main>
        <Footer />
      
    </div>
  );
}

export default App;
