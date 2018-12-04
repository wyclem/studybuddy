import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BrowseGroupsPage } from './browse-groups';

@NgModule({
  declarations: [
    BrowseGroupsPage,
  ],
  imports: [
    IonicPageModule.forChild(BrowseGroupsPage),
  ],
})
export class BrowseGroupsPageModule {}
