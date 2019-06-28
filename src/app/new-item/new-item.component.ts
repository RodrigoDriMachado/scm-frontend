import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { AvatarDialogComponent } from "../avatar-dialog/avatar-dialog.component";
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.scss']
})
export class NewItemComponent implements OnInit {
  exampleForm: FormGroup;
  avatarLink: string = "https://s3.amazonaws.com/uifaces/faces/twitter/adellecharles/128.jpg";

  validation_messages = {
   
   'iditem': [
     { type: 'required', message: 'Idfornecedor is required.' }
   ],
   'nomeitem': [
     { type: 'required', message: 'Nomefornecedor is required.' },
   ],
   'desc': [
    { type: 'required', message: 'Tipofornecedor is required.' },
  ],
  
};


  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private router: Router,
    public firebaseService: FirebaseService
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.exampleForm = this.fb.group({
      
      iditem: ['', Validators.required ],
      nomeitem: ['', Validators.required ],
      desc: ['', Validators.required ]
      
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(AvatarDialogComponent, {
      height: '400px',
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.avatarLink = result.link;
      }
    });
  }

  resetFields(){
    this.avatarLink = "https://s3.amazonaws.com/uifaces/faces/twitter/adellecharles/128.jpg";
    this.exampleForm = this.fb.group({
      
      iditem: new FormControl('', Validators.required),
      nomeitem: new FormControl('', Validators.required),
      desc: new FormControl('', Validators.required)
    });
  }

  onSubmit(value){
    this.firebaseService.createItem(value)
    .then(
      res => {
        this.resetFields();
        this.router.navigate(['/home']);
      }
    )
  }

}