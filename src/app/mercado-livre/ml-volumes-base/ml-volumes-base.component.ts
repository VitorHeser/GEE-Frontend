import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { MercadolivreserviceService } from '../mercadolivreservice.service';
// import { Console } from 'console';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ScdeserviceService } from 'src/app/scde/scdeservice.service';

@Component({
  selector: 'app-ml-volumes-base',
  templateUrl: './ml-volumes-base.component.html',
  styleUrls: ['./ml-volumes-base.component.css'],
  animations: [
      trigger('rowExpansionTrigger', [
          state('void', style({
              transform: 'translateX(-10%)',
              opacity: 0
          })),
          state('active', style({
              transform: 'translateX(0)',
              opacity: 1
          })),
          transition('* <=> *', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
      ])
  ]
})
export class MLVolumesBaseComponent implements OnInit {
  Fornecedores=[]
  FornecedoresFiltrados=[]
  // ListaSubmercados=[]

  Submercados
  Produtos

  ProdutosFiltrados
  ProdutosFiltrados2
  ProdutosFiltrados2Totalizador
  ProdutosFiltrados2Submercado
  


  date1: Date
  date2: Date
  ArrayDates = []

  confirm = false
  loading = false


  constructor(private messageService: MessageService, 
    private serv: MercadolivreserviceService, 
    private serv2: ScdeserviceService
    ) { }

  ngOnInit() {
    this.serv.ContraPartes().subscribe(
      res=>{
        for(var i =0;i<res.length;i++){

          var obj = { label: res[i]['razaoSocial'], value: res[i]['razaoSocial'] }
          this.Fornecedores.push(obj)
          this.FornecedoresFiltrados.push( res[i]['razaoSocial'])
        }
      }
    )



    this.serv.Produtos().subscribe(
      res=>{
        this.Produtos= res
      }
    )
    this.serv.Submercados().subscribe(
      res=>{
        this.Submercados= res
      }
    )
    this.serv.UCS().subscribe(
      res=>{
        this.ucs= res
      }
    )
    
    this.serv.periodosall().subscribe(
      res=>{
        this.periodosAll= res
      }
    )
  }

  //==========================================================================================
  //MONTAR ARRAYS DE CONTRATO
  
  carregarDados(){
    this.confirm=true
    this.loading=false
    this.ArrayDates = []
    this.ProdutosFiltrados2 = []
    this.ProdutosFiltrados2Totalizador =[]
    this.ProdutosFiltrados2Submercado = []

    var datee1= new Date(this.date1.getTime())
    var datee2= new Date(this.date2.getTime())


    

    var fornecedores = this.FornecedoresFiltrados
    // console.log(this.Produtos)
    //Montando array de produtos
    this.ProdutosFiltrados = this.Produtos.filter(
      function (d){
        var ini = new Date(d.dataInicioFornecimento)
        var fim = new Date(d.dataFimFornecimento)
        var check = fornecedores.indexOf(d.contratos.contraparte.razaoSocial)
        return ini<=datee2 && fim>=datee1 && check>=0 ;
      }
    )
    
    
    //Montando array de dates
    this.ArrayDates.push(this.dataFormat(datee1))
    while(datee1<datee2){
      datee1.setMonth(datee1.getMonth() + 1);
      this.ArrayDates.push(this.dataFormat(datee1))
    }

    //Criando objeto de produtos novos com array de mensalização de volumes
    for(var i =0;i<this.ProdutosFiltrados.length;i++){  
      var produtoAtual = this.ProdutosFiltrados[i]
      var novoProduto ={
        id: produtoAtual['id'],
        contrato: produtoAtual['contratos']['nome'],
        submercado: produtoAtual['submercado']['submercado'],
        submercadoreg: produtoAtual['submercado']['regiao'],
        dataInicio: produtoAtual['DataInicioFornecimento'],
        dataFim: produtoAtual['DataFimFornecimento'],
        tipoDeEnergia: produtoAtual['tipoDeEnergia'],
        flexibilidade: produtoAtual['flexibilidade'],
        base: [],
        flexmais: [],
        flexmeno: [],
      }

      //Montando array de NovoProduto.meses
      for(var j=0;j<this.ArrayDates.length;j++){
        var data = this.ArrayDates[j]
        // console.log(data+ " > "+produtoAtual['DataInicioFornecimento'])
        if(
          new Date(produtoAtual['dataInicioFornecimento']).getTime() <= this.formatStrDate(data).getTime()
          && new Date(produtoAtual['dataFimFornecimento']).getTime() >= this.formatStrDate(data).getTime()
        ){
          novoProduto.base[j]=produtoAtual['volumeTotal']
          novoProduto.flexmais[j]=produtoAtual['volumeTotal']*(1+novoProduto['flexibilidade'])
          novoProduto.flexmeno[j]=produtoAtual['volumeTotal']*(1-novoProduto['flexibilidade'])
          
        }else{
          novoProduto.base[j]=0
          novoProduto.flexmais[j]=0
          novoProduto.flexmeno[j]=0
        }
      }
      this.ProdutosFiltrados2.push(novoProduto)
    }

    //Totalizador 
    var arrayTotalBase = []
    var arrayFlexMais = []
    var arrayFlexMenos = []
    for(var j=0;j<this.ArrayDates.length;j++){
      var totalBase =0
      var totalFlexMais=0
      var totalFlexMen=0

      for(var i =0;i<this.ProdutosFiltrados2.length;i++){
        totalBase += this.ProdutosFiltrados2[i].base[j]
        totalFlexMais += this.ProdutosFiltrados2[i].flexmais[j]
        totalFlexMen += this.ProdutosFiltrados2[i].flexmeno[j]
      }
      arrayTotalBase.push(totalBase)
      arrayFlexMais.push(totalFlexMais)
      arrayFlexMenos.push(totalFlexMen)
    }
    this.ProdutosFiltrados2Totalizador[0]={
      nome: "Flex + (%)",
      base: arrayFlexMais
    }
    this.ProdutosFiltrados2Totalizador[1]={
      nome: "Base",
      base: arrayTotalBase
    }
    this.ProdutosFiltrados2Totalizador[2]={
      nome: "Flex - (%)",
      base: arrayFlexMenos
    }



    //Totalizador Submercados
    for(var k =0;k<this.Submercados.length;k++){

      var submercado = this.Submercados[k]
      var ProdutosSubmercado={
        regiao: submercado['regiao'],
        submercado: submercado['submercado'],
        saida: 0,
        base: [],
        Flexmais: [],
        Flexmenos: [],
      }

      var arrayProdutos = this.ProdutosFiltrados2.filter(function(e){
        return e.submercado ==submercado.submercado 
      })

      var arraysubase = []
      var arraysubmais = []
      var arraysubmenos = []
      var saida = 0;
      for(var j=0;j<this.ArrayDates.length;j++){
        var totalBase =0
        var totalFlexMais=0
        var totalFlexMen=0

        for(var i =0;i<arrayProdutos.length;i++){
          totalBase += arrayProdutos[i].base[j]
          totalFlexMais += arrayProdutos[i].flexmais[j]
          totalFlexMen += arrayProdutos[i].flexmeno[j]
        }
        saida = saida+totalBase
        arraysubase.push(totalBase)
        arraysubmais.push(totalFlexMais)
        arraysubmenos.push(totalFlexMen)
      }
      ProdutosSubmercado['base']=arraysubase
      ProdutosSubmercado['Flexmais']=arraysubmais
      ProdutosSubmercado['Flexmenos']=arraysubmenos
      ProdutosSubmercado['saida']=saida
      // console.log(ProdutosSubmercado)
      this.ProdutosFiltrados2Submercado.push(ProdutosSubmercado)
    }
    this.carregarPrevisoes();

  }
  //===========================================================================================
  //UTILS
  showDialogMaximized(dialog){
    setTimeout(() => {
      dialog.maximize();
    }, 0);
  }

  
  DialogTotal=false
  ArrayTotal
  abrirDialogTotal(){
    this.ArrayTotal={
      base: this.ProdutosFiltrados2Totalizador[1].base,
      Flexmais: this.ProdutosFiltrados2Totalizador[2].base,
      Flexmenos:  this.ProdutosFiltrados2Totalizador[0].base,
    }
    this.DialogTotal=true
  }
  
  
  
  
  
  DialogSubmercado=false
  abrirDialogSubmercado(){
    this.DialogSubmercado=true
  }
  //===========================================================================================
  //MONTAR ARRAYS DE PREVISTO
  ucs
  periodosAll
  ArrayConsumoPrevisto
  ArrayConsumoPrevistoSubmercado
  carregarPrevisoes(){
    this.ArrayConsumoPrevisto =[]
    this.ArrayConsumoPrevistoSubmercado = []

    var datee1= new Date(this.date1.getTime())
    var datee2= new Date(this.date2.getTime())

    this.carregarRealizados(datee1, datee2)
    this.carregarPerdas(datee1,datee2)

    var UnidadesContempladas = this.ucs.filter(function(d){
      var ini = new Date(d.dataMigracao)
      return ini<=datee2;
    })

    //TOTAIS SAZONALIZADOS
    var arrTotalizadorMensal =[]
    for(var i =0;i<UnidadesContempladas.length;i++){  
      var unidadeAtual = UnidadesContempladas[i]
      var arrsazo1 = this.periodosAll.filter(function(e){return e.uc.id==unidadeAtual.id})
      
      //Montando array de NovoProduto.meses
      for(var j=0;j<this.ArrayDates.length;j++){
        var data = this.ArrayDates[j]
        var dado = 0;
        if(new Date(unidadeAtual['dataMigracao']).getTime() <= this.formatStrDate(data).getTime()){
          var mes = parseInt(data.substring(0,2))
          var arrsazo = arrsazo1.filter(function(e){return e.periodo==mes})
          var sazo = arrsazo.length>0 ? arrsazo[0]['consumo'] : 1;
          
          dado=unidadeAtual['mwm']*sazo

        }else{
          dado=0
        }
        arrTotalizadorMensal[j]=arrTotalizadorMensal[j]==undefined ? dado : arrTotalizadorMensal[j]+dado
      }
    }
    this.ArrayConsumoPrevisto = arrTotalizadorMensal


    //TOTAIS SUBMERCADOS
    for(var k =0;k<this.Submercados.length;k++){
      var submercado = this.Submercados[k]
      var arrTotalizadorMensal =[]
      var UnidadesContempladas = this.ucs.filter(function(d){
        var ini = new Date(d.dataMigracao)
        return ini<=datee2 && d.submercad.id==submercado.id;
      })


      for(var i =0;i<UnidadesContempladas.length;i++){  
        var unidadeAtual = UnidadesContempladas[i]
        var arrsazo1 = this.periodosAll.filter(function(e){return e.uc.id==unidadeAtual.id})
        
        //Montando array de NovoProduto.meses
        for(var j=0;j<this.ArrayDates.length;j++){
          var data = this.ArrayDates[j]
          var dado = 0;
          if(new Date(unidadeAtual['dataMigracao']).getTime() <= this.formatStrDate(data).getTime()){
            var mes = parseInt(data.substring(0,2))
            var arrsazo = arrsazo1.filter(function(e){return e.periodo==mes})
            var sazo = arrsazo.length>0 ? arrsazo[0]['consumo'] : 1;
            
            dado=unidadeAtual['mwm']*sazo

          }else{
            dado=0
          }
          arrTotalizadorMensal[j]=arrTotalizadorMensal[j]==undefined ? dado : arrTotalizadorMensal[j]+dado
        }
      }
      this.ArrayConsumoPrevistoSubmercado.push(arrTotalizadorMensal)
    }
  }
  
  

  //==============================================================================
  //ATUALIZAR PERDAS
  perdas=[]
  carregarPerdas(datee1, datee2){
    this.serv2.importarPerdas(this.dataFormat2(datee1),this.dataFormat2(datee2)).subscribe(
      res=>{
        this.perdas=res
      }
    );
  }
  salvarPerdas(){
      this.serv2.SalvarPerdas(this.perdas).subscribe(
        res=>{
          this.carregarDados()
          this.messageService.add({severity: 'success', summary: 'Sucesso', detail: "Porcentagem de perda Atualizada"});
        }
      );

  }

  //==============================================================================
  //CARREGAR REALIZADOS 
  ListaSubmercados = []
  ListaTotais: any = {
    ativo:[]
    
  }
  carregarRealizados(datee1, datee2){
    
    this.serv2.importarSCDEParaSubmercado(this.dataFormat2(datee1),this.dataFormat2(datee2)).subscribe(
      res=>{
        var dados =[]
        for(var i=0;i<res.length;i++){
          for(var j=0;j<res[i].ativo.length;j++){
            if(i==0){
              dados[j]= res[i].ativo[j]
              
            }else{
              dados[j]= dados[j] + res[i].ativo[j]
              
            }

          }
        }
        this.ListaTotais.ativo=dados
        this.ListaSubmercados=res
        setTimeout(() => {  
          this.loading=true 
          this.confirm=false
        }, 100);
      }
    )
  }
  
  
  
  
  
  //===========================================================================================
  formatStrDate(d):Date{
    var date = d.substring(3,7)+"-"+d.substring(0,2)+"-01T00:00:00"
    return new Date(date)
  }
  

  dataFormat(data:Date){
    var dia  = data.getDate().toString(),
        diaF = (dia.length == 1) ? '0'+dia : dia,
        mes  = (data.getMonth()+1).toString(), //+1 pois no getMonth Janeiro começa com zero.
        mesF = (mes.length == 1) ? '0'+mes : mes,
        anoF = data.getFullYear(),
        hora  = (data.getHours()).toString(), //+1 pois no getMonth Janeiro começa com zero.
        horaF = (hora.length == 1) ? '0'+hora : hora,
        min  = (data.getMinutes()).toString(), //+1 pois no getMonth Janeiro começa com zero.
        minF = (min.length == 1) ? '0'+min : min;
    return mesF+"/"+anoF;
  }
  dataFormat2(data:Date){
    var dia  = data.getDate().toString(),
        diaF = (dia.length == 1) ? '0'+dia : dia,
        mes  = (data.getMonth()+1).toString(), //+1 pois no getMonth Janeiro começa com zero.
        mesF = (mes.length == 1) ? '0'+mes : mes,
        anoF = data.getFullYear(),
        hora  = (data.getHours()).toString(), //+1 pois no getMonth Janeiro começa com zero.
        horaF = (hora.length == 1) ? '0'+hora : hora,
        min  = (data.getMinutes()).toString(), //+1 pois no getMonth Janeiro começa com zero.
        minF = (min.length == 1) ? '0'+min : min;
    return anoF+"-"+mesF+"-"+diaF;
  }
}