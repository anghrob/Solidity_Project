const VotingSystem = artifacts.require("VotingSystem");

contract('VotingSystem', (accounts) => {
    let instance;
    const owner = accounts[0];
    const candidate = accounts[1];
    const candidate1 = accounts[2];
    const nonOwner = accounts[3];
    const nonCandidate = accounts[4];
    const nonVoter = accounts[5];
    const voter = accounts[6];
    const candidate3 = accounts[7];
    const candidate4 = accounts[8];
    const voter2 = accounts[9];
    const voter3 = accounts[10];
    const voter4 = accounts[11];
    const voter5 = accounts[12];
    const voter6 = accounts[13];
    const candidate2 = accounts[14];
    const voter7 = accounts[15];

    /* before(async() => {
    instance = await VotingSystem.deployed();
    });*/
	
    // Only if the Ganache account is new because the first 10 accounts are the only ones funded originally
    it('transfer eth to unfunded accounts for testing', async() => {
    for (let i = 10; i < 16; i++) {
    await web3.eth.sendTransaction({
    from: owner,
    to: accounts[i],
    value: web3.utils.toWei('1', 'ether')
    });
    let balance = await web3.eth.getBalance(accounts[i]);
    assert.equal(balance, web3.utils.toWei('1', 'ether'), "Account " + i + " balance is not correct");
    }
    });

    describe('Owner Actions', () => {
        let instance;
        beforeEach(async() => {
            instance = await VotingSystem.deployed();
        });

        it('contract should initialize with correct owner', async() => {
            const contractOwner = await instance.owner();
            assert.equal(contractOwner, owner, "Owner is not correct");
        });
        it('add a candidate', async() => {
            await instance.addCandidate(candidate, {
                from: owner
            });
            const isCandidate = await instance.checkIfCandidate(candidate);
            assert.equal(isCandidate, true, "Candidate was not added");
        });
        it('add a whitelisted voter', async() => {
            await instance.addWhitelisted(voter, {
                from: owner
            });
            const isWhitelisted = await instance.checkIfWhitelisted(voter);
            assert.equal(isWhitelisted, true, "Voter was not whitelisted");
        });
        it('cannot add duplicate candidate', async() => {
            try {
                await instance.addCandidate(candidate, {
                    from: owner
                });
                assert.fail("Expected error not thrown");
            } catch (error) {
                assert.include(error.message, "Candidate is already added", "Expected 'Candidate is already added' in the error message");
            }
        });
        it('cannot add duplicate voters', async() => {
            try {
                await instance.addWhitelisted(voter, {
                    from: owner
                });
                assert.fail("Expected error not thrown");
            } catch (error) {
                assert.include(error.message, "Voter is already added", "Expected 'Voter is already added' in the error message");
            }
        });
        it('remove a candidate', async() => {
            await instance.removeCandidate(candidate, {
                from: owner
            });
            const isCandidateRemoved = await instance.checkIfCandidate(candidate);
            assert.equal(isCandidateRemoved, false, "Candidate was not removed");
        });
        it('remove a whitelisted voter', async() => {
            await instance.removeWhitelisted(voter, {
                from: owner
            });
            const isVoterRemoved = await instance.checkIfWhitelisted(voter);
            assert.equal(isVoterRemoved, false, "Voter was not removed from whitelist");
        });
        it('start voting', async() => {
            await instance.startVoting({
                from: owner
            });
            const isVotingOpen = await instance.votingOpen();
            assert.equal(isVotingOpen, true, "Voting did not start");
        });
        it('end voting', async() => {
            await instance.endVoting({
                from: owner
            });
            const isVotingOpen = await instance.votingOpen();
            assert.equal(isVotingOpen, false, "Voting did not end");
        });
        it('transfer ownership', async() => {
            await instance.transferOwnership(nonOwner, {
                from: owner
            });
            const newOwner = await instance.owner();
            assert.equal(newOwner, nonOwner, "Ownership was not transferred");
        });

        it('old owner cannot perform owner actions after transfer', async() => {
            try {
                await instance.removeCandidate(candidate1, {
                    from: owner
                });
                assert.fail("Expected error not thrown");
            } catch (error) {
                assert.include(error.message, "revert", "Expected a revert error message");
            }
        });

        it('only owner can transfer ownership', async() => {
            try {
                await instance.transferOwnership(owner, { // Now 'nonOwner' is the owner, and 'owner'
                    from: owner // is now a simple public address.
                });
                assert.fail("Expected error not thrown");
            } catch (error) {
                assert.include(error.message, "revert", "Expected a revert error message");
            }
            await instance.transferOwnership(owner, { // Transferring ownership back to 'owner' for the logic.
                from: nonOwner
            });
            const newOwner = await instance.owner();
            assert.equal(newOwner, owner, "Ownership was not correctly transferred");
        });

    });

    describe('Remove All Candidates', () => {
        let instance;
        beforeEach(async() => {
            instance = await VotingSystem.deployed();

            await instance.addCandidate(candidate, {
                from: owner
            });
            await instance.addCandidate(candidate1, {
                from: owner
            });
        });

        it('remove all candidates', async() => {
            // Remove all candidates
            await instance.removeAllCandidates({
                from: owner
            });

            // Check if all candidates are removed
            const isCandidateRemoved = await instance.checkIfCandidate(candidate);
            const isCandidate1Removed = await instance.checkIfCandidate(candidate1);
            assert.equal(isCandidateRemoved, false, "Candidate was not removed");
            assert.equal(isCandidate1Removed, false, "Candidate1 was not removed");
        });

    });

    describe('Remove All Voters', () => {
        let instance;
        beforeEach(async() => {
            instance = await VotingSystem.deployed();
            await instance.addWhitelisted(voter, {
                from: owner
            });
            await instance.addWhitelisted(voter5, {
                from: owner
            });
        });
        it('remove all whitelisted voters', async() => {
            await instance.removeAllWhitelisted({
                from: owner
            });

            // Check if all whitelisted voters are removed
            const isVoterRemoved = await instance.checkIfWhitelisted(voter);
            const isVoter5Removed = await instance.checkIfWhitelisted(voter5);
            assert.equal(isVoterRemoved, false, "Voter was not removed from whitelist");
            assert.equal(isVoter5Removed, false, "Voter5 was not removed from whitelist");
        });

    });

    describe('Non-Owner Actions and Access Controls', () => {
        let instance;
        beforeEach(async() => {
            instance = await VotingSystem.deployed();
        });

        it('non-owner cannot add a candidate', async() => {
            try {
                await instance.addCandidate(candidate1, {
                    from: nonOwner
                });
                assert.fail("Expected error not thrown");
            } catch (error) {
                assert.include(error.message, "revert", "Expected a revert error message");
            }
        });

        it('non-owner cannot remove a candidate', async() => {
            try {
                await instance.addCandidate(candidate1, {
                    from: owner
                }); //add candidate first
                await instance.removeCandidate(candidate1, {
                    from: nonOwner
                });
                assert.fail("Expected error not thrown");
            } catch (error) {
                assert.include(error.message, "revert", "Expected a revert error message");
            }
            await instance.removeCandidate(candidate1, {
                from: owner
            }); //cleanup after test
        });

        it('non-owner cannot add a whitelisted voter', async() => {
            try {
                await instance.addWhitelisted(nonVoter, {
                    from: nonOwner
                });
                assert.fail("Expected error not thrown");
            } catch (error) {
                assert.include(error.message, "revert", "Expected a revert error message");
            }
        });

        it('non-owner cannot remove a whitelisted voter', async() => {
            try {
                await instance.addWhitelisted(nonVoter, {
                    from: owner
                }); //whitelist voter first
                await instance.removeWhitelisted(nonVoter, {
                    from: nonOwner
                });
                assert.fail("Expected error not thrown");
            } catch (error) {
                assert.include(error.message, "revert", "Expected a revert error message");
            }
            await instance.removeWhitelisted(nonVoter, {
                from: owner
            }); //cleanup after test
        });

        it('non-owner cannot start voting', async() => {
            try {
                await instance.startVoting({
                    from: nonOwner
                });
                assert.fail("Expected error not thrown");
            } catch (error) {
                assert.include(error.message, "revert", "Expected a revert error message");
            }
        });

    });

    describe('Non-owner cannot end voting', () => {
        let instance;
        beforeEach(async() => {
            instance = await VotingSystem.deployed();
            await instance.addCandidate(candidate, {
                from: owner
            });
            await instance.addCandidate(candidate1, {
                from: owner
            });
            await instance.addCandidate(candidate3, {
                from: owner
            });
            await instance.addWhitelisted(voter, {
                from: owner
            });
            await instance.startVoting({
                from: owner
            });
        });
        it('non-owner cannot end voting', async() => {
            try {

                await instance.endVoting({
                    from: nonOwner
                });
                assert.fail("Expected error not thrown");
            } catch (error) {
                assert.include(error.message, "revert", "Expected a revert error message");
            }

        });
        afterEach(async() => {
            await instance.endVoting({
                from: owner
            }); //cleanup after test
        });

    });

    describe('Voting Actions and Rules', () => {
        let instance;
        beforeEach(async() => {
            instance = await VotingSystem.deployed();
            await instance.startVoting({
                from: owner
            });
        });

        it('vote', async() => {
            await instance.vote(candidate, {
                from: voter
            });
            const voteCount = await instance.votes(candidate);
            assert.equal(voteCount, 1, "Voting was not successful");
        });
        it('whitelisted user cannot vote more than once', async() => {
            await instance.vote(candidate, {
                from: voter
            });

            let voteCount = await instance.votes(candidate);
            assert.equal(voteCount, 1, "First voting attempt was not successful");

            try {
                await instance.vote(candidate, {
                    from: voter
                });
                assert.fail("Expected error not thrown");
            } catch (error) {
                assert.include(error.message, "revert", "Expected a revert error message");
            }

            // Verify the vote count remains unchanged
            voteCount = await instance.votes(candidate);
            assert.equal(voteCount, 1, "Vote count changed after a second voting attempt");
        });
        it('non-whitelisted user cannot vote', async() => {
            try {
                await instance.vote(candidate, {
                    from: nonVoter
                });
                assert.fail("Expected error not thrown");
            } catch (error) {
                assert.include(error.message, "revert", "Expected a revert error message");
            }
        });
        it('cannot vote for a non-candidate', async() => {
            try {
                await instance.vote(nonCandidate, {
                    from: voter
                });
                assert.fail("Expected error not thrown");
            } catch (error) {
                assert.include(error.message, "revert", "Expected a revert error message");
            }
        });
        it('candidate cannot vote', async() => {

            try {
                await instance.vote(candidate1, {
                    from: candidate3
                });
                assert.fail("Expected error not thrown");
            } catch (error) {
                assert.include(error.message, "revert", "Expected a revert error message");
            }
        });
        it('cannot get winner when voting is still open', async() => {
            try {
                await instance.getWinner();
                assert.fail("Expected error not thrown");
            } catch (error) {
                assert.include(error.message, "revert", "Expected a revert error message");
            }
        });
        it('cannot add candidate while voting is in progress', async() => {
            try {
                await instance.addCandidate(candidate, {
                    from: owner
                });
                assert.fail("Expected error not thrown");
            } catch (error) {
                assert.include(error.message, "revert", "Expected a revert error message");
            }
        });
        it('cannot add whitelisted voter while voting is in progress', async() => {
            try {
                await instance.addWhitelisted(voter7, {
                    from: owner
                });
                assert.fail("Expected error not thrown");
            } catch (error) {
                assert.include(error.message, "Voting is currently open", "Expected 'Voting is currently open' in the error message");
            }
        });

        afterEach(async() => {
            await instance.endVoting({
                from: owner
            });
        });
    });

    describe('Voting when not open', () => {
        let instance;
        beforeEach(async() => {
            instance = await VotingSystem.deployed();
        });
        it('cannot vote when voting is not open', async() => {
            try {
                await instance.vote(candidate, {
                    from: voter
                });
                assert.fail("Expected error not thrown");
            } catch (error) {
                assert.include(error.message, "revert", "Expected a revert error message");
            }
        });

    });

    describe('Leaderboard', () => {
        let instance;
        beforeEach(async() => {
            instance = await VotingSystem.deployed();
            await instance.addCandidate(candidate4, {
                from: owner
            });

            await instance.addWhitelisted(voter2, {
                from: owner
            });
            await instance.addWhitelisted(voter3, {
                from: owner
            });
            await instance.addWhitelisted(voter4, {
                from: owner
            });

            // Start a new voting round
            await instance.startVoting({
                from: owner
            });

            await instance.vote(candidate, {
                from: voter
            });
            await instance.vote(candidate1, {
                from: voter2
            });
            await instance.vote(candidate3, {
                from: voter3
            });
            await instance.vote(candidate3, {
                from: voter4
            });

            // End voting
            await instance.endVoting({
                from: owner
            });

        });

        it('leaderboard works correctly', async() => {

            const leaderboard = await instance.leaderboard();

            // Check that the leaderboard is in the correct order
            assert.equal(leaderboard[0], candidate3, "Candidate3 should be first in the leaderboard");
            assert.equal(leaderboard[1], candidate1, "Candidate1 should be second in the leaderboard");
            assert.equal(leaderboard[2], candidate, "Candidate should be third in the leaderboard");
            assert.equal(leaderboard[3], candidate4, "Candidate4 should be last in the leaderboard");
        });

    });

    describe('Single winner', () => {
        let instance;
        beforeEach(async() => {
            instance = await VotingSystem.deployed();
            await instance.startVoting({
                from: owner
            });
            await instance.vote(candidate3, {
                from: voter3
            });
            await instance.vote(candidate4, {
                from: voter4
            });
            await instance.vote(candidate3, {
                from: voter
            });
            await instance.endVoting({
                from: owner
            });
        });

        it('get winner', async() => {
            const winners = await instance.getWinner({
                from: owner
            });
            assert.equal(winners[0], candidate3, "Winner is not correct");
        });

    });

    describe('multiple winners', () => {
        let instance;
        beforeEach(async() => {
            instance = await VotingSystem.deployed();
            await instance.startVoting({
                from: owner
            });
            await instance.vote(candidate3, {
                from: voter3
            });
            await instance.vote(candidate4, {
                from: voter4
            });

            await instance.endVoting({
                from: owner
            });
        });
        it('all candidates with the same number of votes as #1 are winners', async() => {

            const winners = await instance.getWinner({
                from: owner
            });
            assert.include(winners, candidate3, "Candidate 3 should be a winner");
            assert.include(winners, candidate4, "Candidate 4 should be a winner");
        });
    });

});
