import TransactionHandler from '../../src/TransactionHandler';
import StakeRequestedHandler from '../../src/handlers/StakeRequestedHandler';
import SpyAssert from '../test_utils/SpyAssert';
import StubData from '../test_utils/StubData';

import chai = require('chai');
import chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const { assert } = chai;

import sinon = require('sinon');

describe('TransactionHandler.handle()', () => {
  const bulkTransactions = {
    stakeRequesteds: [
      {
        __typename: 'StakeRequested',
        amount: '0',
        beneficiary: '0x79376dc1925ba1e0276473244802287394216a39',
        gasLimit: '2',
        gasPrice: '1',
        gateway: '0x4e4ea3140f3d4a07e2f054cbabfd1f8038b3b4b0',
        id: '0xa80c3db5089412e553b3b4defc3b3759f56b3a77257be6940251a7a05b5c4fec-0',
        nonce: '1',
        stakeRequestHash: '0xdc67e167a7dd111e4f2c27796ceb89955bb68b995eef3a84aa86b38a5f7cd22c',
        staker: '0x79376dc1925ba1e0276473244802287394216a39',
      },
    ],
  };

  it('should handle stake request transactions if handler is available', async () => {
    const aStakeRequest = StubData.getAStakeRequest('123');
    const stakeRequestedHandler = new StakeRequestedHandler(sinon.fake() as any);

    const persistSpy = sinon.replace(
      stakeRequestedHandler,
      'persist',
      sinon.fake.resolves([aStakeRequest]),
    );
    const handleSpy = sinon.replace(
      stakeRequestedHandler,
      'handle',
      sinon.fake.returns(Promise.resolve()),
    );
    const handlers = {
      stakeRequesteds: stakeRequestedHandler,
    };

    const transactionHandler = new TransactionHandler(handlers as any);
    await transactionHandler.handle(bulkTransactions);

    SpyAssert.assert(persistSpy, 1, [[bulkTransactions.stakeRequesteds]]);
    SpyAssert.assert(handleSpy, 1, [[[aStakeRequest]]]);
  });

  it('should fail if handler is not available', () => {
    const transactionHandler = new TransactionHandler({});

    assert.isRejected(
      transactionHandler.handle(bulkTransactions),
      'Handler implementation not found for stakeRequesteds',
      'Handler implementation must exists',
    );
  });
});