import BigNumber from 'bignumber.js';
import Comparable from '../observer/Comparable';

/**
 * Represents model object.
 */
export default class ContractEntity extends Comparable<ContractEntity> {
  public contractAddress: string;

  public entityType: string;

  public timestamp: BigNumber;

  public createdAt?: Date;

  public updatedAt?: Date;

  /**
   * Constructor to set fields of Contract Entities table.
   * @param contractAddress Address of the contract.
   * @param entityType Type of the entity.
   * @param timestamp Last updated time in secs.
   * @param createdAt Time at which record is created.
   * @param updatedAt Time at which record is updated.
   */
  public constructor(
    contractAddress: string,
    entityType: string,
    timestamp: BigNumber,
    createdAt?: Date,
    updatedAt?: Date,
  ) {
    super();
    this.contractAddress = contractAddress;
    this.entityType = entityType;
    this.timestamp = timestamp;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  /**
   * Compares ContractEntity objects.
   * @param other ContractEntity object which is to be compared.
   * @returns `0` if the objects are same, 1 if new object is greater and -1 if new object
   *          is lesser.
   */
  public compareTo(other: ContractEntity): number {
    const existingKey = this.contractAddress.concat(this.entityType);

    const newKey = other.contractAddress.concat(other.entityType);
    if (existingKey > newKey) {
      return 1;
    }

    if (existingKey < newKey) {
      return -1;
    }

    return 0;
  }
}