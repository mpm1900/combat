import { Route, Switch } from 'react-router-dom'
import { Combat, Party } from './domain'

export const Routes = () => {
  return (
    <Switch>
      <Route path='/' component={Combat} exact={true} />
      <Route path='/party' component={Party} exact={true} />
    </Switch>
  )
}
