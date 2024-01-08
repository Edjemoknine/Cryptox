import { Layout, Space, Typography } from "antd";
import "./App.css";
import { Navbar } from "./components";
import { Home, Exchange, News, Crypto, CryptoDetails } from "./pages";
import { Link, Route, Routes } from "react-router-dom";
import "react-loading-skeleton/dist/skeleton.css";
function App() {
  return (
    <div className="app">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="main">
        <Layout>
          <div className="min-h-[70vh]">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/crypto" element={<Crypto />} />
              <Route path="/crypto/:coinId" element={<CryptoDetails />} />
              <Route path="/exchanges" element={<Exchange />} />
              <Route path="/news" element={<News />} />
            </Routes>
          </div>
        </Layout>
        <div className="footer">
          <Typography.Title
            level={5}
            style={{ color: "white", textAlign: "center" }}
          >
            Crypto <br />
            All rights raserved
          </Typography.Title>
          <Space>
            <Link to="/"> Home</Link>
            <Link to="/crypto"> Crypto</Link>
            <Link to="/exchange"> Exchange</Link>
            <Link to="/news"> News</Link>
          </Space>
        </div>
      </div>
    </div>
  );
}

export default App;
