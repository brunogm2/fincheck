import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBankAccountDto } from '../dto/create-bank-account.dto';
import { UpdateBankAccountDto } from '../dto/update-bank-account.dto';
import { ActiveUserId } from 'src/shared/decorators/ActiveUserId';
import { BankAccountsRepository } from 'src/shared/database/repositories/bank-accounts.repositories';
import { ValidateBankAccountOwnershipService } from './validate-bank-account-ownership.service';
import { BankAccount } from '@prisma/client';

@Injectable()
export class BankAccountsService {
  constructor(
    private readonly bankAccountsRepo: BankAccountsRepository,
    private readonly validateBankAccountOwnershipService: ValidateBankAccountOwnershipService
  ) {}

  create(userId: string, createBankAccountDto: CreateBankAccountDto) {
    const { color, initialBalance, name, type } = createBankAccountDto;

    return this.bankAccountsRepo.create({
      data: {
        userId,
        color,
        initialBalance,
        name,
        type,
      }
    })
  }

  async findAllByUserId(userId: string) {
    const bankAccounts: BankAccount[] = await this.bankAccountsRepo.findMany({
      where: { userId },
      include: {
        transactions: {
          select: {
            type: true,
            value: true,
            id: true,
          }
        },
      },
    });

    return bankAccounts.map((bankAccount) => {
      const currentBalance = 0;

      // const totalTransactions = bankAccount.transactions.reduce(
      //   (acc, transaction) => acc + transaction.value,
      //   0,
      // );

      return {
        ...bankAccount,
        // totalTransactions,
        currentBalance
      }
    });
  }

  async update(
    userId: string,
    bankAccountId: string,
    updateBankAccountDto: UpdateBankAccountDto
  ) {
    this.validateBankAccountOwnershipService.validate(userId, bankAccountId);

    const { color, initialBalance, name, type } = updateBankAccountDto;

    return this.bankAccountsRepo.update({
      where: { id: bankAccountId },
      data: {
        color,
        initialBalance,
        name,
        type
      }
    });
  }

  async remove(userId: string, bankAccountId: string) {
    this.validateBankAccountOwnershipService.validate(userId, bankAccountId);

    await this.bankAccountsRepo.delete({
      where: { id: bankAccountId }
    });

    return null;
  }

}

