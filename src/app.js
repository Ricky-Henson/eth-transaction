App = {
  loading: false,
  contracts: {},
  transactionInstance: null,

  load: async () => {
    await App.loadWeb3();
    await App.loadAccount();
    await App.loadContract();
    await App.render();
  },

  loadWeb3: async () => {
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else if (window.ethereum) {
      App.web3Provider = window.ethereum;
      web3 = new Web3(window.ethereum);
      try {
        await window.ethereum.enable();
      } catch (error) {
        console.error("User denied account access");
      }
    } else {
      console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
  },

  loadAccount: async () => {
    try {
      const accounts = await web3.eth.getAccounts();
      App.account = accounts[0];
      console.log(App.account);
    } catch (error) {
      console.error("Failed to load accounts", error);
    }
  },

  loadContract: async () => {
    const transaction = await $.getJSON('Transaction.json');
    App.contracts.Transaction = TruffleContract(transaction);
    App.contracts.Transaction.setProvider(App.web3Provider);

    App.transactionInstance = await App.contracts.Transaction.deployed();
  },

  render: async () => {
    if (App.loading) {
      return;
    }

    App.setLoading(true);

    $('#account').html(App.account);

    await App.renderTransactions();

    App.setLoading(false);
  },

  renderTransactions: async () => {
    const transactionCount = await App.transactionInstance.transactionCount;
    const $transactionTemplate = $('.transactionTemplate');
  
    for (let i = 0; i < transactionCount; i++) {
      const transaction = await App.transactionInstance.getTransaction(i);
      const sender = transaction.sender;
      const receiver = transaction.receiver;
      const amount = transaction.amount;
  
      const $newTransactionTemplate = $transactionTemplate.clone();
      $newTransactionTemplate.find('.sender').html(sender);
      $newTransactionTemplate.find('.receiver').html(receiver);
      $newTransactionTemplate.find('.amount').html(amount);
  
      $('#transactionList').append($newTransactionTemplate);
  
      $newTransactionTemplate.show();
    }
  },
  
  sendFunds: async () => {
    App.setLoading(true);
    const receiver = $('#receiverAddress').val();
    const amount = $('#amount').val();
    await App.transactionInstance.sendFunds(receiver, { from: App.account, value: amount });
    window.location.reload();
  },

  withdrawFunds: async () => {
    App.setLoading(true);
    const amount = $('#withdrawAmount').val();
    await App.transactionInstance.withdrawFunds(amount, { from: App.account });
    window.location.reload();
  },

  setLoading: (boolean) => {
    App.loading = boolean;
    const loader = $('#loader');
    const content = $('#content');
    if (boolean) {
      loader.show();
      content.hide();
    } else {
      loader.hide();
      content.show();
    }
  }
};

$(() => {
  $(window).on('load', () => {
    App.load();
  });
});
