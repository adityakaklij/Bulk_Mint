import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import { ethers } from "ethers";
import { ABI, CONTRACT_ADDRESS } from "./constants";
import '../CSS/App.css'

const ReadFile = () => {

    const [singleAdd, setSingleAdd] = useState()
    const [splitArray, setSplitArray] = useState()

    const [totalSupply, setTotalSupply] = useState()
    const [totalMinted, setTotalMinted] = useState()

    const [metaTxCounter, setMetaTxCounter] = useState()
    	
	const changeHandler = (e)=>{

        Papa.parse(e.target.files[0],{
            header:true,
            skipEmptyLines:true,
            complete: function(results){
                let p= (results.data).length
                // console.log("Data:- ",(results.data))
                let arr1 = []
                for(let i =0; i < p; i++){

                    // console.log((results.data)[i]['add'])
                    arr1.push(((results.data)[i]['add']))
                }
           
                sliceArray(arr1)
                // console.log("arrr1- ",arr1)

            },
        })
    }
    
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contractInstance = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

    const sliceArray= (arr)=> {
        const newArray=[];
        for(let i = 0; i < arr.length; i += 100 ){
            const chunk = arr.slice(i , i + 100)// just change 2 to 100
            newArray.push(chunk);
        }
        setSplitArray(newArray);
    }


    const  BatchMint= async()=> {
        for(let i = 0; i < splitArray.length; i ++){
            setMetaTxCounter((splitArray.length - i))
            let batchMintNFT = await contractInstance.batchMint(splitArray[i])
            await batchMintNFT.wait()
        }
        window.alert("NFTs Minted succsfully")
    }

    const mintToOtherAdd = async ()=>{
        // let mintTo = await contractInstance.mintToAddress(singleAdd,{gasLimit: 250000,gasPrice: ethers.utils.parseUnits('5000', 'gwei')})
        let mintTo = await contractInstance.mintToAddress(singleAdd)
        await mintTo.wait();
        window.alert("Minted to the given address")
    }

    const takeInputAdd = (e)=>{
        setSingleAdd(e.target.value)
    }
    useEffect(() => {
        getData()
    },)
    
    const getData = async ()=>{
        let maxSupply = await contractInstance.maxSupply()
        setTotalSupply(maxSupply.toString())
        let totalMinted = await contractInstance.totalSupply()
        setTotalMinted(totalMinted.toString())
    }


	return (
		<>
                <input className="inputFile" type="file" name= "file" accept=".csv"
                    onChange={changeHandler} />

                <button onClick={BatchMint}>Batch Mint</button>
                <br/>
                <input className="inputAdd" type="text" onChange={takeInputAdd} placeholder="Enter address"/>
                <button className="mintBtn" onClick={mintToOtherAdd}>Mint</button>

                <div className="heading">
                    <h3>Total Supply: {totalSupply} </h3> 
                    <h3>Total Mints: {totalMinted}  </h3>
                </div>

                <h3>Remaining transaction {metaTxCounter}</h3>

		</>
	);
};

export default ReadFile;
