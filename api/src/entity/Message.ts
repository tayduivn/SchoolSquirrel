import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
} from "typeorm";
import { User } from "./User";
import { MessageStatus } from "./MessageStatus";
import { Chat } from "./Chat";
import { Course } from "./Course";

@Entity()
export class Message {
  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @Column({ type: "text" })
  public text: string;

  @ManyToOne(() => User, (user) => (user.messages))
  public sender: User;

  @Column({ default: false })
  public edited?: boolean;

  @Column({ nullable: true })
  public citation?: number;

  @Column()
  public date: Date;

  @ManyToOne(() => Chat, (chat) => chat.messages)
  public chat: Chat;

  @ManyToOne(() => Course, (course) => course.messages)
  public course: Course;

  public reactions?: Record<string, User[]>;
  public fromMe?: boolean;
  public status?: MessageStatus;
}
