import React from "react";
import { DeleteFilled } from "@ant-design/icons";
import { ConfigProvider, Space, Table } from "antd";
import CartItem from "../components/CartItem";
import '../styles/cart.css';




const CartDetails = ({books,handleCancel}) => {
    const columns = [
        {
            title: "Item",
            dataIndex: "item",
            key: "item",
            width: "40%",
            render: (_, record) => <CartItem book={record} />,
        },
        {
            title: "Price",
            dataIndex: "price",
            key: "price",
            width: "20%",
        },
        {
            title: "Action",
            key: "action",
            width: "20%",
            render: (_, record) => (
                <Space size="middle">
                    <a>
                        <DeleteFilled onClick={(e) => {handleCancel(record._id)}} style={{ color: "#86469C" , fontSize:'20px'}} />
                    </a>
                </Space>
            ),
        },
    ];

    return (
        <ConfigProvider
            theme={{
                components: {
                    Table: {
                        headerBg:'#5B067D',
                        headerColor:'white',
                    },
                },
            }}
        ><Table columns={columns} dataSource={books} rowKey="_id" style={{ margin: "auto", width: "90%" , marginTop:'3rem'}} />
        </ConfigProvider>

    )

};

export default CartDetails;
