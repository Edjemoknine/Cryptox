import React, { useEffect, useState } from "react";
import { useGetCryptoQuery } from "../service/api/cryptoApi";
import millify from "millify";
import { Link } from "react-router-dom";
import { Card, Row, Col, Input } from "antd";
import demoImage from "../assets/pngwing.com.png";
import cryptoImg from "../assets/bit.jpg";
import CoinSkeleton from "../components/Skeleton/CoinSkeleton";

const Crypto = ({ simplefied }) => {
  const count = simplefied ? 10 : 100;
  const { data, isLoading } = useGetCryptoQuery(count);
  const [cryptos, setCryptos] = useState([]);
  const [inputTerm, setInputTerm] = useState("");

  useEffect(() => {
    let filtredList = data?.data?.coins?.filter((coin) =>
      coin.name.toLowerCase().includes(inputTerm.toLowerCase())
    );
    setCryptos(filtredList);
  }, [inputTerm, data]);

  return (
    <>
      {!simplefied && (
        <div className="relative h-[400px]">
          <h1 className="absolute capitalize top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 leading-snug md:text-6xl text-3xl drop-shadow-2xl text-white font-bold text-center">
            {" "}
            Tranding Cryptocurrencies <br />
            in the world{" "}
          </h1>
          <img
            src={cryptoImg}
            alt="crp"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="container mx-auto">
        {!simplefied && (
          <>
            {" "}
            <p className="font-bold">Search about Your coins:</p>
            <Input
              value={inputTerm}
              onChange={(e) => setInputTerm(e.target.value)}
              placeholder="Search Crypto "
              className="input"
            ></Input>
          </>
        )}
        <div>
          <Row gutter={[32, 32]}>
            {isLoading
              ? Array(8)
                  .fill(0, 0)
                  .map((skl, i) => <CoinSkeleton key={i} />)
              : cryptos?.map((currency, i) => (
                  <Col key={i} xs={24} sm={12} lg={6}>
                    <Link to={`/crypto/${currency.uuid}`}>
                      <Card
                        title={`${currency.rank}. ${currency.name}`}
                        extra={
                          <img
                            src={currency.iconUrl || demoImage}
                            className="icons"
                            alt="img"
                          />
                        }
                        hoverable
                      >
                        <p>Price: {millify(currency.price)}</p>
                        <p>Markets Cap: {millify(currency.marketCap)}</p>
                        <p>Daily Change: {millify(currency.change)}%</p>
                      </Card>
                    </Link>
                  </Col>
                ))}
          </Row>
        </div>
      </div>
    </>
  );
};

export default Crypto;
