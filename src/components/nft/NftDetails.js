import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  styled,
  Typography,
} from '@mui/material'
import { useState , useEffect} from 'react'

import Grid from '@mui/material/Grid'
import React from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import abi from 'abi/marketplace.json'
import { ethers } from 'ethers';
import { marketplaceContract,nftcontract} from 'web3config/web3config';
import { parseEther } from 'ethers/lib/utils';
import NFTDisplay from './NFTDisplay'
import Web3 from 'web3'
const DatailsBody = styled(Box)(
  () => `
  
    margin: 3% 10%;
}
  `,
)
const ImagBody = styled(Box)(
  () => `
  
    display: flex;
    justify-content: flex-start;
}
  `,
)

const BackBtn = styled(Box)(
  () => `
   margin: 3% 10%;
    display: flex;
    justify-content: flex-start;
    cursor:pointer
   
}
  `,
)

function NftDetails() { 
  const [amount, setAmount] = useState('');
  const location = useLocation()
  const data = location.state.d
  const tokenId= parseInt(data.tokenId._hex)
 const price= parseInt(data.floorPrice._hex)
 console.log(data.saleType,"data from detail");


 const tokenID= parseInt(data[0]._hex);
 const [image, setImage]= useState('');
 const [url, setUrl]=useState('');
 const [nftdescription, setDescription]=useState('')
 useEffect(() => {
   const fetchTokenURI = async () => {
     try {
       const tokenURI = await nftcontract.tokenURI(tokenID);
       const imageurl = tokenURI.replace("ipfs://", "");
       const { imageLink, nftname,nftdescription } = await NFTDisplay(imageurl);
       console.log(imageLink, "nftimagem");
       setImage(imageLink);
       setUrl(nftname);
       setDescription(nftdescription);
     } catch (error) {
       console.error('Error fetching NFT metadata:', error);
     }
   };
 
   fetchTokenURI();
 }, [tokenID]);
 

 const handleAmountChange = (event) => {
  setAmount(event.target.value);
};
function etherToWei(etherAmount) {
 // const weiAmount = parseEther(etherAmount.toString());
 const weiAmount= Web3.toWei(etherAmount,"ether")
 
  return weiAmount;
}
async function handleBuy() {
  try {
    const etherValue = Web3.utils.fromWei(String(price, 'ether'));
    console.log(etherValue,"ethervalueeeeeeeeeeeeeeee");
    const weiAmount= Web3.utils.toWei(String(etherValue,"ether"))
    // web3.utils.toWei('1', 'ether');
   await marketplaceContract.buy(tokenId,{value:weiAmount});
    
  } catch (error) {
    console.error('Error buying NFTs:', error);
  }
 }
 async function handleMakeOffer(){
  try {
    console.log("handlemakeoffer",amount,tokenId);
    // const weiAmount = etherToWei(amount);
    const weiAmount= Web3.utils.toWei(String(amount,"ether"))
    await marketplaceContract.placeOffer(tokenId,{value:weiAmount});
  } catch (error) {
    console.log(error);
  }
 }
 
 return (
    <>
      <div className="gamfi-breadcrumbs-section">
        <div className="container">
          <div className="apply-heading text-center">
            <h2 className="mb-0">Owned by : -  {data[1]}</h2>
          </div>
        </div>
      </div>
      
      <Link to="/">
      <BackBtn><ArrowBackIcon/>  Back</BackBtn>
      </Link>

      <DatailsBody>
        <Grid container spacing={2}>
          <Grid item xs={2} md={6}>
            <div>
              
              <ImagBody>
                <img
                  src={image}
                  width="70%"
                />
              </ImagBody>
            </div>
          </Grid>
          <Grid item xs={10} md={6}>
            <Card sx={{ width: '100%' }}>
              <CardContent>

                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  {/* <div>
                    Owned by <b>{data.name}</b>
                  </div> */}
                  <div>
                    Current Price <b>{Web3.utils.fromWei(String(price, 'ether'))} Ether</b>
                  </div>
                </Typography>
                    
              <Typography  style={{color:"black"}}>NFT Name : - <b>{url}</b></Typography>
                   
                <Typography>
                  <div>
                    <Grid item xs={4} sx={{ mt: 5 }}>
                    <Typography variant="h5" component="h5" style={{color:"black"}}>Description :-</Typography>
                    </Grid>
                    <Grid item xs={11}>
                      <p>
                       {nftdescription}
                      </p>
                    </Grid>
                  </div>
                </Typography>
              
                <Box>
                <Typography variant="h5" component="h5" style={{color:"black",marginBottom:10}}>Details : -</Typography>
                  <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={6} md={4}>
                        <span>Contract Address:</span>
                      </Grid>
                      <Grid item xs={6} md={8}>
                        <span>0xb6a37b5d14d502c3ab0ae6f3a0e058bc9517786e</span>
                      </Grid>
                    </Grid>
                  </Box>
                  <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={6} md={4}>
                        <span>Token Standard:</span>
                      </Grid>
                      <Grid item xs={6} md={8}>
                        <span>ERC721</span>
                      </Grid>
                    </Grid>
                  </Box>
                  <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={6} md={4}>
                        <span>Chain:</span>
                      </Grid>
                      <Grid item xs={6} md={8}>
                        <span>Etherium</span>
                      </Grid>
                    </Grid>
                  </Box>
                  <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={6} md={4}>
                        <span>Token ID:</span>
                      </Grid>
                      <Grid item xs={6} md={8}>
                        <span>{tokenId}</span>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              </CardContent>
              <CardActions>
              {data.saleType === 1 && (
          <Button sx={{ background: '#121212' }} variant="contained" onClick={handleBuy}>
            Buy
          </Button>
        )}
        {data.saleType === 0 && (
          <div>
          <Button sx={{ background: '#121212' }} variant="contained" onClick={handleMakeOffer}>
            Make Offer
          </Button>
          amount <input type="number" value={amount} onChange={handleAmountChange} />
          
          </div>
        )}
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </DatailsBody>
    </>
  )
}

export default NftDetails
