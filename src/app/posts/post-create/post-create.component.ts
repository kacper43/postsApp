import { Component, Output, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  constructor(public postsService: PostsService) { }

  onSavePost(form: NgForm) {
    // tslint:disable-next-line: curly
    if (form.invalid) return true;
    this.postsService.addPost(form.value.title, form.value.content);
    form.resetForm();
  }

  ngOnInit() {

  }
}
