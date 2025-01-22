import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrl: './accordion.component.css'
})
export class AccordionComponent {
  @Input() hasJustViewed: boolean;
  @Input() title: string;
  @Input() isHidden = false;

}
