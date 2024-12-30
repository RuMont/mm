import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  linkedSignal,
  output,
  signal,
} from '@angular/core';
import { ChevronDown, ChevronLeft, ChevronRight, LucideAngularModule, SlidersHorizontal } from 'lucide-angular';
import { Columns } from './types';
import { GenericFilterResponse } from '@mmtypes/GenericFilterResponse';
import { CdkListbox, CdkOption } from '@angular/cdk/listbox';
import { GenericFilter } from '@mmtypes/GenericFilter';

@Component({
  selector: 'mm-filter-list',
  templateUrl: './filter-list.html',
  imports: [LucideAngularModule, CdkListbox, CdkOption],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterList<T extends Record<string, unknown>[]> {
  public readonly search = signal('');
  public readonly filter = input<GenericFilterResponse<T>>();

  public readonly columns = input<Columns<T>>();

  protected readonly totalElements = computed(() => this.filter()?.totalElements ?? 10);
  protected readonly data = computed(() => this.filter()?.data);
  protected readonly page = linkedSignal(() => this.filter()?.page ?? 1);
  protected readonly itemsPerPage = linkedSignal(() => this.filter()?.itemsPerPage ?? 10);

  protected readonly iterableData = computed(() => {
    const data = this.data();
    if (!data) return [];
    const keys = (this.columns() ?? []).map((c) => c.key);
    return data.map((obj) =>
      Object.values(Object.fromEntries(keys.filter((key) => key in obj).map((key) => [key, obj[key]]))),
    );
  });

  protected readonly maxPage = computed(() => Math.ceil(this.totalElements() / this.itemsPerPage()));

  public readonly rowClicked = output<T>();
  public readonly filterChanged = output<GenericFilter<T[number]>>();

  protected readonly ChevronDown = ChevronDown;
  protected readonly ChevronLeft = ChevronLeft;
  protected readonly ChevronRight = ChevronRight;
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
    this.emitConfigChange();
  }

  reset() {
    this.search.set('');
    this.page.set(1);
    this.emitConfigChange();
  }

  assertIsArray(value: unknown): value is Array<T> {
    if (!Array.isArray(value)) {
      return false;
    }
    return true;
  }

  goToPage(page: number) {
    if (page < 0) page = 0;
    if (page > this.maxPage()) {
      page = this.maxPage();
    }
    this.page.set(+page);
    this.emitConfigChange();
  }

  emitConfigChange() {
    this.filterChanged.emit({
      itemsPerPage: this.itemsPerPage(),
      page: this.page(),
      searchTerm: this.search(),
    });
  }
}
