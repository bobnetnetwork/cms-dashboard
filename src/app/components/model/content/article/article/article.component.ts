import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Article, ArticleMessage} from '@bobnetnetwork/cms-model';
import { ArticleService } from 'src/app/services/model/content/article/article.service';
import {CategoriesMessage, Category} from '@bobnetnetwork/cms-model';
import { CategoryService } from 'src/app/services/model/content/category/category.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-singlearticle',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  private readonly slug: string;
  private msg: ArticleMessage;
  private categoriesMessage: CategoriesMessage;
  article: Article;
  articleForm: FormGroup;
  categories: Category[];
  selected: Category[];

  constructor(private route: ActivatedRoute, private service: ArticleService, private categoryService: CategoryService) {
    this.slug = this.route.snapshot.paramMap.get('articleslug');
    if(this.slug === "add-new-article"){
      this.article = new Article();
      this.generateForm();
      this.selected = this.article.categories;
      this.getCategories();
    } else {
      this.getArticle();
      this.getCategories();
    }

  }

  private getArticle(): void{

    this.service.getArticle(this.slug).subscribe(res => {
      this.msg = res as ArticleMessage;
      this.article = this.msg.content as Article;
      this.generateForm();
      this.selected = this.article.categories;
    });
  }

  private getCategories(): void {
    this.categoryService.getAllCategories().subscribe( res => {
      this.categoriesMessage = res as CategoriesMessage;
      this.categories = this.categoriesMessage.content;
    });
  }

  private generateForm(): void {
    this.articleForm = new FormGroup({
      title: new FormControl(this.article.title),
      content: new FormControl(this.article.content),
      headline: new FormControl(this.article.headline),
      categories: new FormControl()
    });
  }

  ngOnInit(): void {

  }

  underLectoring(): void {
    this.article.status = 'under lectoring';
    this.updateArticle();
  }

  reject(): void {
    this.article.status = 'rejected';
    this.updateArticle();
  }

  saveAsDraft(): void {
    this.article.status = 'draft';
    this.updateArticle();
  }

  publish(): void {
    this.article.status = 'published';
    this.updateArticle();
  }

  delete(): void {
    this.service.deleteArticle(this.article.slug).subscribe(res => {
      window.location.href = '/articles';
    });
  }

  private updateArticle(): void {
    this.article.title = this.articleForm.get('title').value;
    this.article.content = this.articleForm.get('content').value;
    this.article.headline = this.articleForm.get('headline').value;
    this.article.categories = this.selected;
    if(this.slug === "add-new-article") {
      this.service.insertArticle(this.article).subscribe( res2 => {
        this.msg = res2;
        window.location.href = '/articles/' + this.msg.content.slug;
      });
    } else {
      this.service.updateArticle(this.article).subscribe(res1 => {

      });
    }

  }
}
