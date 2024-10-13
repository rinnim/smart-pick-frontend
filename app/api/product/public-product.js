const getAllProducts = async () => {
    try {
        const response = await axios.get("http://localhost:5000/api/product/find");
        return response.data;
    } catch (error) {
        console.error("Error fetching products:", error);
    }
};

// GET product by id
const getProductById = async (id) => {
    try {
        const response = await axios.get(`http://localhost:5000/api/product/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching product:", error);
    }
}









module.exports = {
    getAllProducts,
    getProductById
}