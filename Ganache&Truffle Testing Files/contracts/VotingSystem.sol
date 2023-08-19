//SPDX-License-Identifier: UNLICENSED
pragma solidity >= 0.6.0 < 0.9.0;

contract VotingSystem {
    address public owner;
    mapping(address => bool)public candidates;
    mapping(address => bool)public whitelisted;
    mapping(address => uint)public votes;
    address[]public candidateList;
    address[]public whitelistedList;
    bool public votingOpen = false;
    uint public votersInCurrentRound = 0;
    uint public currentRound = 0;
    mapping(uint => uint)public roundVotersCount;
    mapping(address => uint)public lastVotedRound;

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    modifier votingEnded {
        require(currentRound > 0 && !votingOpen, "Voting has not ended or has not started yet");
        _;
    }

    modifier onlyWhitelisted {
        require(whitelisted[msg.sender] == true);
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function addCandidate(address candidate)public onlyOwner {
        require(!votingOpen, "Voting is currently open");
        require(candidates[candidate] == false, "Candidate is already added");
        candidates[candidate] = true;
        candidateList.push(candidate);
    }

    function removeCandidate(address candidate)public onlyOwner {
        require(!votingOpen, "Voting is currently open");
        candidates[candidate] = false;
        for (uint i = 0; i < candidateList.length; i++) {
            if (candidateList[i] == candidate) {
                candidateList[i] = candidateList[candidateList.length - 1];
                candidateList.pop();
                break;
            }
        }
    }

    function addWhitelisted(address voter)public onlyOwner {
        require(!votingOpen, "Voting is currently open");
        require(whitelisted[voter] == false, "Voter is already added");
        whitelisted[voter] = true;
        whitelistedList.push(voter);
    }

    function removeWhitelisted(address voter)public onlyOwner {
        require(!votingOpen, "Voting is currently open");
        whitelisted[voter] = false;
        for (uint i = 0; i < whitelistedList.length; i++) {
            if (whitelistedList[i] == voter) {
                whitelistedList[i] = whitelistedList[whitelistedList.length - 1];
                whitelistedList.pop();
                break;
            }
        }
    }

    function resetVotes()private {
        for (uint i = 0; i < candidateList.length; i++) {
            votes[candidateList[i]] = 0;
        }
    }

    function startVoting()public onlyOwner {
        require(!votingOpen, "Voting is currently open");
        votingOpen = true;
        currentRound++;
        roundVotersCount[currentRound] = whitelistedList.length;
        votersInCurrentRound = 0;
        resetVotes();
    }
    function endVoting()public onlyOwner {
        require(votingOpen, "Voting is not currently open");
        votingOpen = false;
    }

    function vote(address candidate)public onlyWhitelisted {
        require(votingOpen, "Voting is not currently open");
        require(candidates[candidate] == true, "Candidate does not exist");
        require(lastVotedRound[msg.sender] < currentRound, "You have already voted in this round");

        votes[candidate]++;
        lastVotedRound[msg.sender] = currentRound;
        votersInCurrentRound++;
    }

    function getWinner()public view votingEnded returns(address[]memory) {
        require(candidateList.length > 0, "No candidates");

        address[]memory sortedCandidates = leaderboard();
        uint topVotes = votes[sortedCandidates[0]];

        uint winnersCount = 0;
        for (uint i = 0; i < sortedCandidates.length; i++) {
            if (votes[sortedCandidates[i]] == topVotes) {
                winnersCount++;
            } else {
                break;
            }
        }

        address[]memory winners = new address[](winnersCount);
        for (uint i = 0; i < winnersCount; i++) {
            winners[i] = sortedCandidates[i];
        }

        return winners;
    }

    function checkIfCandidate(address _address)public view returns(bool) {
        return candidates[_address];
    }

    function checkIfWhitelisted(address _address)public view returns(bool) {
        return whitelisted[_address];
    }

    function transferOwnership(address newOwner)public onlyOwner {
        owner = newOwner;
    }

    function totalWhitelisted()public view returns(uint) {
        return whitelistedList.length;
    }

    function votingPercentage()public view returns(uint) {
        uint total = roundVotersCount[currentRound];
        return total == 0 ? 0 : (votersInCurrentRound * 100) / total;
    }

    function removeAllCandidates()public onlyOwner {
        require(!votingOpen, "Voting is currently open");
        for (uint i = 0; i < candidateList.length; i++) {
            candidates[candidateList[i]] = false;
        }
        delete candidateList;
    }

    function removeAllWhitelisted()public onlyOwner {
        require(!votingOpen, "Voting is currently open");
        for (uint i = 0; i < whitelistedList.length; i++) {
            whitelisted[whitelistedList[i]] = false;
        }
        delete whitelistedList;
    }

    function leaderboard()public view returns(address[]memory) {
        require(candidateList.length > 0, "No candidates");
        address[]memory sortedCandidates = candidateList;

        for (uint i = 0; i < sortedCandidates.length; i++) {
            for (uint j = i + 1; j < sortedCandidates.length; j++) {
                if (votes[sortedCandidates[j]] > votes[sortedCandidates[i]]) {
                    address temp = sortedCandidates[i];
                    sortedCandidates[i] = sortedCandidates[j];
                    sortedCandidates[j] = temp;
                }
            }
        }

        return sortedCandidates;
    }
}