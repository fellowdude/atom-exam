import * as admin from 'firebase-admin'

class todoRepository {
  create(todo: any) {
    return admin.firestore().collection('todos').add(todo)
  }
  read() {
    return admin.firestore().collection('todos').get()
  }
  update(id: string, todo: any) {
    return admin.firestore().collection('todos').doc(id).update(todo)
  }
  delete(id: string) {
    return admin.firestore().collection('todos').doc(id).delete()
  }
  find(id: string) {
    return admin.firestore().collection('todos').doc(id).get()
  }
}

export default new todoRepository()