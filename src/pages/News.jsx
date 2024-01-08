import React, { useState } from "react";
import { Card, Row, Col, Select, Typography } from "antd";
import { useGetNewsQuery } from "../service/api/NewsApi";
import news from "../assets/news.jpg";
import { useGetCryptoQuery } from "../service/api/cryptoApi";
import NewSkeleton from "../components/Skeleton/NewSkeleton";
import demoImage from "../assets/pngwing.com.png";

const News = ({ simplefied }) => {
  const [newsCategory, setNewsCategory] = useState("Ethereum");
  const { data, isLoading } = useGetNewsQuery({
    newsCategory: newsCategory,
    count: simplefied ? 6 : 12,
  });

  const { data: CryptoList } = useGetCryptoQuery(100);

  return (
    <>
      {!simplefied && (
        <div className="h-[300px] relative">
          <h1 className="absolute text-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 leading-snug  md:text-6xl text-3xl text-white font-bold">
            Latest Cryptocurrency News
          </h1>
          <img src={news} alt="new" className="w-full h-full object-cover" />
        </div>
      )}
      <div className="container mx-auto">
        <Row className="news_container " gutter={[24, 24]}>
          {!simplefied && (
            <Col span={24}>
              <p className="font-semibold">Choose Your News Category:</p>
              <Select
                showSearch
                className="select_news"
                placeholder="Select a news category"
                optionFilterProp="children"
                onChange={(value) => setNewsCategory(value)}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                <Select.Option value="Cryptocurrency">
                  Cryptocurrency
                </Select.Option>
                {CryptoList?.data?.coins?.map((coin, i) => (
                  <Select.Option key={i} value={coin.name}>
                    {coin.name}
                  </Select.Option>
                ))}
              </Select>
            </Col>
          )}
          {isLoading
            ? Array(9)
                .fill(0, 0)
                .map((_, i) => <NewSkeleton />)
            : data?.results.map((news, i) => (
                <Col key={i} xs={24} sm={12} lg={8}>
                  <Card hoverable className="news_card">
                    <a href={news.url} target="_blank" rel="noreferrer">
                      <div className="news_image_container">
                        <Typography.Title className="new_title" level={4}>
                          {news.title.substring(0, 100)}...
                        </Typography.Title>
                        <img
                          src={data.knowledge_panel?.image?.url || demoImage}
                          alt="imae"
                          className="news_Image"
                        />
                      </div>
                      <p>{news.description.substring(0, 200)}</p>
                      <div className="provider">
                        <div>
                          {/* <Avatar
                        src={
                          news?.provider[0]?.image?.thumbnail?.contentUrl ||
                          demoImage
                        }
                      /> */}
                          {/* <Typography.Text>
                        {news.provider[0]?.name}
                      </Typography.Text> */}
                        </div>
                        {/* <Typography.Text>
                      {moment(news.dataPublished).startOf("ss").fromNow()}
                    </Typography.Text> */}
                      </div>
                    </a>
                  </Card>
                </Col>
              ))}
        </Row>
      </div>
    </>
  );
};

export default News;
