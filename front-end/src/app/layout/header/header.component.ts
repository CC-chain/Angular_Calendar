import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ThemeService } from '@core/service/theme.service';
import { environment } from '@env';
import { ActivatedRoute, Router} from '@angular/router';
import { AuthService } from '@core/service/auth.service';
import { CustomCs } from '@app/data/schema/data';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() sites! : CustomCs[] | undefined;

  constructor(private themeService: ThemeService, private router : Router, private active : ActivatedRoute,
    private authService : AuthService) {}

  ngOnInit() {

  }

  toggleTheme(checked: boolean) {
    this.themeService.setDarkTheme(checked);
  }

  logout(){
    this.authService.logout();
  }

}
