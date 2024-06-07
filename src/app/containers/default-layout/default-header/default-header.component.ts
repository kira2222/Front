import { Component, Input, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { ClassToggleService, HeaderComponent } from '@coreui/angular';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent {

  @Input() sidebarId: string = "sidebar";

  public newMessages = new Array(4);
  public newTasks = new Array(5);
  public newNotifications = new Array(5);

  constructor(private router: Router) {
    super();
  }

  @HostListener('window:popstate', ['$event'])
  onPopState(event: any) {
    // Prevent the default behavior of the back button
    history.pushState(null, document.title, window.location.href);
  }

  logout() {
    // Clear local storage
    localStorage.clear();

    // Communicate with the server to invalidate the session or token
    // You may need to send a request to the server to log the user out

    // Navigate to the login page
    this.router.navigate(['/login']);
    window.location.href = window.location.origin;

  }
}
