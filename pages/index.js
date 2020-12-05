import Head from "next/head";
import Link from "next/link";

import Layout, { siteTitle } from "../components/layout";
import Card from "../components/card";
import Date from "../components/date";

import { getSortedPostsData } from "../lib/posts";

import utilStyles from "../styles/utils.module.css";

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();

  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingM}>
        <p>
          Hi, I'm Saakshaat. You may or may not know me but have a cookie,
          nonetheless.
        </p>
        <p>
          Anyhow, so this is a <a href="https://nextjs.org/">Next.js</a> app
        </p>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>

        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, title, date }) => (
            <Card key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </Card>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
