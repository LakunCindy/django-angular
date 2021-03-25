import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ApiService } from '../../services/api.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private _api: ApiService,
    private _auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    setInterval(() => {this.refresh()},60000)
    setInterval(() => {this.getToken()},60000)
  }

  refresh() {
    let refreshToken = { refresh: this._auth.getRefreshToken() }

    this._api.postTypeRequest('api/token/refresh/', refreshToken).subscribe((res: any) => {
      console.log('refresh', res)
      if (res.access) {
        this._auth.setDataInLocalStorage('token', res.access)
      }
    }, err => {
      console.log(err)
    });
  }

  getToken() { 
    let item=localStorage.getItem('token')
    console.log(item)
    return item; 
    
  }
}
