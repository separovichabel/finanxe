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

    save(wallet: Wallet, owner: User): Promise<Wallet> {
        wallet.owner = owner;
        return this.walletRepo.save(wallet)
    }

    getMany(owner: User) {
        return this.walletRepo.find({owner});
    }

    getById(owner: User, name: string): Promise<Wallet> {
        return this.walletRepo.findOne({name, owner});
    }
}