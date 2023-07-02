const {ethers} = require("hardhat")
const{VOTING_PERIOD,
 VOTING_DELAY,
 QUORUM_PERCENTAGE} = require("../helper-hardhat-config")


module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = await deployments;
  const { deployer } = await getNamedAccounts();
  const governanceToken = await ethers.getContract("GovernanceToken")
  const TimeLock = await ethers.getContract("TimeLock")

  log("----------------------------------------------------");

  const GovernorContract = await deploy("GovernorContract", {
    from: deployer,
    args: [governanceToken.address, TimeLock.address, VOTING_DELAY, VOTING_PERIOD, QUORUM_PERCENTAGE],
    log: true,
    waitConfirmations: network.config.blockConfirmations || 1,

    
   
})
}