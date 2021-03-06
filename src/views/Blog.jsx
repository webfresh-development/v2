import React, { useState, useEffect } from "react";
import moment from "moment";
import parse from "html-react-parser";
import api from "../api/article";
import Loader from "../components/Loader";
import PageHeading from "../components/PageHeading";
import SectionHeading from "../components/SectionHeading";
import Card from "../components/Card";

const Blog = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    api
      .index()
      .then((resp) => {
        setArticles(resp.data.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const blogItems = articles.map((item) => {
    const title = item.attributes.title;
    const body = item.attributes.body.value;
    let date = new Date(item.attributes.created);
    date = moment(date).format("DD MMMM YYYY");

    return (
      <BlogItem
        title={title}
        body={body}
        date={date}
        id={item.id}
        key={item.id}
      />
    );
  });
  if (loading) {
    return <Loader />;
  } else {
    return (
      <main className="flex-grow mt-2 --fade-in">
        <PageHeading content="Blog" />
        {blogItems}
      </main>
    );
  }
};

const BlogItem = ({ title, body, date, id }) => {
  return (
    <Card>
      <div className="flex-auto" id={id}>
        <SectionHeading>
          <span className="font-bold">{title}</span>
          <span className="italic">{date}</span>
        </SectionHeading>
        <div className="leading-tight mt-1 px-2">{parse(body)}</div>
      </div>
    </Card>
  );
};

export default Blog;
