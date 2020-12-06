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

function randomFact() {
  const facts = [
    "humans are the only animals that blush",
    'the "M\'s" in M&Ms stand for "Mars" and "Murrie."',
    'the dot over the lower case "i" or "j" is known as a "tittle."',
    "python was Guido Van Rossum's hobby project",
    'typing "import this" renders Tim Peter\'s "The Zen of Python"',
    'a group of penguins in the water is called a "raft" but on land they\'re called a "waddle"',
    "a quine is a computer program capable of printing it's own source",
    "Next.js automatically creates routes based on the file/diretory names which can also have regex",
    "one large pizza is larger than 2 medium pizzas",
    "the core of the earth ages more slowly compared to the rest of the plane due to time dilation",
    '"Eleven plus two" is an anagram of "Twelve plus one"',
    "ketchup used to be sold in the United States as medicine in the 1800s",
  ];

  return facts[Math.floor(Math.random() * facts.length)];
}

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingM}>
        <p>Welcome to my mind dump! Did you know {randomFact()}?</p>
        <p>
          Anyhow, the purpose of this app was to get familiar with{" "}
          <a href="https://nextjs.org/">Next.js</a> app
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
