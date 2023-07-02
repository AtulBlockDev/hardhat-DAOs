const {ethers} = require("hardhat")


module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = await deployments;
  const { deployer } = await getNamedAccounts();

  log("----------------------------------------------------");

  const governanceToken = await deploy("GovernanceToken", {
    from: deployer,
    args: [],
    log: true,
    waitConfirmations: network.config.blockConfirmations || 1,

    
   
});
await delegate(governanceToken.address, deployer)

};

   const delegate = async function(governanceTokenAddress, delgatedAccount){
    const governanceToken = await ethers.getContractAt("GovernanceToken", governanceTokenAddress)
    const tx = await governanceToken.delegate(delgatedAccount)
    await tx.wait(1)
    console.log(`checkPoints${ await governanceToken.numCheckpoints(delgatedAccount)}`)
   }

module.exports.tags = ["all", "box"];