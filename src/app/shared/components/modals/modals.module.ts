import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DirectivesModule } from '../../directives/directives.module';
import { LogInComponent } from './login/login.component';
import { ProductComponent } from './product/product.component';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  declarations: [LogInComponent, ProductComponent, ModalComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    DirectivesModule,
  ],
  exports: [ReactiveFormsModule, LogInComponent, ProductComponent],
})
export class ModalsModule {}
