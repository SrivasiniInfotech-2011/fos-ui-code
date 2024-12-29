import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../data/services/shared/user.service';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { UtilsService } from '../../../../data/services/shared/utils.service';
import { EncryptionService } from '../../../../data/services/shared/encryption.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {

  public panelOpenState: boolean = false;
  public sideBarList: any[] = [];

  constructor(private userService: UserService, private router: Router, private utilService: UtilsService,private encryptionService:EncryptionService) { }

  ngOnInit(): void {
    this.getSideBarList();
  }

  getSideBarList() {
    if (localStorage.getItem('userDetails')) {
      const encryptedUserData = localStorage.getItem('userDetails');
      if (encryptedUserData) {
        const decryptedUserData = this.encryptionService.decrypt(encryptedUserData);
        let userDetail = decryptedUserData || '';
        let userId = userDetail?.userId;
        forkJoin([this.userService.getSideBarData(userId), this.userService.getSideBarMaster()]).subscribe(res => {
          const sideBarList = res[0]?.message?.userMenus[0].menus;
          const sideBarMasterList = res[1]?.NAV_ITEMS;
          const filteredSideBar = sideBarList.map((t1: any) => ({ ...sideBarMasterList.find((t2: any) => t2.Program_Code === t1) }));
          this.sideBarList = this.utilService.groupByKey(filteredSideBar, 'Module_Name');
          console.log(this.sideBarList);
        })
      }
    }
  }

  goToMenuItemDetail(moduleName: any, menuTitle: any) {
    //let menu = menuTitle.replace(/\s/g, "-").toLowerCase();
    let menu = menuTitle.toLowerCase();
    let module = moduleName.toLowerCase()
    this.router.navigate(['/dashboard', module, menu])
  }

}
