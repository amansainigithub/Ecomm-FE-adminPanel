import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';
import { ChildCategoryService } from '../../../../../_services/categories/childCategory/child-category.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute } from '@angular/router';
import { BabyCategoryService } from '../../../../../_services/categories/babyCategory/baby-category.service';

@Component({
  selector: 'app-update-baby-file',
  templateUrl: './update-baby-file.component.html',
  styleUrl: './update-baby-file.component.css'
})
export class UpdateBabyFileComponent {

  imageSrc: string = '';
  file:any;
  id:any;
  category:any;

  constructor( 
  @Inject(MAT_DIALOG_DATA) public data: any ,
  private toast:NgToastService ,
  private babyCategoryService:BabyCategoryService,
  private spinner: NgxSpinnerService,
  private route:ActivatedRoute,
  private dialogRef: MatDialogRef<UpdateBabyFileComponent>) { }

    ngOnInit(): void {
     }

     onChange(event:any){
      const reader = new FileReader();
      if(event.target.files && event.target.files.length) {
        const [file] = event.target.files;
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.imageSrc = reader.result as string;
        };
        this.file=event.target.files[0];
      }
    }


    //UPDATE FILE CATEGORY
    updateCategoryFile(){
      if(this.file == null)
      {
       this.toast.error({detail:"Error",summary:"Error : File is Empty", position:"bottomRight",duration:3000});
      }
      else{
        this.babyCategoryService.updateBabyFile(this.file,this.data.babyCategoryId).subscribe({
          next:(res:any)=>{
            console.log(res);
            this.toast.success({detail:"Success",summary:"File Update success", position:"bottomRight",duration:3000});
            this.dialogRef.close();

          },error:(err:any)=>{
            console.log(err.roor.message);
          }
        })
      }
    }


}