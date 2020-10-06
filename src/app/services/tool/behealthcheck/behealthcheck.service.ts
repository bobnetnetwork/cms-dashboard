import { Injectable } from '@angular/core';
import {BackendConfigService} from "../backendconfig/backendconfig.service";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BeHealthCheckService {

  private url = new BackendConfigService().getHealthCheckUrl();

  constructor(private http: HttpClient) { }

  getHealthCheck() {
    return this.http.get(this.url);
  }
}
