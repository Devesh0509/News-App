import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import NewsItem from "../NewsItem";
import Spinner from "./Spinner";

const News =(props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0);
  // document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`;
  // articles = [
  //   {
  //     source: {
  //       id: "bbc-news",
  //       name: "BBC News",
  //     },
  //     author: null,
  //     title: "Cricket: Today at the Test",
  //     description:
  //       "Day three highlights from the second Test between England and Sri Lanka.",
  //     url: "https://www.bbc.co.uk/iplayer/episode/m0022n87/cricket-today-at-the-test-england-v-sri-lanka-2020-second-test-day-three-highlights",
  //     urlToImage: "https://ichef.bbci.co.uk/images/ic/1200x675/p0jhyw8y.jpg",
  //     publishedAt: "2020-08-31T18:25:15Z",
  //     content:
  //       "Day three highlights from the second Test between England and Sri Lanka.",
  //   },
  //   {
  //     source: {
  //       id: null,
  //       name: "BBC News",
  //     },
  //     author: "BBC Sport",
  //     title: "England great Anderson considering white ball return",
  //     description:
  //       'James Anderson says he is "still fit enough" to continue his career as he considers a move into white ball cricket.',
  //     url: "https://www.bbc.com/sport/cricket/articles/cgrjnz8pgkvo",
  //     urlToImage:
  //       "https://ichef.bbci.co.uk/news/1020/branded_sport/27d8/live/96a5ec10-5940-11ef-94ec-63bde61d9499.jpg",
  //     publishedAt: "2020-08-13T06:53:31Z",
  //     content:
  //       "\"I might be in a bit of denial because I'm well aware I won't play for England again, but I've still not made a decision on my actual cricket career,\" Anderson told the Press Association.\r\n\"There's d… [+682 chars]",
  //   },
  //   {
  //     source: {
  //       id: null,
  //       name: "BBC News",
  //     },
  //     author: null,
  //     title: "Brave beat Phoenix in 'thrilling' Super Five after tie",
  //     description:
  //       "Watch the final stages of Southern Brave's victory over Birmingham Phoenix after a remarkable Eliminator was decided by the first Super Five in the tournament's history.",
  //     url: "https://www.bbc.com/sport/cricket/videos/c1d7eeqxxv4o",
  //     urlToImage:
  //       "https://ichef.bbci.co.uk/ace/standard/1020/cpsprodpb/1e6d/live/259f7630-5cdd-11ef-b970-9f202720b57a.jpg",
  //     publishedAt: "2020-08-17T20:38:04Z",
  //     content:
  //       "Watch the final stages of Southern Brave's victory over Birmingham Phoenix after a remarkable Eliminator was decided by the first Super Five in the tournament's history.\r\nWATCH MORE: Cricket Video\r\nA… [+25 chars]",
  //   },

  //   {
  //     source: {
  //       id: null,
  //       name: "BBC News",
  //     },
  //     author: "Stephan Shemilt",
  //     title: "England closing in on victory over Sri Lanka",
  //     description:
  //       "England are closing in on victory over Sri Lanka after three days of the first Test at Emirates Old Trafford.",
  //     url: "https://www.bbc.com/sport/cricket/articles/ckg2yevnjg2o",
  //     urlToImage:
  //       "https://ichef.bbci.co.uk/news/1020/branded_sport/59f6/live/ae2f49d0-6174-11ef-b970-9f202720b57a.jpg",
  //     publishedAt: "2020-08-20T18:10:53Z",
  //     content:
  //       "For two days, some occasionally high-quality cricket had been hard to enjoy because of the drab conditions. A sunny Friday with a bigger crowd felt like the arrival of a spectacle.\r\nWith that in mind… [+1177 chars]",
  //   },
  // ];

  

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  

   const updateNews=async()=> {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true)
        let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(70);
   setArticles(parsedData.articles)
   setTotalResults(parsedData.totalResults)
   setLoading(false)
    props.setProgress(100);
  }
  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`;
    updateNews();
    // eslint-disable-next-line
  }, []);

  const fetchMoreData = async()=>{
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page+1)
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)
  };
    return (
      <>
        <h2 className="text-center" style={{ margin: "40px 0px", marginTop:'90px' }}>
          NewsMonkey - Top Headlines from{" "}
          {capitalizeFirstLetter(props.category)} category
        </h2>
          
{loading&&<Spinner/>}
          <InfiniteScroll
            dataLength={articles.length}
            next={fetchMoreData}
            hasMore={articles.length !== totalResults}
            loader={<Spinner />} >
            <div className="container">
              <div className="row">
                {articles.map((element) => {
                  // console.log(element)
  
                  return (
                    <div className="col-md-4" key={element.url}>
                      <NewsItem
                        title={element.title ? element.title : ""}
                        description={
                          element.description ? element.description : ""
                        }
                        imageUrl={element.urlToImage}
                        newsUrl={element.url}
                        author={element.author}
                        date={element.publishedAt}
                        source={element.source.name}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </InfiniteScroll>
      </>
    );
  
}
News.defaultProps = {
  country: "us",
  pageSize: 8,
  category: "general",
};
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};
export default News