import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RecaptchaModule } from 'ng-recaptcha';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RecaptchaModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'LoginApp';
}
