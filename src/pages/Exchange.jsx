import React from "react";
import { useGetExchangesQuery } from "../service/api/cryptoApi";
import { Row, Col, Typography, Collapse, Avatar } from "antd";
import Skeleton from "react-loading-skeleton";
import millify from "millify";
import exchange from "../assets/exchange.jpg";
const { Text } = Typography;
const { Panel } = Collapse;

const Exchange = () => {
  const { data, isLoading } = useGetExchangesQuery();

  return (
    <>
      <div className="w-full h-[300px] relative">
        <h1 className=" md:text-6xl text-3xl font-bold text-center capitalize text-white leading-snug absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          cryptocurrency exchanges
        </h1>
        <img className="w-full h-full object-cover" src={exchange} alt="x" />
      </div>
      <div className="container mx-auto ">
        <Row className="my-3">
          <Col className="font-bold text-xl" span={6}>
            Exchanges
          </Col>
          <Col className="font-bold text-xl" span={6}>
            24h Trade Volume
          </Col>
          <Col className="font-bold text-xl" span={6}>
            Markets
          </Col>
          <Col className="font-bold text-xl" span={6}>
            Change
          </Col>
        </Row>
        <Row>
          {isLoading
            ? Array(12)
                .fill(0, 0)
                .map((_, i) => (
                  <div
                    key={i}
                    className="flex w-full min-w-[300px] justify-between gap-x-12 items-center  border bg-slate-300 p-3 rounded-lg border-gray-400"
                  >
                    <div className="flex items-center">
                      {i}{" "}
                      <Skeleton
                        className="ml-3"
                        width={40}
                        height={40}
                        circle
                      />
                      <Skeleton className="ml-2" width={100} height={20} />
                    </div>
                    <Skeleton width={70} height={20} />
                    <Skeleton width={70} height={20} />
                    <Skeleton width={70} height={20} />
                  </div>
                ))
            : data?.data?.exchanges.map((coin, i) => (
                <Col key={i} span={24}>
                  <Collapse>
                    <Panel
                      key={coin.id}
                      showArrow={false}
                      header={
                        <Row key={coin.id}>
                          <Col span={6}>
                            <Text>
                              <strong>{coin.rank}.</strong>
                            </Text>
                            <Avatar className="image" src={coin.iconUrl} />
                            <Text>
                              <strong>{coin.name}</strong>
                            </Text>
                          </Col>
                          <Col span={6}>{millify(coin["24hVolume"])}</Col>
                          <Col span={6}>{millify(coin.numberOfMarkets)}</Col>
                          <Col span={6}>{millify(coin.price)}</Col>
                        </Row>
                      }
                    >
                      {/* {HTMLReactParser(coin.description)} */}
                    </Panel>
                  </Collapse>
                </Col>
              ))}
        </Row>
      </div>
      ;
    </>
  );
};

export default Exchange;
