import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {DenemeService} from '@shared/service/dynamic_css/deneme.service'
import { ThemeService } from '@core/service/theme.service';
import { environment } from '@env';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public version = environment.version;
  public repoUrl = 'https://github.com/mathisGarberg/angular-folder-structure';
  colorList: string[]= [];
  public isDarkTheme$!: Observable<boolean>;

  navItems = [
    { link: '/dashboard/home', title: 'Home' },
    { link: '/about', title: 'About' },
    { link: '/contact', title: 'Contact' }
  ];

  constructor(private themeService: ThemeService, private deneme: DenemeService) {}

  ngOnInit() {
    this.isDarkTheme$ = this.themeService.getDarkTheme();
    this.colorList= this.deneme.getColorList();
  }

  toggleTheme(checked: boolean) {
    this.themeService.setDarkTheme(checked);
  }

  changeColor(color:string) {
    this.deneme.set(color);
  }
}
