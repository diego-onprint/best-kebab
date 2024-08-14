import { useEffect } from 'react'
import CheckoutForm from '../../components/checkout_form/CheckoutForm'

const Checkout = () => {

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="p-4">
      <h1 className="font-bold text-xl">Checkout</h1>
      <CheckoutForm />
    </div>
  )
}

export default Checkout