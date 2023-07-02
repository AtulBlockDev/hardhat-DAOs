const fs = require("fs");
const {
  proposalFile,
  MIN_DELAY,
  NEW_STORE_VALUE,
  FUNC, 
  PROPOSAL_DESCRIPTION,
  developmentChains,
} = require("../helper-hardhat-config");

const { network, ethers } = require("hardhat");
const { keccak256 } = require("ethers/lib/utils");
const {moveTime} = require("../utils/moveTime.js")
const {moveBlocks} = require("../utils/move-block.js")

async function queueAndExecute() {
    const args = [NEW_STORE_VALUE]
    
   const box = await ethers.getContract("Box");
    const descriptionHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(PROPOSAL_DESCRIPTION))
    const encodeFunctionCall = 
    box.interface.encodeFunctionData(
    FUNC,
    args
  );
  const governor = await ethers.getContract("GovernorContract");
  console.log("Queing...")
  const queue = await 
  governor.queue([box.address], [0], [encodeFunctionCall], descriptionHash);

  await queue.wait(1);
  console.log("Queued.....")

  if (developmentChains.includes(network.name)) {
    await moveTime(MIN_DELAY + 1);
    await moveBlocks(1)
  }
  console.log("Executing.........Hold on!!")
  const execute = await governor.execute(
    [box.address],
    [0],
    [encodeFunctionCall],
    descriptionHash
  );
  await execute.wait(1)
  console.log("Executed")

  const boxNewValue = await box.retrieve()
  console.log(`New Box Value is: ${boxNewValue.toString()}`)

}

queueAndExecute()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
