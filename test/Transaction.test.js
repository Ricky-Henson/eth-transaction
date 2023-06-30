// const Transaction = artifacts.require('./Transaction.sol')

// contract('Transaction', (accounts) => {
//   before(async () => {
//     this.transaction = await Transaction.deployed()
//   })

//   it('deploys successfully', async () => {
//     const address = await this.transaction.address
//     assert.notEqual(address, 0x0)
//     assert.notEqual(address, '')
//     assert.notEqual(address, null)
//     assert.notEqual(address, undefined)
//   })

//   it('lists tasks', async () => {
//     const taskCount = await this.transaction.taskCount()
//     const task = await this.transaction.tasks(taskCount)
//     assert.equal(task.id.toNumber(), taskCount.toNumber())
//     assert.equal(task.content, 'Constructor called')
//     assert.equal(task.completed, false)
//     assert.equal(taskCount.toNumber(), 1)
//   })

//   it('creates tasks', async () => {
//     const result = await this.transaction.createTask('A new task')
//     const taskCount = await this.transaction.taskCount()
//     assert.equal(taskCount, 2)
//     const event = result.logs[0].args
//     // add these 3 and truffle test become more simple
//     // console.log(result)
//     assert.equal(event.id.toNumber(), 2)
//     assert.equal(event.content, 'A new task')
//     assert.equal(event.completed, false)
//   })

//   it('toggles task completion', async () => {
//     const result = await this.transaction.toggleCompleted(1)
//     const task = await this.transaction.tasks(1)
//     assert.equal(task.completed, true)
//     const event = result.logs[0].args
//     assert.equal(event.id.toNumber(), 1)
//     assert.equal(event.completed, true)
//   })

// })