import React, { useState } from "react";
import MenuList from "../components/MenuList";
import Logo from "../components/Logo";
import { Button, Layout, theme, message } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Header, Sider, Content } = Layout;

function ThemPH() {
  const [collapsed, setCollapsed] = useState(true);
  const [TenPH, setTenPH] = useState("");
  const [DiaChiPH, setDiaChiPH] = useState("");
  const history = useNavigate();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  async function them() {
    const formData = new FormData();
    formData.append("TenPH", TenPH);
    formData.append("DiaChiPH", DiaChiPH);
    let result = await fetch("http://localhost:8000/api/themPH", {
      method: "POST",
      body: formData,
    });
    message.success("Thanh cong");
    history("/listPH");
  }
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
            <h1>Thêm phòng học</h1>
            <div className="col-sm-6 offset-sm-3">
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  name="tenphong"
                  onChange={(e) => setTenPH(e.target.value)}
                />
                <label for="tenphong">Tên phòng</label>
              </div>
              <br />
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => setDiaChiPH(e.target.value)}
                  name="diachiphong"
                />
                <label for="diachiphong">Địa chỉ phòng</label>
              </div>

              <br />
              <button onClick={them} className="btn btn-primary">
                Thêm
              </button>
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default ThemPH;
