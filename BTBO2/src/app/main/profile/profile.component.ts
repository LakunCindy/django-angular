import { Component, OnInit } from '@angular/core'; 
import { Router } from '@angular/router'; 
import { AuthService } from 'src/app/services/auth.service'; 
import {ApiService} from '../../services/api.service' 
 
@Component({ 
  selector: 'app-profile', 
  templateUrl: './profile.component.html', 
  styleUrls: ['./profile.component.scss'] 
}) 
export class ProfileComponent implements OnInit { 
 
  constructor( 
    private _api : ApiService, 
    private _auth: AuthService, 
    private router: Router
  ) { } 
 
  ngOnInit(): void { 
    this.test_jwt() 
  } 
 
  test_jwt(){ 
    this._api.getTypeRequest('hello').subscribe((res: any) => { 
      console.log(res) 
 
    }, err => { 
      console.log(err) 
    }); 
    this.router.navigate(['container'])
  } 
}
