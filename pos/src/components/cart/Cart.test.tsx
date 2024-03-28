import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Cart from "./Cart"

const mockProducts = [
    { id: 1, title: "Producto 1", price: 200 },
    { id: 2, title: "Producto 2", price: 300 },
    { id: 3, title: "Producto 3", price: 400 },
]

describe("Cart renders all elements", () => {
    it("displays products in the cart", () => {

        render(<Cart mockProducts={mockProducts} />)
        const container = screen.getAllByRole("button", {name: /remove/i})
        expect(container).toHaveLength(mockProducts.length)
    })
})

describe("Cart functionality", () => {
    
    it("deletes a product from the cart", async () => {
    
        const user = userEvent.setup()
    
        render(<Cart mockProducts={mockProducts} />)
    
        const container = screen.getAllByRole("button", { name: /remove/i})
    
        await user.click(container[0])
    
        const newContainer = screen.getAllByRole("button", { name: /remove/i})
    
        expect(newContainer).toHaveLength(mockProducts.length - 1)
    })

})