import {
  ThirdwebNftMedia,
  useEditionDrop,
  useEditions,
} from "@thirdweb-dev/react";
import React from "react";
import CodeSnippet from "../components/guide/CodeSnippet";
import codeSnippets from "../const/codeSnippets";
import contractAddresses from "../const/contractAddresses";
import styles from "../styles/Home.module.css";

export default function EditionDrop() {
  const editionDropContract = useEditionDrop(contractAddresses[2].address);
  const { data: nfts, isLoading } = useEditions(editionDropContract);

  return (
    <div className={styles.container}>
      <div className={styles.collectionContainer}>
        <div className={styles.detailPageContainer}>
          <h1>Edition Drop</h1>
          <hr className={`${styles.smallDivider} ${styles.detailPageHr}`} />

          <p>
            thirdweb&apos;s <b>Edition Drop</b> lazy mints your NFT and makes it
            available to be claimed by your users.
          </p>

          <p>
            When you create a drop inside your Edition Drop contract, the NFT is
            not minted yet. We prepare everything for your audience, so that
            they can mint it. The user who claims an NFT, mints it and transfers
            it to their wallet.
          </p>

          <p>
            <a
              className={styles.lightPurple}
              href="https://portal.thirdweb.com/contracts/edition-drop"
            >
              Check out the documentation here.
            </a>
          </p>
        </div>

        {!isLoading ? (
          <div className={styles.nftBoxGrid}>
            {nfts?.map((nft) => (
              <div className={styles.nftBox} key={nft.metadata.id.toString()}>
                <ThirdwebNftMedia
                  metadata={nft.metadata}
                  className={styles.nftMedia}
                />
                <h3>{nft.metadata.name}</h3>
                <button
                  className={`${styles.mainButton} ${styles.spacerBottom}`}
                  onClick={() => editionDropContract?.claim(nft.metadata.id, 1)}
                >
                  Claim
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <hr className={`${styles.divider} ${styles.spacerTop}`} />
      {/* Code Snippet */}
      <h2>How It Works</h2>

      <CodeSnippet text={codeSnippets.editionDrop} />
    </div>
  );
}
