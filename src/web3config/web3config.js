// web3Config.js
import abi from 'abi/ERC721Contract.json'
import { ethers } from 'ethers';
import React, { useState ,useEffect} from 'react';
import marketplaceabi from 'abi/marketplace.json'
// Initialize your web3 connection
const marketplaceaddress='0xa771d1b94257F8937A4f4fB13072d0EDF0E9c4e3';
const nftcontractaddress = '0x2F30102080EeD63933269c5FA149fd2f021b9296';
const contractabi = abi.abi;
const { ethereum } = window;
const provider = new ethers.providers.Web3Provider(ethereum);
const signer = provider.getSigner();
const nftcontract = new ethers.Contract(nftcontractaddress, contractabi,signer);
const marketplacecontractabi = marketplaceabi.abi;
const marketplaceContract=new ethers.Contract(marketplaceaddress, marketplacecontractabi,signer);

export { nftcontract, marketplaceContract,marketplaceaddress ,nftcontractaddress};
