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

/* eslint-disable class-methods-use-this */

import {
  DataTypes, Model, InitOptions,
} from 'sequelize';

class StakeRequestModel extends Model {}
export interface StakeRequestAttributes {
  stakeRequestHash: string;
  messageHash: string;
  amount: number;
  beneficiary: string;
  gasPrice: number;
  gasLimit: number;
  nonce: number;
  gateway: string;
  stakerProxy: string;
}

export interface StakeRequest {
  stakeRequestHash: string;
  messageHash: string;
  amount: number;
  beneficiary: string;
  gasPrice: number;
  gasLimit: number;
  nonce: number;
  gateway: string;
  stakerProxy: string;
  createdAt: Date;
  updatedAt: Date;
}

export class StakeRequestRepository {
  /* Public Functions */

  public constructor(initOptions: InitOptions) {
    StakeRequestModel.init(
      {
        stakeRequestHash: {
          type: DataTypes.STRING,
          primaryKey: true,
        },
        messageHash: {
          type: DataTypes.STRING,
        },
        amount: {
          type: DataTypes.INTEGER,
          validate: {
            min: 0,
          },
        },
        beneficiary: {
          type: DataTypes.STRING,
        },
        gasPrice: {
          type: DataTypes.INTEGER,
          validate: {
            min: 0,
          },
        },
        gasLimit: {
          type: DataTypes.INTEGER,
          validate: {
            min: 0,
          },
        },
        nonce: {
          type: DataTypes.INTEGER,
          validate: {
            min: 0,
          },
        },
        gateway: {
          type: DataTypes.STRING,
        },
        stakerProxy: {
          type: DataTypes.STRING,
        },
      },
      {
        ...initOptions,
        modelName: 'stakeRequest',
        tableName: 'stake_request',
      },
    );
  }

  public async sync(): Promise<void> {
    await StakeRequestModel.sync();
  }

  /** Creates a stake request model in the repository and syncs with database. */
  public async create(stakeRequest: StakeRequestAttributes): Promise<StakeRequest> {
    return await StakeRequestModel.create(stakeRequest) as StakeRequest;
  }

  public async get(stakeRequestHash: string): Promise<StakeRequest | null> {
    const stakeRequestModel = await StakeRequestModel.findOne({
      where: {
        stakeRequestHash,
      },
    });

    if (stakeRequestModel === null) {
      return null;
    }

    return stakeRequestModel as StakeRequest;
  }
}
