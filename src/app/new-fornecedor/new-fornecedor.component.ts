import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { AvatarDialogComponent } from "../avatar-dialog/avatar-dialog.component";
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { FornecedorFields } from 'src/app/model/fornecedor';
import { PedidoService} from '../services/Contracts/General/pedido-registry.service'
import { from } from 'rxjs';
import { Injectable } from '@angular/core';


@Component({
  selector: 'app-new-fornecedor',
  templateUrl: './new-fornecedor.component.html',
  styleUrls: ['./new-fornecedor.component.scss']
})

@Injectable()
export class NewFornecedorComponent implements OnInit {

  exampleForm: FormGroup;
  avatarLink: string = "https://s3.amazonaws.com/uifaces/faces/twitter/adellecharles/128.jpg";

  validation_messages = {
   
   'idfornecedor': [
     { type: 'required', message: 'Idfornecedor is required.' }
   ],
   'nomefornecedor': [
     { type: 'required', message: 'Nomefornecedor is required.' },
   ],
   'tipofornecedor': [
    { type: 'required', message: 'Tipofornecedor is required.' },
  ],
  'email': [
    { type: 'required', message: 'Email is required.' },
  ]
};


  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private router: Router,
    public firebaseService: FirebaseService,
    private PedidoService: PedidoService,
    private idFornecedor: number,
    private nome: string,
    private email: string,
    private tipoFornecedor: string,
    
    private FornecedorFiled: FornecedorFields,
    
  ) { }

  ngOnInit() {
    this.createForm();
    //this.newPedido();
    
  }

  private newPedido(value) {
    // Pega usuário logado no firebase auth que está no Observable
   // this.afAuth.getLogingUser()
     // .then((user: firebaseUser) => {
        // Procura o usuário na blockchain (aqui tem que ver o caso de vocês - Fornecedor)
        // Como a infomação é uma transação de adição de registro e o blockchain não tem estrutura de mapeamento é preciso
        // primeiro validar se existe o fornecedor na base
        // OBS: LookUpId não tem custo porque não altera nenhum bloco, para o ethereum só existe custo quando dados são alterados
        //this.pedidoService.lookUpId(user.uid)
         // .then(response => {
  
            // Desserializa a resposta
         //   const eth_user = this.serialize.deserialize(response);
  
            // Vai vir um hash "vazio" se não houver ou seja 0x0
            //if (eth_user.length === 1 && eth_user[0] === '0') {
         //     this.loader = true; // Carrega loader na tela
              // Realiza call do pedido (transaction tem custo) com os campos do formulário (igual classe activate-general.component.ts)
              // Passar formulário com qualquer nome (no exemplo this.fields)
              this.idFornecedor = value.idFornecedor;
              this.nome = value.nome;
              this.email = value.email;
              this.tipoFornecedor = value.tipoFornecedor;
              this.PedidoService.createFornecedor(this.idFornecedor, this.nome, this.email, this.tipoFornecedor)
                .then((resposta) => {
                  // Deu certo oba!
                  console.log(resposta)
                  //this.loader = false;
                  this.router.navigateByUrl(``)
                })
                .catch(() => {
                  // Deu errado :(
                })
  /*
          });
      })*/
      .catch(() => {
        this.router.navigate(['']);
      });
   } 
   

  createForm() {
    this.exampleForm = this.fb.group({
      
      idfornecedor: ['', Validators.required ],
      nomefornecedor: ['', Validators.required ],
      tipofornecedor: ['', Validators.required ],
      email: ['', Validators.required ]
      
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
      
      idfornecedor: new FormControl('', Validators.required),
      nomefornecedor: new FormControl('', Validators.required),
      tipofornecedor: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
    });
  }

  onSubmit(value){
    this.firebaseService.createFornecedor(value)
    .then(
      res => {
        this.resetFields();
        this.router.navigate(['/home']);
      }
    )
    this.newPedido(value);
  }

}
