const {ethers, getNamedAccounts} = require("hardhat")
const{ADDRESS_ZERO} = require("../helper-hardhat-config")

module.exports = async function({getNamedAccounts, deployments}){
    const {deployer} = await getNamedAccounts();
    const{deploy, log} = await deployments;

    const TimeLock = await ethers.getContract("TimeLock", deployer)
    const GovernorContract = await ethers.getContractAt("GovernorContract", deployer)

    log("setting up roles!")


    const proposerRole = await TimeLock.PROPOSER_ROLE()
    const executorRole = await TimeLock.EXECUTOR_ROLE()
    const timeLockAdmin = await TimeLock.TIMELOCK_ADMIN_ROLE()

    const proposer = await TimeLock.grantRole(proposerRole, GovernorContract.address)
    await proposer.wait(1)
    const executor = await TimeLock.grantRole(executorRole, ADDRESS_ZERO)
    await executor.wait(1)
    const revoke = await TimeLock.revokeRole(timeLockAdmin, deployer)
    await revoke.wait(1)






}