import { AfterViewInit, Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appAutoFocus]',
})
export class AutoFocusDirective implements AfterViewInit {
  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit(): void {
    console.log(this.elementRef.nativeElement);
    setTimeout(() => {
      this.elementRef.nativeElement.focus();
      console.log('...autoFocusing...');
    }, 1000);
  }
}
