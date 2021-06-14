import { User } from "../../model/User";
import { IUsersRepository, ICreateUserDTO } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private users: User[];

  private static INSTANCE: UsersRepository;

  private constructor() {
    this.users = [];
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }

    return UsersRepository.INSTANCE;
  }

  create({ name, email }: ICreateUserDTO): User {
    const user: User = new User();
    Object.assign(user, {
      name,
      email,
      created_at: new Date(),
      updated_at: new Date(),
    });
    this.users.push(user);
    return user;
  }

  findById(id: string): User | undefined {
    const user = this.users.find((u) => u.id === id);
    return user;
  }

  findByEmail(email: string): User | undefined {
    const user = this.users.find((u) => u.email === email);
    return user;
  }

  turnAdmin(receivedUser: User): User {
    // eslint-disable-next-line no-param-reassign
    receivedUser.admin = true;
    this.users.map((user) => {
      if (receivedUser.id === user.id) {
        // eslint-disable-next-line no-param-reassign
        user.admin = true;
      }
      return user;
    });
    return receivedUser;
  }

  list(): User[] {
    return this.users;
  }
}

export { UsersRepository };
