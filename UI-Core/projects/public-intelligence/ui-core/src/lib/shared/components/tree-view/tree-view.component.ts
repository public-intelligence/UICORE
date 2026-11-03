import { Component, Input, Output, EventEmitter, ElementRef, QueryList, ViewChildren, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface TreeNode {
  id: any;
  label: string;
  children?: TreeNode[];
  data?: any;
  expanded?: boolean;
}

@Component({
  selector: 'app-tree-view',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ul role="tree" [attr.aria-label]="ariaLabel" class="space-y-1 outline-none">
      <ng-container *ngTemplateOutlet="nodeTemplate; context: { $implicit: nodes, level: 0 }"></ng-container>
    </ul>

    <ng-template #nodeTemplate let-nodes let-level="level">
      <li *ngFor="let node of nodes" role="none">
        
        <div role="treeitem"
             [attr.aria-expanded]="node.children && node.children.length > 0 ? (node.expanded ?? false) : null"
             [attr.aria-selected]="selectedId === node.id"
             [attr.aria-level]="level + 1"
             [tabindex]="selectedId === node.id ? 0 : -1"
             class="flex items-center group px-2 py-1 rounded cursor-pointer outline-none focus:ring-2 focus:ring-primary-500 focus:bg-blue-50 transition-colors"
             [class.bg-blue-100]="selectedId === node.id"
             [class.text-blue-900]="selectedId === node.id"
             [class.hover:bg-gray-50]="selectedId !== node.id"
             [style.padding-left.rem]="level * 1.5"
             (click)="select(node)"
             (keydown)="handleKey($event, node)"
             #treeItem>
             
          <!-- Expand/Collapse Toggle -->
          <button *ngIf="node.children && node.children.length > 0" 
                  tabindex="-1"
                  (click)="toggleExpand($event, node)"
                  class="mr-1 text-gray-400 hover:text-gray-600 focus:outline-none w-4 h-4 flex items-center justify-center">
             <span class="text-xs" [class.rotate-90]="node.expanded">▶</span> 
             <!-- Simple arrow, can use SVG -->
          </button>
          
          <!-- Spacer for leaves -->
          <span *ngIf="!node.children || node.children.length === 0" class="w-4 mr-1"></span>

          <!-- Label -->
          <span class="text-sm font-medium truncate select-none">
             {{ node.label }}
          </span>
          
          <!-- Metadata (Heading) -->
          <span *ngIf="node.data?.heading" class="text-xs text-gray-400 ml-2 truncate flex-1 block max-w-xs">
             {{ node.data.heading }}
          </span>

        </div>

        <!-- Children Recursion -->
        <ul role="group" *ngIf="node.children && node.children.length > 0 && node.expanded">
           <ng-container *ngTemplateOutlet="nodeTemplate; context: { $implicit: node.children, level: level + 1 }"></ng-container>
        </ul>

      </li>
    </ng-template>
  `,
  styles: [`
    .rotate-90 { display: inline-block; transform: rotate(90deg); transition: transform 0.2s; }
  `]
})
export class TreeViewComponent {
  @Input() nodes: TreeNode[] = [];
  @Input() selectedId: any;
  @Input() ariaLabel: string = 'Estructura Normativa';
  @Output() nodeSelected = new EventEmitter<TreeNode>();

  @ViewChildren('treeItem') items!: QueryList<ElementRef>;

  select(node: TreeNode) {
    this.selectedId = node.id;
    this.nodeSelected.emit(node);
  }

  toggleExpand(event: Event, node: TreeNode) {
    event.stopPropagation();
    node.expanded = !node.expanded;
  }

  handleKey(event: KeyboardEvent, node: TreeNode) {
    // Roving tabindex and keyboard nav logic implementation
    // Simplified for this step:
    switch (event.key) {
      case 'Enter':
      case ' ':
        this.select(node);
        event.preventDefault();
        break;
      case 'ArrowRight':
        if (node.children && node.children.length > 0) {
          if (!node.expanded) {
            node.expanded = true;
          } else {
            // Focus first child
          }
        }
        event.preventDefault();
        break;
      case 'ArrowLeft':
        if (node.children && node.children.length > 0 && node.expanded) {
          node.expanded = false;
        } else {
          // Focus parent
        }
        event.preventDefault();
        break;
      case 'ArrowDown':
        // Move focus next
        event.preventDefault();
        break;
      case 'ArrowUp':
        // Move focus prev
        event.preventDefault();
        break;
    }
  }
}
