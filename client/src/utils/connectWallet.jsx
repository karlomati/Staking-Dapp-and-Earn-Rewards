import {ethers,Contract} from "ethers";
import stakingAbi from "../ABI/stakingAbi.json"
import stakeTokenAbi from "../ABI/stakeTokenAbi.json";


export const connectWallet = async()=>{
    try{
       let [signer,provider,stakingContract,stakeTokenContract,chainId]=[null,null,null,null,null];
       if(window.ethereum===null){
          throw new Error("Metamsk is not installed");
       }
       const accounts = await window.ethereum.request({
        method:'eth_requestAccounts'
       })

       let chainIdHex= await window.ethereum.request({
        method:'eth_chainId'
       })
       chainId= parseInt(chainIdHex,16)
       
       let selectedAccount =accounts[0];
       if(!selectedAccount){
        throw new Error("No ethereum accounts available")
       } 

       provider = new ethers.BrowserProvider(window.ethereum);
       signer = await provider.getSigner();

    //    const stakingContractAddress="0xfB528B5905C8f9398fb625Ab4155C567A75cCC9F"
    //    const stakeTokenContractAddress="0x5263fdc29e84891ded4e0fb8be4084398d9a6e84"

   //  const stakingContractAddress="0xf8e81D47203A594245E36C48e151709F0C19fBe8"
   //  const stakeTokenContractAddress="0xd8b934580fcE35a11B58C6D73aDeE468a2833fa8"

   const stakingContractAddress="0x1Dac2FAD79f5188c4f3412482bFdd8AC5C15b032"
   const stakeTokenContractAddress="0xc694284836c02c521262315e7f5cbb199bf80844"

   

       stakingContract= new Contract(stakingContractAddress,stakingAbi,signer);
       stakeTokenContract=new Contract(stakeTokenContractAddress,stakeTokenAbi,signer);

       return {provider,selectedAccount,stakeTokenContract,stakingContract,chainId}

    }catch(error){
        console.error(error);
        throw error
    }
    
}
