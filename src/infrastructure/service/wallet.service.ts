import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Wallet } from "../../domain/entity/wallet.entity";
import { User } from "../../domain/entity/user.entity";

@Injectable()
export class WalletService {
    
    constructor(
        @InjectRepository(Wallet)
        readonly walletRepo: Repository<Wallet>,
    ) {}

    insert(wallet: Wallet, owner: User): Promise<Wallet> {
        wallet.owner = owner;
        return this.walletRepo.save(wallet)
    }

    async update(id: number, plainWallet: Wallet): Promise<Wallet> {
        const wallet = await this.walletRepo.findOne(id);
        return this.walletRepo.save(this.walletRepo.merge(wallet, plainWallet))
    }

    getMany(owner: User) {
        return this.walletRepo.find({owner});
    }

    getByIdOfUser(id: number, owner: User): Promise<Wallet> {
        return this.walletRepo.findOne({id, owner});
    }
}