import { Component, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ImageUploadService } from 'src/app/services/image-upload.service';
import { HotToastService } from '@ngneat/hot-toast';
import { concatMap } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user$ = this.authService.currentUser$
  constructor(private authService: AuthenticationService, private imageUploadService: ImageUploadService, private toast: HotToastService) { }

  ngOnInit(): void {
  }

  uploadImage(event: any, user: User) {
    this.imageUploadService.uploadImage(event.target.files[0], `images/profile/${user.uid}`).pipe(
      this.toast.observe(
        {
          loading: 'Image is neing uploaded...',
          success: 'Image uploaded!',
          error: 'There was an error in uploading'
        }
      ),
      concatMap((photoURL) => this.authService.updateProfileData({photoURL}))
      ).subscribe()
  }

}
