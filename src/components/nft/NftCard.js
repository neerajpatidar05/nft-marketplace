import { LazyLoadImage } from 'react-lazy-load-image-component'
import { nftcontract } from 'web3config/web3config';
import NFTDisplay from './NFTDisplay';
import Web3 from 'web3';
import { useState , useEffect} from 'react';
const NFTCard = (props) => {
  const [image, setImage]= useState('');
  const [url, setUrl]=useState('');

  const { data } = props
  const price=data.floorPrice._hex;
  const tokenID= parseInt(data[0]._hex);
  useEffect(() => {
    const fetchTokenURI = async () => {
      try {
        const tokenURI = await nftcontract.tokenURI(tokenID);
        const imageurl = tokenURI.replace("ipfs://", "");
        const { imageLink, nftname } = await NFTDisplay(imageurl);
        console.log(imageLink, "nftimagem");
        setImage(imageLink);
        
        setUrl(nftname);
      } catch (error) {
        console.error('Error fetching NFT metadata:', error);
      }
    };

    fetchTokenURI();
  }, [tokenID]);
  
  return (
    <div className="min-w-245 max-w-215 xs:max-w-none sm:w-full sm:min-w-155 minmd:min-w-245 minlg:min-w-327 dark:bg-nft-black-3 bg-white rounded-2xl p-4 m-4 minlg:m-8 sm:my-2 sm:mx-2 cursor-pointer shadow-md hover:shadow-lg duration-500">
      <div className="relative w-215 h-52 sm:h-36 minmd:h-60 minlg:h-300 rounded-2xl overflow-hidden">
        <>
          <LazyLoadImage
            style={{ width: '300px' }}
            className="flex object-fill justify-center w-full items-center minmd:min-w-190 hover:scale-110 transition-all duration-500"
            alt="image"
            placeholderSrc="img"
            src={image}
            
          />
        </>
      </div>
      <div className="mt-3 flex flex-col " style={{ color: 'black' }}>
        <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-sm minlg:text-xl">
          token ID : {parseInt(data[0]._hex)}
        </p>
        <div className="flexBetween mt-1 minlg:mt-3 flex-row xs:flex-col xs:items-start xs:mt-3">
          <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xs minlg:text-lg">
            Price: {Web3.utils.fromWei(String(price, 'ether')) || 500}
            <span className="normal">Wei</span>
          </p>
          <p className="font-poppins dark:text-white text-nft-black-1 text-xs minlg:text-lg">
            NFT Name : <span className="normal"> {url}</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default NFTCard
