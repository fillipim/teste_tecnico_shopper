import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";

@Entity("measure")
export class Measure {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 255 })
  customerCode: string;

  @Column({ type: "varchar" })
  @Column({ type: "timestamp" })
  measureDatetime: Date;

  @Column({
    type: "enum",
    enum: ["WATER", "GAS"],
  })
  measureType: "WATER" | "GAS";

  @Column({ type: "decimal" })
  measureValue: number;

  @Column()
  imageUrl: string;

  @Column({ default: false })
  hasConfirmed: boolean;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Column({ type: "timestamp", nullable: true })
  confirmedAt: Date;
}
