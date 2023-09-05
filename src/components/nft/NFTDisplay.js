

import React from 'react'

async function NFTDisplay(tokenUri) {
  try {
    console.log(tokenUri,"tokenuriiiiiiiiii");
    const response = await fetch(`https://ipfs.io/ipfs/${tokenUri}`);
    const metadata = await response.json();
    console.log(metadata.name,"iiiiiiiiiiiiiiiiiiii");
    const imageLink = metadata.image.replace('ipfs://', 'https://ipfs.io/ipfs/');
    const nftname= metadata.name;
    const nftdescription=metadata.description;


      return {imageLink,nftname,nftdescription}
  } catch (error) {
    console.error('Error fetching NFT metadata:', error);
  }
}


export default NFTDisplay;
