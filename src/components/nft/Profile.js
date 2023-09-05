
import React, { useState ,useEffect} from 'react';
import Web3 from 'web3';
import { Card, CardMedia, CardContent, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { nftcontract, marketplaceContract } from 'web3config/web3config';
import { Box, styled } from '@mui/material'
import NFTDisplay from './NFTDisplay';
import Loader from 'Loader/Loader';

const CardBody = styled(Box)(
  () => `
    margin: 30px 100px;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap:2.5%;

}
  `,
)
const Body = styled(Card)(
  () => `
  width:20%;
  margin-bottom:2%;

  box-shadow: 1px 1px #342929;
  border-radius: 0%;
}
  `,
)

async function checkIfNFTIsListed(tokenId) {
  try {
    
    const sale = await marketplaceContract.tokenIdToSale(tokenId);
    const endtime= sale.endAt*1000;
    console.log(endtime.toString(),tokenId.toString(),"saleactive");
    const currentTimestamp = Date.now();
    console.log(currentTimestamp,"currenttimestamp" ,endtime.toString());
    if(endtime>currentTimestamp){
      return true
    }else{
      return false
    }
} catch (error) {
    console.error('Error checking if NFT is listed:', error);
    return false; // Return false in case of errors
}
}

const Profile = () => {

  const [nfts, setNFTs] = useState([]);
  const [image, setImage]= useState('');
  const [url, setUrl]=useState('');
  const [nftdescription, setDescription]=useState('')
  const [loding,setLoding]=useState(false)

  useEffect(()=>{
   
    const  apiData = async() => {
      setLoding(true)
      const fetchNFTs = async (Metamaskaddress) => {
        try {
          const tokenURIs = await nftcontract.getOwnedNFTs(Metamaskaddress);
      
          const filteredTokenURIs = tokenURIs.filter(tokenUri => tokenUri && tokenUri.trim() !== '');
      
          const getSuccessfullyBoughtTokens = await marketplaceContract.getSuccessfullyBoughtTokens(Metamaskaddress);
          const tokenUriOfBoughtToken = [];
      
          if (getSuccessfullyBoughtTokens.length !== 0) {
            for (let i = 0; i < getSuccessfullyBoughtTokens.length; i++) {
              const tokenUri = await nftcontract.tokenURI(getSuccessfullyBoughtTokens[i]);
              if (tokenUri && tokenUri.trim() !== '') {
                tokenUriOfBoughtToken.push(tokenUri);
              }
            }
          }

          const combinedTokenURIsSet = new Set([...filteredTokenURIs, ...tokenUriOfBoughtToken]);
    
          const tokenDataArray = await Promise.all(Array.from(combinedTokenURIsSet).map(async (tokenUri) => {
            const tokenId = await nftcontract.getTokenId(tokenUri);
            const isListed = await checkIfNFTIsListed(tokenId); 
            const imageurl = tokenUri.replace("ipfs://", "");
            const { imageLink, nftname,nftdescription } = await NFTDisplay(imageurl);
            setImage(imageLink);
            setUrl(nftname);
            setDescription(nftdescription);
            return { uri: imageLink, id: tokenId, listed: isListed, nftname, nftdescription };
          }));
          // const tokenDataArray =[]
           setNFTs(tokenDataArray);
           setLoding(false)
        } catch (error) {
          console.error('Error fetching NFTs:', error);
        }
      };
      
   if (typeof window.ethereum !== 'undefined') {
              try {
                await window.ethereum.enable();
                const web3 = new Web3(window.ethereum);
                const accounts = await web3.eth.getAccounts();
                const address = accounts[0];
                console.log(address,"metamask address");
                fetchNFTs(address); 
              } catch (error) {
                console.error('Error connecting to Metamask:', error);
              }
            } else {
              console.error('Metamask is not installed');
            }
    };

    apiData()
  },[])
   return (
    <div><CardBody>
        { 
        loding ? <Loader/>:
       nfts.length === 0? (
          <div style={{ textAlign: 'center', marginTop: '100px' }}>
            <Typography variant="h3" style={{ marginBottom: '16px' }}>
              You don't have any NFTs.
            </Typography>
            <Typography variant="h4">
              Please{' '}
              <Link to="/createnft" style={{ color: '#1976d2', textDecoration: 'none' }}>
                mint NFTs
              </Link>
              .
            </Typography>
          </div>
        ):
        (nfts.map((tokenURI, index) => (
          <Body>
          <Card key={index}>
            <CardMedia  component="img" src={tokenURI.uri} alt= {`NFT ${tokenURI.id.toString()}`}  style={{height:'179px',objectFit:"fill"}}/>
            <CardContent>
              <Typography variant="h5" component="div">
                Token Id - {tokenURI.id.toString()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Name - {tokenURI.nftname}
              </Typography>   
              <Typography variant="body2" color="text.secondary">
              NFT Description - {tokenURI.nftdescription}
              </Typography>
          </CardContent>
          <Link to={"/listednftdetails"} state={{names:tokenURI}} nftdetail={{imageurl:image,nftname:url}}>
      <Button>View Details</Button>
    </Link>
          </Card></Body>
        )))
        }
        </CardBody>
      </div> 
  );
};

export default Profile;
