import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Wallet } from "./wallet.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(type => Wallet, wallet => wallet.owner)
    wallets: Wallet[]
}