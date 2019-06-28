import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-new-nota-fiscal',
  templateUrl: './new-nota-fiscal.component.html',
  styleUrls: ['./new-nota-fiscal.component.scss']
})
export class NewNotaFiscalComponent implements OnInit {

  exampleForm: FormGroup;

  validation_messages = {
    'IDNota': [
      { type: 'required', message: 'IDNota is required.' }
    ],
    'IDItem': [
      { type: 'required', message: 'IDItem is required.' }
    ],
    'IDPedido': [
      { type: 'required', message: 'IDPedido is required.' }
    ],
    'NomeItem': [
      { type: 'required', message: 'IDPedido is required.' },
    ],
    'Tiponota': [
      { type: 'required', message: 'Tipo da nota is required.' },
    ],
    'qntitem': [
      { type: 'required', message: 'Quantidade de itens is required.' },
    ],
    'valorunit': [
      { type: 'required', message: 'Valor unitário is required.' },
    ],
    'fornecedor_in': [
      { type: 'required', message: 'Fornecedor de origem is required.' },
    ],
    'fornecedor_out': [
      { type: 'required', message: 'Fornecedor de destino is required.' },
    ]
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
      IDNota: ['', Validators.required ],
      IDItem: ['', Validators.required ],
      IDPedido: ['', Validators.required ],
      NomeItem: ['', Validators.required ],
      Tiponota: ['', Validators.required ],
      qntitem: ['', Validators.required ],
      valorunit: ['', Validators.required ],
      fornecedor_in: ['', Validators.required ],
      fornecedor_out: ['', Validators.required ]
    });
  }

  resetFields(){
    this.exampleForm = this.fb.group({
      IDNota: new FormControl('', Validators.required),
      IDItem: new FormControl('', Validators.required),
      IDPedido: new FormControl('', Validators.required),
      NomeItem: new FormControl('', Validators.required),
      Tiponota: new FormControl('', Validators.required),
      qntitem: new FormControl('', Validators.required),
      valorunit: new FormControl('', Validators.required),
      fornecedor_in: new FormControl('', Validators.required),
      fornecedor_out: new FormControl('', Validators.required),
    });
  }

  onSubmit(value){
    this.firebaseService.createNotaFiscal(value)
    .then(
      res => {
        this.resetFields();
        this.router.navigate(['/home']);
      }
    )
  }

}
