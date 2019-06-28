import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-new-pedido',
  templateUrl: './new-pedido.component.html',
  styleUrls: ['./new-pedido.component.scss']
})
export class NewPedidoComponent implements OnInit {

  exampleForm: FormGroup;

  validation_messages = {
   

'idpedido': [
  { type: 'required', message: 'Date is required.' } 
],
'item': [
  { type: 'required', message: 'Date is required.' } 
],
'desc': [
  { type: 'required', message: 'Date is required.' }	 
],
'tipopedido': [
  { type: 'required', message: 'Date is required.' }
],
'nomefornecedor': [
  { type: 'required', message: 'Date is required.' }	 
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
      
      idpedido:          ['', Validators.required],
      item:              ['', Validators.required],
      desc:              ['', Validators.required],
      tipopedido:        ['', Validators.required],
      nomefornecedor:    ['', Validators.required]
    });
  }

  resetFields(){
    this.exampleForm = this.fb.group({
     
      IDPedido: new FormControl('', Validators.required),
      item: new FormControl('', Validators.required),
      desc: new FormControl('', Validators.required),
      tipopedido: new FormControl('', Validators.required),
      nomefornecedor: new FormControl('', Validators.required),
    });
  }

  onSubmit(value){
    this.firebaseService.createPedido(value)
    .then(
      res => {
        this.resetFields();
        this.router.navigate(['/home']);
      }
    )
  }

}
