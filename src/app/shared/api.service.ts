import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  username !: string;

  constructor(private http: HttpClient) {
    this.username = "";
   }


  postBooks(data:any){
    return this.http.post<any>("http://localhost:3000/books", data).pipe(map((res:any)=>{
      return res;
    }))
  }

  // setUserName(un: string) {
  //   // cnsl.lg("set username function call")
  //   this.username = un;
  // }

  // getUserName() {
  //   return this.username;
  // }

  getBooks(){
    return this.http.get<any>("http://localhost:3000/books").pipe(map((res:any)=>{
      return res;
    }))
  }

  getUsers(){
    return this.http.get<any>("http://localhost:3000/users").pipe(map((res:any)=>{
      return res;
    }))
  }



  updateBooks(data:any, id:number){
    return this.http.put<any>("http://localhost:3000/books/"+id, data).pipe(map((res:any)=>{
      return res;
    }))
  }


  deleteBooks(id:number){
    return this.http.delete<any>("http://localhost:3000/books/"+id).pipe(map((res:any)=>{
      return res;
    }))
  }

  wishlistDetails(){
    return this.http.get<any>("http://localhost:3000/books").pipe(map((res:any)=>{
      return res;
    }))

  }
  completedlistDetails(){
    return this.http.get<any>("http://localhost:3000/books").pipe(map((res:any)=>{
      return res;
    }))
  }


  updateUser(user: any) {
    const headers= new HttpHeaders()
  .set('Content-Type', 'application/json')
    // cnsl.lg("abcdefghij")
    return this.http.put<any>("http://localhost:3000/users/"+user.id, user, {headers: headers}).subscribe((res: any) => {
      // cnsl.lg(res)
      return res;
    })
  }
}


