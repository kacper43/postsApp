import { Component, OnInit, OnDestroy } from '@angular/core';
import {Post} from '../post.model';
import { PostsService } from '../posts.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
 /* posts = [
    {title: 'First', content: 'This is first post'},
    {title: 'Second', content: 'This is second post'},
    {title: 'Third', content: 'This is third post'},
    {title: 'Fourth', content: 'This is fourth post'}
  ];
*/
  posts: Post[] = [];
  private postsSub: Subscription;

  constructor(public postsService: PostsService) {}

  ngOnInit() {
    this.postsService.getPosts();
    this.postsSub = this.postsService.getPostUpdateListener().subscribe((posts: Post[]) => {
      this.posts = posts;
    });
  }

    ngOnDestroy() {
      this.postsSub.unsubscribe();
    }

  onDelete(postId: string){
    this.postsService.deletePost(postId);
  }


}
