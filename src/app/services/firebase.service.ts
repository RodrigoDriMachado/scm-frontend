import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(public db: AngularFirestore) {}

  getAvatars(){
      return this.db.collection('/avatar').valueChanges()
  }

  getUser(userKey){
    return this.db.collection('fornecedor').doc(userKey).snapshotChanges();
  }

  updateUser(userKey, value){
    value.nameToSearch = value.name.toLowerCase();
    return this.db.collection('users').doc(userKey).set(value);
  }

  deleteUser(userKey){
    return this.db.collection('users').doc(userKey).delete();
  }

  getUsers(){
    return this.db.collection('fornecedor').snapshotChanges();
  }

  getNotasFiscais(){
    return this.db.collection('nota_fiscal').snapshotChanges();
  }

  searchUsers(searchValue){
    return this.db.collection('users',ref => ref.where('nameToSearch', '>=', searchValue)
      .where('nameToSearch', '<=', searchValue + '\uf8ff'))
      .snapshotChanges()
  }

  searchUsersByAge(value){
    return this.db.collection('users',ref => ref.orderBy('age').startAt(value)).snapshotChanges();
  }

  createUser(value, avatar){
    return this.db.collection('users').add({
      name: value.name,
      nameToSearch: value.name.toLowerCase(),
      surname: value.surname,
      age: parseInt(value.age),
      avatar: avatar
    });
  }

  createFornecedor(value){
    return this.db.collection('fornecedor').add({
     
      idfornecedor: value.idfornecedor,
      nomefornecedor: value.nomefornecedor,
      tipofornecedor: value.tipofornecedor,
      email: value.email
    });
  }

  createPedido(value){
    return this.db.collection('pedido').add({
      
      idpedido: value.idpedido,
      item: value.item,
      desc: value.desc,
      tipopedido: value.tipopedido,
      nomefornecedor: value.nomefornecedor
    });
  }

  createItem(value){
    return this.db.collection('item').add({
     
      iditem: value.iditem,
      nomeitem: value.nomeitem,
      desc: value.desc,
      
    });
  }

  createNotaFiscal(value){
    return this.db.collection('nota_fiscal').add({
      IDNota: value.IDNota,
      IDItem: value.IDItem,
      IDPedido: value.IDPedido,
      NomeItem: value.NomeItem,
      Tiponota: value.Tiponota,
      qntitem: value.qntitem,
      valorunit: value.valorunit,
      fornecedor_in: value.fornecedor_in,
      fornecedor_out: value.fornecedor_out
    });
  }
}