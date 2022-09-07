import React from 'react'
import {Router, Switch, Route, Redirect, NavLink} from 'react-router-dom'
import {createBrowserHistory} from 'history'
import {ReactComponent as Logo} from '../images/corpay-logo-black-us.svg'
import styled from 'styled-components'

const history = createBrowserHistory()

const ExpenseListRoute = React.lazy(
  () => import('../pages/expenses/ExpenseListRoute')
)
const ExpenseItemRoute = React.lazy(
  () => import('../pages/expenses-id/ExpenseItemRoute')
)
const SettingsRoute = React.lazy(
  () => import('../pages/settings/SettingsRoute')
)

export const App: React.FC<{}> = () => {
  return (
    <Router history={history}>
      <Header>
        <div style={{marginRight: 24, width: 96}}>
          <Logo />
        </div>
        <Nav>
          <li className="nav-item">
            <NavLink to="/expenses" className="nav-link">
              Expenses
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/settings" className="nav-link">
              Settings
            </NavLink>
          </li>
        </Nav>
      </Header>
      <Main>
        <React.Suspense
          fallback={
            <div className="d-flex justify-content-center">
              <div className="spinner-border text-primary" />
            </div>
          }
        >
          <Switch>
            <Route path="/expenses" exact component={ExpenseListRoute} />
            <Route path="/expenses/:id" component={ExpenseItemRoute} />
            <Route path="/settings" exact component={SettingsRoute} />
            <Redirect path="/" exact to="/expenses" />
          </Switch>
        </React.Suspense>
      </Main>
    </Router>
  )
}

const Header = styled.div`
  align-items: center;
  background-color: white;
  border: 1px solid rgb(201, 201, 201);
  display: flex;
  flex-shrink: 0;
  height: 56px;
  padding: 8px 24px;
`

const Nav = styled.ul`
  display: flex;
  list-style: none;

  .nav-link {
    padding: 8px;
    text-decoration: none;
  }
`

const Main = styled.div`
  padding: 24px 24px 0px;
  margin: 0px auto;
  max-width: 1248px;
`
