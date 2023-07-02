const {ethers, network} = require("hardhat")
const fs = require("fs")
const{NEW_STORE_VALUE, proposalFile, FUNC, PROPOSAL_DESCRIPTION, developmentChains, VOTING_DELAY} = require("../helper-hardhat-config")
const{moveBlocks} = require("../utils/move-block.js")
async function propose(args, functionToCall, proposalDescription) {

const governor = await ethers.getContract("GovernorContract")
const box = await ethers.getContract("Box")
const encodeFunctionCall = box.interface.encodeFunctionData(functionToCall, args)

console.log(`proposing ${functionToCall} on ${box.address} with ${args}`)
console.log(`proposal description: \n ${proposalDescription}`)
const proposeTx = await governor.propose([box.address], [0], [encodeFunctionCall], proposalDescription)
const proposeRec = await proposeTx.wait(1)



if(developmentChains.includes(network.name)){
    await moveBlocks(VOTING_DELAY+1)

}
const proposalId = proposeRec.events[0].args.proposalId;
let proposals = JSON.parse(fs.readFileSync(proposalFile, "utf8"))
proposals[network.config.chainId.toString()].push(proposalId.toString())
fs.writeFileSync(proposalFile, JSON.stringify(proposals));



}
propose(NEW_STORE_VALUE, FUNC, PROPOSAL_DESCRIPTION).then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })





