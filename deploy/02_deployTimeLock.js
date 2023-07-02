const {ethers, network} =  require("hardhat")
const {MIN_DELAY} = require("../helper-hardhat-config")

module.exports = async function({getNamedAccounts, deployments}){
    const{deploy, log} = await deployments;
    const{deployer} = await getNamedAccounts();

    const args = [MIN_DELAY, [],[], deployer]
    

    const TimeLock = await deploy("TimeLock", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmation: network.config.blockConfirmations || 1,

    })
}