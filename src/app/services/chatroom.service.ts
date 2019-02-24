import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable()
export class ChatroomService {

  public chatrooms: Observable<any>;

  // con esto hacemos uso de la base de datos de angular
  constructor(private db: AngularFirestore) {
    this.chatrooms = db.collection('chatrooms').valueChanges(); //similar a un getValue
  }
}
