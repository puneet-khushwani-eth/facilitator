import BigNumber from 'bignumber.js';
import ContractEntityHandler from './ContractEntityHandler';
import StakeRequestRepository from '../repositories/StakeRequestRepository';
import StakeRequest from '../models/StakeRequest';

import Logger from '../Logger';

/**
 * This class handels stake request transactions.
 */
export default class StakeRequestedHandler extends ContractEntityHandler<StakeRequest> {
  /* Storage */

  private readonly stakeRequestRepository: StakeRequestRepository;

  public constructor(stakeRequestRepository: StakeRequestRepository) {
    super();

    this.stakeRequestRepository = stakeRequestRepository;
  }

  /**
   * This method parse stakeRequest transaction and returns stakeRequest model object.
   *
   * @param transactions Transaction objects.
   *
   * @return Array of instances of StakeRequest objects.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async persist(transactions: any[]): Promise<StakeRequest[]> {
    const models: StakeRequest[] = transactions.map(
      (transaction): StakeRequest => {
        const stakeRequestHash = transaction.stakeRequestHash as string;
        const amount = new BigNumber(transaction.amount);
        const beneficiary = transaction.beneficiary as string;
        const gasPrice = new BigNumber(transaction.gasPrice);
        const gasLimit = new BigNumber(transaction.gasLimit);
        const nonce = new BigNumber(transaction.nonce);
        const gateway = transaction.gateway as string;
        const stakerProxy = transaction.stakerProxy as string;

        return new StakeRequest(
          stakeRequestHash,
          amount,
          beneficiary,
          gasPrice,
          gasLimit,
          nonce,
          gateway,
          stakerProxy,
        );
      },
    );

    const savePromises = [];
    for (let i = 0; i < models.length; i += 1) {
      savePromises.push(this.stakeRequestRepository.save(models[i]));
    }

    await Promise.all(savePromises);

    return models;
  }


  /**
   * This method defines action on receiving stake request model.
   *
   * @param stakeRequest array of instances of StakeRequestAttributes object.
   */
  public handle = async (stakeRequest: StakeRequest[]): Promise<void> => {
    Logger.info(`Stake requests  : ${stakeRequest}`);
    return Promise.resolve();
    // stakeRequestService.reactTo(stakeRequest);
  };
}