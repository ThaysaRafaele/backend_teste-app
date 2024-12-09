import { Injectable } from '@nestjs/common';
import { User } from './user.model';
import axios from 'axios';

@Injectable()
export class UsersService {
  private users: User[] = [];

  createUser(user: User): User {
    user.id = this.users.length + 1;
    this.users.push(user);
    return user;
  }

  getAllUsers(): User[] {
    return this.users;
  }

  getUserById(id: number): User {
    return this.users.find((user) => user.id === id);
  }

  updateUser(id: number, updatedUser: Partial<User>): User {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      throw new Error('User not found');
    }
    this.users[userIndex] = { ...this.users[userIndex], ...updatedUser };
    return this.users[userIndex];
  }

  async validateCep(cep: string): Promise<boolean> {
    try {
      const response = await axios.get(
        `https://brasilapi.com.br/api/cep/v1/${cep}`,
      );
      return response.status === 200;
    } catch {
      return false;
    }
  }
}
