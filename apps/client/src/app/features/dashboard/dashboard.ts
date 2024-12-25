import { ChangeDetectionStrategy, Component, VERSION } from '@angular/core';

@Component({
  templateUrl: './dashboard.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardPage {
  protected ngVersion = VERSION;
}
