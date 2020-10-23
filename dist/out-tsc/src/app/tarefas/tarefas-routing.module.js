import { ListarComponent } from '../../environments';
import { CadastrarComponent } from './cadastrar';
import { EditarComponent } from './editar';
export const TarefaRoutes = [
    {
        path: 'tarefas',
        redirectTo: 'tarefas/listar'
    },
    {
        path: 'tarefas/listar',
        component: ListarComponent
    },
    {
        path: 'tarefas/cadastrar',
        component: CadastrarComponent
    },
    {
        path: 'tarefas/editar/:id',
        component: EditarComponent
    }
];
//# sourceMappingURL=tarefas-routing.module.js.map