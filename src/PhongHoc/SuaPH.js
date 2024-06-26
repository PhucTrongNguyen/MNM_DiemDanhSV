import axios from "axios";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Table } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MenuList from "../components/MenuList";
import Logo from "../components/Logo";
import { Button, Layout, theme, message } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";

const { Header, Sider, Content } = Layout;

function SuaPH() {
  const [collapsed, setCollapsed] = useState(true);
  const [data, setData] = useState([]);
  const [TenPH, setTenPH] = useState("");
  const [DiaChiPH, setDiaChiPH] = useState("");
  const history = useNavigate();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { id } = useParams();
  const [values, setValues] = useState({
    MaPH: id,
    TenPH: "",
    DiaChiPH: "",
  });
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/layPH/" + id)
      .then((res) => {
        setValues({
          ...values,
          TenPH: res.data.TenPH,
          DiaChiPH: res.data.DiaChiPH,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    axios
      .post(`http://localhost:8000/api/suaPH/${id}`, data)
      .then((res) => {
        message.success("Thành công");
        history("/listPH");
      })
      .catch((err) => {
        alert(err);
      });
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
            <h1>Cap nhat phong hoc</h1>
            <form onSubmit={handleSubmit} className="col-sm-4 offset-sm-4">
              <input
                className="form-control"
                type="text"
                placeholder={values.MaPH}
              ></input>
              <br />
              <div className="form-floating">
                <input
                  className="form-control"
                  type="text"
                  name="TenPH"
                  defaultValue={values.TenPH}
                  id="TenPH"
                ></input>
                <label for="TenPH">Tên phòng</label>
              </div>
              <br />
              <div className="form-floating">
                <input
                  className="form-control"
                  type="text"
                  name="DiaChiPH"
                  defaultValue={values.DiaChiPH}
                  id="DiaChiPH"
                ></input>
                <label for="DiaChiPH">Địa chỉ phòng</label>
              </div>
              <br />
              <button className="btn btn-success">
                Cập nhật
              </button>
            </form>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default SuaPH;
