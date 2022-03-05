var service = new SanPhamSerVices();

function getEle(id) {
    return document.getElementById(id)
}

function getData() {
    service.getListProductAPI()
        // thành công
        .then(function (result) {
            renderListProduct(result.data);
        })
        // thất bại
        .catch(function (error) {
            renderListProduct(error);
        })
}
getData();
// render: xuất ra giao diện
function renderListProduct(list) {
    var content = "";

    for (var i = 0; i < list.length; i++) {
        content += `
            <tr>
                <td>${i + 1}</td>
                <td>${list[i].tenSP}</td>
                <td>${list[i].gia}</td>
                <td>
                    <img src="./../../asset/img/${list[i].hinhAnh}"/>
                </td>
                <td>${list[i].moTa}</td>
                <td>
                    <button class="btn btn-success" onclick="deleteProduct(${list[i].id})">xóa</button>
                    <button id="btnEditSP" class="btn btn-primary" data-toggle="modal" data-target="#myModal" onclick="suaSanPham(${list[i].id})">
                    Sửa
                </button>
                </td>
                
            </tr>
        `
    }
    document.getElementById("tblDanhSachSP").innerHTML = content

}

getEle("btnThemSP").addEventListener("click", function () {
    document.getElementsByClassName("modal-title")[0].innerHTML = "thêm sản phẩm"
    var footer = '<button class="btn btn-success" onclick="addProduct()">Thêm Sản Phẩm</button>'
    document.getElementsByClassName("modal-footer")[0].innerHTML = footer
})

// thêm SP
function addProduct() {
    var tenSP = getEle("TenSP").value;
    var giaSP = getEle("GiaSP").value;
    var HinhSP = getEle("HinhSP").files[0].name;
    var moTaSP = getEle("moTaSP").value;

    var sanPham = new SanPham("", tenSP, giaSP, HinhSP, moTaSP)

    service.addListProductAPI(sanPham)
        .then(function (result) {
            //thành công
            getData();
            document.getElementsByClassName("close")[0].click();
        })
        //thất bại
        .catch(function (error) {
            console.log(error);
            // không cần gọi hàm
        })

}
// xóa SP
function deleteProduct(id) {
    service.deleteProductAPI(id)
        .then(function () {
            // alert("xóa thành công");
            getData();
            document.getElementsByClassName("close")[0].click();
        })
        .catch(function (error) {
            console.log(error);
        })
}

//lấy thông tin SP
function suaSanPham(id) {
    document.getElementsByClassName("modal-title")[0].innerHTML = "Sửa Sản Phẩm";
    var footer = `<button onclick="capNhatSP(${id})">Cập Nhật</button>`
    document.getElementsByClassName("modal-footer")[0].innerHTML = footer;
    service.getListProductIDAPI(id)
        .then(function (result) {
            getEle("TenSP").value = result.data.tenSP;
            getEle("GiaSP").value = result.data.gia;
            getEle("HinhSP").value = result.data.hinhAnh;
            getEle("moTaSP").value = result.data.moTa;
        })
        .catch(function (error) {
            console.log(error);
        })
}

//cập nhật
function capNhatSP(id) {
    var TenSP = getEle("TenSP").value;
    var GiaSP = getEle("GiaSP").value;
    var HinhSP = getEle("HinhSP").value;
    var MotaSP = getEle("moTaSP").value;

    var sanPham = new SanPham(id, TenSP, GiaSP, HinhSP, MotaSP);
    service.editProductAPI(sanPham)
        .then(function () {
            alert("Cập nhật thành công")
            document.getElementsByClassName("close")[0].click();
            getData()
        })
        .catch(function (error) {
            console.log(error);
        })
}

// Tìm kiếm
getEle("enter").addEventListener("click", function () {
    var index_1 = getEle("txtSearch").value;
    service.findProduct(index_1)
        .then(function (result) {
            tables(result.data);
        })
        .catch(function (error) {
            console.log(error);

        })

})
function tables(result) {
    console.log(result);
    var content = "";
    content += `
            <tr>
                <td>${result.tenSP}</td>
                <td>${result.gia}</td>
                <td>
                    <img src="./../../asset/img/${result.hinhAnh}"/>
                </td>
                <td>${result.moTa}</td>
                <td>
                    <button class="btn btn-success" onclick="deleteProduct(${result.id})">xóa</button>
                    <button id="btnEditSP" class="btn btn-primary" data-toggle="modal" data-target="#myModal" onclick="suaSanPham(${result.id})">
                    Sửa
                </button>
                </td>
                
            </tr>
        `
    document.getElementById("tblDanhSachSP").innerHTML = content

}
