let web3 = new Web3(window.ethereum);
let contract;
let userAddress;
let contractABI = [{
        "inputs": [{
                "internalType": "address",
                "name": "candidate",
                "type": "address"
            }
        ],
        "name": "addCandidate",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [{
                "internalType": "address",
                "name": "voter",
                "type": "address"
            }
        ],
        "name": "addWhitelisted",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [],
        "name": "endVoting",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [],
        "name": "removeAllCandidates",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [],
        "name": "removeAllWhitelisted",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [{
                "internalType": "address",
                "name": "candidate",
                "type": "address"
            }
        ],
        "name": "removeCandidate",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [{
                "internalType": "address",
                "name": "voter",
                "type": "address"
            }
        ],
        "name": "removeWhitelisted",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [],
        "name": "startVoting",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [{
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "transferOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    }, {
        "inputs": [{
                "internalType": "address",
                "name": "candidate",
                "type": "address"
            }
        ],
        "name": "vote",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [{
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "candidateList",
        "outputs": [{
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [{
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "candidates",
        "outputs": [{
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [{
                "internalType": "address",
                "name": "_address",
                "type": "address"
            }
        ],
        "name": "checkIfCandidate",
        "outputs": [{
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [{
                "internalType": "address",
                "name": "_address",
                "type": "address"
            }
        ],
        "name": "checkIfWhitelisted",
        "outputs": [{
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [],
        "name": "currentRound",
        "outputs": [{
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [],
        "name": "getWinner",
        "outputs": [{
                "internalType": "address[]",
                "name": "",
                "type": "address[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [{
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "lastVotedRound",
        "outputs": [{
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [],
        "name": "leaderboard",
        "outputs": [{
                "internalType": "address[]",
                "name": "",
                "type": "address[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [],
        "name": "owner",
        "outputs": [{
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [{
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "roundVotersCount",
        "outputs": [{
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [],
        "name": "totalWhitelisted",
        "outputs": [{
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [],
        "name": "votersInCurrentRound",
        "outputs": [{
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [{
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "votes",
        "outputs": [{
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [],
        "name": "votingOpen",
        "outputs": [{
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [],
        "name": "votingPercentage",
        "outputs": [{
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [{
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "whitelisted",
        "outputs": [{
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [{
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "whitelistedList",
        "outputs": [{
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];
let contractAddress = "0x9Bfd4Cc4C5870ee1332898D7856a8d3347080a66";
let check_darkmode = false;

async function init() {
    contract = new web3.eth.Contract(contractABI, contractAddress);
    setupUI();
    await updateVotingStatus();
    updateStatistics(); // Update the statistics once when the page loads
    setInterval(updateStatistics, 5000);
    setInterval(updateVotingStatus, 5000);
}

function setupUI() {
    const connectWallet = document.getElementById("connectWallet");
    const disconnectWallet = document.getElementById("disconnectWallet");
    const walletStatus = document.getElementById("walletStatus");
    const ownerPanel = document.getElementById("ownerPanel");
    const whitelistedPanel = document.getElementById("whitelistedPanel");
    const publicPanel = document.getElementById("publicPanel");
    let contractOwner;
    var votingStatusElement = document.getElementById('votingStatus');
    votingStatusElement.style.display = "none";

    let themeSwitch = document.querySelector('.theme-switch');
    themeSwitch.addEventListener('click', function () {
        this.classList.toggle('dark-mode');
        let darkModeCss = document.getElementById('dark-mode-css');
        if (this.classList.contains('dark-mode')) {
            document.body.classList.add('dark-mode');
            darkModeCss.disabled = false;
            check_darkmode = true;
            updateVotingStatus();
        } else {
            document.body.classList.remove('dark-mode');
            darkModeCss.disabled = true;
            check_darkmode = false;
            updateVotingStatus();
        }
    });

    connectWallet.onclick = async() => {
        const accounts = await window.ethereum.request({
            method: "wallet_requestPermissions",
            params: [{
                    eth_accounts: {}
                }
            ]
        }).then(() => ethereum.request({
                    method: 'eth_requestAccounts'
                }))
            userAddress = accounts[0]

            let isOwner = false;
        let isWhitelisted = false;

        try {
            contractOwner = await contract.methods.owner().call();
            isOwner = userAddress.toLowerCase() === contractOwner.toLowerCase();
            isWhitelisted = await contract.methods.checkIfWhitelisted(userAddress).call();
        } catch (err) {
            console.error(err);
        }

        if (isOwner) {
            ownerPanel.style.display = "block";
            walletStatus.innerText = "Owner";
            votingStatusElement.style.display = "block";
        } else if (isWhitelisted) {
            whitelistedPanel.style.display = "block";
            walletStatus.innerText = "Whitelisted Address";
            votingStatusElement.style.display = "block";
        } else {
            publicPanel.style.display = "block";
            walletStatus.innerText = "Public Address";
            votingStatusElement.style.display = "block";
        }

        connectWallet.style.display = "none";
        disconnectWallet.style.display = "block";
    };

    disconnectWallet.onclick = () => {
        connectWallet.style.display = "block";
        disconnectWallet.style.display = "none";
        ownerPanel.style.display = "none";
        whitelistedPanel.style.display = "none";
        publicPanel.style.display = "none";
        walletStatus.innerText = "Please Connect Your Wallet";
        votingStatusElement.style.display = "none";
    }

    document.getElementById("startVoting").onclick = async() => {
        await callContractMethod("startVoting", [], true);
        await updateVotingStatus();
    };
    document.getElementById("endVoting").onclick = async() => {
        await callContractMethod("endVoting", [], true);
        await updateVotingStatus();
    };
    document.getElementById("removeAllCandidatesButton").onclick = () => callContractMethod("removeAllCandidates", [], true);
    document.getElementById("removeAllWhitelistedButton").onclick = () => callContractMethod("removeAllWhitelisted", [], true);
    document.getElementById("addCandidate").onclick = () => getInputAndCallMethod("Enter the candidate's address to add", "addCandidate", true);
    document.getElementById("removeCandidate").onclick = () => getInputAndCallMethod("Enter the candidate's address to remove", "removeCandidate", true);
    document.getElementById("addWhitelisted").onclick = () => getInputAndCallMethod("Enter the address to whitelist", "addWhitelisted", true);
    document.getElementById("removeWhitelisted").onclick = () => getInputAndCallMethod("Enter the address to remove from whitelist", "removeWhitelisted", true);
    document.getElementById("transferOwnership").onclick = () => getInputAndCallMethod("Enter the new owner's address", "transferOwnership", true);
    document.getElementById("vote").onclick = () => getInputAndCallMethod("Enter the candidate's address to vote for", "vote", true);

    let checkCandidateButtons = document.getElementsByClassName("checkCandidate");
    for (let i = 0; i < checkCandidateButtons.length; i++) {
        checkCandidateButtons[i].onclick = () => getInputAndCallMethod("Enter the candidate's address to check", "checkIfCandidate", false, true);
    }

    let checkVotingStatusButtons = document.getElementsByClassName("votingOpen");
    for (let i = 0; i < checkVotingStatusButtons.length; i++) {
        checkVotingStatusButtons[i].onclick = () => callContractMethod("votingOpen", [], false, true);
    }

    let checkWhitelistedButtons = document.getElementsByClassName("checkWhitelisted");
    for (let i = 0; i < checkWhitelistedButtons.length; i++) {
        checkWhitelistedButtons[i].onclick = () => getInputAndCallMethod("Enter the address to check if it's whitelisted", "checkIfWhitelisted", false, true);
    }

    let getWinnerButtons = document.getElementsByClassName("getWinner");
    let winnerModal = document.getElementById('winnerModal');
    let winnerSpan = document.getElementsByClassName("winnerClose")[0];
    let winnerList = document.getElementById("winnerList");

    for (let i = 0; i < getWinnerButtons.length; i++) {
        getWinnerButtons[i].onclick = async() => {
            let winners = await callContractMethod("getWinner");
            // Clear any previous winners
            winnerList.innerHTML = "";
            // If there's more than one winner
            if (winners.length > 1) {
                document.getElementById('winner_title').innerText = "Winners";
                for (let winner of winners) {
                    let li = document.createElement('li');
                    let link = document.createElement('a');
                    link.textContent = winner;
                    link.href = `https://goerli.etherscan.io/address/${winner}`;
                    link.target = "_blank";
                    link.style.color = 'inherit'; // change link color to inherit from parent
                    link.style.textDecoration = 'none'; // remove underline from the link
                    li.appendChild(link);
                    winnerList.appendChild(li);
                }
            } else if (winners.length === 1) { // If there's just one winner
                document.getElementById('winner_title').innerText = "Winner";
                let li = document.createElement('li');
                let link = document.createElement('a');
                link.textContent = winners;
                link.href = `https://goerli.etherscan.io/address/${winners}`;
                link.target = "_blank";
                link.style.color = 'inherit'; // change link color to inherit from parent
                link.style.textDecoration = 'none'; // remove underline from the link
                li.appendChild(link);
                winnerList.appendChild(li);
            }
            winnerModal.style.display = "block";
        };
    }

    winnerSpan.onclick = function () {
        winnerModal.style.display = "none";
    }

    window.onclick = function (event) {
        if (event.target == winnerModal) {
            winnerModal.style.display = "none";
        }
    }

    var modal = document.getElementById("leaderboardModal");

    var btns = document.getElementsByClassName("leaderboard");

    var span = document.getElementsByClassName("close")[0];

    var currentPage = 0;
    var itemsPerPage = 4;

    var openModal = async function () {
        let isOwner = false;
        let isWhitelisted = false;
        isOwner = userAddress.toLowerCase() === contractOwner.toLowerCase();
        isWhitelisted = await contract.methods.checkIfWhitelisted(userAddress).call();
        modal.style.display = "block";
        modal.classList.add("centered-modal");
        var candidates = await callContractMethod("leaderboard");
        var candidateListDiv = document.getElementById("candidateList");
        candidateListDiv.innerHTML = ""; // clear the div
        var votingOpen = await callContractMethod("votingOpen");

        // Create table and table headers
        var table = document.createElement('table');
        var thead = document.createElement('thead');
        var tr = document.createElement('tr');
        // Add an extra header for candidate numbers
        let th = document.createElement('th');
        th.appendChild(document.createTextNode('#'));
        tr.appendChild(th);
        ['Address', 'Votes'].forEach(header => {
            let th = document.createElement('th');
            th.appendChild(document.createTextNode(header));
            tr.appendChild(th);
        });
        let hasVoted;
        if (isWhitelisted) {
            hasVoted = await callContractMethod("lastVotedRound", [userAddress]);
        }
        if ((isOwner && !votingOpen) || (isWhitelisted && votingOpen && !hasVoted)) {
            let th = document.createElement('th');
            th.appendChild(document.createTextNode('Action'));
            tr.appendChild(th);
        }
        thead.appendChild(tr);
        table.appendChild(thead);

        // Only loop over the items for the current page
        for (let i = currentPage * itemsPerPage; i < (currentPage + 1) * itemsPerPage && i < candidates.length; i++) {
            let candidate = candidates[i];
            var tr = document.createElement('tr');
            var td = document.createElement('td');
            td.textContent = (i + 1).toString();
            tr.appendChild(td);
            // create a link element
            var td = document.createElement('td');
            var link = document.createElement('a');
            link.href = `https://goerli.etherscan.io/address/${candidate}`;
            link.target = "_blank"; // open the link in a new tab
            link.style.color = 'inherit'; // change link color to inherit from parent
            link.style.textDecoration = 'none'; // remove underline from the link
            link.textContent = candidate;

            td.appendChild(link);
            tr.appendChild(td);

            var td = document.createElement('td');
            let votes = await callContractMethod("votes", [candidate]);
            td.textContent = votes;
            tr.appendChild(td);
            if (isWhitelisted && !hasVoted && votingOpen) {
                var td = document.createElement('td');
                var voteButton = document.createElement("button");
                voteButton.textContent = "Vote";
                voteButton.onclick = function () {
                    callContractMethod("vote", [candidate], true);
                };
                td.appendChild(voteButton);
                tr.appendChild(td);
            } else if (isOwner && !votingOpen) {
                var td = document.createElement('td');
                var removeButton = document.createElement("button");
                removeButton.textContent = "Remove";
                removeButton.style.color = "white";
                if (check_darkmode == false) {
                    removeButton.style.backgroundColor = "red";
                } else {
                    removeButton.style.backgroundColor = "#8B0000";

                }
                removeButton.onclick = function () {
                    callContractMethod("removeCandidate", [candidate], true);
                };
                td.appendChild(removeButton);
                tr.appendChild(td);
            }
            table.appendChild(tr);
        }

        candidateListDiv.appendChild(table);

        // Add buttons to navigate to the next and previous pages
        if (currentPage > 0) {
            var prevButton = document.createElement("button");
            prevButton.textContent = "Previous Page";
            prevButton.onclick = function () {
                currentPage--;
                openModal();
            };
            candidateListDiv.appendChild(prevButton);
        }
        if ((currentPage + 1) * itemsPerPage < candidates.length) {
            var nextButton = document.createElement("button");
            nextButton.textContent = "Next Page";
            nextButton.onclick = function () {
                currentPage++;
                openModal();
            };
            candidateListDiv.appendChild(nextButton);
        }
    };

    for (let i = 0; i < btns.length; i++) {
        btns[i].onclick = openModal;
    }
    span.onclick = function () {
        modal.style.display = "none";
    }

    // When clicking anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

async function updateStatistics(panel) {
    try {
        let totalWhitelisted = await contract.methods.totalWhitelisted().call();
        let votersInCurrentRound = await contract.methods.votersInCurrentRound().call();
        let votingPercentage = await contract.methods.votingPercentage().call();

        let totalWhitelistedElems = document.querySelectorAll('.totalWhitelisted');
        let votersInCurrentRoundElems = document.querySelectorAll('.votersInCurrentRound');
        let votingPercentageElems = document.querySelectorAll('.votingPercentage');

        totalWhitelistedElems.forEach(elem => elem.innerHTML = `Total whitelisted addresses: ${totalWhitelisted}`);
        votersInCurrentRoundElems.forEach(elem => elem.innerHTML = `Addresses that voted this round: ${votersInCurrentRound}`);
        votingPercentageElems.forEach(elem => elem.innerHTML = `Voting percentage: ${votingPercentage}%`);
    } catch (err) {
        console.error(err);
    }
}

async function updateVotingStatus() {
    const votingStatus = document.getElementById("votingStatus");
    const votingOpen = await contract.methods.votingOpen().call();

    if (votingOpen) {
        votingStatus.textContent = "Voting is open";
        if (check_darkmode == false) {
            votingStatus.style.backgroundColor = "#4CAF50";
        } else {
            votingStatus.style.backgroundColor = "#6b9b59";
        }
    } else {
        votingStatus.textContent = "Voting is closed";
        if (check_darkmode == false) {
            votingStatus.style.backgroundColor = "#ff4d4d";
        } else {
            votingStatus.style.backgroundColor = "#8B0000";
        }

    }
}

async function callContractMethod(methodName, args = [], isTransaction = false, displayNotif = false) {
    return new Promise(async(resolve, reject) => {
        try {
            let result;
            if (isTransaction) {
                result = await contract.methods[methodName](...args).send({
                    from: userAddress
                });
            } else {
                result = await contract.methods[methodName](...args).call({
                    from: userAddress
                });
                if (displayNotif) {
                    if (methodName === 'getWinner') {
                        document.getElementById('feedback').innerText = `Winner: ${result}`;
                    } else {
                        document.getElementById('feedback').innerText = `Result: ${result}`;
                    }
                    let notification = document.getElementById('notification');
                    if (result === false) {
                        if (check_darkmode == false) {
                            notification.style.backgroundColor = '#ff4d4d';
                        } else {
                            notification.style.backgroundColor = '#8B0000';

                        }
                    } else {
                        if (check_darkmode == false) {
                            notification.style.backgroundColor = '#4CAF50';
                        } else {
                            notification.style.backgroundColor = '#6b9b59';

                        }
                    }
                    notification.className = 'notification show';
                    setTimeout(function () {
                        notification.className = 'notification';
                    }, 3000);
                }
            }
            resolve(result);
        } catch (err) {
            if (err && typeof err.message === 'string' && err.message.includes("Web3 validator found")) {
                const errorMessage = err.message;
                const errorLines = errorMessage.split('\n');
                let message = '';
                for (let i = 0; i < errorLines.length; i++) {
                    message += `${errorLines[i]}\n`;
                }
                alert(message);
                reject(err);
            } else if (err && typeof err.message === 'string') {
                alert(`Error executing ${methodName}: ${err.message.split("\n")[0]}`);
                reject(err);
            } else {
                try {
                    let parsedError = JSON.parse(JSON.stringify(err));
                    let errorMsg = parsedError && parsedError.error && parsedError.error.message ? parsedError.error.message : 'Unknown error';
                    alert(`Error executing ${methodName}. Details: ${errorMsg}`);
                } catch (parseError) {
                    alert(`Error executing ${methodName}. Details: ${JSON.stringify(err)}`);
                }
                reject(err);
            }
        }

    });
}

function getInputAndCallMethod(promptMessage, methodName, isTransaction = false, displayNotif = false) {
    const userInput = window.prompt(promptMessage);
    if (userInput !== null && userInput !== '') {
        callContractMethod(methodName, [userInput], isTransaction, displayNotif);
    }
}

window.onload = init;
