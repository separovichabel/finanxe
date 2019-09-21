import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "../../domain/entity/user.entity";
import { Transaction } from "../../domain/entity/transaction.entity";
import { Wallet } from "../../domain/entity/wallet.entity";

@Injectable()
export class TransactionService {
    
    constructor(
        @InjectRepository(Transaction)
        readonly transactiontRepo: Repository<Transaction>,
    ) {}

    insert(transaction: Transaction): Promise<Transaction> {
        console.log(transaction)
        return this.transactiontRepo.save(transaction)
    }

    compose(value: number, from: Wallet): Transaction {
        return this.transactiontRepo.create({value, from})
    }

    async update(id: number, plainWallet: Transaction): Promise<Transaction> {
        const wallet = await this.transactiontRepo.findOne(id);
        return this.transactiontRepo.save(this.transactiontRepo.merge(wallet, plainWallet))
    }

    getMany(owner: User, wallet: Wallet) {
        return this.transactiontRepo.find({from: wallet});
    }

    getByIdOfUser(id: number, owner: User): Promise<Transaction> {
        return this.transactiontRepo.findOne({where: {id, owner}});
    }
}