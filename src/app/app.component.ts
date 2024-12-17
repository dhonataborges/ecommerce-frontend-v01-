import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, Event } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'frontend';
  isAdminRoute: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Monitora mudanças na rota e filtra para pegar somente eventos de finalização de navegação
    this.router.events
      .pipe(filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.isAdminRoute = event.urlAfterRedirects.includes('/admin');
      });
  }

  // Método para navegação
  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}