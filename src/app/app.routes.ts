import { Routes } from '@angular/router';
import { ContactListComponent } from './Component/contact-list/contact-list.component';
import { ContactEditComponent } from './Component/contact-edit/contact-edit.component';
import { ContactAddComponent } from './Component/contact-add/contact-add.component';

export const routes: Routes = [

    {path: '', component: ContactListComponent},
    {path: 'add', component: ContactAddComponent},
    { path: 'edit-contact/:id', component: ContactEditComponent}

];
        