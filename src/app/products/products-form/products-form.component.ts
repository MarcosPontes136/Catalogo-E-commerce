import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ProductsService } from '../../shared/services/productsService/products.service';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Product } from '../../shared/interfeces/products';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Location } from '@angular/common';
import { MaskPrice } from './mask/maskPrice';

@Component({
  selector: 'app-products-form',
  imports: [MatCardModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
    MaskPrice
  ],
  templateUrl: './products-form.component.html',
  styleUrl: './products-form.component.scss'
})
export class ProductsFormComponent {

  images: string[] = [];

  form = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(100),
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(200),
    ]),
    price: new FormControl('', [
      Validators.required,
    ]),
    image: new FormControl('', [Validators.required]),
    status: new FormControl('no'),
    discounted: new FormControl('no', [Validators.max(50)]),
    discount: new FormControl(''),
  });

  private productService = inject(ProductsService);
  private location = inject(Location);
  currencyMaskDirective: any;

  submitForm() {
    const priceControl = this.form.value.price;
    const discountControl = this.form.value.discount;
    const imageControl = this.form.value.image;

    const numericValue = [
      priceControl?.replace(/\D/g, ''),
      discountControl?.replace(/\D/g, '')
    ];
    const formData = { ...this.form.value, price: Number(numericValue[0]), discount: Number(numericValue[1]), image: imageControl };

    this.createProduct(formData as Product);
  }



  createProduct(formData: Product): void {
    this.checkStatus();

    if (this.form.valid) {
      this.productService.create(formData).subscribe({
        next: (response) => {
          this.location.back();
          //Mensagem pop-up (em desenvolvimento)
        },
        error: (error) => {
          //Mensagem pop-up (em desenvolvimento)
          console.log("Error", error.error.message);
        }

      });
    } else {

    }
  }

  onCancel() {
    this.location.back();
  }

  checkStatus(): void {
    if (this.form.value.status === "no") {
      this.form.value.discount = "";
      this.form.value.discounted = "";
    }
  }


  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input?.files && input.files.length > 0) {
      const file: File = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        let base64String = reader.result as string;
        base64String = base64String.replace(/^data:image\/[^;]+;base64,/, '');
        this.form.value.image = base64String;
      };

      reader.onerror = (error) => {
        console.error('Erro ao converter arquivo para Base64:', error);
      };

      reader.readAsDataURL(file);
    }
  }


}
