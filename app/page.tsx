// app/index.tsx

import Head from "next/head";
import Image from "next/image";
import styles from "./index.module.css";
import { Arvo, Karla } from "@next/font/google";

// Load Google Fonts
const arvo = Arvo({ subsets: ["latin"], weight: ["400", "700"] });
const karla = Karla({ subsets: ["latin"], weight: ["400", "700"] });

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>OhmSweetOhm Energy Savings Challenge</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover"
        />
        <meta
          property="og:title"
          content="OhmSweetOhm Energy Savings Challenge"
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/path/to/image.png" />{" "}
        {/* Adjust the image path */}
        <meta
          property="og:url"
          content="https://mailchi.mp/8c071eea5dc3/yfo9gng51s"
        />
        <link rel="icon" href="/path/to/favicon.ico" />{" "}
        {/* Adjust the favicon path */}
      </Head>

      <div className={`${styles.wrapper} ${karla.className}`}>
        <header
          className={`${styles.templateSection} ${styles.templateHeader}`}
        >
          <div
            className={`${styles.headerContainer} ${styles.contentContainer}`}
          >
            <div className={styles.imageContainer}>
              <Image
                src="/logo-mailchimp.png" // Local path to the uploaded image
                alt="OhmSweetOhm Energy Challenge"
                width={200}
                height={200}
                className={styles.mainImage}
              />
            </div>

            <div className={styles.imageContainer}>
              <Image
                src="/sustainable.png" // Local path to the uploaded image
                alt="OhmSweetOhm Energy Challenge"
                width={200}
                height={200}
                className={styles.mainImage}
              />
            </div>

            <h1 className={`${styles.headerTitle} ${arvo.className}`}>
              Join OhmSweetOhm&apos;s energy-saving challenge!
            </h1>

            <div className={`${styles.challengeDetails} ${karla.className}`}>
              <p>
                <strong>17 Nov – 31 Dec 2024</strong>
                <br />
                <em>Registration closes on 29 Nov 2024, 12pm</em>
              </p>
              <p>
                Track your energy use, adopt smarter habits, and earn up to $20
                NTUC voucher for supporting sustainability while saving on your
                bills! Terms & Conditions apply.
              </p>
            </div>

            <a
              href="https://mailchi.mp/66e65f63236d/oso-energy-savings-challenge"
              className={styles.joinButton}
              target="_blank"
              rel="noopener noreferrer"
            >
              Join the challenge now
            </a>
          </div>
        </header>
      </div>
    </>
  );
};

export default Home;
