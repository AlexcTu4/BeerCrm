
import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
@Module({
  name: 'main',
  stateFactory: true,
  namespaced: true,
})



export default class MainModule extends VuexModule {
  links: ILink[] = [
    {
      name: 'index',
      icon: 'home',
      title: 'Главная',
    },
    {
      name: 'production',
      icon: 'tractor',
      title: 'Производство',
    },
    {
      name: 'recipes',
      icon: 'book',
      title: 'Рецепты',
    },
    {
      name: 'purchases',
      icon: 'shopping-cart',
      title: 'Закупки',
    },
    {
      name: 'groups',
      icon: 'boxes',
      title: 'Группы товаров',
    },
    {
      name: 'contacts',
      icon: 'users',
      title: 'Контакты',
    },
  ]

  @Action({ rawError: true })
  getContacts(): void {
    console.log('111111111');
  }
}
