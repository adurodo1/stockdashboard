import { memo, useEffect, useState } from "react";

const News = memo(({ newsdata }) => {
  console.log("News rendered");
  const [news, setNews] = useState();

  useEffect(() => {
    setNews(newsdata);
  }, [newsdata]);

  return (
    <>
      {news ? (
        <>
          <div className="content">
            <p>Symbol: {news[1].Symbol}</p>
            <p>Asset Type: {news[1].AssetType}</p>
            <p>Name: {news[1].Name}</p>
            <p>Description: {news[1].Description}</p>

            <p>Total New Items {news[0].items}</p>
          </div>
          <div className="tablelayout">
            <table>
              <thead>
                <tr>
                  <td>Banner</td>
                  <td>Title</td>
                  <td>Link</td>
                  <td>Source</td>
                  <td>Sentiment</td>
                </tr>
              </thead>
              <tbody>
                {news
                  ? news[0].feed.map((data, id) => {
                      return (
                        <>
                          <tr>
                            <td>
                              <img
                                width={30}
                                height={30}
                                src={data.banner_image}
                              ></img>
                            </td>
                            <td>{data.title}</td>
                            <td>
                              <a href={data.url} target="_blank">
                                read
                              </a>
                            </td>
                            <td>{data.source_domain}</td>
                            <td>{data.overall_sentiment_label}</td>
                          </tr>
                        </>
                      );
                    })
                  : ""}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
});

export default News;
