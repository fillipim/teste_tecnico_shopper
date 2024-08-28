import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Customer {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  customerCode: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  address: string;
}
