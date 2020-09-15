import { NgModule } from '@angular/core';
import { AutoFocusDirective } from './autofocus/auto-focus.directive';

@NgModule({
  declarations: [AutoFocusDirective],
  exports: [AutoFocusDirective],
})
export class DirectivesModule {}
