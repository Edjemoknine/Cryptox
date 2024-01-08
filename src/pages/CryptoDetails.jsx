import React, { useState } from "react";
import HTMLReactParser from "html-react-parser";
import millify from "millify";
import { useParams } from "react-router-dom";
import { Col, Row, Typography, Select } from "antd";
import {
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} from "../service/api/cryptoApi";
import {
  CheckCircleOutlined,
  DollarCircleOutlined,
  ExclamationCircleOutlined,
  FunctionOutlined,
  InteractionOutlined,
  MoneyCollectOutlined,
  NumberOutlined,
  ThunderboltOutlined,
  TrophyOutlined,
} from "@ant-design/icons";

import LineChart from "../components/LineChart";

const { Title, Text } = Typography;
const { Option } = Select;

const CryptoDetails = () => {
  const { coinId } = useParams();

  const [timePeroid, setTimePeriod] = useState("7d");
  const { data, isFetching } = useGetCryptoDetailsQuery(coinId);

  const { data: coinHistory } = useGetCryptoHistoryQuery({
    coinId: coinId,
    timePeroid: timePeroid,
  });

  const cryptoDetails = data?.data?.coin;

  if (isFetching) return "loading..";
  const time = ["3h", "24h", "7d", "30d", "1y", "3m", "3y", "5y"];
  const stats = [
    {
      title: "Price to USD",
      value: `$ ${cryptoDetails?.price && millify(cryptoDetails.price)}`,
      icon: <DollarCircleOutlined />,
    },
    { title: "Rank", value: cryptoDetails?.rank, icon: <NumberOutlined /> },
    {
      title: "24h Volume",
      value: `$ ${cryptoDetails?.Volume && millify(cryptoDetails.Volume)}`,
      icon: <ThunderboltOutlined />,
    },
    {
      title: "Market Cap",
      value: `$ ${
        cryptoDetails?.marketCap && millify(cryptoDetails.marketCap)
      }`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: "All-time-high(daily avg.) ",
      value: `$ ${millify(cryptoDetails?.allTimeHigh?.price)}`,
      icon: <TrophyOutlined />,
    },
  ];
  const generic = [
    {
      title: "Nember Of Markets",
      value: cryptoDetails?.numberOfMarkets,
      icon: <FunctionOutlined />,
    },
    {
      title: "Number Of Exchanges",
      value: cryptoDetails?.numberOfExchanges,
      icon: <MoneyCollectOutlined />,
    },
    {
      title: "Approved Supply",
      value: cryptoDetails?.supply?.approved ? (
        <CheckCircleOutlined />
      ) : (
        <InteractionOutlined />
      ),
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Total Supply ",
      value: millify(cryptoDetails?.supply?.total),
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Circulating Supply ",
      value: millify(cryptoDetails?.supply?.circulating),
      icon: <ExclamationCircleOutlined />,
    },
  ];
  return (
    <Col className="coins_container container mx-auto">
      <Col className="haeding">
        <Title level={2} className="titel">
          {cryptoDetails.name} {cryptoDetails.slug} Price
        </Title>
        <p>
          {cryptoDetails.name} live price in US dollars. View value statistics,
          market cap and supply
        </p>
      </Col>
      <Select
        defaultValue={"7d"}
        className="select_timePeroid"
        placeholder="select Time peroid"
        onChange={(value) => setTimePeriod(value)}
      >
        {time.map((date) => (
          <Option value={date} key={date}>
            {date}
          </Option>
        ))}
      </Select>

      {/* {chart} */}
      <LineChart
        coinHistory={coinHistory}
        currentPrice={millify(cryptoDetails.price)}
        coinName={cryptoDetails.name}
      />

      {/* Status & info */}

      <Col className="stats_container mt-10">
        <Col className="coin_value">
          <Col className="coin_value_head">
            <Title level={3}>{cryptoDetails.name} Value Statistics</Title>
            <p>An overview showing the stats of {cryptoDetails.name}</p>
          </Col>
          {stats.map(({ icon, title, value, i }) => (
            <Col key={i} className="coin_stats">
              <Col className="stats_name">
                <Text className="details_icon">{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text>{value}</Text>
            </Col>
          ))}
        </Col>
        <Col className="coin_value">
          <Col className="coin_value_head">
            <Title level={3}>Other {cryptoDetails.name} stats</Title>
            <p>An overview showing the stats of {cryptoDetails.name}</p>
          </Col>
          {generic.map(({ icon, title, value }) => (
            <Col className="coin_stats">
              <Col className="stats_name">
                <Text className="details_icon">{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text>{value}</Text>
            </Col>
          ))}
        </Col>
      </Col>
      <Col className="decription">
        <Row className="coin_title">
          <Title level={3} className="coin-detail-heading">
            <p>What is {cryptoDetails.name}</p>
            {HTMLReactParser(cryptoDetails?.description)}
          </Title>
        </Row>
        <Col className="links_row">
          <Title className="social_links">{cryptoDetails.name} Links</Title>
          {cryptoDetails?.links.map((link) => (
            <Col className="links" key={link.name}>
              <Title level={5}>{link.type}</Title>
              <a href={link.url} target="_blank" rel="noreferrer">
                {link.name}
              </a>
            </Col>
          ))}
        </Col>
      </Col>
    </Col>
  );
};

export default CryptoDetails;
