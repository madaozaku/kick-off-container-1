import React, { useEffect, useState } from 'react';
import { useContract, useNFTBalance, ThirdwebSDK, toEther} from "@thirdweb-dev/react";
import {LocalWallet} from "@thirdweb-dev/wallets";
import {AvalancheFuji } from "@thirdweb-dev/chains";
import "./styles/Home.css";
import { BigNumber } from 'ethers';

const packAddress = "0xAE55CC3341396578EBEAC2AC43BDD380D8D20590";
const editionDropAddress = "0xC2E2D25F00CFD036C4A2A8B9FCF9242A8F26DAF6"

const myWallet = new LocalWallet({
  chain: AvalancheFuji,
});


function useWalletAddress() {
  const [address, setAddress] = useState("");

  useEffect(() => {
    (async() => {
      await myWallet.loadOrCreate({
        strategy: "encryptedJson",
        password: "password"
      })
      const res = await myWallet.connect({
        chainId: 43113
      })
      setAddress(res);
    })()
  }, []);

  if (!address) {return "";}
  return address;
}

function useWalletBalance() {
  const [balance, setBalance] = useState("");

  useEffect(() => {
    (async() => {
      const signer = await myWallet.getSigner();
      const b = await signer.getBalance();
      setBalance(toEther(b));
    })()
  }, []);

  if (!balance) {return "";}
  return balance;
}

function PackAmount() {
  const walletAddress = useWalletAddress();
  const balance = useWalletBalance();
  const {data: packContract} = useContract(packAddress, "pack");
  const {data: packBalance, isLoading, error } = useNFTBalance(packContract, walletAddress, BigNumber.from(0));
  const {data: editionDropContract} = useContract(editionDropAddress, "edition-drop");
  const {data: test01Balance } = useNFTBalance(editionDropContract, walletAddress, BigNumber.from(3));
  const {data: test02Balance } = useNFTBalance(editionDropContract, walletAddress, BigNumber.from(4));
  const {data: test03Balance } = useNFTBalance(editionDropContract, walletAddress, BigNumber.from(5));

  //console.log("---");
  //console.log(walletAddress);
  //console.log(packContract);
  //console.log(error);
  //console.log(isLoading);
  //console.log(packBalance);

  if (error) return (<div>error</div>);
  if (isLoading) return(<div>Loading</div>);
  return (
    <div>
      <p>wallet address = {walletAddress}</p>
      <p>wallet balance = {balance}</p>
      <p>pack amount = {packBalance?.toString()}</p>
      <p>test01 amount = {test01Balance?.toString()}</p>
      <p>test02 amount = {test02Balance?.toString()}</p>
      <p>test03 amount = {test03Balance?.toString()}</p>
    </div>
  )
}

function OpenPack(){
  return (
    <div>
      <button onClick={async () => {
          const signer = await myWallet.getSigner();
          const sdk = await ThirdwebSDK.fromSigner(signer);
         const packContract = await sdk.getContract(packAddress);
          console.log(signer);
          console.log(packContract);
          await packContract?.call("openPack",["0","1"], );
        }}>
        Open Pack
      </button>
    </div>
  )

}

export default function Home() {
  return (
    <div>
      <PackAmount />
      <OpenPack />
    </div>
  );
}