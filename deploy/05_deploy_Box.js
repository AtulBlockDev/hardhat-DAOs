const {ethers, getNamedAccounts, network} = require("hardhat")
const{ADDRESS_ZERO} = require("../helper-hardhat-config")

module.exports = async function({getNamedAccounts, deployments}){
    const {deployer} = await getNamedAccounts();
    const{deploy, log} = await deployments;

    const box = await deploy("Box", {
        from: deployer,
        args: [],
        log: true,
        waitConfirmations: await network.config.blockConfirmations || 1

    })
    const timeLock = await ethers.getContract("TimeLock")
    const boxContract = await ethers.getContract("Box")

    const transferOwnership = await boxContract.transferOwnership(timeLock.address)
    await transferOwnership.wait(1)

    log("ownership transfered")

    

}