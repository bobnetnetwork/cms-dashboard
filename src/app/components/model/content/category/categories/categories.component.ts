import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {CategoriesMessage, Category, CategoryMessage} from '@bobnetnetwork/cms-model';
import { CategoryService } from 'src/app/services/model/content/category/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  private msg: CategoriesMessage;
  private cMsg: CategoryMessage;
  category: Category;
  categoryForm: FormGroup;
  categories: Category[];
  parents: Category[];
  parentCategory: Category;

  constructor(private service: CategoryService) {
    this.getCategories();
  }

  ngOnInit(): void {
  }

  private generateForm(): void {
    this.category = new Category();
    this.categoryForm = new FormGroup({
      name: new FormControl(this.category.name),
      description: new FormControl(this.category.description),
      parent: new FormControl()
    });
  }

  private getCategories(): void {
    this.service.getAllCategories().subscribe( res => {
      this.msg = res as CategoriesMessage;
      this.categories = this.msg.content;
      this.getParents();
      this.generateForm();
    });
  }

  private getParents(): void {
    this.parents = this.categories;
  }

  private setParent() {
   this.service.getCategoy(this.categoryForm.get('parent').value).subscribe( res => {
    this.cMsg = res;
    this.parentCategory = this.cMsg.content;
    if(this.parentCategory.subCategories === undefined) {
      this.parentCategory.subCategories = new Array<Category>();
    }
    this.parentCategory.subCategories.push(this.category);
    this.service.updateCategory(this.parentCategory).subscribe( res => {
      this.generateForm();
    });
   });
  }

  addNew(): void {
    this.category.name = this.categoryForm.get('name').value;
    this.category.description = this.categoryForm.get('description').value;
    console.log(this.categoryForm.get('parent').value);
    this.service.insertCategory(this.category).subscribe( res => {
      console.log('Category insert log: ', res);
      this.setParent();
    });

  }


}
