import { MediaRenderer, useMarketplace } from "@thirdweb-dev/react";
import { AuctionListing, DirectListing } from "@thirdweb-dev/sdk";
import React, { useEffect, useState } from "react";
import CodeSnippet from "../components/guide/CodeSnippet";
import contractAddresses from "../const/contractAddresses";
import styles from "../styles/Home.module.css";

export default function Marketplace() {
  const marketplace = useMarketplace(contractAddresses[5].address);

  const [loading, setLoading] = useState<boolean>(true);
  const [listings, setListings] = useState<(DirectListing | AuctionListing)[]>(
    []
  );

  // Fetch Listings
  useEffect(() => {
    (async () => {
      if (!marketplace) {
        return;
      }
      const ls = await marketplace.getActiveListings();
      setListings(ls);
      setLoading(false);
    })();
  }, [marketplace]);

  return (
    <div className={styles.container}>
      <div className={styles.collectionContainer}>
        <div style={{ maxWidth: "800px" }}>
          <h1>Marketplace</h1>
          <p>
            In a Marketplace you can sell or buy NFTs. Platforms like Opensea or
            Rarible are examples of marketplaces. thirdweb let&apos;s you create
            your own Marketplace.
          </p>
          <p>
            You can restrict the marketplace to sell only your NFTs, or make it
            an open marketplace; where any user can buy and sell!
          </p>
        </div>

        {!loading ? (
          <div className={styles.nftBoxGrid}>
            {listings?.map((listing) => (
              <div className={styles.nftBox} key={listing.id.toString()}>
                <MediaRenderer
                  src={listing.asset.image}
                  style={{ width: "100%", borderRadius: 15 }}
                />
                <h3>{listing.asset.name}</h3>
                <p>
                  {listing.buyoutCurrencyValuePerToken.displayValue}{" "}
                  {listing.buyoutCurrencyValuePerToken.symbol}
                </p>
                <button
                  className={styles.mainButton}
                  style={{ marginBottom: 16 }}
                  onClick={() =>
                    marketplace?.direct.buyoutListing(listing.id, 1)
                  }
                >
                  Buy
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <hr className={styles.divider} style={{ marginTop: 32 }} />
      {/* Code Snippet */}
      <h2>How It Works</h2>

      <CodeSnippet text={``} />
    </div>
  );
}