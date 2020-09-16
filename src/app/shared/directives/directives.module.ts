import { NgModule } from '@angular/core';
import { AutoFocusDirective } from './auto-focus/auto-focus.directive';

@NgModule({
  declarations: [AutoFocusDirective],
  exports: [AutoFocusDirective],
})
export class DirectivesModule {}
