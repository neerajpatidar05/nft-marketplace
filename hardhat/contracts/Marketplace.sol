// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ERC721Contract.sol";

contract NFTMarketplace {
    address public owner;
    uint256 public feePercentage;
    
    enum SaleType { Auction, DirectSale }

    struct Sale {
        uint256 tokenId;
        address seller;
        uint256 floorPrice;
        bool active;
        uint256 endAt;
        SaleType saleType;
    }

    struct Offer {
        address bidder;
        uint256 amount;
        uint256 createdAt;
        bool withdrawn; 
    }

    mapping(uint256 => Offer[]) public tokenOffers;
    mapping(uint256 => uint256) public tokenBestOfferIndex;

    mapping(uint256 => Sale) public tokenIdToSale;
    mapping(address => uint256[]) public successfullyBuy;
    ERC721 public nftContract;
    uint256[] public listedTokenIds;

    event SaleCreated(uint256 indexed tokenId, address indexed seller, uint256 price);
    event SaleCancelled(uint256 indexed tokenId, address indexed seller);
    event SaleSuccessful(uint256 indexed tokenId, address indexed seller, address indexed buyer, uint256 price);
    event OfferPlaced(uint256 indexed tokenId, address indexed bidder, uint256 amount);
    event OfferAccepted(uint256 indexed tokenId, address indexed seller, address indexed buyer, uint256 amount);
    event OfferRejected(uint256 indexed tokenId, address indexed bidder, uint256 amount);

    constructor(address _nftContract) {
        owner = msg.sender;
        feePercentage = 10;
        nftContract = ERC721(_nftContract);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only contract owner can call this function");
        _;
    }
    function setFeePercentage(uint256 _feePercentage) external onlyOwner {
        require(_feePercentage <= 5, "Fee percentage must be less than or equal to 5");
        feePercentage = _feePercentage;
    }

    function createSale(uint256 _tokenId, uint256 _price, uint256 _endAt, SaleType _saleType) external {
        require(nftContract.ownerOf(_tokenId) == msg.sender, "Only the token owner can create a sale");
        require(_price > 0, "Price must be greater than zero");

        tokenIdToSale[_tokenId] = Sale({
            tokenId: _tokenId,
            seller: msg.sender,
            floorPrice: _price,
            active: true,
            endAt: uint256(block.timestamp + _endAt),
            saleType: _saleType
        });

        removeTokenFromListed(_tokenId);
        listedTokenIds.push(_tokenId);

        emit SaleCreated(_tokenId, msg.sender, _price);
    }
  function cancelSale(uint256 _tokenId) external {
        Sale storage sale = tokenIdToSale[_tokenId];
        require(sale.active, "Sale is not active");
        require(nftContract.ownerOf(_tokenId) == msg.sender, "Only the token owner can cancel a sale");
        delete tokenIdToSale[_tokenId];
        sale.active=false;
        removeTokenFromListed(_tokenId); 
        delete tokenOffers[_tokenId];
        emit SaleCancelled(_tokenId, msg.sender);
    }

    function removeTokenFromListed(uint256 _tokenId) internal {
        for (uint256 i = 0; i < listedTokenIds.length; i++) {
            if (listedTokenIds[i] == _tokenId) {
                if (i != listedTokenIds.length - 1) {
                    listedTokenIds[i] = listedTokenIds[listedTokenIds.length - 1];
                }
                listedTokenIds.pop();
                break;
            }
        }
    }

    function modifySale(uint256 _tokenId,uint256 _floorPrice,SaleType saleType) external{
        require(nftContract.ownerOf(_tokenId) == msg.sender, "Only the token owner can create a sale");
        require(_floorPrice > 0, "Price must be greater than zero");
        emit SaleCancelled(_tokenId, msg.sender);
        uint256 _endAt= tokenIdToSale[_tokenId].endAt;
            tokenIdToSale[_tokenId] = Sale({
            tokenId: _tokenId,
            seller: msg.sender,
            floorPrice: _floorPrice,
            active: true,
            endAt: _endAt,
           saleType:saleType
        });
        emit SaleCreated(_tokenId, msg.sender, _floorPrice);
    }

    function buy(uint256 _tokenId) external payable {
        Sale storage sale = tokenIdToSale[_tokenId];
        require(sale.active, "Sale is not active");
        require(msg.value >= sale.floorPrice, "Insufficient payment");
        require(sale.endAt>=block.timestamp,"sale ended");
        address payable seller = payable(sale.seller);
        uint256 marketplaceFee = (sale.floorPrice * feePercentage) / 100;
        address originalOwner=sale.seller;
        delete tokenIdToSale[_tokenId];
        uint256 amountToSeller = msg.value-marketplaceFee;
        nftContract.transferFrom(originalOwner, msg.sender, _tokenId);
        seller.transfer(amountToSeller);

    if (originalOwner != address(this)) {

        uint256[] storage ownerTokenIds = successfullyBuy[originalOwner];
        for (uint256 i = 0; i < ownerTokenIds.length; i++) {
            if (ownerTokenIds[i] == _tokenId) {
                if (i != ownerTokenIds.length - 1) {
                    ownerTokenIds[i] = ownerTokenIds[ownerTokenIds.length - 1];
                }
                ownerTokenIds.pop();
                break;
            }
        }
    }
        successfullyBuy[msg.sender].push(_tokenId);
        emit SaleSuccessful(_tokenId, sale.seller, msg.sender, sale.floorPrice);
    }
    function placeOffer(uint256 _tokenId) external payable {
        require(nftContract.ownerOf(_tokenId) != address(0), "Token not found");
        require(tokenIdToSale[_tokenId].active, "Sale is not active");
        require(tokenIdToSale[_tokenId].endAt >= block.timestamp, "Sale ended");
        require(msg.value > 0, "Amount must be greater than zero");

        tokenOffers[_tokenId].push(Offer({
            bidder: msg.sender,
            amount: msg.value,
            createdAt: block.timestamp,
               withdrawn: false
        }));

        emit OfferPlaced(_tokenId, msg.sender, msg.value);
    }

function selectBestOffer(uint256 _tokenId, uint256 _offerIndex) external {
    require(nftContract.ownerOf(_tokenId) == msg.sender, "Only the token owner can select an offer");
    require(tokenOffers[_tokenId].length > 0, "No offers available");

    Offer memory offer = tokenOffers[_tokenId][_offerIndex];
    require(offer.bidder != address(0), "Invalid offer");

    Sale storage sale = tokenIdToSale[_tokenId];
    require(sale.active, "Sale is not active");

    uint256 marketplaceFee = (offer.amount * feePercentage) / 100;
    uint256 amountToSeller = offer.amount - marketplaceFee;

    for (uint256 i = 0; i < tokenOffers[_tokenId].length; i++) {
        if (i != _offerIndex) {
            Offer memory otherOffer = tokenOffers[_tokenId][i];
            if (otherOffer.amount > 0) {
                payable(otherOffer.bidder).transfer(otherOffer.amount);
                emit OfferRejected(_tokenId, otherOffer.bidder, otherOffer.amount);
            }
        }
    }

    address payable currentOwner = payable(nftContract.ownerOf(_tokenId));
    nftContract.transferFrom(currentOwner, offer.bidder, _tokenId);

    if (currentOwner != address(this)) {
        currentOwner.transfer(amountToSeller);
    }

    // Update the successfullyBuy mapping
    uint256[] storage buyerTokenIds = successfullyBuy[offer.bidder];
    buyerTokenIds.push(_tokenId);

    // Clear the previous owner's entry
    uint256[] storage ownerTokenIds = successfullyBuy[currentOwner];
    for (uint256 i = 0; i < ownerTokenIds.length; i++) {
        if (ownerTokenIds[i] == _tokenId) {
            if (i != ownerTokenIds.length - 1) {
                ownerTokenIds[i] = ownerTokenIds[ownerTokenIds.length - 1];
            }
            ownerTokenIds.pop();
            break;
        }
    }

    tokenBestOfferIndex[_tokenId] = _offerIndex;
    delete tokenOffers[_tokenId];
    removeTokenFromListed(_tokenId);
     delete tokenIdToSale[_tokenId];
    emit OfferAccepted(_tokenId, msg.sender, offer.bidder, offer.amount);
}
    function withdrawOffer(uint256 _tokenId) external {
        require(tokenIdToSale[_tokenId].active, "Sale is not active");
        Offer[] storage offers = tokenOffers[_tokenId];

        for (uint256 i = 0; i < offers.length; i++) {
            if (offers[i].bidder == msg.sender && !offers[i].withdrawn) {
                offers[i].withdrawn = true;
                payable(msg.sender).transfer(offers[i].amount);
            }
        }
    }

    function withdrawFunds() external onlyOwner {
        uint256 balance = address(this).balance;
        payable(owner).transfer(balance);
    }
       
    function getListedTokens() external view returns (Sale[] memory) {
        Sale[] memory listedTokens = new Sale[](listedTokenIds.length);
        for (uint256 i = 0; i < listedTokenIds.length; i++) {
            uint256 tokenId = listedTokenIds[i];
            Sale memory sale =tokenIdToSale[tokenId];
            if(sale.endAt>block.timestamp){
            listedTokens[i] = tokenIdToSale[tokenId];
            }
        }
        return listedTokens;
    }
    
    function getSuccessfullyBoughtTokens(address _address) public view returns (uint256[] memory) {
       return successfullyBuy[_address];
}

    function getOffersForToken(uint256 _tokenId) external view returns (Offer[] memory) {
        return tokenOffers[_tokenId];
    }

}
