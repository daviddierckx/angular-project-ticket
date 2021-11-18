import { DetailComponent } from './detail/detail.component';
import { ListComponent } from './list/list.component';
import { EditComponent } from './edit/edit.component';

export const components: any[] = [
    DetailComponent,
    EditComponent,
    ListComponent
]

export * from './detail/detail.component'
export * from './edit/edit.component'
export * from './list/list.component'