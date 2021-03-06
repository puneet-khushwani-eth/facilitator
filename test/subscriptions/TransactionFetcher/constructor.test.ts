// Copyright 2019 OpenST Ltd.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
// ----------------------------------------------------------------------------


import sinon from 'sinon';

import GraphClient from '../../../src/subscriptions/GraphClient';
import TransactionFetcher from '../../../src/subscriptions/TransactionFetcher';
import assert from '../../test_utils/assert';

describe('TransactionFetcher.constructor()', () => {
  it('should construct with correct parameters', async () => {
    const mockApolloClient = sinon.stub as any;
    const graphClient = new GraphClient(mockApolloClient);
    const transactionFetcher = new TransactionFetcher(graphClient, sinon.mock() as any);

    assert(
      transactionFetcher,
      'Invalid transaction fetcher object.',
    );

    sinon.restore();
  });
});
