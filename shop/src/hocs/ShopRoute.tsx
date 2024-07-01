import Layout from '../components/layout/Layout'
import { Outlet } from 'react-router-dom'

const ShopRoute = () => {
  return (
    <Layout>
        <Outlet />
    </Layout>
  )
}

export default ShopRoute