import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from "typeorm";
import { Wallet } from "./wallet.entity";

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'float'})
    value: number;

    @ManyToOne(type => Wallet)
    @JoinColumn()
    from: Wallet;
    
    @Column({default: () => "CURRENT_TIMESTAMP"})
    date: Date; 
}
