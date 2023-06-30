pragma solidity ^0.5.0;

contract Transaction {
    struct TransactionData {
        address sender;
        address receiver;
        uint256 amount;
    }

    TransactionData[] public transactions;
    uint256 public transactionCount;

    event TransactionCreated(address sender, address receiver, uint256 amount);

    function sendFunds(address payable _receiver) external payable {
        require(msg.value > 0, "Amount must be greater than 0");

        TransactionData memory newTransaction;
        newTransaction.sender = msg.sender;
        newTransaction.receiver = _receiver;
        newTransaction.amount = msg.value;

        transactions.push(newTransaction);
        transactionCount++;

        _receiver.transfer(msg.value); // Transfer the funds to the receiver

        emit TransactionCreated(msg.sender, _receiver, msg.value);
    }

    function getTransaction(uint256 _index)
        external
        view
        returns (
            address sender,
            address receiver,
            uint256 amount
        )
    {
        require(_index < transactionCount, "Invalid transaction index");

        TransactionData storage transaction = transactions[_index];
        sender = transaction.sender;
        receiver = transaction.receiver;
        amount = transaction.amount;
    }

    function withdrawFunds(uint256 _amount) external {
        require(_amount > 0, "Amount must be greater than 0");
        require(address(this).balance >= _amount, "Insufficient contract balance");
        (bool success, ) = msg.sender.call.value(_amount)("");
        require(success, "Withdrawal failed");
    }
}
