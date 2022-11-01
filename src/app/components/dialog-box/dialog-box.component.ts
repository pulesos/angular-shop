import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.scss']
})
export class DialogBoxComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    private ProductsService: ProductsService,
    @Inject(MAT_DIALOG_DATA) public product: any,
  ) {
    if (this.product) this.isNew = false;
  }


  myForm: FormGroup = new FormGroup({
    id: new FormControl(this.product?.id),
    title: new FormControl(this.product?.title ?? '', [Validators.required]),
    price: new FormControl(this.product?.price ?? '', [Validators.required, Validators.pattern("^[0-9]*$")]),
    year: new FormControl(this.product?.year ?? '', [Validators.required, Validators.pattern("^[0-9]*$")]),
    chip: new FormControl(this.product?.chip ?? '', [Validators.required, Validators.pattern("^[0-9]*$")]),
    ssd: new FormControl(this.product?.ssd ?? '', [Validators.required, Validators.pattern("^[0-9]*$")]),
    memory: new FormControl(this.product?.memory ?? '', [Validators.required, Validators.pattern("^[0-9]*$")]),
    display: new FormControl(this.product?.display ?? '', [Validators.required]),

  })

  isNew: boolean = true

  onNoClick(): void {
    this.dialogRef.close(null);
  }

  async onSubmit() {

    // this.data = {
    //   id: this.myForm.value.id,
    //   title: this.myForm.value.title,
    //   price: this.myForm.value.price,
    //   year: this.myForm.value.year,
    //   image: "https://avatars.mds.yandex.net/get-mpic/3927509/img_id2755768017256529923.jpeg/orig",
    //   configure: {
    //     chip: this.myForm.value.chip,
    //     ssd: this.myForm.value.ssd,
    //     memory: this.myForm.value.memory,
    //     display: this.myForm.value.display,
    //   }
    // }

    
    const response = await this.ProductsService.postProduct(this.myForm.value)
    
    

    // this.updateData()
    // console.log(response)
    
    this.dialogRef.close(this.product);

  }

  updateData() {
    const productData = this.myForm.value;
    this.ProductsService.updateProduct(productData).subscribe()
  }

  ngOnInit(): void {
  }

}
