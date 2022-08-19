// SPDX-License-Identifier: MIT

pragma solidity ^0.8.8;


import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract BulkMinting is ERC721Enumerable, Ownable {
  
  using Strings for uint256;

  string baseURI;
  string public baseExtension = ".json";
  uint256 public maxSupply = 4000;  
  bool public paused = false;


  constructor(string memory _uri) ERC721("BulkMint", "BM") {
    setBaseURI(_uri);
  }

  function _baseURI() internal view virtual override returns (string memory) {
    return baseURI;
  }

 // Individual Mint function
  function mint() public payable {

    uint256 supply = totalSupply();
    require(!paused);
    require(supply + 1 <= maxSupply);

    _safeMint(msg.sender, supply + 1);
    
  }
// Batch Mint Function 
  function batchMint(address[] memory to) public onlyOwner {
        uint256 supply = totalSupply();
        uint length = to.length;

        require(supply + 1 <= maxSupply);
        for (uint i = 0; i < length; i++) {
            _safeMint(to[i], supply + 1);
            supply++;
        }
    }

// Mint NFT for other Address.
    function mintToAddress(address _to) public onlyOwner {
        
        uint256 supply = totalSupply();
        require(supply + 1 <= maxSupply);
        _safeMint(_to, supply + 1);

    }


  function walletOfOwner(address _owner) public view returns (uint256[] memory) {

    uint256 ownerTokenCount = balanceOf(_owner);
    uint256[] memory tokenIds = new uint256[](ownerTokenCount);
    for (uint256 i; i < ownerTokenCount; i++) {
      tokenIds[i] = tokenOfOwnerByIndex(_owner, i);
    }
    return tokenIds;
  }


  function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
    require( _exists(tokenId), "Token Not Minted yet! ");
    
    string memory currentBaseURI = _baseURI();
    return bytes(currentBaseURI).length > 0
        ? string(abi.encodePacked(currentBaseURI, tokenId.toString(), baseExtension))
        : "";
  }

  function setBaseURI(string memory _newBaseURI) public onlyOwner {
    baseURI = _newBaseURI;
  }

  function setBaseExtension(string memory _newBaseExtension) public onlyOwner {
    baseExtension = _newBaseExtension;
  }

// To pause the function.
  function pause(bool _state) public onlyOwner {
    paused = _state;
  }
 
  function withdraw() public payable onlyOwner {
   
    (bool os, ) = payable(owner()).call{value: address(this).balance}("");
    require(os);
  }
}