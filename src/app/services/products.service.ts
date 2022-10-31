import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, doc, docData, Firestore, updateDoc } from '@angular/fire/firestore';
import { deleteDoc } from '@firebase/firestore';
import { from, Observable } from 'rxjs';
import { IProducts } from '../models/products';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  url: string = 'http://localhost:3000/products'
  urlBasket: string = 'http://localhost:3000/basket'

  constructor(private http: HttpClient, private firestore: Firestore) { }

  // getProducts() {
  //   return this.http.get<IProducts[]>(this.url)
  // }

  getProducts(): Observable<IProducts[]> {
    const productRef = collection(this.firestore, 'products')
    return collectionData(productRef, {idField: 'id'}) as Observable<IProducts[]>
  }

  // getProduct(id: number) {
  //   return this.http.get<IProducts>(`${this.url}/${id}`)
  // }

  getProduct(id: number) {
    const productRef = doc(this.firestore, 'products/' + id)
    return docData(productRef, {idField: 'id'}) as Observable<IProducts[]>
  }

  // postProduct(product: IProducts) {
  //   return this.http.post<IProducts>(this.url, product)
  // }

  postProduct(product: IProducts) {
    const productRef = collection(this.firestore, 'products')
    return addDoc(productRef, product)
  }

  // deleteProduct(id: number) {
  //   return this.http.delete<any>(`${this.url}/${id}`)
  // }

  deleteProduct(product: IProducts) {
    const productDocRef = doc(this.firestore, `products/${product.id}`)
    return deleteDoc(productDocRef)
  }

  // updateProduct(product: IProducts) {
  //   return this.http.put<IProducts>(`${this.url}/${product.id}`, product)
  // }

  updateProduct(product: IProducts): Observable<any> {
    const ref = doc(this.firestore, 'products', product.uid)
    return from(updateDoc(ref, {...product}))
  }

  // postProductToBasket(product: IProducts) {
  //   return this.http.post<IProducts>(this.urlBasket, product)
  // }

  postProductToBasket(product: IProducts) {
    const basketRef = collection(this.firestore, 'basket')
    return addDoc(basketRef, product)
  }
  

  // getProductFromBasket() {
  //   return this.http.get<IProducts[]>(this.urlBasket)
  // }

  getProductFromBasket(): Observable<IProducts[]> {
    const basketRef = collection(this.firestore, 'basket')
    return collectionData(basketRef, {idField: 'id'}) as Observable<IProducts[]>
  }

  
  // updateProductToBasket(product: IProducts) {
  //   return this.http.put<IProducts>(`${this.urlBasket}/${product.id}`, product)
  // }

  updateProductToBasket(product: IProducts): Observable<any> {
    const ref = doc(this.firestore, 'products', product.uid)
    return from(updateDoc(ref, {...product}))
  }

  // deleteProductFromBasket(id: number) {
  //   return this.http.delete<any>(`${this.urlBasket}/${id}`)
  // }

  deleteProductFromBasket(product: IProducts) {
    const productDocRef = doc(this.firestore, `products/${product.id}`)
    return deleteDoc(productDocRef)
  }
}
