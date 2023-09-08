import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { Box, CardMedia } from "@mui/material";
import { nftcontract, marketplaceContract } from 'web3config/web3config';
import { Link } from "react-router-dom";
import { fromWei } from "utils";
const OfferDetails = styled.div`
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  
`;

const CardBody = styled(Box)`
  margin: 30px 100px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 2.5%;
`;

const Body = styled(Card)`
  width: 20%;
  margin-bottom: 2%;
  box-shadow: 1px 1px #342929;
  border-radius: 0%;
`;

function Listednftdetails() {
  const [nfts, setNFTs] = useState([]);
  const [offers, setOffers] = useState([]);
  const location = useLocation();
  const state = location.state;
  console.log(state.names.listed, "state");

  const fetchOffers = async (tokenId) => {
    try {
      const offersForToken = await marketplaceContract.getOffersForToken(tokenId);
      console.log(offersForToken, "offersForToken");
      setOffers(offersForToken);
    } catch (error) {
      console.error('Error fetching offers:', error);
    }
  };

  useEffect(() => {
    if (state && state.names) {
      fetchOffers(state.names.id._hex.toString());
    }
  }, [state]);

  const handleCancelSale = async (tokenId) => { 
    try {
      await marketplaceContract.cancelSale(tokenId);
      setNFTs(prevNFTs => {
        const updatedNFTs = prevNFTs.map(nft => {
          if (nft.id === tokenId) {
            return { ...nft, listed: false };
          }
          return nft;
        });
        return updatedNFTs;
      });
    } catch (error) {
      console.error('Error canceling sale:', error);
    }
  };
  function formatDate(timestamp) {
    const date = new Date(parseInt(timestamp)*1000);
    return date.toLocaleString();
  }
  
  const handleSelectOffer = async (tokenId,offerIndex)=>{

    await marketplaceContract.selectBestOffer(tokenId, offerIndex);
  }
  return (
    <div>
      <CardBody>
        <Body>
          <Card>
            <CardMedia component="img" src={state.names.uri} alt={`NFT ${state.names.id}`} />
            <CardContent>
              <Typography variant="h5" component="div">
                Token Id - {parseInt(state.names.id._hex)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Description: {state.names.nftdescription}
              </Typography>
              {state.names.listed ? (<>
                <p style={{ color: 'gray' }}>Nft is alredy Listed. You can cancel sale by clicking below button.</p>
                <button onClick={() => handleCancelSale(state.names.id)}>Cancel sale </button>
                </>
) : (
                <Link to={"/listnftforsale"} state={{ names: state.names }}>
                  <button>List NFT</button>
                </Link>
              )}
            </CardContent>
          </Card>
        </Body>
      </CardBody>
      {state.names.listed && (
  <OfferDetails>
    <table style={{ width: '100%' }}>
      <thead>
        <tr style={{ color: 'white' }}>
          <th style={{ padding: '8px', textAlign: 'left' }}>Bidder</th>
          <th style={{ padding: '8px', textAlign: 'left' }}>Amount</th>
          <th style={{ padding: '8px', textAlign: 'left' }}>Received At</th>
        </tr>
      </thead>
      <tbody style={{ color: 'green' }}>
        {offers.map((offer, index) => (
          <tr key={index}>
            <td style={{ padding: '8px' }}>{offer.bidder}</td>
            <td style={{ padding: '8px' }}>{fromWei(parseInt(offer.amount._hex))}</td>
            <td style={{ padding: '8px' }}>{formatDate(parseInt(offer.createdAt._hex))}</td>
            <button onClick={() => handleSelectOffer(state.names.id._hex.toString(), index)}>Select Offer</button>
          </tr>
        
        ))} 
      </tbody>
    </table>
  </OfferDetails>
)}


    </div>
  )
}

export default Listednftdetails;
