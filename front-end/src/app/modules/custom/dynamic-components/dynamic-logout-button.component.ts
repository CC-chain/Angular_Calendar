import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '@app/core/service/auth.service';

@Component({
  selector: 'logout-button',
  templateUrl: './dynamic-logout-button.component.html',
  styleUrls: ['./dynamic-logout-button.component.scss']
})
export class DynamicLogoutButtonComponent implements OnInit {

  @Input() class$ = "";
  @Input() style$ = {};
  constructor(private authService : AuthService) { }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout();
    window.location.reload();
  }
}
