import { Component, signal } from '@angular/core';
import { inject } from '@angular/core';
import { Service } from '../service';
import { FormsModule } from '@angular/forms'
import { SearchPipe } from '../search-pipe'
declare var bootstrap: any;

interface Product {
  id: number;
  productName: string;
  productCode: string;
  category: string;
  price: number;
  quantity: number;
  supplierName: string;
  stockStatus: string;
  addedDate: string;
}

@Component({
  selector: 'app-home',
  imports: [FormsModule, SearchPipe],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  productName: string = '';
  productCode: string = '';
  category: string = '';
  price: number | null = null;
  quantity: number | null = null;
  supplierName: string = '';
  stockStatus: string = '';
  addedDate: string = '';

  api = inject(Service)
  productData: any = signal([])
  isEdit: boolean = false
  editResponse: any = []
  editId: any

  isData = signal(Boolean)

  searchText: string = '';

  ngOnInit() {
    this.getAllProduct()
  }

  openAddProduct() {
    this.isEdit = false
  }

  clear() {
    const modalElement = document.getElementById('exampleModal');

    if (modalElement) {
      const modal = bootstrap.Modal.getOrCreateInstance(modalElement);
      modal.hide();
    }

    this.productName = ""
    this.productCode = ""
    this.category = ""
    this.price = null
    this.quantity = null
    this.supplierName = ""
    this.stockStatus = ""
    this.addedDate = ""
    this.editId = ""
  }

  getAllProduct() {
    this.api.getAllProductAPI().subscribe({
      next: (res: any) => {
        this.productData.set(res)
        console.log(res);
      },
      error: (reason: any) => {
        console.log(reason);
      }
    })
  }

  addProduct() {
    if (!this.productName || !this.productCode || !this.category || this.price === null || this.price === undefined ||
      this.quantity === null || this.quantity === undefined || !this.supplierName || !this.stockStatus || !this.addedDate) {
      alert(`Fill all the Fields!!!`)
    } else {
      this.api.addProductAPI({ productName: this.productName, productCode: this.productCode, category: this.category, price: this.price, quantity: this.quantity, supplierName: this.supplierName, stockStatus: this.stockStatus, addedDate: this.addedDate }).subscribe({
        next: (res: any) => {
          console.log(res);
          alert(`Product Added Successfully`)
          this.getAllProduct()
        },
        error: (reason: any) => {
          alert(`Something Went Wrong!!!`)
        }
      })
    }
    this.clear()
  }

  getAProduct(id: any) {
    this.isEdit = true
    if (id) {
      this.api.getAProductAPI(id).subscribe((res: any) => {
        this.editResponse = res
        console.log(this.editResponse)
        this.productName = this.editResponse.productName
        this.productCode = this.editResponse.productCode
        this.category = this.editResponse.category
        this.price = this.editResponse.price
        this.quantity = this.editResponse.quantity
        this.supplierName = this.editResponse.supplierName
        this.stockStatus = this.editResponse.stockStatus
        this.addedDate = this.editResponse.addedDate
        this.editId = this.editResponse._id
      })
    }
  }

  editProduct() {
    if (!this.productName || !this.productCode || !this.category || this.price === null || this.price === undefined ||
      this.quantity === null || this.quantity === undefined || !this.supplierName || !this.stockStatus || !this.addedDate) {
      alert(`Fill all the Fields!!!`)
    } else {
      this.api.updateProductAPI(this.editId, {
        productName: this.productName, productCode: this.productCode, category: this.category, price: this.price,
        quantity: this.quantity, supplierName: this.supplierName, stockStatus: this.stockStatus, addedDate: this.addedDate
      }).subscribe({
        next: (res: any) => {
          console.log(res);
          alert(`Product Updated Successfully`)
          this.getAllProduct()
        },
        error: (reason: any) => {
          alert(`Something Went Wrong!!!`)
        }
      })
    }
    this.clear()
  }

  deleteData(id: any) {
    if (id) {
      this.api.removeProductAPI(id).subscribe({
        next: (res: any) => {
          console.log(res);
          alert("Data Deleted Successfully")
          this.getAllProduct()
        },
        error: (reason: any) => {
          alert(`Something Went Wrong!!!`)
        }
      })
    }
    else {
      alert(`Something Went Wrong!!!`)
    }
  }
}
