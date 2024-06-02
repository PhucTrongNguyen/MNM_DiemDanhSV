import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import MenuList from "../components/MenuList";
import Logo from "../components/Logo";
import { Button, Layout, theme } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const { Header, Sider, Content } = Layout;

function HienThiTH() {
  const [collapsed, setCollapsed] = useState(true);
  const [data, setData] = useState([]);
  const [records, setRecords] = useState(data);
  const [trangHienTai, setTrangHienTai] = useState(1);
  const recordsMoiTrang = 10;
  const trangCuoi = trangHienTai * recordsMoiTrang;
  const trangDau = trangCuoi - recordsMoiTrang;
  const ghiLai = records.slice(trangDau, trangCuoi);
  const npage = Math.ceil(records.length / recordsMoiTrang)
  const soTrang = [...Array(npage + 1).keys()].slice(1)

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const truyXuat = async () => {
    let result = await fetch("http://localhost:8000/api/danhSachTH");
    result = await result.json();
    setData(result);
    setRecords(result);
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/danhSachTH")
      .then((res) => {
        setData(res.data);
        setRecords(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  async function xoaTH(id) {
    let result = fetch("http://localhost:8000/api/xoaTH/" + id, {
      method: "DELETE",
    });
    result = (await result).json();
    truyXuat();
  }

  const Filter = (event) => {
    const inputValue = event.target.value.toLowerCase(); // Lấy giá trị của trường nhập liệu và chuyển đổi thành chữ thường
    const newData = data.filter(
      (item) =>
        item.MaTH.toLowerCase().includes(inputValue) ||
        item.TenTH.toLowerCase().includes(inputValue) ||
        item.DiaChiTH.toLowerCase().includes(inputValue)
    );
    setRecords(newData);
  };

  return (
    <div>
      <Layout>
        <Sider
          collapsed={collapsed}
          collapsible
          trigger={null}
          className="sidebar"
        >
          <Logo />
          <MenuList />
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer }}>
            <Button
              type="text"
              className="trigger"
              onClick={() => setCollapsed(!collapsed)}
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            ></Button>
          </Header>
          <Content>
            <h1>Danh sách tiết học</h1>
            <div className="col-sm-10 offset-sm-1">
              <div className="">
                <div className="input-wrapper">
                  <input
                    className="form-control search"
                    type="text"
                    placeholder="Tìm kiếm..."
                    onChange={Filter}
                  />
                  <Button
                    className="btn btn-success"
                  >
                    <Link to="/themTH">
                      <FontAwesomeIcon icon={faPlus} />
                    </Link>
                  </Button>
                </div>
              </div>
              <Table className="table table-bordered">
                <tr>
                  <td>Mã tiết học</td>
                  <td>Tên tiết học</td>
                  <td>Giờ bắt đầu</td>
                  <td>Giờ kết thúc</td>
                </tr>
                {ghiLai.map((item, i) => (
                  <tr key={i}>
                    <td>{item.MaTH}</td>
                    <td>{item.TenTH}</td>
                    <td>{item.GioBD}</td>
                    <td>{item.GioKT}</td>
                    <td>
                      <Link>
                        <span
                          onClick={() => xoaTH(item.MaTH)}
                          className="btn btn-danger"
                        >
                          Xoá
                        </span>
                      </Link>
                      <Link to={`/suaTH/${item.MaTH}`}>
                        <span className="btn btn-warning">Sửa</span>
                      </Link>
                    </td>
                  </tr>
                ))}
              </Table>
              <nav style={{position: "absolute", left: "50%", transform: "translateX(-50%)"}}>
                <ul className="pagination">
                  <li className="page-item">
                    <a href="#" className="page-link" onClick={trangTruoc}>Prev</a>
                  </li>
                  {
                    soTrang.map((n, i) => (
                      <li className={`page-item ${trangHienTai === n ? 'active' : ''}`} key={i}>
                        <a href="#" className="page-link" onClick={()=>changeCPage(n)}>
                          {n}
                        </a>
                      </li>
                    ))
                  }
                  <li className="page-item">
                    <a href="#" className="page-link" onClick={trangSau}>Next</a>
                  </li>
                </ul>
              </nav>
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );

  function trangSau() {
    if(trangHienTai !== trangCuoi) {
      setTrangHienTai(trangHienTai + 1)
    }
  }
  function trangTruoc() {
    if(trangHienTai !== trangDau) {
      setTrangHienTai(trangHienTai - 1)
    }
  }
  function changeCPage(id) {
    setTrangHienTai(id)
  }
}

export default HienThiTH;