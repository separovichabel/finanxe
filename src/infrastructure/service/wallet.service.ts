import { Repository } from "typeorm";
import { Wallet } from "../../domain/entity/wallet.entity";
import { Injectable } from "@nestjs/common";
import { User } from "../../domain/entity/user.entity";

@Injectable()
export class WalletService {
    constructor(
        private readonly walletService: Repository<Wallet>,
    ) {}

    save(wallet: Wallet, owner: User): Promise<Wallet> {
        wallet.owner = owner;
        return this.walletService.save(wallet)
    }

    getMany(owner: User) {
        return this.walletService.find({owner});
    }

    getById(owner: User, name: string): Promise<Wallet> {
        return this.walletService.findOne({name, owner});
    }
}