import { Component, ViewChild, ElementRef, Renderer2, NgZone } from '@angular/core';

declare const Zone: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('ref', { static: true }) ref: ElementRef;
  title = 'latest-ng-ivy-boilerplate';

  constructor(private renderer: Renderer2, private ngZone: NgZone) {}

  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
      this.renderer.listen(this.ref.nativeElement, 'click', this.handlerFromOutsideNgZone);
      // The issue is that when we run outside of Angular Zone, we are no longer able to 
      // track listeners and the next line returns an empty list.
      const listeners = this.ref.nativeElement.eventListeners('click');
      console.log(listeners, Zone.current.name);
      debugger;
    });

    this.renderer.listen(this.ref.nativeElement, 'click', this.handlerFromNgZone);
    const listeners = this.ref.nativeElement.eventListeners('click');
    // Here we correctly retrieve all of the listeners.
    console.log(listeners, Zone.current.name);
    debugger;
}

  handlerFromNgZone(evt: MouseEvent) {
    debugger;
    console.log('>> clicked from NgZone', evt);
  }

  handlerFromOutsideNgZone(evt: MouseEvent) {
    debugger;
    console.log('>> clicked from outside NgZone', evt);
  }
}
