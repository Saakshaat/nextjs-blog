import React, { Component } from "react";

import Head from "next/head";
import Link from "next/link";

import styles from "./layout.module.css";
import utilStyles from "../styles/utils.module.css";

import Footer from "./footer";

import { AnimatedSocialIcon } from "react-animated-social-icons";

const name = "Saakshaat Singh";
export const siteTitle = "Saakshaat's Next.js";

export default function Layout({ children, home }) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta
          property="og:image"
          content={`https://og-image.now.sh/${encodeURI(
            siteTitle
          )}.png?theme=dark&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className={styles.header}>
        {home ? (
          <>
            <img
              src="/images/profile.png"
              className={`${styles.headerImage} ${utilStyles.borderCircle}`}
              alt={name}
            />
            <h1 className={utilStyles.heading2Xl}>{name}</h1>
          </>
        ) : (
          <>
            <Link href="/">
              <a>
                <img
                  src="/images/profile.png"
                  className={`${styles.headerImage} ${utilStyles.borderCircle}`}
                  alt={name}
                />
              </a>
            </Link>
            <h2 className={utilStyles.headingLg}>
              <Link href="/">
                <a className={utilStyles.colorInherit}>{name}</a>
              </Link>
            </h2>
          </>
        )}
      </header>
      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">
            <a>Back to Home</a>
          </Link>
        </div>
      )}
    </div>
  );
}

export class GlobalLayout extends Component {
  render() {
    const { children } = this.props;
    return (
      <div className="layout">
        {children}
        <Footer>
          <AnimatedSocialIcon
            brandName="github"
            url="https://github.com/saakshaat"
            animation="float"
            defaultColor="#bd2c00"
            hoverColor="black"
            width="2.5em"
            animationDuration={0.2}
            style={{ padding: "3em" }}
          />
          <AnimatedSocialIcon
            brandName="linkedin"
            url="https://linkedin.com/in/saakshaat"
            animation="float"
            defaultColor="#0e76a8"
            hoverColor="black"
            width="2.5em"
            animationDuration={0.2}
            style={{ padding: "3em" }}
          />
          <AnimatedSocialIcon
            brandName="www"
            url="https://saakshaat.codes"
            animation="float"
            defaultColor="#3cb977"
            hoverColor="black"
            width="2.5em"
            animationDuration={0.2}
            style={{ padding: "3em" }}
          />
          <AnimatedSocialIcon
            brandName="facebook"
            url="https://www.facebook.com/saakshaat.sama"
            animation="float"
            defaultColor="#3b5998"
            hoverColor="black"
            width="2.5em"
            animationDuration={0.2}
            style={{ padding: "3em" }}
          />
        </Footer>
      </div>
    );
  }
}
