import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { NgxSpinnerService } from 'ngx-spinner';
import { ParentCategoryService } from '../../../_services/categories/parentCategory/parent-category.service';
import { ChildCategoryService } from '../../../_services/categories/childCategory/child-category.service';
import { BucketService } from '../../../_services/bucket/bucket.service';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { HsnService } from '../../../_services/HsnService/hsn.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-hsn-codes',
  templateUrl: './hsn-codes.component.html',
  styleUrl: './hsn-codes.component.css'
})
export class HsnCodesComponent {

   //form Hide and show for update and save user
   viceVersaForm:boolean = false;

   progressBarShow:any = false;
 
   parentList: any[] = [];
   imageSrc: string = '';
   file:any;
   fileRendor:boolean = false;
   childList:any;
 
 
   form: any = {
     hsn: null,
     defaultName: null,
     description: null,
   };
 
 
   ngOnInit(): void { 
     // Parent List
     this.getHsnByPagination({ page: "0", size: "10" });
 
   }
   
 
   constructor(
     private router:Router, 
     private parentCategoryService:ParentCategoryService ,
     private hsnService:HsnService,
     private toast:NgToastService ,
     private bucket:BucketService,
     private spinner: NgxSpinnerService)
   {}
 
 
   hsnList:any;
   totalElements: number = 0;
   currentPage: number = 1;
   itemsPerPage: number = 10;
 
   getHsnByPagination(request:any)
  {
    this.spinner.show();
    this.hsnService.getHsnByPagination(request)
    .subscribe(
      {
          next:(res:any)=> {
          this.hsnList = res.data['content']
          this.totalElements = res.data['totalElements'];
          this.toast.success({detail:"Success",summary:"Data Fetch Success", position:"bottomRight",duration:3000});
          this.spinner.hide();

          console.log(this.hsnList);
        },
        error:(err:any)=>  {
          console.log(err)
          this.spinner.hide();
          this.toast.error({detail:"Error",summary:err.error.data.message, position:"bottomRight",duration:3000});

        }
      }
    );
  }

  nextPage(event: PageEvent) {
    console.log(event);
    const request:any = {};
    request['page'] = event.pageIndex.toString();
    request['size'] = event.pageSize.toString();
    this.getHsnByPagination(request);
}

 
   saveHsn()
   {
    console.log(this.form);
    this.hsnService.saveHsnCodesService(this.form).subscribe({
      next:(res:any)=> {
        this.toast.success({detail:"Success",summary:"HSN Saved Success", position:"bottomRight",duration:3000});
        this.spinner.hide();

         //get HSN Code Category List
         this.getHsnByPagination({ page: "0", size: "10" });
      },
      error:(err:any)=>  {
        //this.toast.error({detail:"Error",summary:err.error.data.message, position:"bottomRight",duration:3000});
        this.toast.error({detail:"Error",summary:"Data Not Saved", position:"bottomRight",duration:3000});

        this.spinner.hide();
        console.log(err);
      }
    }
  );
   }
 
  
 
   deleteHsnCodeByid(hsnCode:any)
   { 
     Swal.fire({
           title: 'Are you sure?',
           text: "You won't to delete this",
           icon: 'warning',
           showCancelButton: true,
           confirmButtonColor: '#3085d6',
           cancelButtonColor: '#d33',
           confirmButtonText: 'Yes, delete it!'
         }).then((result) => {
           if (result.isConfirmed) {
 
 
         //save File
       this.hsnService.deleteHsnCodeByIdService(hsnCode).subscribe({
         next:(res:any)=> {
           this.toast.success({detail:"Success",summary:"Delete Success", position:"bottomRight",duration:3000});
           
           //get HSN Code List
           this.getHsnByPagination({ page: "0", size: "10" });
           
           this.updateform = {};

           this.spinner.hide();
         },
         error:(err:any)=>  {
           this.toast.error({detail:"Error",summary:err.error.data.message, position:"bottomRight",duration:3000});
           this.spinner.hide();
           console.log(err);
             }
           }
         );
         
       }
     })
   }
 
   updateform: any = {
     hsn: null,
     defaultName: null,
     description: null,
     isActive: false,
   };
 
 
   getHsnCodeById(hsnId: any) {
     //to show update form
     this.viceVersaForm = true;
 
     this.hsnService.getHsnCodeByIdService(hsnId).subscribe({
       next:(res:any)=> {
         this.updateform = res.data;
         this.fileRendor = false;
         console.log(res);
 
         //this.getParentCategoryList();
 
         this.toast.success({detail:"Success",summary:"Data Fetch Success", position:"bottomRight",duration:3000});
         
       },
       error:(err:any)=>  {
         this.toast.error({detail:"Error",summary:err.error.data.message, position:"bottomRight",duration:3000});
         this.spinner.hide();
         console.log(err);
           }
         }
       );
     }
 
     updateHsnCode()
     {
       console.log(this.updateform);
        //save File
        this.hsnService.updateHsnCode(this.updateform).subscribe({
          next:(res:any)=> {
            this.toast.success({detail:"Success",summary:"Data Update Success", position:"bottomRight",duration:3000});
            
            //get HSN Code Category List
           this.getHsnByPagination({ page: "0", size: "10" });
            
            this.spinner.hide();
          },
          error:(err:any)=>  {
            this.toast.error({detail:"Error",summary:err.error.data.message, position:"bottomRight",duration:3000});
            this.spinner.hide();
            console.log(err);
              }
            }
          );
     }
 
 
 
}