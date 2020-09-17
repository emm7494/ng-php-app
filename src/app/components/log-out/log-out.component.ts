import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from 'src/app/shared/components/modal/modal/modal.component';
import { AuthResponseData } from 'src/app/shared/models/auth-response-data/auth-response-data.model';
import { AuthService } from '../../shared/services/auth/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-log-out',
  templateUrl: './log-out.component.html',
  styleUrls: ['./log-out.component.scss'],
})
export class LogOutComponent implements OnInit {
  title: string;
  isLoading: boolean;
  res: AuthResponseData;
  @ViewChild('modalComponent') modalComponent: ModalComponent;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.title = 'LOGOUT';
    this.isLoading = true;
    setTimeout(() => {
      if (!this.route.snapshot.paramMap.get('autoLogout')) {
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
            this.isLoading = false;
            this.res = error.error;
            console.error(error);
          },
          () => {
            setTimeout(() => {
              this.modalComponent.onClose();
            }, 2000);
          }
        );
      } else {
        setTimeout(() => {
          this.modalComponent.onClose();
        }, 500);
      }
    }, 1000);
  }
}
