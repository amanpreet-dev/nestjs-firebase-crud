import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import * as admin from 'firebase-admin';

@Injectable()
export class TodoService {
  private db: admin.firestore.Firestore;
  constructor() {
    this.db = admin.firestore();
  }

  async create(createTodoDto: CreateTodoDto) {
    const docRef = this.db.collection('todos').doc();
    await docRef.set(createTodoDto);
    return { id: docRef.id, ...createTodoDto };
  }

  async findAll() {
    const documents = await this.db.collection('todos').get();
    return documents.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }

  async findOne(id: string) {
    const doc = await this.db.collection('todos').doc(id).get();
    return doc.data();
  }

  async update(id: string, updateTodoDto: UpdateTodoDto) {
    const doc = await this.db
      .collection('todos')
      .doc(id)
      .update({ ...updateTodoDto });
    return doc;
  }

  async remove(id: string) {
    const doc = await this.db.collection('todos').doc(id).delete();
    return { doc };
  }
}
