import { Component, ElementRef, ViewChild } from '@angular/core';
import { TokenStorageService } from '../../../_services/token-storage.service';
import { NgToastService } from 'ng-angular-popup';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClient } from '@angular/common/http';
import { ProductVerifierServiceService } from '../../../_services/product-service/productVerifierService/product-verifier-service.service';
import { PageEvent } from '@angular/material/paginator';
// Import Bootstrap's Modal class
declare var bootstrap: any;

@Component({
  selector: 'app-product-varient-approved',
  templateUrl: './product-varient-approved.component.html',
  styleUrl: './product-varient-approved.component.css'
})
export class ProductVarientApprovedComponent {
@ViewChild('proccedBox') proceedBox!: ElementRef;

        constructor(private tokenStorage: TokenStorageService, 
                    private toast:NgToastService ,
                    private activateRoute: ActivatedRoute,
                    private router: Router,
                    private spinner: NgxSpinnerService,
                    private http: HttpClient,
                    private productVerifierService:ProductVerifierServiceService) {    
                    }

          
      ngOnInit(): void 
      {
        this.getProductVariantApprovedList({ page: "0", size: "10" }) ;
      }

      variantApproved:any[]=[];
      filteredItems:any;
      totalElements:any;
      //SearchList
      searchText: string = '';

      getProductVariantApprovedList(request:any)
      { 
          //Show Loading
          this.spinner.show();
          this.productVerifierService.productVariantApprovedList(request).subscribe({
          next:(res:any)=> {

            console.log("==================================LLLL");
            console.log(res);
            
            
          this.variantApproved = res.data['content'];
          this.filteredItems  = this.variantApproved;
          this.totalElements = res.data['totalElements'];
          this.spinner.hide();
          },
          error:(err:any)=>  {
          console.log(err)
          this.spinner.hide();
          this.toast.error({detail:"Error Something went Wrong", position:"bottomRight",duration:3000});
          }
          })
      }

      nextPagePending(event: PageEvent) {
      console.log(event);
      const request:any = {};
      request['page'] = event.pageIndex.toString();
      request['size'] = event.pageSize.toString();
      this.getProductVariantApprovedList(request);
      }


      // Logic to open the modal
      productId:any
      proceedBoxOpen(productId:any): void {
        this.productId = productId;

        const modal = new bootstrap .Modal(this.proceedBox.nativeElement);
        modal.show(); // Open the modal
      }


      variantEditModeProceed(){
        if( this.productId !== null ||  this.productId !== ""){
          this.router.navigate(['admin/dashboard/product-checking', this.productId]); 
        }else{
          alert("please Enter a Valid Varinat ID :: " +  this.productId);
        }
      }


        //Search Starting
        onSearch() {
          const searchQuery = this.searchText.trim().toLowerCase();
          if (searchQuery) {
          this.filteredItems = this.variantApproved.filter(item => 
          String(item.productCode).toLowerCase().includes(searchQuery)
          );
          } else {
          this.filteredItems = this.variantApproved;
          }
          }
          //Search Ending
}
