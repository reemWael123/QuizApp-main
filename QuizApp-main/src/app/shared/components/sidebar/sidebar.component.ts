import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  list = [
    {
      label: 'Dashboard',
      icon: 'roofing',
      link: '/dashboard/instructor/dashboardList',
      active: this.isInstructor(),
    },
    {
      label: 'Groups',
      icon: 'groups',
      link: '/dashboard/instructor/groups',
      active: this.isInstructor(),
    },
    {
      label: 'Students',
      icon: 'diversity_1',
      link: '/dashboard/instructor/students',
      active: this.isInstructor(),
    },
    {
      label: 'Quizzes',
      icon: 'pending_actions',
      link: '/dashboard/instructor/quizzes',
      active: this.isInstructor(),
    },
    {
      label: 'Results',
      icon: 'bar_chart',
      link: '/dashboard/instructor/results',
      active: this.isInstructor(),
    },
    {
      label: 'Quizzes',
      icon: 'pending_actions',
      link: '/dashboard/student/quizzes',
      active: this.isStudent(),
    },
    {
      label: 'Results',
      icon: 'bar_chart',
      link: '/dashboard/student/results',
      active: this.isStudent(),
    },
  ];

  constructor(private _AuthService: AuthService) {
    this.list;
  }

  isInstructor() {
    return this._AuthService.role == 'Instructor' ? true : false;
  }

  isStudent() {
    return this._AuthService.role == 'Student' ? true : false;
  }
}
