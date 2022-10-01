import Head from "next/head";
import { ChangeEvent, useCallback, useMemo, useState } from "react";
import { NFTCard } from "./Components/NFTCard";

export default function Home() {

  const [search, setSearch] = useState('');

  const handleSearch = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }, []);

  const filteredNfts = useMemo(() => {
    return nfts.filter(nft => search ? nft.name.toLowerCase().includes(search.toLocaleLowerCase()) : true)
  }, [search, nfts]);

  return (
    <div className="h-full w-screen bg-[#1d1f2b] px-24">
      <Head>
        <title>Coders NFT</title>
      </Head>

      <div className="flex justify-between items-baseline">
        <h2 className="text-5xl font-bold mt-24">
          Discover
        </h2>

        <input type="text" placeholder="Search item" className="h-12 w-64 p-4 rounded-xl" onChange={handleSearch} value={search} />
      </div>

      <hr className="w-full border-[#242634] mt-12" />

      <div className="flex-col items-start gap-7 mt-12">
        <h2 className="text-5xl font-bold">
          Popular Bid
        </h2>

        <div className="flex flex-wrap items-start gap-7 mt-7 min-h-[50%]">
          {
            filteredNfts.map(nft => (
              <NFTCard nft={nft} key={nft.id} />
            ))
          }
        </div>
      </div>

    </div>
  )
}

// NFTS
export const nfts = [
  {
    id: '1',
    name: '#4473',
    price: '82.55',
    author: '0xE51B77159',
    image: 'https://img.seadn.io/files/cfafbb97673c61ae4080ec8ce490bb83.png?auto=format&fit=max&w=384',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
  },
  {
    id: '2',
    name: '#4474',
    price: '83',
    author: '0xE51B77159',
    image: 'https://img.seadn.io/files/23b87cc5839bd426fb7516716b814b19.png?auto=format&fit=max&w=384',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
  },
  {
    id: '3',
    name: '#4475',
    price: '88.5',
    author: '0xE51B77159',
    image: 'https://img.seadn.io/files/4119dcd07c558db6179c653226d9855e.png?auto=format&fit=max&w=384',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
  },
  {
    id: '4',
    name: '#44756',
    price: '88.95',
    author: '0xE51B77159',
    image: 'https://img.seadn.io/files/b530abdd44b8b64ac686d2f02a6384b6.png?auto=format&fit=max&w=384',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
  },
]
