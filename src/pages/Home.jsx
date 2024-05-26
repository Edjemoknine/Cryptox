import millify from "millify";
import { Typography, Row, Col, Statistic } from "antd";
import { Link } from "react-router-dom";
import { useGetCryptoQuery } from "../service/api/cryptoApi";
import Crypto from "./Crypto";
import News from "./News";
import img1 from "../assets/about2.png";
import Skeleton from "react-loading-skeleton";

const Home = () => {
  const { Title } = Typography;
  const { data, isLoading } = useGetCryptoQuery(10);
  const GloablStats = data?.data?.stats;

  return (
    <>
      <div className="container mx-auto hero h-[750px] grid md:grid-cols-2 ">
        <div className="text  flex flex-col justify-center gap-3 items-center md:items-start  ">
          <h1 className="md:text-5xl text-3xl capitalize text-center md:text-start md:leading-snug max-w-xl text-black font-bold ">
            Cryptocurrencies and Blockchain related businesses.
          </h1>
          <p className="text-center md:text-start">
            Investing in crypto assets is risky but also potentially extremly
            profiable
          </p>
          <div className="flex gap-3">
            <button className="p-3 text-white hover:bg-blue-700  bg-blue-600">
              Get Started
            </button>
            <button className="p-3 text-white hover:bg-blue-700 bg-blue-600">
              {" "}
              Discover More
            </button>
          </div>
        </div>
        <div className="img hidden md:flex -order-2  md:order-1 justify-center items-center">
          <img src={img1} alt="" className="w-[200px] md:w-[400px]" />
        </div>
      </div>
      <div className="heading flex flex-col items-center text-center">
        <Title className="my-3" level={2}>
          Global Crypto State
        </Title>
        <div className="container mx-auto">
          {isLoading ? (
            <div className="grid  my-6 md:grid-cols-5 gap-3 w-full">
              {Array(5)
                .fill(0, 0)
                .map((_, i) => (
                  <div
                    key={i}
                    className="p-6 flex flex-col items-center border border-gray-300 rounded-lg gap-3"
                  >
                    <Skeleton
                      className="bg-gray-300"
                      width={80}
                      height={15}
                      borderRadius={10}
                    />
                    <Skeleton
                      className="bg-gray-300"
                      width={130}
                      height={25}
                      borderRadius={10}
                    />
                  </div>
                ))}
            </div>
          ) : (
            <Row className="grid  my-6 md:grid-cols-5 gap-3 w-full">
              <Col className="border p-6 rounded-md shadow hover:scale-105 cursor-pointer transition-all duration-300">
                <Statistic title="Total Crypto" value={GloablStats.total} />
              </Col>
              <Col className="border p-6 rounded-md shadow hover:scale-105 cursor-pointer transition-all duration-300">
                <Statistic
                  title="Total Exchange"
                  value={millify(GloablStats.totalCoins)}
                />
              </Col>
              <Col className="border p-6 rounded-md shadow hover:scale-105 cursor-pointer transition-all duration-300">
                <Statistic
                  title="Total Market Cap"
                  value={millify(GloablStats.totalMarketCap)}
                />
              </Col>
              <Col className="border p-6 rounded-md shadow hover:scale-105 cursor-pointer transition-all duration-300">
                <Statistic
                  title="Total 24h Volume"
                  value={millify(GloablStats.total24hVolume)}
                />
              </Col>
              <Col className="border p-6 rounded-md shadow hover:scale-105 cursor-pointer transition-all duration-300">
                <Statistic
                  title="Total Markets"
                  value={millify(GloablStats.totalMarkets)}
                />
              </Col>
            </Row>
          )}
        </div>

        <div className="home-container-heading w-full items-center flex my-6 flex-col justify-between">
          <Title level={2}>Top 10 Cryptocurrencies in the world</Title>

          <Link
            className="rounded bg-blue-500 text-white p-2 text-xs hover:text-blue-950"
            to={`/crypto`}
          >
            Show More
          </Link>
        </div>
        <Crypto simplefied />
        <div className="home-container-heading w-full items-center flex my-6 flex-col justify-between">
          <Title level={2}>Latest Crypto News</Title>

          <Link
            className="rounded bg-blue-500 text-white p-2 text-xs hover:text-blue-950"
            to={`/news`}
          >
            Show More
          </Link>
        </div>
        <News simplefied />
      </div>
    </>
  );
};

export default Home;
