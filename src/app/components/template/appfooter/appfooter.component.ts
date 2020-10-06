import { Component, OnInit } from '@angular/core';
import { version } from '../../../../../package.json';
import {HealthCheck} from "@bobnetnetwork/cms-model";
import {BeHealthCheckService} from "../../../services/tool/behealthcheck/behealthcheck.service";

@Component({
  selector: 'app-appfooter',
  templateUrl: './appfooter.component.html',
  styleUrls: ['./appfooter.component.css']
})
export class AppfooterComponent implements OnInit {

  version: string;
  beVersion: string;
  private msg: HealthCheck;

  constructor(private service: BeHealthCheckService) {
    this.version = version;
    this.getHealthCheck();
  }

  private getHealthCheck(): void {
    this.service.getHealthCheck().subscribe( res => {
      console.log(res);
      this.msg = res as HealthCheck;
      this.beVersion = this.msg.version;
    });
  }

  ngOnInit(): void {
  }

}
