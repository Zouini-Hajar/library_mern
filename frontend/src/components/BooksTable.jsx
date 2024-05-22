import React, { useEffect, useState } from "react";
import { Form, Input, InputNumber, Popconfirm, Table, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getBooks, selectAllBooks } from "../features/books/booksSlice";

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const BooksTable = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const books = useSelector(selectAllBooks);
  const [editingKey, setEditingKey] = useState("");
  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      name: "",
      age: "",
      address: "",
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const columns = [
    {
      title: "Picture",
      dataIndex: "coverImageUrl",
      width: "25%",
    },
    {
      title: "Title",
      dataIndex: "title",
      width: "30%",
      editable: true,
    },
    {
      title: "Author",
      dataIndex: "author",
      width: "30%",
      editable: true,
    },
    {
      title: "Isbn",
      dataIndex: "isbn",
      width: "30%",
      editable: true,
    },
    {
      title: "Description",
      dataIndex: "description",
      width: "30%",
      editable: true,
    },
    {
      title: "Publisher",
      dataIndex: "publisher",
      width: "30%",
      editable: true,
    },
    {
      title: "Publication Date",
      dataIndex: "publicationDate",
      width: "30%",
      // editable: true,
    },
    {
      title: "Genres",
      dataIndex: "genres",
      width: "30%",
      // editable: true,
    },
    {
      title: "Language",
      dataIndex: "language",
      width: "30%",
      editable: true,
    },
    {
      title: "Number of Pages",
      dataIndex: "numberOfPages",
      width: "30%",
      editable: true,
    },
    {
      title: "Average Rating",
      dataIndex: "averageRating",
      width: "30%",
      editable: true,
    },
    {
      title: "Price",
      dataIndex: "price",
      width: "30%",
      editable: true,
    },
    {
      title: "Stock",
      dataIndex: "stock",
      width: "30%",
      editable: true,
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== ""}
            onClick={() => edit(record)}
          >
            <i class="fa-solid fa-pen"></i>
          </Typography.Link>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType:
          col.dataIndex === "numberOfPages" ||
          col.dataIndex === "averageRating" ||
          col.dataIndex === "price" ||
          col.dataIndex === "stock"
            ? "number"
            : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  useEffect(() => {
    dispatch(getBooks);
  }, []);

  return (
    <>
      <div className="flex" style={{ marginBottom: "2rem" }}>
        <h2>All Books</h2>
      </div>
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={books}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={{
            onChange: cancel,
          }}
          scroll={{x: true}}
          style={{flex: '70%'}}
        />
      </Form>
    </>
  );
};

export default BooksTable;
