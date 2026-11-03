import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { DetailPageShellComponent, StatusPillComponent } from '@public-intelligence/ui-core';

@Component({
  selector: 'app-template-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet, DetailPageShellComponent, StatusPillComponent],
  templateUrl: './template-detail.component.html',
  styleUrls: ['./template-detail.component.scss'],
})
export class TemplateDetailComponent {}
