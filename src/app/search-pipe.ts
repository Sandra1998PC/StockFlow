import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(products: any[], searchText: string): any[] {
    if (!products) {
      return [];
    }
    if (!searchText) {
      return products;
    }
    searchText = searchText.toLowerCase().trim();
    return products.filter((product: any) => product.productName?.toLowerCase().includes(searchText) || product.productCode
    ?.toLowerCase().includes(searchText) ||product.category?.toLowerCase().includes(searchText) || product.supplierName
    ?.toLowerCase().includes(searchText));

  }

}
