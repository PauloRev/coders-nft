import { useAddress, useContract, useListing, useListings, useNFT } from "@thirdweb-dev/react";
import { Marketplace } from "@thirdweb-dev/sdk";
import Head from "next/head";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { NFTCard } from "../Components/NFTCard";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export default function NFTDetails() {

  const [loadingPurchase, setLoadingPurchase] = useState(false);

  const router = useRouter();

  const marketplace = useContract<Marketplace>(process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT);

  const { data: listings, status } = useListings(marketplace.contract);
  const listing = useListing(marketplace.contract, Number(router.query.id));

  const { contract } = useContract(listing.data?.assetContractAddress);
  const { data: nft } = useNFT(contract, listing.data?.asset.id);

  const walletAddress = useAddress();
  const userIsNFTOwner = walletAddress && walletAddress === nft?.owner;

  const shouldDisabledByNFTButton = userIsNFTOwner || loadingPurchase || listing.data?.quantity.toString() === '0';

  const handleByNFT = useCallback(async () => {
    try {
      setLoadingPurchase(true);

      // const for get receipt with more transaction informations
      await marketplace.contract.direct.buyoutListing(listing.data?.id, 1);

      setLoadingPurchase(false);
      Notify.success('You have successfully bought this NFT!');

    } catch (err) {
      console.log('ERROR => ', err);
      setLoadingPurchase(false);
      Notify.failure('Failed to buy this NFT!');
    }
  }, [listing, marketplace?.contract?.direct]);

  return (
    <div className="px-[10%] min-h-[80vh]">
      <Head>
        <title>{listing.data?.asset.name} - Details Page</title>
      </Head>

      {
        status === 'loading' ?
          <h2 className="text-4xl text-center font-semibold mt-24">Loading...</h2>
          :
          <>
            <div className="mt-24 flex justify-between flex-wrap gap-10 sm:gap-0">
              <img src={listing.data?.asset.image} alt={listing.data?.asset.name.toString()} className="rounded-[1.25rem]  w-full max-w-md h-auto" />

              <div className="ml-10 w-full max-w-xl">
                <h1 className="text-5xl font-bold">{listing.data?.asset.name}</h1>
                <p className="text-[#93989a] mt-4">{listing.data?.asset.description}</p>

                <hr className="w-full border-[#242634] mt-8 mb-4" />

                <div>
                  <p className="text-[#93989a]">Owner</p>
                  <p>{nft?.owner.slice(0, 6)} {userIsNFTOwner && '(You)'}</p>
                </div>

                <hr className="w-full border-[#242634] mt-4 mb-8" />

                <div>
                  <button disabled={shouldDisabledByNFTButton} className={`right-1 bottom-0.5 bg-[#ff2748] py-[1rem] px-6 rounded-xl ${shouldDisabledByNFTButton ? 'opacity-50' : 'hover:scale-105 active:scale-95'}`} onClick={handleByNFT}>
                    {
                      loadingPurchase ? 'Loading...' : 'Buy NFT'
                    }
                  </button>
                </div>

              </div>
            </div>

            <div className="mt-24">
              <h2 className="text-4xl mt-24">More Works</h2>

              <div className="flex flex-wrap items-start gap-16 mt-7">
                {
                  listings?.filter((_listing, index) => index < 2).map(listing => (
                    <NFTCard listing={listing} key={listing.id} />
                  ))
                }
              </div>
            </div>
          </>
      }

    </div>
  )
}
