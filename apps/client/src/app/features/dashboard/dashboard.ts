import { ChangeDetectionStrategy, Component, VERSION } from '@angular/core';

@Component({
  selector: 'crm-dashboard',
  templateUrl: './dashboard.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardPage {
  protected ngVersion = VERSION;
}
