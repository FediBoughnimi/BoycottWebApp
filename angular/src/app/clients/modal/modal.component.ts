import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  @Input() show: boolean = false;
  @Input() brand: any;
  @Output() close = new EventEmitter<void>(); // Ajoutez cette ligne

  closeModal() {
    this.show = false;
    this.close.emit(); // Notifiez le parent que le modal est fermé
  }
}
