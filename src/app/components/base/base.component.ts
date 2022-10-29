import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {

  user$ = this.authService.currentUser$

  constructor(public authService: AuthenticationService) {

  }


  ngOnInit(): void {
  }

}
