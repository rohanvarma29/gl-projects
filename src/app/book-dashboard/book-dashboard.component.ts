import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { ApiService } from '../shared/api.service';
import { BookModel } from './book-dashboard.model';
@Component({
  selector: 'app-book-dashboard',
  templateUrl: './book-dashboard.component.html',
  styleUrls: ['./book-dashboard.component.css']
})
export class BookDashboardComponent implements OnInit {
  formValue!: FormGroup;
  BookModelObj : BookModel = new BookModel();
  bookData !: any;
  viewonly:boolean = false;
  constructor(private formBuilder : FormBuilder, private api: ApiService, private route : Router) {
    this.route.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if(event.url == '/viewlist' || event.url == '/') {
          this.viewonly = true;
        };
      }
    });
  }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      name:[''],
      roll:[''],
      email:[''],
      mobile:[''],
      salary:['']
    })
    this.getBookDetails()
  }

  postBookDetails(){
    this.BookModelObj.name = this.formValue.value.name;
    this.BookModelObj.roll = this.formValue.value.roll;
    this.BookModelObj.email = this.formValue.value.email;
    this.BookModelObj.mobile = this.formValue.value.mobile;
    this.BookModelObj.salary = this.formValue.value.salary;

    this.api.postBooks(this.BookModelObj).subscribe(res=>{
      console.log(res);
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



  deleteBookDetails(book:any){    // Delete Api Done
    this.api.deleteBooks(book.id).subscribe(res=>{
      alert("Student Detail Record Deleted")
      this.getBookDetails()
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
    this.BookModelObj.name = this.formValue.value.name;
    this.BookModelObj.roll = this.formValue.value.roll;
    this.BookModelObj.email = this.formValue.value.email;
    this.BookModelObj.mobile = this.formValue.value.mobile;
    this.BookModelObj.salary = this.formValue.value.salary;

    this.api.updateBooks(this.BookModelObj, this.BookModelObj.id).subscribe(res=>{
      alert("Student Detail Record Updated")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getBookDetails()
    })
  }



  addtowishlist(book:BookModel){
    book.wishlist = !book.wishlist;
    this.api.updateBooks(book, book.id).subscribe(res=>{
      alert("Book Detail Record Updated")

      this.getBookDetails()
    })
  }
}
