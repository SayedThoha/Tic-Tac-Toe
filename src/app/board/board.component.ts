import { Component } from '@angular/core';
import { SquareComponent } from '../square/square.component';
import { GameService } from '../game.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [SquareComponent,CommonModule],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css'
})
export class BoardComponent {

  constructor(public gameService:GameService){}
}
