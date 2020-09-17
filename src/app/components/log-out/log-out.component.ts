import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from 'src/app/shared/components/modal/modal/modal.component';
import { AuthResponseData } from 'src/app/shared/models/auth-response-data/auth-response-data.model';
import { AuthService } from '../../shared/services/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-log-out',
  templateUrl: './log-out.component.html',
  styleUrls: ['./log-out.component.scss'],
})
export class LogOutComponent implements OnInit {
  title: string;
  isLoading: boolean;
  res: AuthResponseData;
  message: string;
  @ViewChild('modalComponent') modalComponent: ModalComponent;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    const isAutoLogout: boolean = JSON.parse(
      this.route.snapshot.queryParamMap.get('isAutoLogout') ?? 'false'
    );
    setTimeout(() => {
      // if (isAutoLogout) {
      this.title = isAutoLogout ? 'AUTO LOGOUT' : 'LOGOUT';
      this.authService.logOut(false).subscribe(
        (res) => {
          // this.isLoading = false;
          this.res = res;
          console.log(res);
          // this.modalComponent.onClose();
          // if (this.nextRoute) {
          //   this.router.navigate([this.nextRoute]);
          // }
        },
        (error) => {
          this.message = isAutoLogout
            ? 'Auto Logout Error.'
            : 'Please try again!';
          this.isLoading = false;
          this.res = error.error;
          console.error('error: ', error);
        },
        () => {
          this.message = isAutoLogout
            ? 'Session timed out. You are logged out!'
            : 'Your are logged out!';
          this.isLoading = false;
          if (!isAutoLogout) {
            setTimeout(() => {
              this.modalComponent.onClose();
            }, 2000);
          }
          console.log(this.route.routeConfig);
          this.router.navigate([{ outlets: { primary: null } }]);
        }
      );
    }, 1000);
  }
}
