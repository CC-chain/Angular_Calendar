import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { themes } from '@app/core/constants/themes';
import { ThemeService } from '@app/core/service/theme.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-calendar-layout',
  templateUrl: './calendar-layout.component.html',
  styleUrls: ['./calendar-layout.component.scss']
})
export class CalendarLayoutComponent implements OnInit {
currentTheme!: string;

  currentActiveTheme$ = this.themeService.getDarkTheme().pipe(
    map((isDarkTheme: boolean) => {
      const [lightTheme, darkTheme] = themes;

      this.currentTheme = isDarkTheme ? lightTheme.name : darkTheme.name;

      if (this.overlayContainer) {
        const overlayContainerClasses = this.overlayContainer.getContainerElement()
          .classList;
        const themeClassesToRemove = Array.from(
          overlayContainerClasses
        ).filter((item: string) => item.includes('-theme'));
        if (themeClassesToRemove.length) {
          overlayContainerClasses.remove(...themeClassesToRemove);
        }
        overlayContainerClasses.add(this.currentTheme);
      }

      return this.currentTheme;
    })
  );

  private overlayContainer!: OverlayContainer;

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    if (this.overlayContainer) {
      this.overlayContainer
        .getContainerElement()
        .classList.add(this.currentTheme);
    }
  }

}
