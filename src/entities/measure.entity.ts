import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from "typeorm";

@Entity("Measure")
export class Measure {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  customerCode: string;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  measureDatetime: Date;

  @Column({
    type: "enum",
    enum: ["WATER", "GAS"],
  })
  measureType: "WATER" | "GAS";

  @Column()
  measureValue: number;

  @Column()
  imageUrl: string;

  @Column({
    type: "boolean",
    default: false,
  })
  hasConfirmed: boolean;
}
