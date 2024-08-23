import { Component, inject, NgZone, OnInit, signal } from '@angular/core';

import { InfoMessageComponent } from '../info-message/info-message.component';

@Component({
  selector: 'app-counter',
  standalone: true,
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css',
  imports: [InfoMessageComponent],
})
export class CounterComponent implements OnInit {
  count = signal(0);
  private zone = inject(NgZone);
  get debugOutput() {
    console.log('[Counter] "debugOutput" binding re-evaluated.');
    return 'Counter Component Debug Output';
  }

  ngOnInit() {
    setInterval(() => {
      this.count.set(0);
    }, 4000);

    this.zone.runOutsideAngular(() => {
      setInterval(() => {
        console.log('Timer Expired!');
      }, 5000);
    });
  }

  onDecrement() {
    this.count.update((prevCount) => prevCount - 1);
  }

  onIncrement() {
    this.count.update((prevCount) => prevCount + 1);
  }
}
