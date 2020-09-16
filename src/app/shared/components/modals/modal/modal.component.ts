import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit, AfterViewInit {
  modalJQueryElement: JQuery<HTMLElement>;
  @Input() title: string;
  constructor(private router: Router) {}

  ngOnInit(): void {}
  ngAfterViewInit() {
    this.modalJQueryElement = $('#loginModal');
    this.modalJQueryElement.on('shown.bs.modal', () => {
      // $('#inputEmail').trigger('focus');
    });
    this.modalJQueryElement.on('hidden.bs.modal', () => {
      this.router.navigate(['..']);
    });
    this.modalJQueryElement.find('.modal-title').text(this.title);
    this.modalJQueryElement.modal('show');
  }
  onClose() {
    this.modalJQueryElement.modal('hide');
  }
}
