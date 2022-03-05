function SanPhamSerVices() {
    this.getListProductAPI = function () {
        return axios({
            url: "https://5a6451dcf2bae00012ca1a6a.mockapi.io/api/products",
            method: "GET",
        });
    };
    //add
    this.addListProductAPI = function (product) {
        return axios({
            url: "https://5a6451dcf2bae00012ca1a6a.mockapi.io/api/products",
            method: "POST",
            data: product,
        });
    };

    // xóa
    this.deleteProductAPI = function (id) {
        return axios({
            url: `https://5a6451dcf2bae00012ca1a6a.mockapi.io/api/products/${id}`,
            method: "DELETE",
        })
    }

    // lấy id của SP cần sửa
    this.getListProductIDAPI = function (id) {
        return axios({
            url: `https://5a6451dcf2bae00012ca1a6a.mockapi.io/api/products/${id}`,
            method: "GET",
        });
    }
    //sửa SP
    this.editProductAPI = function (product) {
        return axios({
            url: `https://5a6451dcf2bae00012ca1a6a.mockapi.io/api/products/${product.id}`,
            method: "PUT",
            data: product,
        });
    }

    // search
    this.findProduct = function (id) {
        return axios({
            url: `https://5a6451dcf2bae00012ca1a6a.mockapi.io/api/products/${id}`,
            method: "GET",
        })
    }

}