import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  linkedSignal,
  model,
  output,
} from '@angular/core';
import {
  ChevronDown,
  LucideAngularModule,
  SlidersHorizontal,
} from 'lucide-angular';
import { ListConfig } from './types';

@Component({
  selector: 'mm-filter-list',
  templateUrl: './filter-list.html',
  imports: [LucideAngularModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterList<T extends Record<string, any>> {
  public readonly search = model('');
  public readonly config = input<ListConfig<T>>();

  protected readonly columns = computed(() => this.config()?.columns ?? []);
  protected readonly totalElements = computed(
    () => this.config()?.totalElements ?? 10
  );
  protected readonly page = linkedSignal(() => this.config()?.page ?? 1);
  protected readonly itemsPerPage = linkedSignal(
    () => this.config()?.itemsPerPage ?? 10
  );

  public readonly pageChanged = output<number>();
  public readonly itemsPerPageChanged = output<number>();

  protected readonly ChevronDown = ChevronDown;
  protected readonly SlidersHorizontal = SlidersHorizontal;

  public setSearch(param: string): void;
  public setSearch(param: Event): void;
  public setSearch(param: string | Event) {
    let value;
    if (typeof param !== 'string') {
      value = (param.target as HTMLInputElement).value;
    } else {
      value = param;
    }
    this.search.set(value);
  }

  reset() {
    this.search.set('');
    this.page.set(1);
  }
}
