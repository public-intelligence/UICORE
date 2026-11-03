import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-templates-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './templates-list.component.html',
  styleUrls: ['./templates-list.component.scss'],
})
export class TemplatesListComponent {}
