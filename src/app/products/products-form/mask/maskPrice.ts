import { Directive, HostListener } from "@angular/core";
import { NgControl } from "@angular/forms";

@Directive({
  selector: "[formControlName][appCurrencyMask]"
})

export class MaskPrice {
  constructor(public ngControl: NgControl) {}

    @HostListener('ngModelChange', ['$event'])
    onModelChange(event: string) {
      this.formatValue(event);
    }

    @HostListener('keydown.backspace', ['$event'])
    onBackspace(event: KeyboardEvent) {
      const value = (event.target as HTMLInputElement).value;
      this.formatValue(value, true);
    }

    private formatValue(value: string, isBackspace = false): void {
      let cleanValue = value.replace(/\D/g, '');

      if (cleanValue.length > 3) {
        const integerPart = cleanValue.slice(0, -2);
        const decimalPart = cleanValue.slice(-2);
        cleanValue = this.addThousandSeparators(integerPart) + ',' + decimalPart;
      } else {
        cleanValue = cleanValue.replace(/^(\d{0,2})/, '$1');
      }

      this.ngControl.valueAccessor?.writeValue(cleanValue);
    }

    private addThousandSeparators(value: string): string {
      return value.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }

    toNumber(value: string): number {
      if (!value) return 0;
      const numericValue = value.replace(/\./g, '').replace(',', '.');
      return parseFloat(numericValue);
    }
}
