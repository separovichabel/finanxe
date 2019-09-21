import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { Wallet } from "./wallet.entity";

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'money'})
    value: number;

    @OneToOne(type => Wallet)
    @JoinColumn()
    from: Wallet;
    
    @Column({default: new Date()})
    dateTime: Date; 
}
