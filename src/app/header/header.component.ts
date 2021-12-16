import { Subscription } from 'rxjs';
import { AuthService } from './../auth/auth.service';
import { DataStorageService } from './../shared/data-storage.service';
import { Component, OnDestroy, OnInit} from "@angular/core";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{
    isAuthenticated = false;
    private userSub!: Subscription;

    constructor(private datastorageService: DataStorageService,
                private authService: AuthService){}

    
  ngOnInit(): void {
      this.userSub = this.authService.user.subscribe(user => {
       this.isAuthenticated = !user ? false : true;  // we can also use !!user in place of !user ? false : true;
      });
  }              

    onSaveData(){
          this.datastorageService.storeRecipe();
    }

    onFetchData(){
        this.datastorageService.fetchRecipe().subscribe(
            
        );
    }

    onLogout(){
        this.authService.Logout();
    }

    ngOnDestroy(): void {
        this.userSub.unsubscribe();
    }
}