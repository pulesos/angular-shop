import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.scss']
})
export class DialogBoxComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    if (this.data) this.isNew = false;
  }


  myForm: FormGroup = new FormGroup({
    id: new FormControl(this.data?.id ?? null),
    title: new FormControl(this.data?.title ?? '', [Validators.required]),
    price: new FormControl(this.data?.price ?? '', [Validators.required, Validators.pattern("^[0-9]*$")]),
    year: new FormControl(this.data?.year ?? '', [Validators.required, Validators.pattern("^[0-9]*$")]),
    chip: new FormControl(this.data?.chip ?? '', [Validators.required, Validators.pattern("^[0-9]*$")]),
    ssd: new FormControl(this.data?.ssd ?? '', [Validators.required, Validators.pattern("^[0-9]*$")]),
    memory: new FormControl(this.data?.memory ?? '', [Validators.required, Validators.pattern("^[0-9]*$")]),
    display: new FormControl(this.data?.display ?? '', [Validators.required]),

  })

  isNew: boolean = true

  onNoClick(): void {
    this.dialogRef.close(null);
  }

  onSubmit() {

    this.data = {
      id: this.myForm.value.id,
      title: this.myForm.value.title,
      price: this.myForm.value.price,
      year: this.myForm.value.year,
      image: "https://avatars.mds.yandex.net/get-mpic/3927509/img_id2755768017256529923.jpeg/orig",
      configure: {
        chip: this.myForm.value.chip,
        ssd: this.myForm.value.ssd,
        memory: this.myForm.value.memory,
        display: this.myForm.value.display,
      }
    }

    // console.log(this.myForm)
    
    this.dialogRef.close(this.data);

  }

  ngOnInit(): void {
  }

}
