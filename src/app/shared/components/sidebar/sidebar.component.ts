import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../data/services/shared/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {

  public panelOpenState: boolean = false;
  public sideBarList: any[] = [];

  constructor(private userService: UserService, private router:Router) { }

  ngOnInit(): void {
    this.getSideBarList();
  }

  getSideBarList() {
    if (localStorage.getItem('userDetails')) {
      let userDetail = JSON.parse(localStorage.getItem('userDetails') || '')
      let userId = userDetail?.userId
      this.userService.getSideBarData(userId).subscribe((res: any) => {
        this.sideBarList = res?.message?.userMenus
       })
    }
  }

  goToMenuItemDetail(moduleName:any, menuTitle:any){
    let menu = menuTitle.replace(/\s/g, "-").toLowerCase();
    let module = moduleName.toLowerCase()
      this.router.navigate(['/dashboard',module, menu])
  }

}
