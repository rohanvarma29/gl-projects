import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import {BookModel} from './wishlist.model'
@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  formValue!: FormGroup;
  BookModelObj : BookModel = new BookModel();
  bookData !: any;
  wishData !:Array<any>;
  userData !: any;
  

  constructor(private formBuilder : FormBuilder, private api : ApiService) { }

  ngOnInit(): void {
    this.getBookDetails();
    this.getUserDetails();
    this.wishData=[];
  }


  postBookDetails(){
    this.BookModelObj.title = this.formValue.value.name;
    this.BookModelObj.pages = this.formValue.value.roll;
    this.BookModelObj.author = this.formValue.value.email;
    this.BookModelObj.mobile = this.formValue.value.mobile;
    this.BookModelObj.salary = this.formValue.value.salary;

    this.api.postBooks(this.BookModelObj).subscribe(res=>{
      // cnsl.lg(res);
      alert("Books Record Added Successfully")

      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getBookDetails()    // for update data
      // this.addtowishlist();
    },
    err=>{
      alert("Something went wrong, Please Check Again Carefully")
    })
  }


  getBookDetails(){      // get Api Done
    this.api.getBooks().subscribe(res=>{
      this.bookData = res;
      
    })
  }

  getUserDetails(){      // get Api Done
    this.api.getUsers().subscribe(res => {
      res.map((user: any) => {
        if (user.email == localStorage.getItem('username')) {
          this.userData = user;
          this.getwishlist();
        }
      })
    })
  }

  onUpdate(book:any){
    this.BookModelObj.id = book.id;
    this.formValue.controls['name'].setValue(book.name);
    this.formValue.controls['roll'].setValue(book.roll);
    this.formValue.controls['email'].setValue(book.email);
    this.formValue.controls['mobile'].setValue(book.mobile);
    this.formValue.controls['salary'].setValue(book.salary);
  }

  updateBookDetails(){
    this.BookModelObj.title = this.formValue.value.name;
    this.BookModelObj.pages = this.formValue.value.roll;
    this.BookModelObj.author = this.formValue.value.email;
    this.BookModelObj.mobile = this.formValue.value.mobile;
    this.BookModelObj.salary = this.formValue.value.salary;

    this.api.updateBooks(this.BookModelObj, this.BookModelObj.id).subscribe(res=>{
      alert("book Detail Record Updated")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getBookDetails()
    })

  }
  // addtowishlist(){
  //   this.BookModelObj.title = this.formValue.value.name;
  //   this.BookModelObj.pages = this.formValue.value.roll;
  //   this.BookModelObj.author = this.formValue.value.email;
  //   this.BookModelObj.mobile = this.formValue.value.mobile;
  //   this.BookModelObj.salary = this.formValue.value.salary;

  //   this.api.wishlistDetails().subscribe(res=>{
  //     alert("book Detail Record Updated")
  //     let ref = document.getElementById('cancel')
  //     ref?.click();
  //     this.formValue.reset();
  //     this.getBookDetails()
  //   })
  // }

  // addtolist(book:any){
    
  //   // cnsl.lg("hello");
  //   if(this.wishData.indexOf(book)<0)
  //     this.wishData.push(book);
  //   // cnsl.lg("hello "+this.wishData);
  // }

  getwishlist(){
    this.userData.WishList.sort();

    // cnsl.lg(this.userData.WishList);

    this.userData.WishList.map((id: any) => {
      for (let book of this.bookData) {
        if (book.id == id) {
          this.wishData.push(book);
        }
      }
    })


    // cnsl.lg(this.wishData)
  }

}
