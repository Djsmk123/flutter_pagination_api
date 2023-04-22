import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import {remark} from 'remark';
import html from 'remark-html';

const Home = () => {
  const [markdown, setMarkdown] = useState('');

  useEffect(() => {
    fetch('/README.md')
      .then((response) => response.text())
      .then((text) => {
        remark()
          .use(html)
          .process(text, (err, output) => {
            if (err) throw err;
            setMarkdown(output.toString());
          });
      });
  }, []);
  return (
    <div>
      <Head>
        <title>My App Home Page</title>
      </Head>

      <main>
        <article dangerouslySetInnerHTML={{ __html: markdown }} />
      </main>
    </div>
  );
};

export default Home;
