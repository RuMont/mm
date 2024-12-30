import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  templateUrl: './index.html',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SessionsIndexPage {

}
