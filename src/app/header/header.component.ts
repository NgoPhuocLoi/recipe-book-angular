import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  @Output() selectedPage = new EventEmitter<string>();

  onSelectPage(page: string) {
    this.selectedPage.emit(page);
  }
}
