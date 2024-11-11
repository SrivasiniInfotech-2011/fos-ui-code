import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../data/services/shared/user.service';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {

  public panelOpenState: boolean = false;
  public sideBarList: any[] = [];

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.getSideBarList();
  }

  getSideBarList() {
    if (localStorage.getItem('userDetails')) {
      let userDetail = JSON.parse(localStorage.getItem('userDetails') || '')
      let userId = userDetail?.userId
      forkJoin([this.userService.getSideBarData(userId), this.userService.getSideBarMaster()]).subscribe(res => {
        const sideBarList = res[0]?.message?.userMenus[0].menus;
        const sideBarMasterList = res[1]?.NAV_ITEMS;
        this.sideBarList = sideBarList.map((t1: any) => ({ ...sideBarMasterList.find((t2: any) => t2.Program_Code === t1) }));
        console.log(this.sideBarList);
      })
    }
  }

  goToMenuItemDetail(moduleName: any, menuTitle: any) {
    let menu = menuTitle.replace(/\s/g, "-").toLowerCase();
    let module = moduleName.toLowerCase()
    this.router.navigate(['/dashboard', module, menu])
  }

}
