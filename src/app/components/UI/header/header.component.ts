import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public authService: AuthenticationService, private router: Router) {

  }

  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate([''])
    })
  }

  ngOnInit(): void {
  }

}
