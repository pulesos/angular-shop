import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public authService: AuthenticationService, private router: Router, private usersService: UsersService) {

  }

  user$ = this.usersService.currentUserProfile$

  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate([''])
    })
  }

  ngOnInit(): void {
  }

}
