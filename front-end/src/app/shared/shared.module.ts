import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MaterialModule } from './material.module';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import {
  FontAwesomeModule,
  FaIconLibrary
} from '@fortawesome/angular-fontawesome';
import {
  faPlus,
  faEdit,
  faTrash,
  faTimes,
  faCaretUp,
  faCaretDown,
  faExclamationTriangle,
  faFilter,
  faTasks,
  faCheck,
  faSquare,
  faLanguage,
  faPaintBrush,
  faLightbulb,
  faWindowMaximize,
  faStream,
  faBook,
  faUserCircle,
  faAsterisk,
  faRemove
} from '@fortawesome/free-solid-svg-icons';
import { faMediumM, faGithub } from '@fortawesome/free-brands-svg-icons';
import { ControlMessagesComponent } from './component/control-messages/control-messages.component';
import { ConvertStylePipe } from './pipes/convert-style.pipe';
import { DynamicContentPipe } from './pipes/dynamic-content.pipe';
import { GetParsersPipe } from './pipes/get-parsers.pipe';
import { FilterCustomsPipe } from './pipes/filter-customs.pipe';
import { CurrencyPipe } from './pipes/currency.pipe';
import { FilterWebSitesPipe } from './pipes/filter-web-sites.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgbModule,
    FontAwesomeModule
  ],
  declarations: [
    ControlMessagesComponent,
    ConvertStylePipe,
    DynamicContentPipe,
    GetParsersPipe,
    FilterCustomsPipe,
    CurrencyPipe,
    FilterWebSitesPipe,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialModule,
    ControlMessagesComponent,
    NgbModule,
    FontAwesomeModule,
    ConvertStylePipe,
    DynamicContentPipe,
    GetParsersPipe,
    FilterCustomsPipe,
    CurrencyPipe,
    FilterWebSitesPipe,
  ]
})
export class AppSharedModule {
  constructor(faIconLibrary: FaIconLibrary) {
    faIconLibrary.addIcons(
      faGithub,
      faMediumM,
      faPlus,
      faEdit,
      faTrash,
      faTimes,
      faCaretUp,
      faCaretDown,
      faExclamationTriangle,
      faFilter,
      faTasks,
      faCheck,
      faRemove,
      faSquare,
      faLanguage,
      faPaintBrush,
      faLightbulb,
      faWindowMaximize,
      faStream,
      faBook,
      faUserCircle,
      faAsterisk
    );
  }
}
