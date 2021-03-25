import { Component, OnInit } from '@angular/core'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { Router } from '@angular/router'; 
import { AuthService } from 'src/app/services/auth.service'; 
import {ApiService} from '../../services/api.service' 
 
@Component({ 
  selector: 'app-login', 
  templateUrl: './login.component.html', 
  styleUrls: ['./login.component.scss'] 
}) 
export class LoginComponent implements OnInit { 
  form: FormGroup 
  constructor( 
    private _api : ApiService, 
    private _auth: AuthService, 
    private router: Router, 
    public fb: FormBuilder 
  ) { } 
 
  ngOnInit(): void { 
    this.form = this.fb.group({ 
      username: ['', Validators.required], 
      password:['', Validators.required] 
    }); 
    
  } 
 
  login(){ 
    let b = this.form.value 
    console.log(b) 
    this._api.postTypeRequest('api/token/', b).subscribe((res: any) => { 
      console.log(res) 
      if(res.access){ 
        this._auth.setDataInLocalStorage('token', res.access)
        this._auth.setDataInLocalStorage('refresh', res.refresh) 
        this.router.navigate(['container']) 
      } 
    }, err => { 
      console.log(err) 
    })
    /*setInterval(() => {this.refresh()},270000)*/
  } 

  refresh(){ 
    let refreshToken= {refresh: this._auth.getRefreshToken()}
    
    this._api.postTypeRequest('api/token/refresh/', refreshToken).subscribe((res: any) => { 
      console.log('ok',res) 
      if(res.access){ 
        this._auth.setDataInLocalStorage('token', res.access)
      } 
    }, err => { 
      console.log(err) 
    }); 
  } 
 
}