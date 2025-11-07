import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Card {
  titulo: string;
  descricao: string;
  link: string;
}

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class InicioComponent implements OnInit {

  cards: Card[] = [];

  ngOnInit(): void {
    this.cards = [
      { titulo: 'Clientes', descricao: 'Gerencie seus clientes', link: '/cliente' },
      { titulo: 'Empresas', descricao: 'Gerencie empresas parceiras', link: '/empresa' },
      { titulo: 'Produtos', descricao: 'Cadastre e consulte produtos', link: '/produto' },
      { titulo: 'Orçamentos', descricao: 'Visualize e crie orçamentos', link: '/orcamento' }
    ];
  }

}
