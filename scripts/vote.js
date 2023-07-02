const fs = require("fs");
const { proposalFile, VOTING_PERIOD, developmentChains} = require("../helper-hardhat-config");
const { moveBlocks } = require("../utils/move-block.js");
const { network, ethers } = require("hardhat");

async function main() {
  const proposals = JSON.parse(fs.readFileSync(proposalFile, "utf8"));
  const proposalId = proposals[network.config.chainId][0]
  const VoteWay = 1;
  const governor = await ethers.getContract("GovernorContract")
  const reason = "My Will!"
  const voteTxResponse = await governor.castVoteWithReason(proposalId, VoteWay, reason
    )
    await voteTxResponse.wait(1)

    if(developmentChains.includes(network.name)){
    await moveBlocks(VOTING_PERIOD+1)
    }

  

}
    

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
