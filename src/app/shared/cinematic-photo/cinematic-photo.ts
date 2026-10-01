import {
  ChangeDetectionStrategy,
  Component,
  input
} from '@angular/core';

import { Memory } from '../../core/models/memory.model';

@Component({
  selector: 'app-cinematic-photo',
  standalone: true,
  templateUrl: './cinematic-photo.html',
  styleUrl: './cinematic-photo.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CinematicPhotoComponent {

  memory = input.required<Memory>();

}