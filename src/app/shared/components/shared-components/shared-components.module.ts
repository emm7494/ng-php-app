import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogInModalComponent } from './modals/login-modal/login-modal.component';
import { ProductModalComponent } from './modals/product-modal/product-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [LogInModalComponent, ProductModalComponent],
  imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule],
  exports: [
    ReactiveFormsModule,
    LogInModalComponent,
    ProductModalComponent,
  ],
})
export class SharedComponentsModule {}
